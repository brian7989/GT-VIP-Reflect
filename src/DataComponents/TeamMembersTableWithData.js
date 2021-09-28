import React, { Component } from 'react';

import TeamMembersTable from '../Components/TeamMembersTable.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';


import Configuration from './Configuration';


import ReflectSchema from './ReflectSchema';


const TeamMembersQuery = gql`
query teamUsersByTeamId($teamId:Int!){
  
  teamById(id:$teamId) {
    ...TeamMembers
    teamUsersByTeamId {
      totalCount
      nodes {
        ...TeamUserMembers
        userByUserId {
          ...UserMembers
          
          teamsByUserId {
          
            totalCount
            nodes {
                ...TeamMembers
            }
          
          }
        }
      }
    }
  }
}
${ReflectSchema.team}
${ReflectSchema.teamUser}
${ReflectSchema.user}

`;

//
// {
//     "teamId": 3
// }


const CreateUserMutation = gql`
mutation($newUserInput:RegisterUserInput!) {
 registerUser(input: $newUserInput) {
   user {
     ...UserMembers
   }
 }
}
${ReflectSchema.user}
`;



const UpdateUserMutation = gql`
mutation($newUserInput:RegisterUserInput!) {
 updateUser(input: $newUserInput) {
   user {
     ...UserMembers
   }
 }
}
${ReflectSchema.user}
`;

const AllTeamsQuery = gql`
query {
  
  allTeams {
    nodes {
      ...TeamMembers
    }
  }
  
}
${ReflectSchema.team}
`;


const TeamMembersTableWithDataPropTypes = {

    classId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool

}


const TeamMembersTableWithData = compose (

    graphql(TeamMembersQuery, {
       name: 'teamMembersQuery',
        options: ({teamId}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {teamId: teamId}
        }),

        props: ({ownProps, teamMembersQuery:  {loading, error, teamById, refetch}}) => ({
            loading: loading,
            teamMembers: (error || loading || !teamById || !teamById.teamUsersByTeamId ||
                !teamById.teamUsersByTeamId.nodes
                ) ? [] :
                (() => {

                    let ret = teamById.teamUsersByTeamId.nodes.reduce((result, d) => {

                            if(d.userByUserId)
                                result.push(d.userByUserId);

                            return result;
                        },[]);

                    return ret;

                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, isAdmin}) => !active || isAdmin
    }),


    graphql(AllTeamsQuery, {
        name: 'allTeamsQuery',
        options: ({}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {

            }
        }),

        props: ({ownProps, allTeamsQuery:  {loading, error, allTeams, refetch}}) => ({
            loadingTeams: loading,
            teams: (error || loading || !allTeams || !allTeams.nodes
            ) ? [] :
                (() => {

                    console.log("ZZZZZZZZZZZZZZZZZ all teams");
                    console.log(allTeams.nodes);

                    return allTeams.nodes;

                })(),
            refetchTeams: () => {

                return refetch();
            },
        }),
        skip: ({active, isAdmin}) => !active ||  !isAdmin
    }),


    graphql(CreateUserMutation, {
        name: 'createUserMutation',

        props: ({ createUserMutation, ownProps: {classId, teamId} }) => ({
            addUser: (newUser) => {

                console.log("addUser: " );
                console.log(newUser);

                return createUserMutation({
                        variables: {
                            newUserInput: {
                                username: newUser.username,
                                firstName: newUser.firstName,
                                middleName: newUser.middleName,
                                lastName: newUser.lastName,
                                email: newUser.email,
                                password: newUser.password,
                                role: newUser.role,
                                institution: newUser.institution,
                                currentClassId: classId,
                                currentTeamId: teamId,

                            }
                        }
                    })
                    .then(({ data }) => {
                        return  data ;

                    }).catch((error) => {

                        console.log('there was an error sending the create mutation', error);

                    });
            }
        }),
    }),


    graphql(UpdateUserMutation, {
        name: 'updateUserMutation',

        props: ({ updateUserMutation }) => ({
            updateUser: (teamMemberId, patch) => {

                return updateUserMutation({
                    variables: {
                        updateProposalByIdInput: {
                            id: teamMemberId,
                            teamMemberPatch: patch
                        }
                    }
                })
                    .then(({ data }) => {


                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),
)(TeamMembersTable);



TeamMembersTableWithData.propTypes = TeamMembersTableWithDataPropTypes;


export default TeamMembersTableWithData;
