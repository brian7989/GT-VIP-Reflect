import React, {Component} from 'react';

import StakeholdersTable from '../Components/StakeholdersTable.js';

import {gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose} from 'react-apollo';

import PropTypes from 'prop-types';

import ReflectSchema from './ReflectSchema';


import Configuration from './Configuration';

import _ from 'lodash';


const StakeholdersQuery = gql`
query stakeholdersByUserId($userId:Int!, $step:String!) {
  userById(id:$userId) {
    ...UserMembers
    stakeholdersByUserId(condition:{step:$step}) {
      totalCount
      nodes {
        ...StakeholderMembers
        user: userByUserId {
           ...UserMembers
        }
      }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
`;

//
// {
//     "userId": 374
// }


const TeamStakeholdersQuery = gql`
query stakeholdersByUsersTeam($userId:Int!, $step:String!){
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step}) {
        totalCount
        nodes {
          ...StakeholderMembers       
          user: userByUserId {
            ...UserMembers
          }
        }
      }
    }
  }
  
}
${ReflectSchema.user}
${ReflectSchema.team}
${ReflectSchema.stakeholder}
`;





const TeamSymphysisStakeholdersQuery = gql`
query stakeholdersByUsersTeam($userId:Int!, $step:String!){
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step, isActive:true}) {
        totalCount
        nodes {
          ...StakeholderMembers       
          user: userByUserId {
            ...UserMembers
          }
        }
      }
    }
  }
  
}
${ReflectSchema.user}
${ReflectSchema.team}
${ReflectSchema.stakeholder}
`;



const TeamSymphysisSelectedStakeholdersQuery = gql`
query stakeholdersByUsersTeam($userId:Int!, $step:String!){
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step, isActive:true, excludeFromSymphysis:false}) {
        totalCount
        nodes {
          ...StakeholderMembers       
          user: userByUserId {
            ...UserMembers
          }
        }
      }
    }
  }
  
}
${ReflectSchema.user}
${ReflectSchema.team}
${ReflectSchema.stakeholder}
`;




// {
//     "userId": 374
// }


const CreateStakeholderMutation = gql`
mutation createStakeholder($createStakeholderInput:CreateStakeholderInput!)
{
  createStakeholder(input:$createStakeholderInput) {
    stakeholder {
        ...StakeholderMembers
        user: userByUserId {
           ...UserMembers
        }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
`;
//INPUT
// {
//     "createStakeholderInput": {
//     "stakeholder": {
//         "name": "bob",
//             "power": 1,
//             "userId": 374
//
//     }
// }
// }

//A result:
// {
//     "data": {
//     "createStakeholder": {
//         "stakeholder": {
//             "nodeId": "WyJzdGFrZWhvbGRlcnMiLDEyXQ==",
//                 "id": 12,
//                 "name": "bob",
//                 "isActive": true,
//                 "power": 1,
//                 "problemId": null,
//                 "userId": 374
//         }
//     }
// }
// }

const DeleteStakeholderMutation = gql`
mutation deleteStakeholderById($deleteStakeholderByIdInput:DeleteStakeholderByIdInput!)
{
  deleteStakeholderById(input:$deleteStakeholderByIdInput) {

    deletedStakeholderId

  }
}
`;

// {
//     "deleteStakeholderByIdInput": {
//     "id": 12
// }
// }

const UpdateStakeholderMutation = gql`
mutation updateStakeholderById($updateStakeholderByIdInput:UpdateStakeholderByIdInput!)
{
  updateStakeholderById(input:$updateStakeholderByIdInput) {

    stakeholder {
        ...StakeholderMembers
        user: userByUserId {
           ...UserMembers
        }
    }

  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
`;

// {
//     "updateStakeholderByIdInput": {
//     "id": 20,
//         "stakeholderPatch": {
//         "name": "more name"
//     }
// }
// }


const StakeholdersTableWithDataPropTypes = {

    userId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,
    problemId: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    useTeamStakeholderQuery: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
}


const StakeholdersTableWithData = compose(
    graphql(StakeholdersQuery, {
        name: 'stakeholdersQuery',
        options: ({userId, step}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId: userId, step: step}
        }),

        props: ({ownProps, stakeholdersQuery: {loading, error, userById, refetch}}) => ({
            loading: loading,
            // getStakeholders: () => {
            //     if(userById && userById.stakeholdersByUserId && userById.stakeholdersByUserId.nodes)
            //         return userById.stakeholdersByUserId.nodes;
            //     else
            //         return [];
            // },
            stakeholders: (error || loading || !userById || !userById.stakeholdersByUserId || !userById.stakeholdersByUserId.nodes) ? []
                : userById.stakeholdersByUserId.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, useTeamStakeholderQuery}) => !active || useTeamStakeholderQuery,
    }),

    graphql(TeamStakeholdersQuery, {
        name: 'teamStakeholdersQuery',
        options: ({userId, step}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId: userId, step: step}
        }),

        props: ({ownProps, teamStakeholdersQuery: {loading, error, userById, refetch}}) => ({
            loading: loading,

            stakeholders: (error || loading || !userById || !userById.currentTeam || !userById.currentTeam.stakeholdersByTeamId || !userById.currentTeam.stakeholdersByTeamId.nodes) ? []
                : userById.currentTeam.stakeholdersByTeamId.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, useTeamStakeholderQuery, symphysisModeEnabled}) => !active || !useTeamStakeholderQuery || symphysisModeEnabled,
    }),


    graphql(TeamSymphysisStakeholdersQuery, {
        name: 'teamStakeholdersQuery',
        options: ({userId, step}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId: userId, step: step}
        }),

        props: ({ownProps, teamStakeholdersQuery: {loading, error, userById, refetch}}) => ({
            loading: loading,

            stakeholders: (error || loading || !userById || !userById.currentTeam || !userById.currentTeam.stakeholdersByTeamId || !userById.currentTeam.stakeholdersByTeamId.nodes) ? []
                : (() => {
                    console.log("YYYYYYYYYYYYYYYYY Using this one");
                    return userById.currentTeam.stakeholdersByTeamId.nodes;
                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, useTeamStakeholderQuery, symphysisModeEnabled, selectedSymphysisStakeholdersOnly}) => !active || !useTeamStakeholderQuery || !symphysisModeEnabled || selectedSymphysisStakeholdersOnly ,
    }),


    graphql(TeamSymphysisSelectedStakeholdersQuery, {
        name: 'teamStakeholdersQuery',
        options: ({userId, step}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId: userId, step: step}
        }),

        props: ({ownProps, teamStakeholdersQuery: {loading, error, userById, refetch}}) => ({
            loading: loading,

            stakeholders: (error || loading || !userById || !userById.currentTeam || !userById.currentTeam.stakeholdersByTeamId || !userById.currentTeam.stakeholdersByTeamId.nodes) ? []
                : (() => {
                    console.log("QQQQQQQQQQQQQQQ Using this one");
                    return userById.currentTeam.stakeholdersByTeamId.nodes;
                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, useTeamStakeholderQuery, symphysisModeEnabled, selectedSymphysisStakeholdersOnly}) => !active || !useTeamStakeholderQuery || !symphysisModeEnabled || !selectedSymphysisStakeholdersOnly,
    }),


    graphql(CreateStakeholderMutation, {
        name: 'createStakeholderMutation',

        options: ({userId, step, useTeamStakeholderQuery, symphysisModeEnabled}) => ({
            update: (proxy, {data: {createStakeholder}}) => {

                let query = useTeamStakeholderQuery ? TeamStakeholdersQuery : StakeholdersQuery;

                if(query === TeamStakeholdersQuery && symphysisModeEnabled)
                    query = TeamSymphysisStakeholdersQuery;

                const data = proxy.readQuery(
                    {
                        query: query,
                        variables: {
                            userId: userId,
                            step: step
                        }
                    });


                if(!_.has(createStakeholder, 'stakeholder'))
                    return;



                if (useTeamStakeholderQuery) {

                    //Should work for symphysis mode or not, as only a filter is changed

                    if(!_.has(data, 'userById.currentTeam.stakeholdersByTeamId.nodes'))
                        return;

                    data.userById.currentTeam.stakeholdersByTeamId.nodes.push(createStakeholder.stakeholder);
                }
                else {

                    if(!_.has(data, 'userById.stakeholdersByUserId.nodes'))
                        return;

                    data.userById.stakeholdersByUserId.nodes.push(createStakeholder.stakeholder);
                }

                proxy.writeQuery(
                    {
                        query: query,
                        variables: {
                            userId: userId,
                            step: step
                        },
                        data: data,
                    });
            },
        }),

        props: ({createStakeholderMutation, ownProps: {userId, teamId, problemId, step}}) => ({
            addStakeholder: (stakeholder) => {

                delete stakeholder.id; //server will generate

                stakeholder.userId = userId;
                stakeholder.teamId = teamId;
                stakeholder.problemId = problemId;
                stakeholder.step = step;
                stakeholder.isActive = true;

                let power = parseInt(stakeholder.power);
                stakeholder.power = power;


                return createStakeholderMutation({
                    variables: {
                        createStakeholderInput: {
                            stakeholder: stakeholder
                        }
                    }
                })
                    .then(({data}) => {


                    }).catch((error) => {
                        console.log('there was an error sending the create mutation', error);

                    })
            }
        }),
    }),

    graphql(UpdateStakeholderMutation, {
        name: 'updateStakeholderMutation',

        props: ({updateStakeholderMutation}) => ({
            updateStakeholder: (stakeholderId, patch) => {

                return (() => {

                    //console.log("will update: " + stakeholderId);
                    //console.log("patch:");
                    //console.log(patch);

                    return updateStakeholderMutation({
                        variables: {
                            updateStakeholderByIdInput: {
                                id: stakeholderId,
                                stakeholderPatch: patch
                            }
                        }
                    });
                })()
                    .then(({data}) => {

                        //console.log("got this back: ");
                        //console.log(data);

                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),


    graphql(DeleteStakeholderMutation, {
        name: 'deleteStakeholderMutation',

        props: ({deleteStakeholderMutation}) => ({
            deleteStakeholder: (stakeholderId) => {

                return deleteStakeholderMutation({
                    variables: {
                        deleteStakeholderByIdInput: {
                            id: stakeholderId
                        }
                    }
                })
                    .then(({data}) => {

                    }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                    })
            }
        }),
    })
)(StakeholdersTable);


StakeholdersTableWithData.propTypes = StakeholdersTableWithDataPropTypes;


export default StakeholdersTableWithData;