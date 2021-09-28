import React, { Component } from 'react';

import VisualizeStakeholdersWithRightClick from '../Components/VisualizeStakeholdersWithRightClick';

import { gql, graphql, compose } from 'react-apollo';


import ReflectSchema from './ReflectSchema';
import PropTypes from 'prop-types';
import Configuration from './Configuration';




//This also fetches the proposals associated with stakeholders
const StakeholdersQuery = gql`
query stakeholdersByUserId($userId:Int!, $teamId:Int!, $step:String!)
{
  userById(id:$userId) {
    ...UserMembers
    stakeholdersByUserId(condition:{step:$step, teamId:$teamId, isActive: true}) {
        nodes {
        ...DeepStakeholderMembers
        }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.deepStakeholder}
`;



//This also fetches the proposals associated with stakeholders
const TeamStakeholdersQuery = gql`
query stakeholdersByUsersTeam($userId:Int!, $step:String!){
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step, isActive: true}) {
        totalCount
        nodes {

           ...StakeholderMembers
           stakeholderProposals: stakeholderProposalsByStakeholderId(condition:{isOwner:true}) {
              nodes {
                 ...DeepOnProposalStakeholderProposalMembers
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
${ReflectSchema.deepOnProposalStakeholderProposal}

`;



const VisualizeStakeholdersWithDataPropTypes = {

    active: PropTypes.bool.isRequired,
    teamQuery: PropTypes.bool,
    userId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,
    problemId: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired
}


const getStakeholders = graphql(StakeholdersQuery, {
    name: 'stakeholdersQuery',
    options: ({userId, teamId, step}) => ({
        pollInterval: Configuration.pollIntervalMS,
        variables: {userId: userId, teamId: teamId, step: step}
    }),

    props: ({ownProps, stakeholdersQuery:  {loading, error, userById, refetch}}) => ({
        loading: loading,

        stakeholders: (error || loading || !userById || !userById.stakeholdersByUserId || !userById.stakeholdersByUserId.nodes ) ? []
            :userById.stakeholdersByUserId.nodes,
        refetch: () => {

            console.log("VisualizeStakeholdersWithData REFETCH!!!");

            return refetch();
        },
    }),
    skip:({active, teamQuery}) => !active || teamQuery ,
})


const getTeamStakeHolders =  graphql(TeamStakeholdersQuery, {
    name: 'teamStakeholdersQuery',
    options: ({userId, step}) => ({
        pollInterval: Configuration.pollIntervalMS,
        variables: {userId: userId, step: step}
    }),

    props: ({ownProps, teamStakeholdersQuery:  {loading, error, userById, refetch}}) => ({
        loading: loading,
        stakeholders: (error || loading || !userById || !userById.currentTeam || !userById.currentTeam.stakeholdersByTeamId || !userById.currentTeam.stakeholdersByTeamId.nodes ) ? []
            : (() => {

                console.log("team query returning: ");
                console.log(userById.currentTeam.stakeholdersByTeamId.nodes);

                return userById.currentTeam.stakeholdersByTeamId.nodes;
            })(),
        refetch: () => {

            return refetch();
        },
    }),
    skip:({active, teamQuery}) => !active || !teamQuery ,
})



const VisualizeStakeholdersWithRightClickData = compose (
    getStakeholders,
    getTeamStakeHolders
)(VisualizeStakeholdersWithRightClick);



VisualizeStakeholdersWithRightClickData.propTypes = VisualizeStakeholdersWithDataPropTypes;


export default VisualizeStakeholdersWithRightClickData;
