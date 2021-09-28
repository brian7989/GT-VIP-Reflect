import React, { Component } from 'react';

import CurrentTeamDropdownSelectorTable from '../Components/CurrentTeamDropdownSelector';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';



import Configuration from './Configuration';

import ReflectSchema from './ReflectSchema';

import _ from 'lodash';

//
// query {
//     currentUser {
//         username
//         teamsByUserId {
//             totalCount
//             nodes {
//                 name
//             }
//         }
//     }
// }

// query($userId:Int!) {
//     userById(id:$userId) {
//         username
//         teamsByUserId {
//             totalCount
//             nodes {
//                 name
//             }
//         }
//     }
// }


const TeamsQuery = gql`
query($userId:Int!) {
  userById(id:$userId) {
    ...DeepUserMembers
    teamsByUserId {
      totalCount
      nodes {
        ...TeamMembers
      }
    }
  }
}
${ReflectSchema.deepUser}
${ReflectSchema.team}
`;



const AllTeamsQuery = gql`
query {
  allTeams {
    totalCount
    nodes {
      ...TeamMembers
    }   
  }
}
${ReflectSchema.team}
`;




const UpdateCurrentTeamMutation = gql`
mutation($updateUserByIdInput:UpdateUserByIdInput!) {
  
    updateUserById(input:$updateUserByIdInput) {
    user {
      ...DeepUserMembers
      teamsByUserId {
        totalCount
        nodes {
           ...TeamMembers
        }
      }
    }
  }
}

${ReflectSchema.deepUser}
${ReflectSchema.team}
`;

// const UpdateCurrentTeamMutation = gql`
// mutation($teamAddUserInput:TeamAddUserInput!) {
//
//   teamAddUser(input:$teamAddUserInput)
//   {
//     user {
//       ...DeepUserMembers
//       teamsByUserId {
//         totalCount
//         nodes {
//            ...TeamMembers
//         }
//       }
//
//     }
//   }
// }
// ${ReflectSchema.deepUser}
// ${ReflectSchema.team}
// `;
//



const CurrentTeamDropdownSelectorWithDataPropTypes = {


}


const CurrentTeamDropdownSelectorWithData = compose (

    graphql(TeamsQuery, {
       name: 'teamsQuery',
        options: ({userId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {
                userId: userId
            }
        }),

        props: ({ownProps, teamsQuery:  {loading, error, userById, refetch}}) => ({
            loading: loading,

            teams: (() => {

                console.log("CurrentTeamDropdownSelectorWithData");
                console.log("loading: " + loading);

                let ret = (error || loading || !_.has(userById, "teamsByUserId.nodes")) ? []
                    : userById.teamsByUserId.nodes;

                console.log(ret);

                return ret;
            })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({queryAllTeams}) => (
        () =>
        {
            return queryAllTeams;
        }
        )()
    }),

    graphql(AllTeamsQuery, {
        name: 'teamsQuery',
        options: ({}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {
            }
        }),

        props: ({ownProps, teamsQuery:  {loading, error, allTeams, refetch}}) => ({
            loading: loading,

            teams: (() => {

                console.log("CurrentTeamDropdownSelectorWithData");
                console.log("loading: " + loading);

                let ret = (error || loading || !_.has(allTeams, "nodes")) ? []
                    : allTeams.nodes;

                console.log(ret);

                return ret;
            })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({queryAllTeams}) => (
            () =>
            {
                return !queryAllTeams;
            }
        )()
    }),

    graphql(UpdateCurrentTeamMutation, {
        name: 'updateCurrentTeamMutation',

        props: ({updateCurrentTeamMutation, ownProps: {userId}}) => ({
            updateCurrentTeam: (teamId) => {

                console.log("updateCurrentTeamMutation: GOT: userid" + userId + " and teamid" + teamId);

                return updateCurrentTeamMutation({
                    variables: {
                        updateUserByIdInput: {
                            id: userId,
                            userPatch: {
                                currentTeamId: teamId
                            }
                        }
                    }
                })
                    .then(({data}) => {

                        console.log("updateCurrentTeamMutation succeeded");

                        return data;

                    }).catch((error) => {
                        console.log('there was an error sending the mutation', error);

                    })
            }
        }),
    }),

    // graphql(UpdateCurrentTeamMutation, {
    //     name: 'updateCurrentTeamMutation',
    //
    //     props: ({updateCurrentTeamMutation, ownProps: {userId}}) => ({
    //         updateCurrentTeam: (teamId) => {
    //
    //             console.log("updateCurrentTeamMutation: GOT: userid" + userId + " and teamid" + teamId);
    //
    //             return updateCurrentTeamMutation({
    //                 variables: {
    //                     teamAddUserInput: {
    //                         userid: userId,
    //                         teamid: teamId
    //                     }
    //                 }
    //             })
    //                 .then(({data}) => {
    //
    //                     console.log("updateCurrentTeamMutation succeeded");
    //
    //                 }).catch((error) => {
    //                     console.log('there was an error sending the mutation', error);
    //
    //                 })
    //         }
    //     }),
    // }),



)(CurrentTeamDropdownSelectorTable);



CurrentTeamDropdownSelectorWithData.propTypes = CurrentTeamDropdownSelectorWithDataPropTypes;


export default CurrentTeamDropdownSelectorWithData;