import React, { Component } from 'react';

import InterestsTable from '../Components/InterestMap.js';

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





const DeleteInterestMutation = gql`
mutation deleteInterestById($deleteInterestByIdInput:DeleteInterestByIdInput!)
{
  deleteInterestById(input:$deleteInterestByIdInput) {

    deletedInterestId

  }
}
`;


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



const InterestsTableWithDataPropTypes = {

    userId: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,

}


const InterestsTableWithData = compose (


    graphql(TeamSymphysisSelectedStakeholdersQuery, {
        name: 'interestsQuery',
        options: ({userId, step}) => ({

            pollInterval: Configuration.pollIntervalMS,
            variables: {userId, step}
        }),

        //{"teamTestData":{"stakeholderById":{"interestsByStakeholderId":{"totalCount":2,"nodes":[{"nodeId":"WyJpbnRlcmVzdHMiLDExXQ==","id":11,"userId":374,"stakeholderId":24,"interestText":"steaky's interest","__typename":"Interest"},{"nodeId":"WyJpbnRlcmVzdHMiLDEyXQ==","id":12,"userId":374,"stakeholderId":24,"interestText":"blah","__typename":"Interest"}],"__typename":"InterestsConnection"},"__typename":"Stakeholder"}}}
        props: ({ownProps, interestsQuery:  {loading, error, userById, refetch}}) => ({
            loading: loading,
            interests: (
                () => {

                    //console.log("INTERESTS MAP APOLLO");

                    if(error) {
                        //console.log("error");
                        //console.log(ownProps);

                        return [];
                    }

                    if(loading) {
                        //console.log("loading");

                        return [];
                    }

                    if(!_.has(userById, "currentTeam.stakeholdersByTeamId.nodes") )
                        return [];

                    // console.log("INTERESTS_MAP RETURN");
                    // console.log(userById);


                    let stakeholders = userById.currentTeam.stakeholdersByTeamId.nodes;


                    let ret = stakeholders.reduce(
                        (flattenedStakeholders, stakeholder) => {

                            let stakeholderProposalBundle = [];

                            if (_.has(stakeholder, "stakeholderProposals.nodes")) {

                                stakeholderProposalBundle = stakeholder.stakeholderProposals.nodes.reduce(
                                    (flattenedStakeholderProposals, stakeholderProposal) => {

                                        let reasonsBundle = [];

                                        if (_.has(stakeholderProposal, "proposal.reasons.nodes"))
                                        {

                                            reasonsBundle = stakeholderProposal.proposal.reasons.nodes.reduce(
                                                (flattenedReasons, reason) => {

                                                    let interestsBundle = [];

                                                    if(_.has(reason, "interests.nodes"))
                                                    {

                                                        interestsBundle = reason.interests.nodes;

                                                        // console.log("INTERESTS BUNDLE");
                                                        // console.log(interestsBundle);

                                                    }

                                                    flattenedReasons = flattenedReasons.concat(interestsBundle);

                                                    // console.log("FLATTENED REASONS");
                                                    // console.log(flattenedReasons);

                                                    return flattenedReasons;
                                                },
                                                []);

                                            // console.log("REASONS BUNDLE");
                                            // console.log(reasonsBundle);

                                        }


                                        flattenedStakeholderProposals = flattenedStakeholderProposals.concat(reasonsBundle);

                                        return flattenedStakeholderProposals;
                                    },
                                    []);

                            }

                            flattenedStakeholders = flattenedStakeholders.concat(stakeholderProposalBundle);

                            return flattenedStakeholders;
                        },
                    []);


                    //console.log("REDUCED interests");
                    //console.log(ret);

                    //return userById.currentTeam.stakeholdersByTeamId.nodes;

                    return ret;

                }

            )(),


            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active}) => !active
    }),

    //
    // graphql(InterestsQuery, {
    //     name: 'interestsQuery',
    //     options: ({reasonId}) => ({
    //
    //         pollInterval: Configuration.pollIntervalMS,
    //         variables: {reasonId: reasonId}
    //     }),
    //
    //     //{"data":{"stakeholderById":{"interestsByStakeholderId":{"totalCount":2,"nodes":[{"nodeId":"WyJpbnRlcmVzdHMiLDExXQ==","id":11,"userId":374,"stakeholderId":24,"interestText":"steaky's interest","__typename":"Interest"},{"nodeId":"WyJpbnRlcmVzdHMiLDEyXQ==","id":12,"userId":374,"stakeholderId":24,"interestText":"blah","__typename":"Interest"}],"__typename":"InterestsConnection"},"__typename":"Stakeholder"}}}
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
