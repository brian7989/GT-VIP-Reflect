import React, { Component } from 'react';

import TeamMemberDropdownSelector from '../Components/TeamMemberDropdownSelector.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import ReflectSchema from './ReflectSchema';

import PropTypes from 'prop-types';



import Configuration from './Configuration';




const TeamMembersQuery = gql`
query teamUsersByTeamId($teamId:Int!){
  
  teamById(id:$teamId) {
    ...TeamMembers
    teamUsersByTeamId {
      totalCount
      nodes {
        nodeId
        teamId
        userId
        userByUserId {
            ...UserMembers
            currentClass {
                ...ClassMembers
            }
        }
      }
    }
  }
}
${ReflectSchema.team}
${ReflectSchema.user}
${ReflectSchema.reflectClass}
`;

//
// {
//     "teamId": 3
// }










const TeamMemberDropdownSelectorWithDataPropTypes = {

    teamId: PropTypes.number.isRequired,


}


const TeamMemberDropdownSelectorWithData = compose (

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



)(TeamMemberDropdownSelector);



TeamMemberDropdownSelectorWithData.propTypes = TeamMemberDropdownSelectorWithDataPropTypes;


export default TeamMemberDropdownSelectorWithData;
