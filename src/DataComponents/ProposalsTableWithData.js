import React, { Component } from 'react';

import ProposalsTable from '../Components/ProposalsTable.js';


import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';

import ReflectSchema from './ReflectSchema';


import Configuration from './Configuration';

import _ from 'lodash';
import TeamTabPanel from "../Components/TeamTabPanel";


const StakeholderProposalQuery = gql`
query stakeholderProposalByStakeholderId($stakeholderId:Int!)
{
  stakeholderById(id:$stakeholderId) {
    ...StakeholderMembers
    stakeholderProposalsByStakeholderId(condition:{isOwner:true}) {
      totalCount
      nodes {
        ...StakeholderProposalMembers
        proposalByProposalId {
          ...ProposalMembers
          user: userByUserId {
            ...UserMembers
          }
          knowledgeReference : knowledgeReferencesByProposalId {
            nodes { 
                ...KnowledgeReferenceMembers
             }
          }
        }       
      }
    }
    
  }

}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
${ReflectSchema.stakeholderProposal}
${ReflectSchema.proposal}
${ReflectSchema.knowledgeReference}
`;

//INPUT
// {
//     "stakeholderId": 32
// }





//
// const ProposalsQuery = gql`
// query proposalsByStakeholderId($stakeholderId:Int!) {
//   stakeholderById(id:$stakeholderId) {
//     ...StakeholderMembers
//     proposalsByStakeholderId {
//       totalCount
//       nodes {
//         ...ProposalMembers
//         user: userByUserId {
//            ...UserMembers
//         }
//       }
//     }
//   }
// }
// ${ReflectSchema.stakeholder}
// ${ReflectSchema.proposal}
// `;



const OnlyProposalsQuery = gql`
query allProposals($teamId:Int!, $problemId:Int!, $step:String!){
  
    allProposals(condition:{teamId: $teamId, problemId:$problemId, step:$step}) {
      
      nodes {     
        ...ProposalMembers
        user: userByUserId {
            ...UserMembers
        }
    
      }
      
    }
}
${ReflectSchema.proposal}
${ReflectSchema.user}
`;

// {
//     "teamId": 2,
//     "problemId": 1,
//     "step": "team"
// }




const CreateStakeholderProposalMutation = gql`
mutation createStakeholderProposal($createStakeholderProposalInput:CreateStakeholderProposalInput!)
{
  createStakeholderProposal(input:$createStakeholderProposalInput) {
    stakeholderProposal {
      ...StakeholderProposalMembers
      proposalByProposalId{
        ...ProposalMembers
        user: userByUserId {
          ...UserMembers
        }
      }
      stakeholderByStakeholderId {
        ...StakeholderMembers
      }
      
    }
    
  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
${ReflectSchema.stakeholderProposal}
${ReflectSchema.proposal}
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





const CreateProposalMutation =  gql`
mutation createProposal($createProposalInput:CreateProposalInput!)
{
  createProposal(input:$createProposalInput) {
    proposal {
      ...ProposalMembers  
      user: userByUserId {
        ...UserMembers
      }
    }   
  } 
}
${ReflectSchema.user}
${ReflectSchema.proposal}
`;
//INPUT
// {
//     "createProposalInput": {
//     "proposal": {
//         "userId": 14,
//             "problemId": 2,
//             "proposalText": "THIS is my proposal!",
//             "ranking": 1,
//             "weight": 2
//     }
// }
// }

//A result:
// {
//     "data": {
//     "createProposal": {
//         "proposal": {
//             "nodeId": "WyJwcm9wb3NhbHMiLDdd",
//                 "id": 7,
//                 "userId": 14,
//                 "problemId": 2,
//                 "proposalText": "THIS is my proposal!",
//                 "ranking": 1,
//                 "weight": 2,
//                 "isActive": true,
//                 "hasComponents": false
//         }
//     }
// }
// }


const DeleteStakeholderProposalMutation = gql`
mutation deleteStakeholderProposalByProposalIdAndStakeholderId($deleteStakeholderProposalByProposalIdAndStakeholderIdInput:DeleteStakeholderProposalByProposalIdAndStakeholderIdInput!)
{
  deleteStakeholderProposalByProposalIdAndStakeholderId(input:$deleteStakeholderProposalByProposalIdAndStakeholderIdInput)
  {
    deletedStakeholderProposalId
  }
}
`;

//INPUT
// {
//     "deleteStakeholderProposalByProposalIdAndStakeholderIdInput": {
//     "proposalId": 1,
//         "stakeholderId": 1
// }
//
// }



const DeleteProposalMutation = gql`
mutation deleteProposalById($deleteProposalByIdInput:DeleteProposalByIdInput!)
{
  deleteProposalById(input:$deleteProposalByIdInput) {

    deletedProposalId

  }
}
`;

// {
//     "deleteProposalByIdInput": {
//     "id": 12
// }
// }




const UpdateStakeholderProposalMutation = gql`
mutation updateStakeholderProposalByIdAndStakeholderId($updateStakeholderProposalByProposalIdAndStakeholderIdInput:UpdateStakeholderProposalByProposalIdAndStakeholderIdInput!)
{
  updateStakeholderProposalByProposalIdAndStakeholderId(input:$updateStakeholderProposalByProposalIdAndStakeholderIdInput)
  {
    stakeholderProposal {
      ...StakeholderProposalMembers
      user: userByUserId {
         ...UserMembers
      }
    }
  }
}
${ReflectSchema.user}
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


const UpdateProposalMutation = gql`
mutation updateProposalById($updateProposalByIdInput:UpdateProposalByIdInput!)
{
  updateProposalById(input:$updateProposalByIdInput) {
    proposal {
      ...ProposalMembers
      user: userByUserId {
         ...UserMembers
       }
    }

  }
}
${ReflectSchema.user}
${ReflectSchema.proposal}
`;

// {
//     "updateProposalByIdInput": {
//     "id": 20,
//         "proposalPatch": {
//         "name": "more name"
//     }
// }
// }





const TeamByIdQuery = gql`
query teamById($teamId:Int!){  
  teamById(id:$teamId) {
    ...TeamMembers   
  }
}
${ReflectSchema.team}
`;


const SelectSymphysisProposalMutation = gql`

mutation updateTeamById($updateTeamByIdInput:UpdateTeamByIdInput!){

	updateTeamById(input:$updateTeamByIdInput) {
    team {
      ...TeamMembers
    }
  }
}
${ReflectSchema.team}
`;




const CreateKnowledgeReferenceMutation =  gql`
mutation createKnowledgeReference($createKnowledgeReferenceInput:CreateKnowledgeReferenceInput!)
{
  createKnowledgeReference(input:$createKnowledgeReferenceInput) {
    knowledgeReference {
      docUrl
      userId
    }
  }
}
`;





const ProposalsTableWithDataPropTypes = {



    userId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,
    problemId: PropTypes.number.isRequired,
    stakeholderId: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    proposalType: PropTypes.string.isRequired,
    active:PropTypes.bool.isRequired,
}


const ProposalsTableWithData = compose (

    graphql(StakeholderProposalQuery, {
        name: 'stakeholderProposalsQuery',
        options: ({stakeholderId}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {stakeholderId: stakeholderId}
        }),

        props: ({ownProps, stakeholderProposalsQuery:  {loading, error, stakeholderById, refetch}}) => ({
            loading: loading,
            proposals: (error || loading || !stakeholderById || !stakeholderById.stakeholderProposalsByStakeholderId || !stakeholderById.stakeholderProposalsByStakeholderId.nodes ) ? []
                : (() => {


                    let sp = stakeholderById.stakeholderProposalsByStakeholderId.nodes;

                    let r = sp.map((d) => {return {weight: d.weight, isOwner: d.isOwner, isDirty: d.isDirty, ...d.proposalByProposalId}});

                    console.log("from the ProposalsTableWithData")
                    console.log(r)


                    return r;
                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip:({active, symphysisModeEnabled})=> (!active || symphysisModeEnabled),
    }),


    graphql(OnlyProposalsQuery, {
        name: 'proposalsQuery',
        options: ({teamId, problemId, step}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {
                teamId: teamId,
                problemId: problemId,
                step: step,
            }
        }),

        props: ({ownProps, proposalsQuery:  {loading, error, allProposals, refetch}}) => ({
            loading: loading,
            proposals: (error || loading || !allProposals  || !allProposals.nodes ) ? []
                :allProposals.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip:({active, symphysisModeEnabled}) => (!active || !symphysisModeEnabled),
    }),


    graphql(TeamByIdQuery, {
        name: 'teamByIdQuery',
        options: ({teamId}) => ({
            pollInterval: Configuration.pollIntervalMS,

            variables: {
                teamId: teamId,
            }

        }),
        props: ({ownProps, teamByIdQuery:  {loading, teamById, refetch}}) => ({
            loadingTeam: loading,
            teamInfo: (() => {

                if(loading) {

                    console.log("Loading sorry");

                    return null;
                }

                if(teamById) {

                    console.log("team:");
                    console.log(teamById);

                    return teamById;

                }


                return null;
            })(),
            refetchTeam: () => {

                console.log("refetching is here");

                return refetch();
            },
        }),
        skip:({active, symphysisModeEnabled}) => (!active || !symphysisModeEnabled),
    }),


    graphql(SelectSymphysisProposalMutation, {
        name: 'selectSymphysisProposalMutation',


        // Not an array/list query. So update() impl in not necessary for cache update
        // options:  ({teamId}) => ({
        //     update: (proxy, { data: { updateTeamById } }) => {
        //
        //         let query = {query: TeamByIdQuery,
        //             variables: {
        //                 teamId: teamId,
        //             }};
        //
        //         const data = proxy.readQuery(query);
        //
        //         data.teamById.push(updateTeamById.team);
        //
        //         query.data = data;
        //
        //         proxy.writeQuery(query);
        //     },
        // }),

        props: ({ selectSymphysisProposalMutation }) => ({
            selectSymphysisProposal: (teamId, proposalId) => {

                return selectSymphysisProposalMutation({
                    variables: {
                        updateTeamByIdInput: {
                            id: teamId,
                            teamPatch: {
                                selectedSymphysisProposalId: proposalId
                            }
                        }
                    }
                })
                    .then(({ data }) => {

                        console.log("Data returned on selectSymphysisProposalMutation:");
                        console.log(data);


                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),



    graphql(CreateStakeholderProposalMutation, {
        name: 'createStakeholderProposalMutation',

        options:  ({stakeholderId}) => ({
            update: (proxy, { data: { createStakeholderProposal } }) => {

                let query = {query: StakeholderProposalQuery,
                    variables: {
                        stakeholderId: stakeholderId,
                    }};

                const data = proxy.readQuery(query);

                if(!_.has(createStakeholderProposal, 'stakeholderProposal'))
                    return;

                if(!_.has(data, 'stakeholderById.stakeholderProposalsByStakeholderId.nodes'))
                    return;

                data.stakeholderById.stakeholderProposalsByStakeholderId.nodes.push(createStakeholderProposal.stakeholderProposal);

                query.data = data;

                proxy.writeQuery(query);
            },
        }),

        props: ({ createStakeholderProposalMutation, ownProps: {userId, problemId, stakeholderId} }) => ({
            addStakeholderProposal: (proposalId, weight) => {


                let stakeholderProposal = {
                    proposalId: proposalId,
                    stakeholderId: stakeholderId,
                    weight: weight,
                    isOwner: true,
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

    graphql(CreateProposalMutation, {
        name: 'createProposalMutation',


        options:  ({teamId, problemId, step, symphysisModeEnabled}) => ({
            update: (proxy, { data: { createProposal } }) => {

                // if not symphsis just return
                //because otherwise a diff query is used

                console.log('update');

                if(!symphysisModeEnabled)
                    return;

                let query = {query: OnlyProposalsQuery,
                    variables: {
                        teamId: teamId,
                        problemId: problemId,
                        step: step,
                    }};

                const data = proxy.readQuery(query);

                console.log(data);
                console.log(createProposal);

                if(!_.has(createProposal, 'proposal'))
                    return;



                if(!_.has(data, 'allProposals.nodes'))
                    return;

                data.allProposals.nodes.push(createProposal.proposal);

                query.data = data;

                proxy.writeQuery(query);
            },
        }),

        props: ({ createProposalMutation, ownProps: {userId, teamId, problemId, proposalType, step } }) => ({
            addProposal: (proposal) => {

                delete proposal.id; //server will generate

                proposal.userId = userId;
                proposal.problemId = problemId;
                proposal.teamId = teamId;

                proposal.proposalType = proposalType;

                proposal.step = step;

                proposal.isActive = true;

                return createProposalMutation({
                    variables: {
                        createProposalInput: {
                            proposal: proposal
                        }
                    }
                })
                    .then(({ data }) => {

                        // console.log("addProposal() result in then: ");
                        // console.log(data);

                        return  data ;

                        //addStakeholderProposal(data.createProposal.proposal.id);

                    }).catch((error) => {

                        console.log('there was an error sending the create mutation', error);

                    });
            }
        }),
    }),



    graphql(UpdateStakeholderProposalMutation, {
        name: 'updateStakeholderProposalMutation',

        props: ({ updateStakeholderProposalMutation, ownProps: {stakeholderId} }) => ({
            updateStakeholderProposal: (proposalId, weight) => {

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

    graphql(CreateKnowledgeReferenceMutation, {
        name: 'createKnowledgeReferenceMutation',

        props: ({ createKnowledgeReferenceMutation, ownProps: {stakeholderId} }) => ({
            createKnowledgeReference: (url, userId) => {

                return createKnowledgeReferenceMutation({
                    variables: {
                        createKnowledgeReferenceInput : {
                            knowledgeReference: {
                                docUrl: url,
                                userId: userId
                            }
                        }
                    }
                })
                    .then(({ data }) => {

                        console.log("this is te data returned from the knowledge reference");
                        console.log(data);
                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),



    graphql(UpdateProposalMutation, {
        name: 'updateProposalMutation',

        props: ({ updateProposalMutation }) => ({
            updateProposal: (proposalId, patch) => {

                return updateProposalMutation({
                    variables: {
                        updateProposalByIdInput: {
                            id: proposalId,
                            proposalPatch: patch
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


    graphql(DeleteStakeholderProposalMutation, {
        name: 'deleteStakeholderProposalMutation',

        props: ({ deleteStakeholderProposalMutation, ownProps: {stakeholderId} }) => ({
            deleteStakeholderProposal: (proposalId) => {

                return deleteStakeholderProposalMutation({
                    variables: {
                        deleteStakeholderProposalByProposalIdAndStakeholderIdInput: {
                            proposalId: proposalId,
                            stakeholderId: stakeholderId,

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

    graphql(DeleteProposalMutation, {
        name: 'deleteProposalMutation',

        props: ({ deleteProposalMutation }) => ({
            deleteProposal: (proposalId) => {

                return deleteProposalMutation({
                    variables: {
                        deleteProposalByIdInput: {
                            id: proposalId
                        }
                    }
                })
                    .then(({ data }) => {

                    }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                    })
            }
        }),
    })

)(ProposalsTable);



ProposalsTableWithData.propTypes = ProposalsTableWithDataPropTypes;


export default ProposalsTableWithData;