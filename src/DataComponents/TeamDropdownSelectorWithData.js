import React, { Component } from 'react';

import TeamDropdownSelectorTable from '../Components/TeamDropdownSelector';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';



import Configuration from './Configuration';

import ReflectSchema from './ReflectSchema';




const TeamsQuery = gql`
query allTeamsByClassId($classId:Int!){ 
	allTeams(condition:{classId:$classId}) {
    nodes {
      ...TeamMembers
    }
  }
}
${ReflectSchema.team}
`;





const TeamDropdownSelectorWithDataPropTypes = {


}


const TeamDropdownSelectorWithData = compose (

    graphql(TeamsQuery, {
       name: 'teamsQuery',
        options: ({classId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {
                classId: classId
            }
        }),

        props: ({ownProps, teamsQuery:  {loading, error, allTeams, refetch}}) => ({
            loading: loading,

            teams: (error || loading || !allTeams || !allTeams.nodes ) ? []
                :allTeams.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active}) => (
        () =>
        {
            return !active;
        }
        )()
    }),


)(TeamDropdownSelectorTable);



TeamDropdownSelectorWithData.propTypes = TeamDropdownSelectorWithDataPropTypes;


export default TeamDropdownSelectorWithData;