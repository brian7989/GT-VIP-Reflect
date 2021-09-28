import React, { Component } from 'react';

import ProposalDropdownSelectorTable from '../Components/ProposalDropdownSelector';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';


import ReflectSchema from './ReflectSchema';



import Configuration from './Configuration';





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
        }
        
      }
    }
    
  }  
}
${ReflectSchema.stakeholder}
${ReflectSchema.stakeholderProposal}
${ReflectSchema.proposal}
`;

//INPUT
// {
//     "stakeholderId": 32
// }





// const ProposalsQuery = gql`
// query proposalsByStakeholderId($stakeholderId:Int!) {
//   ...ProposalMembers
//   stakeholderById(id:$stakeholderId) {
//     ...StakeholderMembers
//     proposalsByStakeholderId(condition:{isOwner:true}) {
//       totalCount
//       nodes {
//         ...ProposalMembers
//       }
//     }
//   }
// }
// ${ReflectSchema.stakeholder}
// ${ReflectSchema.proposal}
// `;

//
// {
//     "userId": 374
// }






const ProposalDropdownSelectorWithDataPropTypes = {


}


const ProposalDropdownSelectorWithData = compose (

    graphql(StakeholderProposalQuery, {
       name: 'proposalsQuery',
        options: ({stakeholderId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {stakeholderId: stakeholderId}
        }),

        props: ({ownProps, proposalsQuery:  {loading, error, stakeholderById, refetch}}) => ({
            loading: loading,

            proposals: (error || loading || !stakeholderById || !stakeholderById.stakeholderProposalsByStakeholderId || !stakeholderById.stakeholderProposalsByStakeholderId.nodes) ? []
                : (() => {

                    let stakeholderProposals = stakeholderById.stakeholderProposalsByStakeholderId.nodes;

                    let r = stakeholderProposals.reduce( (proposals, sp) => {

                        if(sp.proposalByProposalId && (sp.proposalByProposalId.isActive || ownProps.includeInactive )) {

                            proposals.push({weight: sp.weight, ...sp.proposalByProposalId});
                        }

                        return proposals;
                    }, []);


                    return r;
                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip:({enabled}) => !enabled,
    }),


)(ProposalDropdownSelectorTable);



ProposalDropdownSelectorWithData.propTypes = ProposalDropdownSelectorWithDataPropTypes;


export default ProposalDropdownSelectorWithData;