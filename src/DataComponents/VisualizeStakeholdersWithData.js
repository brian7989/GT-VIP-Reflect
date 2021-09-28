import React, { Component } from 'react';

import VisualizeStakeholders from '../Components/VisualizeStakeholders.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import ReflectSchema from './ReflectSchema';


import PropTypes from 'prop-types';



import Configuration from './Configuration';




const StakeholdersQuery = gql`
query stakeholdersByUserId($userId:Int!, $step:String!) {
  userById(id:$userId) {
    ...UserMembers
    stakeholdersByUserId(condition:{step:$step, isActive: true}) {
        nodes {
        ...DeepStakeholderMembers
        }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.deepStakeholder}
`;




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

    userId: PropTypes.number.isRequired,
    //problemId: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    //useTeamStakeholderQuery: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    teamQuery: PropTypes.bool,
}


const stakeHoldersVisualizationData = graphql(StakeholdersQuery, {
    name: 'stakeholdersQuery',
    options: ({userId, step}) => ({
        pollInterval: Configuration.pollIntervalMS,
        variables: {userId: userId, step: step}
    }),

    props: ({ownProps, stakeholdersQuery:  {loading, error, userById, refetch}}) => ({
        loading: loading,
        // getStakeholders: () => {
        //     if(userById && userById.stakeholdersByUserId && userById.stakeholdersByUserId.nodes)
        //         return userById.stakeholdersByUserId.nodes;
        //     else
        //         return [];
        // },
        stakeholders: (error || loading || !userById || !userById.stakeholdersByUserId || !userById.stakeholdersByUserId.nodes ) ? []
            :userById.stakeholdersByUserId.nodes,
        refetch: () => {

            return refetch();
        },
    }),
    skip:({active, teamQuery}) => !active || teamQuery ,
});



const teamStakeHoldersVisualizationData  =
    graphql(TeamStakeholdersQuery, {
        name: 'stakeholdersQuery',
        options: ({userId, step}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId: userId, step: step}
        }),

        props: ({ownProps, stakeholdersQuery:  {loading, error, userById, refetch}}) => ({
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
    });


const VisualizeStakeholdersWithData = compose (

    stakeHoldersVisualizationData,
    teamStakeHoldersVisualizationData


)(VisualizeStakeholders);



VisualizeStakeholdersWithData.propTypes = VisualizeStakeholdersWithDataPropTypes;


export {VisualizeStakeholdersWithData, stakeHoldersVisualizationData, teamStakeHoldersVisualizationData};