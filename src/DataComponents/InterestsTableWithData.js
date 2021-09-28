import React, { Component } from 'react';

import InterestsTable from '../Components/InterestsTable.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';



import ReflectSchema from './ReflectSchema';



import Configuration from './Configuration';


import _ from 'lodash';



const TeamSymphysisSelectedStakeholdersQuery = gql`
query stakeholdersByUsersTeam($userId:Int!, $step:String!){
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step, isActive:true, excludeFromSymphysis:false}) {
        totalCount
        nodes {
          ...DeepStakeholderMembers       
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
${ReflectSchema.deepStakeholder}
`;



const InterestsQuery = gql`
query interestsByReasonId($reasonId:Int!) {
  
  reasonById(id:$reasonId) {
    id
    interestsByReasonId {
      totalCount
      nodes {
        ...InterestMembers
        user: userByUserId {
           ...UserMembers
        }
        knowledgeReference : knowledgeReferencesByInterestId {
            nodes { 
                ...KnowledgeReferenceMembers
             }
        }
      }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.interest}
${ReflectSchema.knowledgeReference}
`;

//
// {
//     "reasionId": 374
// }




const CreateInterestMutation =  gql`
mutation createInterest($createInterestInput:CreateInterestInput!)
{
  createInterest(input:$createInterestInput) {
    interest {
      ...InterestMembers
      user: userByUserId {
        ...UserMembers
      }
    }   
  } 
}
${ReflectSchema.user}
${ReflectSchema.interest}
`;
//INPUT
// {
//     "createInterestInput": {
//     "interest": {
//         "userId": 14,
//             "problemId": 2,
//             "interestText": "THIS is my interest!",
//     }
// }
// }

//A result:
// {
//     "teamTestData": {
//     "createInterest": {
//         "interest": {
//             "nodeId": "WyJwcm9wb3NhbHMiLDdd",
//                 "id": 7,
//                 "userId": 14,
//                 "problemId": 2,
//                 "interestText": "THIS is my interest!",
//                 "ranking": 1,
//                 "weight": 2,
//                 "isActive": true,
//                 "hasComponents": false
//         }
//     }
// }
// }






const DeleteInterestMutation = gql`
mutation deleteInterestById($deleteInterestByIdInput:DeleteInterestByIdInput!)
{
  deleteInterestById(input:$deleteInterestByIdInput) {
    deletedInterestId
  }
}
`;

// {
//     "deleteInterestByIdInput": {
//     "id": 12
// }
// }






const UpdateInterestMutation = gql`
mutation updateInterestById($updateInterestByIdInput:UpdateInterestByIdInput!)
{
  updateInterestById(input:$updateInterestByIdInput) {
    interest {
        ...InterestMembers
        user: userByUserId {
            ...UserMembers
        }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.interest}
`;

// {
//     "updateInterestByIdInput": {
//     "id": 20,
//         "interestPatch": {
//         "name": "more name"
//     }
// }
// }




const InterestsTableWithDataPropTypes = {

    userId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,

}


const InterestsTableWithData = compose (

// const TeamSymphysisSelectedStakeholdersQuery =
// query stakeholdersByUsersTeam($userId:Int!, $step:String!){
//  userById(id:$userId) {
//     ...UserMembers
//     currentTeam {
//       ...TeamMembers
//       stakeholdersByTeamId(condition:{step:$step, isActive:true, excludeFromSymphysis:false}) {
//         totalCount
//         nodes {
//           ...DeepStakeholderMembers
//           user: userByUserId {
//             ...UserMembers
//           }
//         }
//       }
//     }
//   }
//
// }



    graphql(TeamSymphysisSelectedStakeholdersQuery, {
        name: 'interestsQuery',
        options: ({reasonId}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {}
        }),

        //{"teamTestData":{"stakeholderById":{"interestsByStakeholderId":{"totalCount":2,"nodes":[{"nodeId":"WyJpbnRlcmVzdHMiLDExXQ==","id":11,"userId":374,"stakeholderId":24,"interestText":"steaky's interest","__typename":"Interest"},{"nodeId":"WyJpbnRlcmVzdHMiLDEyXQ==","id":12,"userId":374,"stakeholderId":24,"interestText":"blah","__typename":"Interest"}],"__typename":"InterestsConnection"},"__typename":"Stakeholder"}}}
        props: ({ownProps, interestsQuery:  {loading, error, userById, refetch}}) => ({
            loading: loading,
            interests: (error || loading || !_.has(userById, "currentTeam.stakeholdersByTeamId.nodes") ) ? []
                :userById.currentTeam.stakeholdersByTeamId.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active}) => !active
    }),


    // graphql(InterestsQuery, {
    //     name: 'interestsQuery',
    //     options: ({reasonId}) => ({
    //
    //         pollInterval: Configuration.pollIntervalMS,
    //         variables: {reasonId: reasonId}
    //     }),
    //
    //     //{"teamTestData":{"stakeholderById":{"interestsByStakeholderId":{"totalCount":2,"nodes":[{"nodeId":"WyJpbnRlcmVzdHMiLDExXQ==","id":11,"userId":374,"stakeholderId":24,"interestText":"steaky's interest","__typename":"Interest"},{"nodeId":"WyJpbnRlcmVzdHMiLDEyXQ==","id":12,"userId":374,"stakeholderId":24,"interestText":"blah","__typename":"Interest"}],"__typename":"InterestsConnection"},"__typename":"Stakeholder"}}}
    //     props: ({ownProps, interestsQuery:  {loading, error, reasonById, refetch}}) => ({
    //         loading: loading,
    //         interests: (error || loading || !reasonById || !reasonById.interestsByReasonId || !reasonById.interestsByReasonId.nodes ) ? []
    //             :reasonById.interestsByReasonId.nodes,
    //         refetch: () => {
    //
    //             return refetch();
    //         },
    //     }),
    //     skip: ({active}) => !active
    // }),
    //
    //
    //
    // graphql(CreateInterestMutation, {
    //     name: 'createInterestMutation',
    //
    //     options:  ({reasonId}) => ({
    //         update: (proxy, { data: { createInterest } }) => {
    //
    //             let query = {query: InterestsQuery,
    //                 variables: {
    //                     reasonId: reasonId,
    //                 }};
    //
    //             const data = proxy.readQuery(query);
    //
    //             if(!_.has(createInterest, 'interest'))
    //                 return;
    //
    //             if(!_.has(data, 'reasonById.interestsByReasonId.nodes'))
    //                 return;
    //
    //             data.reasonById.interestsByReasonId.nodes.push(createInterest.interest);
    //
    //             query.data = data;
    //
    //             proxy.writeQuery(query);
    //         },
    //     }),
    //
    //     props: ({ createInterestMutation, ownProps: {userId, reasonId} }) => ({
    //         addInterest: (interest) => {
    //
    //             delete interest.id; //server will generate
    //
    //             interest.userId = userId;
    //             interest.reasonId = reasonId;
    //             interest.isActive = true;
    //
    //             return createInterestMutation({
    //                 variables: {
    //                     createInterestInput: {
    //                         interest: interest
    //                     }
    //                 }
    //             })
    //                 .then(({ data }) => {
    //
    //                     // console.log("addInterest() result in then: ");
    //                     // console.log(teamTestData);
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
    //
    //
    //
    // graphql(UpdateInterestMutation, {
    //     name: 'updateInterestMutation',
    //
    //     props: ({ updateInterestMutation }) => ({
    //         updateInterest: (interestId, patch) => {
    //
    //             return updateInterestMutation({
    //                 variables: {
    //                     updateInterestByIdInput: {
    //                         id: interestId,
    //                         interestPatch: patch
    //                     }
    //                 }
    //             })
    //                 .then(({ data }) => {
    //
    //
    //                 }).catch((error) => {
    //                     console.log('there was an error sending the update mutation', error);
    //
    //                 })
    //         }
    //     }),
    // }),
    //
    //
    //
    // graphql(DeleteInterestMutation, {
    //     name: 'deleteInterestMutation',
    //
    //     props: ({ deleteInterestMutation }) => ({
    //         deleteInterest: (interestId) => {
    //
    //             return deleteInterestMutation({
    //                 variables: {
    //                     deleteInterestByIdInput: {
    //                         id: interestId
    //                     }
    //                 }
    //             })
    //                 .then(({ data }) => {
    //
    //                 }).catch((error) => {
    //                     console.log('there was an error sending the delete mutation', error);
    //
    //                 })
    //         }
    //     }),
    // })

)(InterestsTable);



InterestsTableWithData.propTypes = InterestsTableWithDataPropTypes;


export default InterestsTableWithData;
