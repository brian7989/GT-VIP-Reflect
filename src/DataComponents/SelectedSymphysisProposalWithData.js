import React, { Component } from 'react';

import SelectedSymphysisProposal from '../Components/SelectedSymphysisProposal.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';

import ReflectSchema from './ReflectSchema';


import Configuration from './Configuration';

import _ from 'lodash';
import TeamTabPanel from "../Components/TeamTabPanel";






const TeamByIdQuery = gql`
query teamById($teamId:Int!){  
  teamById(id:$teamId) {
    ...TeamMembers   
  }
}
${ReflectSchema.team}
`;




const SelectedSymphysisProposalWithDataPropTypes = {


    teamId: PropTypes.number.isRequired,
    active:PropTypes.bool.isRequired,
}


const SelectedSymphysisProposalWithData = compose (



    graphql(TeamByIdQuery, {
        name: 'teamByIdQuery',
        options: ({teamId}) => ({
            pollInterval: Configuration.pollIntervalMS,

            variables: {
                teamId: teamId,
            }

        }),
        props: ({ownProps, teamByIdQuery:  {loading, teamById, refetch}}) => ({
            loading: loading,
            proposal: (() => {

                console.log("returning proposal from SelectedSymphysisProposal");

                if(loading) {

                    console.log("Loading sorry");

                    return null;
                }

                if(teamById && teamById.selectedSymphysisProposal
                ) {

                    console.log("team!!:");
                    console.log(teamById);

                    console.log("returning:");
                    console.log(teamById.selectedSymphysisProposal);

                    return teamById.selectedSymphysisProposal;

                }


                return null;
            })(),
            refetch: () => {

                console.log("refetching is here");

                return refetch();
            },
        }),
        skip:({active}) => (!active),
    }),

)(SelectedSymphysisProposal);



SelectedSymphysisProposalWithData.propTypes = SelectedSymphysisProposalWithDataPropTypes;


export default SelectedSymphysisProposalWithData;