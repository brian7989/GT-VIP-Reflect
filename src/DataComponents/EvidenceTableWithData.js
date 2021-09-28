import React, { Component } from 'react';

import EvidenceTable from '../Components/EvidenceTable.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';


import Configuration from './Configuration';
import {contextMenuKeys} from "../Components/Constants";


const EvidenceQuery = gql`
query proposalEvidencesByProposalId($proposalId:Int!) {
  proposalById(id:$proposalId) {
    id
    proposalEvidencesByProposalId {
      totalCount
      nodes {
        nodeId
        proposalId
        knowledgeReferenceId
        knowledgeReferenceByKnowledgeReferenceId {
          nodeId
          id
          title
          abstract
          publicationType
          docUrl
          numLikes
        }
      }
    }
  }
}
`;


const EvidenceQueryForReason = gql`
query reasonEvidencesByReasonId($reasonId:Int!) {
  reasonById(id:$reasonId) {
    id
    reasonEvidencesByReasonId {
      totalCount
      nodes {
        nodeId
        reasonId
        knowledgeReferenceId
        knowledgeReferenceByKnowledgeReferenceId {
          nodeId
          id
          title
          abstract
          publicationType
          docUrl
          numLikes
        }
      }
    }
  }
}`;




const EvidenceQueryForInterest = gql`
query interestEvidencesByInterestId($interestId:Int!) {
  interestById(id:$interestId) {
    id
    interestEvidencesByInterestId {
      totalCount
      nodes {
        nodeId
        interestId
        knowledgeReferenceId
        knowledgeReferenceByKnowledgeReferenceId {
          nodeId
          id
          title
          abstract
          publicationType
          docUrl
          numLikes
        }
      }
    }
  }
}`;



//
// const CreateProposalEvidenceMutation =  gql`
// mutation createProposalEvidence($createProposalEvidenceInput:CreateProposalEvidenceInput!)
// {
//   createProposalEvidence(input:$createProposalEvidenceInput) {
//     proposalEvidence {
//       nodeId
//       knowledgeReferenceId
//       proposalId
//     }
//   }
//
// }
// `;
//INPUT
// {
//     "createProposalEvidenceInput": {
//     "proposalEvidence": {
//         "proposalId": 1,
//             "knowledgeReferenceId": 1
//     }
// }
// }



const CreateKnowledgeReferenceMutation = gql`
mutation createKnowledgeReference($createKnowledgeReferenceInput:CreateKnowledgeReferenceInput!)
{
  createKnowledgeReference(input:$createKnowledgeReferenceInput) {

    knowledgeReference{
      nodeId
      id
      title
      abstract
      publicationType
      docUrl
      numLikes
    }
  }
  
}
`;

//INPUT

// {
//     "createKnowledgeReferenceInput": {
//     "knowledgeReference": {
//         "title": "bob",
//             "abstract": "bob is bob",
//             "publicationType": "WEBPAGE",
//             "docUrl": "http://www.example.com",
//             "numLikes":  0
//
//     }
// }
// }



const DeleteKnowledgeReferenceMutation = gql`
mutation deleteKnowledgeReferenceById($deleteKnowledgeReferenceByIdInput:DeleteKnowledgeReferenceByIdInput!) {
  deleteKnowledgeReferenceById(input:$deleteKnowledgeReferenceByIdInput) {
    deletedKnowledgeReferenceId
  }
}
`;

const DeleteInterestEvidenceMutation = gql`
mutation deleteInterestEvidenceByInterestIdAndKnowledgeReferenceId($deleteInterestEvidenceByInterestIdAndKnowledgeReferenceIdInput:DeleteInterestEvidenceByInterestIdAndKnowledgeReferenceIdInput!) {
  
	deleteInterestEvidenceByInterestIdAndKnowledgeReferenceId(input:$deleteInterestEvidenceByInterestIdAndKnowledgeReferenceIdInput) {
    deleteInterestEvidenceId
  }
  
}`;


const DeleteReasonEvidenceMutation = gql`
mutation deleteReasonEvidenceByReasonIdAndKnowledgeReferenceId($deleteReasonEvidenceByReasonIdAndKnowledgeReferenceIdInput:DeleteReasonEvidenceByReasonIdAndKnowledgeReferenceIdInput!) {
  
	deleteReasonEvidenceByReasonIdAndKnowledgeReferenceId(input:$deleteReasonEvidenceByReasonIdAndKnowledgeReferenceIdInput) {
    deleteReasonEvidenceId
  }
  
}`;



const DeleteProposalEvidenceMutation = gql`
mutation deleteProposalEvidenceByKnowledgeReferenceIdAndProposalId($deleteProposalEvidenceByKnowledgeReferenceIdAndProposalIdInput:DeleteProposalEvidenceByKnowledgeReferenceIdAndProposalIdInput!) {
  
	deleteProposalEvidenceByKnowledgeReferenceIdAndProposalId(input:$deleteProposalEvidenceByKnowledgeReferenceIdAndProposalIdInput) {
    
    deletedProposalEvidenceId
  }
  
}
`;

//
// {
//     "deleteProposalEvidenceByKnowledgeReferenceIdAndProposalIdInput": {
//     "proposalId": 1,
//         "knowledgeReferenceId": 1
// }
// }






const UpdateEvidenceMutation = gql`
mutation updateKnowledgeReferenceById($updateKnowledgeReferenceByIdInput:UpdateKnowledgeReferenceByIdInput!)
{
  updateKnowledgeReferenceById(input:$updateKnowledgeReferenceByIdInput) {

    knowledgeReference{
      nodeId
      id
      title
      abstract
      publicationType
      docUrl
      numLikes
    }
  }
  
}

`;

//INPUT example
// {
//     "updateKnowledgeReferenceByIdInput": {
//
//     "id": 1,
//
//
//         "knowledgeReferencePatch": {
//
//         "title": "bob",
//             "abstract": "bob is bob",
//             "publicationType": "WEBPAGE",
//             "docUrl":  "http://www.example.com",
//             "numLikes": 0
//     }
// }
// }



let evidenceGraphqlForReasons =  graphql(EvidenceQueryForReason, {
        name: 'evidenceQueryForReason',
        options: ({reasonId, type}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {reasonId: reasonId, type:type}
        }),

        props: ({ownProps: {data}, evidenceQueryForReason:  {loading, error, reasonById, refetch}}) => ({
            loading: loading,
            evidence: (error || loading || !reasonById || !reasonById.reasonEvidencesByReasonId || !reasonById.reasonEvidencesByReasonId.nodes ) ? []
                : (() => {

                    let sp = reasonById.reasonEvidencesByReasonId.nodes;

                    let r = sp.map((d) => {return { ...d.knowledgeReferenceByKnowledgeReferenceId}});

                    return r;
                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({data}) => data.type != contextMenuKeys.reason
});


let evidenceGraphqlForInterest =  graphql(EvidenceQueryForInterest, {
    name: 'evidenceQueryForInterest',
    options: ({interestId, type}) => ({

        pollInterval: Configuration.pollIntervalMS,
        variables: {interestId: interestId, type:type}
    }),

    props: ({ownProps: {data}, evidenceQueryForInterest:  {loading, error, interestById, refetch}}) => ({
        loading: loading,
        evidence: (error || loading || !interestById || !interestById.interestEvidencesByInterestId || !interestById.interestEvidencesByInterestId.nodes ) ? []
            : (() => {

                let sp = interestById.interestEvidencesByInterestId.nodes;

                let r = sp.map((d) => {return { ...d.knowledgeReferenceByKnowledgeReferenceId}});

                return r;
            })(),
        refetch: () => {

            return refetch();
        },
    }),
    skip: ({data}) => data.type != contextMenuKeys.interest
});


const EvidenceTableWithDataPropTypes = {

    //: PropTypes.object.isRequired
}


const EvidenceTableWithData = compose (



    graphql(EvidenceQuery, {
       name: 'evidenceQuery',
        options: ({proposalId}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {proposalId: proposalId}
        }),

        props: ({ownProps: {data}, evidenceQuery:  {loading, error, proposalById, refetch}}) => ({
            loading: loading,
            evidence: (error || loading || !proposalById || !proposalById.proposalEvidencesByProposalId || !proposalById.proposalEvidencesByProposalId.nodes ) ? []
                : (() => {
                    console.log("From here!!!");
                    console.log(proposalById);
                    let sp = proposalById.proposalEvidencesByProposalId.nodes;

                    let r = sp.map((d) => {return { ...d.knowledgeReferenceByKnowledgeReferenceId}});

                    return r;
                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({data}) => data.type != contextMenuKeys.proposal
    }),

    evidenceGraphqlForReasons,
    evidenceGraphqlForInterest,

    graphql(CreateKnowledgeReferenceMutation, {
        name: 'createKnowledgeReferenceMutation',

        props: ({ createKnowledgeReferenceMutation, ownProps: {userId, proposalId} }) => ({
            addEvidence: (evidence) => {

                delete evidence.id; //server will generate

                //TODO user ID?
                //evidence.userId = userId;
                //evidence.proposalId = proposalId;
                evidence.numLikes = 0;

                return createKnowledgeReferenceMutation({
                    variables: {
                        createKnowledgeReferenceInput: {
                            knowledgeReference: evidence
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


    //INPUT
// {
//     "createProposalEvidenceInput": {
//     "proposalEvidence": {
//         "proposalId": 1,
//             "knowledgeReferenceId": 1
//     }
// }
// }

    // graphql(CreateProposalEvidenceMutation, {
    //     name: 'createProposalEvidenceMutation',
    //
    //     props: ({ createProposalEvidenceMutation, ownProps: {userId, proposalId} }) => ({
    //         addProposalEvidence: (knowledgeReferenceId) => {
    //
    //             //delete evidence.id; //server will generate
    //
    //
    //             //TODO user ID?
    //
    //             //evidence.userId = userId;
    //             //evidence.proposalId = proposalId;
    //
    //             return createProposalEvidenceMutation({
    //                     variables: {
    //                         createProposalEvidenceInput: {
    //                             proposalEvidence: {
    //                                 proposalId: proposalId,
    //                                 knowledgeReferenceId: knowledgeReferenceId
    //                             }
    //                         }
    //                     }
    //                 })
    //                 .then(({ data }) => {
    //
    //                     // console.log("addEvidence() result in then: ");
    //                     // console.log(data);
    //
    //                     return  data ;
    //
    //
    //                 }).catch((error) => {
    //
    //                     console.log('there was an error sending the create mutation', error);
    //
    //                 });
    //         }
    //     }),
    // }),



    graphql(UpdateEvidenceMutation, {
        name: 'updateEvidenceMutation',

        props: ({ updateEvidenceMutation }) => ({
            updateEvidence: (evidenceId, patch) => {

                return updateEvidenceMutation({
                    variables: {
                        updateKnowledgeReferenceByIdInput: {
                            id: evidenceId,
                            knowledgeReferencePatch: patch
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



    graphql(DeleteKnowledgeReferenceMutation, {
        name: 'deleteKnowledgeReferenceMutation',

        props: ({ deleteKnowledgeReferenceMutation }) => ({
            deleteEvidence: (evidenceId) => {

                return deleteKnowledgeReferenceMutation({
                    variables: {
                        deleteKnowledgeReferenceByIdInput: {
                            id: evidenceId
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

    graphql(DeleteProposalEvidenceMutation, {
        name: 'deleteProposalEvidenceMutation',

        props: ({ deleteProposalEvidenceMutation,  ownProps: {proposalId} }) => ({
            deleteProposalEvidence: (evidenceId) => {

                return deleteProposalEvidenceMutation({
                    variables: {
                        deleteProposalEvidenceByKnowledgeReferenceIdAndProposalIdInput: {
                            proposalId: proposalId,
                            knowledgeReferenceId: evidenceId
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

)(EvidenceTable);



EvidenceTableWithData.propTypes = EvidenceTableWithDataPropTypes;


export default EvidenceTableWithData;
