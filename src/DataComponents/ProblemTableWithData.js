import React, { Component } from 'react';

import ProblemTable from '../Components/ProblemTable.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';


import ReflectSchema from './ReflectSchema';


import Configuration from './Configuration';


import _ from 'lodash';


import PropTypes from 'prop-types';


const ProblemQuery = gql`
query problemsByUsersTeam($teamId:Int!, $tag:String!) {
  
  teamById(id:$teamId) {
    
    ...TeamMembers

    problemsByTeamId(condition:{tag:$tag}) {
        totalCount
        nodes {
          ...ProblemMembers
          userByUserId {
            ...UserMembers
          }
        }
    }
    
  }
}
${ReflectSchema.team}
${ReflectSchema.problem}
${ReflectSchema.user}
`;



const GetProblemQuery = gql`
query($id:Int!) {
 
  problemById(id:$id) { 
          ...ProblemMembers
          userByUserId {
            ...UserMembers
          }
  }
}
${ReflectSchema.problem}
${ReflectSchema.user}
`;

// const OLDProblemQuery = gql`
// query problemsByUsersTeam($userId:Int!, $tag:String!) {
//
//   userById(id:$userId) {
//
//     nodeId
//     id
//     username
//     firstName
//     middleName
//     lastName
//     fullName
//     currentTeam {
//       nodeId
//       id
//       problemsByTeamId(condition:{tag:$tag}) {
//         totalCount
//         nodes {
//           nodeId
//           id
//           title
//           description
//           userId
//           teamId
//           tag
//           userByUserId {
//             nodeId
//             id
//             fullName
//           }
//         }
//       }
//     }
//   }
// }
// `;





const CreateProblemMutation =  gql`
mutation createProblem($createProblemInput: CreateProblemInput!)
{

  createProblem(input: $createProblemInput) {
    problem {
      ...ProblemMembers
      userByUserId {
        ...UserMembers
      }
    }
  }
  
}
${ReflectSchema.problem}
${ReflectSchema.user}
`;


//
//{
//    "createTeamProblemInput": {
//    "teamProblem": {
//        "problem": "We will always be courteous.",
//            "teamId": 41
//    }
//}


const DeleteProblemMutation = gql`
mutation deleteProblemById($deleteProblemByIdInput: DeleteProblemByIdInput!) {
  deleteProblemById(input: $deleteProblemByIdInput) {

  	deletedProblemId

  }
}
`;

//{
//    "deleteTeamProblemByIdInput": {
//    "id": 17
//}
//}

const TouchProblemMutation = gql`
mutation($touchProblemByIdInput:TouchProblemByIdInput!) {
  touchProblemById(input: $touchProblemByIdInput) {   
  	problem {
      ...ProblemMembers
      userByUserId {
        ...UserMembers
      }
    }
  }
}
${ReflectSchema.problem}
${ReflectSchema.user}
`;


const UpdateProblemMutation = gql`
mutation updateProblemById($updateProblemByIdInput: UpdateProblemByIdInput!) {
  updateProblemById(input: $updateProblemByIdInput) {

  	problem {
      ...ProblemMembers
      userByUserId {
        ...UserMembers
      }
    }

  }
}
${ReflectSchema.problem}
${ReflectSchema.user}
`;


//{"updateTeamProblemByIdInput": {
//    "id": 112,
//        "teamProblemPatch": {
//        "problem": "I like this problem better"
//    }
//}
//}



const SelectProblemMutation = gql`

mutation updateTeamById($updateTeamByIdInput:UpdateTeamByIdInput!){

	updateTeamById(input:$updateTeamByIdInput) {
    team {
      ...TeamMembers
    }
  }
}
${ReflectSchema.team}
`;




const ProblemTableWithDataPropTypes = {


}


const ProblemTableWithData = compose (

    graphql(ProblemQuery, {
       name: 'problemQuery',

        options: ({teamId, tag}) => ({
            pollInterval: Configuration.pollIntervalMS,

            variables: {
                teamId: teamId,
                tag:tag,

            }
        }),

        props: ({ownProps, problemQuery:  {loading, teamById, error, refetch}}) => ({
            loading: loading,

            problem: (error || loading || !teamById || !teamById.problemsByTeamId ||
                !teamById.problemsByTeamId.nodes
            ) ? []
                :(() => {

                         return teamById.problemsByTeamId.nodes;
                     })()
            ,
            refetch: () => {

                return refetch();
            },
        }),
        skip:({active}) => !active,
    }),


    //
    // graphql(GetProblemQuery, {
    //     name: 'getProblemQuery',
    //
    //     options: ({id}) => ({
    //         variables: {
    //             id: id,
    //         }
    //     }),
    //
    //     props: ({ownProps, getProblemQuery:  {loading, problemById, error, refetch}}) => ({
    //         loading: loading,
    //
    //         problem: (error || loading || !problemById) ? [] :(() =>
    //         {
    //             return problemById;
    //         })()
    //         ,
    //         refetch: () => {
    //
    //             return refetch();
    //         },
    //     }),
    //     //skip:({active}) => !active,
    // }),

    graphql(CreateProblemMutation, {
        name: 'createProblemMutation',

        options:  ({teamId, tag}) => ({
            update: (proxy, { data: { createProblem } }) => {

                let query = {query: ProblemQuery,
                    variables: {
                        teamId: teamId,
                        tag:tag,
                    }};

                const data = proxy.readQuery(query);


                if(!_.has(createProblem, 'problem'))
                    return;

                if(!_.has(data, 'teamById.problemsByTeamId.nodes'))
                    return;

                data.teamById.problemsByTeamId.nodes.push(createProblem.problem);

                query.data = data;

                proxy.writeQuery(query);
            },
        }),

        props: ({ createProblemMutation, ownProps: {userId, teamId, tag} }) => ({
            addProblem: (title, description) => {

                return createProblemMutation({
                        variables: {
                            createProblemInput: {
                                problem: {
                                    userId: userId,
                                    teamId: teamId,
                                    tag: tag,
                                    title: title,
                                    description: description,


                                }
                            }
                        }
                    })
                    .then(({ data }) => {


                    }).catch((error) => {
                        console.log('there was an error sending the create mutation', error);

                    })
            }
        }),
    }),

    graphql(UpdateProblemMutation, {
        name: 'updateProblemMutation',

        props: ({ updateProblemMutation }) => ({
            updateProblem: (problemId, patchData) => {

                return updateProblemMutation({
                    variables: {
                        updateProblemByIdInput: {
                            id: problemId,
                            problemPatch: patchData
                        }
                    }
                })
                    .then(({ data }) => {

                        return data;

                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),

    graphql(TouchProblemMutation, {
        name: 'touchProblemMutation',

        props: ({ touchProblemMutation }) => ({
            touchProblem: (problemId) => {

                return touchProblemMutation({
                    variables: {
                        touchProblemByIdInput: {
                            id: problemId,
                        }
                    }
                })
                    .then(({ data }) => {

                        console.log("touch data is: ");
                        console.log(data);
                        return data;
                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),


    graphql(DeleteProblemMutation, {
        name: 'deleteProblemMutation',

        props: ({ deleteProblemMutation }) => ({
            deleteProblem: (problemId) => {

                return deleteProblemMutation({
                    variables: {
                        deleteProblemByIdInput: {
                            id: problemId
                        }
                    }
                })
                    .then(({ data }) => {


                    }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                    })
            }
        }),
    }),



    graphql(SelectProblemMutation, {
        name: 'selectProblemMutation',

        props: ({ selectProblemMutation }) => ({
            selectProblem: (teamId, problemId) => {

                return selectProblemMutation({
                    variables: {
                        updateTeamByIdInput: {
                            id: teamId,
                            teamPatch: {
                                selectedProblemId: problemId
                            }
                        }
                    }
                })
                    .then(({ data }) => {

                        console.log("Data returned on selectProblemMutation:");
                        console.log(data);

                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),


)(ProblemTable);



ProblemTableWithData.propTypes = ProblemTableWithDataPropTypes;


export default ProblemTableWithData;
