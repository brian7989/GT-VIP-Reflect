import React, { Component } from 'react';

import TeamStakeholdersWeightingProposalsTable from '../Components/TeamStakeholdersWeightingProposalsTable.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';

import ReflectSchema from './ReflectSchema';



import Configuration from './Configuration';


import _ from 'lodash';

const TeamByIdQuery = gql`
query teamById($teamId:Int!){  
  teamById(id:$teamId) {
            ...TeamMinimumMembers
            
            selectedSymphysisProposal: proposalBySelectedSymphysisProposalId {
                ...ProposalMembers
                stakeholderProposalsByProposalId {
                       
                    totalCount
                    nodes {
                        ...StakeholderProposalMembers
                    }
                }
            }
  }
}
${ReflectSchema.teamMinimum}
${ReflectSchema.proposal}
${ReflectSchema.stakeholderProposal}
`;




const OnlyProposalsQuery = gql`
query allProposals($teamId:Int!, $problemId:Int!, $step:String!){
  
    allProposals(condition:{teamId: $teamId, problemId:$problemId, step:$step}) {
      
      nodes {     
        ...ProposalMembers
        stakeholderProposalsByProposalId {
          totalCount
          nodes {
            ...StakeholderProposalMembers
          }
        }
        user: userByUserId {
            ...UserMembers
        }
    
      }
      
    }
}
${ReflectSchema.proposal}
${ReflectSchema.stakeholderProposal}
${ReflectSchema.user}
`;




const ActiveProposalsQuery = gql`
query proposalsByUsersTeam($userId:Int!, $step:String!) {
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step, isActive:true}) {
        totalCount
        nodes {
            ...StakeholderMembers
            stakeholderProposalsByStakeholderId(condition:{isOwner:true}) {
                totalCount
                nodes {
                    ...StakeholderProposalMembers
                    proposalByProposalId {

                       ...ProposalMembers
                        
                       stakeholderProposalsByProposalId {
                       
                            totalCount
                            nodes {
                                ...StakeholderProposalMembers
                            }
                       }
                    }
                }
            }
        }
      }

    }
  } 
}
${ReflectSchema.user}
${ReflectSchema.team}
${ReflectSchema.proposal}
${ReflectSchema.stakeholder}
${ReflectSchema.stakeholderProposal}
`;











const TeamStakeholdersQuery = gql`
query stakeholdersByUsersTeam($userId:Int!, $step:String!){

  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step, isActive:true}) {
        totalCount
        nodes {
          ...StakeholderMembers

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
      stakeholdersByTeamId(condition:{step:$step, isActive:true, excludeFromSymphysis:false}) {
        totalCount
        nodes {
          ...StakeholderMembers
          stakeholderProposalsByStakeholderId {
            totalCount
            nodes {
              ...StakeholderProposalMembers
            }
          }

        }
      }
    }
  }

}
${ReflectSchema.user}
${ReflectSchema.team}
${ReflectSchema.stakeholder}
${ReflectSchema.stakeholderProposal}
`;



// {
//     "userId": 374
// }







const CreateStakeholderProposalMutation = gql`
mutation createStakeholderProposal($createStakeholderProposalInput:CreateStakeholderProposalInput!)
{
  createStakeholderProposal(input:$createStakeholderProposalInput) {
    stakeholderProposal {
      ...StakeholderProposalMembers
      proposalByProposalId{
        ...ProposalMembers

      }
     
      stakeholderByStakeholderId {
        ...StakeholderMembers
      }
      
    }
    
  }
  
}
${ReflectSchema.stakeholder}
${ReflectSchema.proposal}
${ReflectSchema.stakeholderProposal}
`;


//INPUT
// {
//     "createStakeholderProposalInput": {
//     "stakeholderProposal": {
//         "proposalId": 7,
//             "stakeholderId": 26,
//             "weight": 2
//     }
// }
// }

//Example output:
// {
//     "data": {
//     "createStakeholderProposal": {
//         "stakeholderProposal": {
//             "nodeId": "WyJzdGFrZWhvbGRlcl9wcm9wb3NhbHMiLDcsMjZd",
//                 "weight": 2,
//                 "stakeholderId": 26,
//                 "proposalId": 7,
//                 "proposalByProposalId": {
//                 "nodeId": "WyJwcm9wb3NhbHMiLDdd",
//                     "id": 7,
//                     "proposalText": "THIS is my proposal!",
//                     "problemId": 2,
//                     "userId": 14
//             },
//             "stakeholderByStakeholderId": {
//                 "nodeId": "WyJzdGFrZWhvbGRlcnMiLDI2XQ==",
//                     "id": 26,
//                     "name": "Samwise Stakeholder",
//                     "power": 0
//             }
//         }
//     }
// }
// }



const UpdateStakeholderProposalMutation = gql`
mutation updateStakeholderProposalByIdAndStakeholderId($updateStakeholderProposalByProposalIdAndStakeholderIdInput:UpdateStakeholderProposalByProposalIdAndStakeholderIdInput!)
{
  updateStakeholderProposalByProposalIdAndStakeholderId(input:$updateStakeholderProposalByProposalIdAndStakeholderIdInput)
  {
    stakeholderProposal {
      ...StakeholderProposalMembers
    }
  }
}
${ReflectSchema.stakeholderProposal}
`;

//INPUT
// {
//     "updateStakeholderProposalByProposalIdAndStakeholderIdInput": {
//     "stakeholderId": 1,
//         "proposalId": 1,
//         "stakeholderProposalPatch": {
//         "weight": 1
//     }
// }
// }




const StakeholdersTableWithDataPropTypes = {

    userId: PropTypes.number.isRequired,
    problemId: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    stakeholderStep: PropTypes.string,
    active: PropTypes.bool.isRequired,
}


const TeamStakeholdersWeightingProposalsTableWithData = compose (



    graphql(OnlyProposalsQuery, {
        name: 'allProposals',
        options: ({teamId, problemId, step}) => ({
            pollInterval: Configuration.pollIntervalMS,

            variables: {
                teamId: teamId,
                problemId: problemId,
                step: step,
            }

        }),
        props: ({ownProps, allProposals:  {loading, allProposals, refetch}}) => ({
            loadingProposals: loading,
            proposals: (() => {


                console.log("proposals from OnlyProposalsQuery (symphysis) with step: " + ownProps.step);

                if(loading) {

                    console.log("Loading sorry");

                    return null;
                }

                // console.log("THE NODES AREW");
                // console.log(allProposals);

                if(_.has(allProposals, "nodes")) {

                    console.log("proposals (symphysis)");
                    console.log(allProposals.nodes);

                    let proposals = allProposals.nodes.reduce(
                        (accumProposals, proposal) => {

                            let stakeholderWeightsBundle = proposal.stakeholderProposalsByProposalId.nodes.reduce((stakeholderWeights, insideStakeholderProposal) => {

                                stakeholderWeights['stakeholder-' + insideStakeholderProposal.stakeholderId.toString()] = insideStakeholderProposal.weight;

                                return stakeholderWeights;

                            }, {});


                            let p = Object.assign({}, proposal);
                            Object.assign(p, stakeholderWeightsBundle);

                            accumProposals.push(p);

                            return accumProposals;
                        }, []

                    );

                    console.log("proposals mod (symphysis)");
                    console.log(proposals);

                    return proposals.slice(0,1);
                }
                else
                    return null;


            })(),
            refetchProposals: () => {

                console.log("refetching is here");

                return refetch();
            },
        }),
        skip:({active, symphysisModeEnabled}) => (!active || !symphysisModeEnabled),
    }),




    graphql(ActiveProposalsQuery, {
        name: 'proposalsQuery',
        options: ({userId, step}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {
                userId: userId,
                step: step
            } //{stakeholderId: stakeholderId}
        }),

        props: ({ownProps, proposalsQuery:  {loading, error, userById, refetch}}) => ({
            loadingProposals: loading,
            proposals:  (error || loading || !userById || !userById.currentTeam
                || !userById.currentTeam.stakeholdersByTeamId || !userById.currentTeam.stakeholdersByTeamId.nodes

            ) ? []
                : (() => {

                    //console.log("PROPOSALS");

                    //console.log(ownProps);

                    let stakeholdersByTeamId = userById.currentTeam.stakeholdersByTeamId.nodes;


                    let stakeholdersFlattenedAway = stakeholdersByTeamId.reduce((stakeholders, stakeholder) => {


                        if(stakeholder.stakeholderProposalsByStakeholderId && stakeholder.stakeholderProposalsByStakeholderId.nodes)
                        {
                            let flattenedToOwnerProposal = stakeholder.stakeholderProposalsByStakeholderId.nodes.reduce((stakeholderProposalsFlattenedOut, stakeholderProposal) => {


                                if(stakeholderProposal.proposalByProposalId)
                                {

                                    let proposal = stakeholderProposal.proposalByProposalId;



                                    //only use proposal if marked active
                                    if(proposal.isActive) {

                                        let flattenedProposal = {};

                                        flattenedProposal = Object.assign(flattenedProposal, proposal);


                                        if (proposal.stakeholderProposalsByProposalId && proposal.stakeholderProposalsByProposalId.nodes) {

                                            let stakeholderWeightsBundle = proposal.stakeholderProposalsByProposalId.nodes.reduce((stakeholderWeights, insideStakeholderProposal) => {

                                                stakeholderWeights['stakeholder-' + insideStakeholderProposal.stakeholderId.toString()] = insideStakeholderProposal.weight;

                                                return stakeholderWeights;

                                            }, {});


                                            flattenedProposal = Object.assign(flattenedProposal, stakeholderWeightsBundle);
                                        }

                                        stakeholderProposalsFlattenedOut.push(flattenedProposal);

                                    }


                                    //console.log("flattenedProposal");
                                    //console.log(flattenedProposal);



                                }

                                return stakeholderProposalsFlattenedOut;
                            }, []);

                            //console.log("flattenedToOwnerProposal");
                            //console.log(flattenedToOwnerProposal);


                            stakeholders = stakeholders.concat(flattenedToOwnerProposal);
                        }

                        //console.log("stakeholders partial update");
                        //console.log(stakeholders);

                        return stakeholders;

                    }, []);


                    console.log("flattened stakeholders");
                    console.log(stakeholdersFlattenedAway);


                    return stakeholdersFlattenedAway;
                })(),
            refetchProposals: () => {

                return refetch();
            },
        }),
        skip:({active, symphysisModeEnabled}) => (!active || symphysisModeEnabled),
    }),


    graphql(TeamStakeholdersQuery, {
        name: 'stakeholdersQuery',
        options: ({userId, step, stakeholderStep}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {
                userId: userId,
                step: !_.isNil(stakeholderStep) ? stakeholderStep : step
            }
        }),

        props: ({ownProps, stakeholdersQuery:  {loading, error, userById, refetch}}) => ({
            loadingStakeholders: loading,

            stakeholders: (error || loading || !userById || !userById.currentTeam
                || !userById.currentTeam.stakeholdersByTeamId || !userById.currentTeam.stakeholdersByTeamId.nodes
                ) ? []
                : (() => {

                    let _step = !_.isNil(ownProps.stakeholderStep) ? ownProps.stakeholderStep : ownProps.step;
                    console.log("stakeholders from TeamStakeholdersQuery with step: " + _step);

                    let stakeholders = userById.currentTeam.stakeholdersByTeamId.nodes;

                    return stakeholders;

                })(),
            refetchStakeholders: () => {

                return refetch();
            },
        }),
        skip:({active, symphysisModeEnabled}) => !active || symphysisModeEnabled ,

    }),


    graphql(TeamSymphysisStakeholdersQuery, {
        name: 'stakeholdersQuery',
        options: ({userId, step, stakeholderStep}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {
                userId: userId,
                step: !_.isNil(stakeholderStep) ? stakeholderStep : step
            }
        }),

        props: ({ownProps, stakeholdersQuery:  {loading, error, userById, refetch}}) => ({
            loadingStakeholders: loading,

            stakeholders: (error || loading || !userById || !userById.currentTeam
                || !userById.currentTeam.stakeholdersByTeamId || !userById.currentTeam.stakeholdersByTeamId.nodes
            ) ? []
                : (() => {

                    let _step = !_.isNil(ownProps.stakeholderStep) ? ownProps.stakeholderStep : ownProps.step;
                    console.log("stakeholders from TeamSymphysisStakeholdersQuery (symphysis) with step: " + _step);

                    let stakeholders = userById.currentTeam.stakeholdersByTeamId.nodes;

                    let retVal = stakeholders.reduce((result, d) => {


                        if (d.stakeholderProposalsByStakeholderId && d.stakeholderProposalsByStakeholderId.nodes) {
                            let pkg = d.stakeholderProposalsByStakeholderId.nodes.reduce((result, d) => {

                                result['proposal-' + d.proposalId.toString()] = d.weight;

                                return result;
                            }, {});

                            d = Object.assign({}, d, pkg);
                        }


                        result.push(d);

                        return result;

                    }, []);

                    return retVal;

                })(),
            refetchStakeholders: () => {

                return refetch();
            },
        }),
        skip:({active, symphysisModeEnabled}) => !active || !symphysisModeEnabled,

    }),


    graphql(CreateStakeholderProposalMutation, {
        name: 'createStakeholderProposalMutation',

        options:  ({userId, teamId, step, problemId, stakeholderStep, symphysisModeEnabled}) => ({
            update: (proxy, { data: { createStakeholderProposal } }) => {

                if(symphysisModeEnabled) {



                    let query = {
                        query: OnlyProposalsQuery,
                        variables: {
                            teamId: teamId,
                            problemId: problemId,
                            step: step,
                        }
                    };


                    if (!_.has(createStakeholderProposal, 'stakeholderProposal.proposalId'))
                        return;

                    if (!_.has(createStakeholderProposal, 'stakeholderProposal.stakeholderId'))
                        return;

                    const stakeholderId = createStakeholderProposal.stakeholderProposal.stakeholderId;
                    const proposalId = createStakeholderProposal.stakeholderProposal.proposalId;

                    const data = proxy.readQuery(query);


                    if (!_.has(data, 'allProposals.nodes')) {
                        //console.log("no allProposals nodes");
                        return;
                    }

                    const proposal = data.allProposals.nodes.find(
                        (d) => {
                            return d.id === proposalId;
                        }

                    );

                    if(!proposal) {
                        //console.log("proposal not found");
                        return;
                    }


                    if(!_.has(proposal, 'stakeholderProposalsByProposalId.nodes')) {
                        //console.log("no stakeholderProposalsByProposalId.nodes");
                        return;
                    }



                    const dupeSP = proposal.stakeholderProposalsByProposalId.nodes.find(
                        (d) => {

                            return (d.proposalId === proposalId && d.stakeholderId === stakeholderId)

                        });

                    if(dupeSP)
                    {
                        return;
                    }


                    proposal.stakeholderProposalsByProposalId.nodes.push(createStakeholderProposal.stakeholderProposal);


                    query.data = data;

                    proxy.writeQuery(query);






                    //console.log("updating OnlyProposalsQuery (sym) with " + teamId + " " + problemId + " " + step);

                //
                //
                //     if (!_.has(createStakeholderProposal, 'stakeholderProposal.proposalId'))
                //         return;
                //
                //     if (!_.has(createStakeholderProposal, 'stakeholderProposal.stakeholderId'))
                //         return;
                //
                //     const stakeholderId = createStakeholderProposal.stakeholderProposal.stakeholderId;
                //     const proposalId = createStakeholderProposal.stakeholderProposal.proposalId;
                //
                //     const data = proxy.readQuery(query);
                //
                //
                //     if (!_.has(data, 'allProposals.allProposals.nodes'))
                //         return;
                //
                //
                //     const dupeSP = data.allProposals.allProposals.nodes.find(
                //         (d) => {
                //
                //             return (d.proposalId === proposalId && d.stakeholderId === stakeholderId)
                //
                //         });
                //
                //     if(dupeSP)
                //         return; //TODO could consider updating the weight of the existing prop, but this is such a weird possibility not sure what to do....
                //
                //
                //     data.allProposals.allProposals.nodes.push(createStakeholderProposal.stakeholderProposal);
                //
                //
                //     query.data = data;
                //
                //     proxy.writeQuery(query);
                //
                //
                // }
                // else {
                //
                //     let query = {
                //         query: ActiveProposalsQuery,
                //         variables: {
                //             userId: userId,
                //             step: step,
                //         }
                //     };
                //
                //
                //     if (!_.has(createStakeholderProposal, 'stakeholderProposal.proposalId'))
                //         return;
                //
                //     //const stakeholderId = createStakeholderProposal.stakeholderProposal.stakeholderId;
                //     const proposalId = createStakeholderProposal.stakeholderProposal.proposalId;
                //
                //     const data = proxy.readQuery(query);
                //
                //
                //     if (!_.has(data, 'userById.currentTeam.stakeholdersByTeamId.nodes'))
                //         return;
                //
                //
                //     const stakeholder = data.userById.currentTeam.stakeholdersByTeamId.nodes.find(
                //         (d) => {
                //
                //             if (!_.has(d, 'stakeholderProposalsByStakeholderId.nodes'))
                //                 return false;
                //
                //             let spIndex = d.stakeholderProposalsByStakeholderId.nodes.findIndex(
                //                 (dd) => {
                //                     return dd.proposalId === proposalId;
                //                 }
                //             );
                //
                //             return spIndex !== -1
                //         });
                //
                //     if (stakeholder) {
                //
                //         if (!_.has(stakeholder, 'stakeholderProposalsByStakeholderId.nodes'))
                //             return;
                //
                //         let sp = stakeholder.stakeholderProposalsByStakeholderId.nodes.find(
                //             (dd) => {
                //                 return dd.proposalId === proposalId;
                //             }
                //         );
                //
                //         if (!_.has(sp, 'proposalByProposalId.stakeholderProposalsByProposalId.nodes'))
                //             return;
                //
                //         sp.proposalByProposalId.stakeholderProposalsByProposalId.nodes.push(createStakeholderProposal.stakeholderProposal);
                //     }
                //
                //     query.data = data;
                //
                //     proxy.writeQuery(query);

                }
            },
        }),

        props: ({ createStakeholderProposalMutation, ownProps: {userId, problemId} }) => ({
            addStakeholderProposal: (stakeholderId, proposalId, weight) => {


                let stakeholderProposal = {
                    proposalId: proposalId,
                    stakeholderId: stakeholderId,
                    weight: weight
                }

                return createStakeholderProposalMutation({
                    variables: {
                        createStakeholderProposalInput: {
                            stakeholderProposal: stakeholderProposal
                        }
                    }
                })
                    .then(({ data }) => {

                        // console.log("addStakeholderProposal() result in then: ");
                        // console.log(data);

                        return data;

                    }).catch((error) => {

                        console.log('there was an error sending the create mutation', error);

                    });
            }
        }),
    }),



    graphql(UpdateStakeholderProposalMutation, {
        name: 'updateStakeholderProposalMutation',


        options:  ({userId, teamId, problemId, step, symphysisModeEnabled}) => ({

            update: (proxy, { data: { updateStakeholderProposalByProposalIdAndStakeholderId } }) => {

                if(symphysisModeEnabled) {


                    //console.log("updating OnlyProposalsQuery (sym) with " + teamId + " " + problemId + " " + step);


                    let query = {
                        query: OnlyProposalsQuery,
                        variables: {
                            teamId: teamId,
                            problemId: problemId,
                            step: step,
                        }
                    };


                    if (!_.has(updateStakeholderProposalByProposalIdAndStakeholderId, 'stakeholderProposal.proposalId'))
                        return;

                    if (!_.has(updateStakeholderProposalByProposalIdAndStakeholderId, 'stakeholderProposal.stakeholderId'))
                        return;

                    const stakeholderId = updateStakeholderProposalByProposalIdAndStakeholderId.stakeholderProposal.stakeholderId;
                    const proposalId = updateStakeholderProposalByProposalIdAndStakeholderId.stakeholderProposal.proposalId;

                    const data = proxy.readQuery(query);


                    if (!_.has(data, 'allProposals.nodes')) {
                        //console.log("no allProposals nodes");
                        return;
                    }

                    const proposal = data.allProposals.nodes.find(
                        (d) => {
                            return d.id === proposalId;
                        }

                    );

                    if(!proposal) {
                        //console.log("proposal not found");
                        return;
                    }


                    if(!_.has(proposal, 'stakeholderProposalsByProposalId.nodes')) {
                        //console.log("no stakeholderProposalsByProposalId.nodes");
                        return;
                    }



                    const dupeSP = proposal.stakeholderProposalsByProposalId.nodes.find(
                        (d) => {

                            return (d.proposalId === proposalId && d.stakeholderId === stakeholderId)

                        });

                    if(dupeSP)
                    {

                        //console.log("dupe was found");
                        dupeSP.weight = updateStakeholderProposalByProposalIdAndStakeholderId.stakeholderProposal.weight;
                    }


                    //data.teamById.selectedSymphysisProposal.stakeholderProposalsByProposalId.nodes.push(createStakeholderProposal.stakeholderProposal);


                    query.data = data;

                    proxy.writeQuery(query);



                }
                else {

                    let query = {
                        query: ActiveProposalsQuery,
                        variables: {
                            userId: userId,
                            step: step,
                        }
                    };

                    if (!_.has(updateStakeholderProposalByProposalIdAndStakeholderId, 'stakeholderProposal.proposalId'))
                        return;

                    if (!_.has(updateStakeholderProposalByProposalIdAndStakeholderId, 'stakeholderProposal.stakeholderId'))
                        return;


                    const stakeholderId = updateStakeholderProposalByProposalIdAndStakeholderId.stakeholderProposal.stakeholderId;
                    const proposalId = updateStakeholderProposalByProposalIdAndStakeholderId.stakeholderProposal.proposalId;

                    const data = proxy.readQuery(query);


                    if (!_.has(data, 'userById.currentTeam.stakeholdersByTeamId.nodes'))
                        return;


                    const stakeholder = data.userById.currentTeam.stakeholdersByTeamId.nodes.find(
                        (d) => {

                            if (!_.has(d, 'stakeholderProposalsByStakeholderId.nodes'))
                                return false;

                            let spIndex = d.stakeholderProposalsByStakeholderId.nodes.findIndex(
                                (dd) => {
                                    return dd.proposalId === proposalId;
                                }
                            );

                            return spIndex !== -1
                        });

                    if (stakeholder) {

                        if (!_.has(stakeholder, 'stakeholderProposalsByStakeholderId.nodes'))
                            return;

                        let sp = stakeholder.stakeholderProposalsByStakeholderId.nodes.find(
                            (dd) => {
                                return dd.proposalId === proposalId;
                            }
                        );

                        if (!_.has(sp, 'proposalByProposalId.stakeholderProposalsByProposalId.nodes'))
                            return;

                        const dupeSP = sp.proposalByProposalId.stakeholderProposalsByProposalId.nodes.find(
                            (d) => {

                                return (d.proposalId === proposalId && d.stakeholderId === stakeholderId)

                            });

                        if(dupeSP)
                        {

                            dupeSP.weight = updateStakeholderProposalByProposalIdAndStakeholderId.stakeholderProposal.weight;
                        }



                        //sp.proposalByProposalId.stakeholderProposalsByProposalId.nodes.push(updateStakeholderProposalByProposalIdAndStakeholderId.stakeholderProposal);
                    }

                    query.data = data;

                    proxy.writeQuery(query);

                }
            },



        }),



        props: ({ updateStakeholderProposalMutation }) => ({
            updateStakeholderProposal: (stakeholderId, proposalId, weight) => {

                return updateStakeholderProposalMutation({
                    variables: {
                        updateStakeholderProposalByProposalIdAndStakeholderIdInput: {
                            proposalId: proposalId,
                            stakeholderId: stakeholderId,
                            stakeholderProposalPatch: {
                                weight: weight,
                            }
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


)(TeamStakeholdersWeightingProposalsTable);



TeamStakeholdersWeightingProposalsTableWithData.propTypes = StakeholdersTableWithDataPropTypes;


export default TeamStakeholdersWeightingProposalsTableWithData;
