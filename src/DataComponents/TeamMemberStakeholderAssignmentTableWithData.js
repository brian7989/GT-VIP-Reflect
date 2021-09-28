import React, { Component } from 'react';

import TeamMemberStakeholderAssignmentTable from '../Components/TeamMemberStakeholderAssignmentTable';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';

import _ from 'lodash';



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
          currentStakeholder: stakeholderByCurrentStakeholderId {
            ...StakeholderMembers
          }
        }
      }
    }
  }
}
${ReflectSchema.team}
${ReflectSchema.teamUser}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
`;


const TeamStakeholdersQuery = gql`
query stakeholdersByTeam($teamId:Int!, $step:String!, $isActive:Boolean!){
  
  teamById(id:$teamId) {

      ...TeamMembers
      
      stakeholdersByTeamId(condition:{step:$step, isActive:$isActive}) {
        totalCount
        nodes {
          ...StakeholderMembers       
        }
      }
    
  }
  
}

${ReflectSchema.team}
${ReflectSchema.stakeholder}
`;



const CreateProposalMutation =  gql`
mutation createProposal($createProposalInput:CreateProposalInput!)
{
  createProposal(input:$createProposalInput) {
    teamMember {
      nodeId
      id
      userId
      problemId
      teamMemberText
      ranking
      weight
      isActive
      hasComponents      
    }   
  } 
}
`;





const DeleteProposalMutation = gql`
mutation deleteProposalById($deleteProposalByIdInput:DeleteProposalByIdInput!)
{
  deleteProposalById(input:$deleteProposalByIdInput) {

    deletedProposalId

  }
}
`;



const UpdateTeamMemberMutation = gql`
mutation updateUserById($updateUserByIdInput: UpdateUserByIdInput!) {
  updateUserById(input: $updateUserByIdInput) {

  	user {
      ...UserMembers
    }

  }
}

${ReflectSchema.user}
`;







const TeamMembersTableWithDataPropTypes = {



}


const TeamMemberStakeholderAssignmentTableWithData = compose (

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
        skip: ({active}) => !active
    }),


    graphql(TeamStakeholdersQuery, {
        name: 'teamStakeholdersQuery',
        options: ({teamId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {teamId: teamId, step: "team", isActive: true}
        }),

        props: ({ownProps, teamStakeholdersQuery: {loading, error, teamById, refetch}}) => ({
            loadingStakeholders: loading,

            stakeholders: (error || loading || !_.has(teamById, "stakeholdersByTeamId.nodes")) ? []
                :
                (() => {

                    let ret = teamById.stakeholdersByTeamId.nodes;

                    //console.log(ret);

                    return ret;

                })(),

            refetchStakeholders: () => {

                return refetch();
            },
        }),
        skip: ({active}) => !active,
    }),


    graphql(UpdateTeamMemberMutation, {
        name: 'updateTeamMemberMutation',

        props: ({ updateTeamMemberMutation }) => ({
            updateTeamMember: (teamMemberId, patch) => {

                console.log(patch);

                if(patch.currentStakeholderId === -1)
                    patch.currentStakeholderId = null;

                return updateTeamMemberMutation({
                    variables: {
                        updateUserByIdInput: {
                            id: teamMemberId,
                            userPatch: patch
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


)(TeamMemberStakeholderAssignmentTable);



TeamMemberStakeholderAssignmentTableWithData.propTypes = TeamMembersTableWithDataPropTypes;


export default TeamMemberStakeholderAssignmentTableWithData;
