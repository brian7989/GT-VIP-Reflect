import React, { Component } from 'react';

import ProblemPanel from '../Components/ProblemPanel.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';


import ReflectSchema from './ReflectSchema';




import Configuration from './Configuration';




import PropTypes from 'prop-types';



const TeamByIdQuery = gql`
query teamById($teamId:Int!){  
  teamById(id:$teamId) {
    ...TeamMembers   
  }
}
${ReflectSchema.team}
`;


const CurrentUserQuery = gql`
query {
  currentUser {
    ...DeepUserMembers
  }
}
${ReflectSchema.deepUser}
`;


const SelectProblemMutation = gql`

mutation updateTeamById($updateTeamByIdInput:UpdateTeamByIdInput!){

	updateTeamById(input:$updateTeamByIdInput) {
    team {
      ...TeamMembers
    }
  }
}
${ReflectSchema.team}
`;




const ProblemPanelWithDataPropTypes = {


}


const ProblemPanelWithData = compose (

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
            teamInfo: (() => {

                if(loading) {

                    console.log("Loading sorry");

                    return null;
                }

                if(teamById) {

                    console.log("team:");
                    console.log(teamById);

                    return teamById;

                }


                return null;
            })(),
            refetch: () => {

                console.log("refetching is here");

                return refetch();
            },
        }),
        skip:({active}) => !active
    }),





    graphql(SelectProblemMutation, {
        name: 'selectProblemMutation',


        // Not an array/list query. So update() impl in not necessary for cache update
        // options:  ({teamId}) => ({
        //     update: (proxy, { teamTestData: { updateTeamById } }) => {
        //
        //         let query = {query: TeamByIdQuery,
        //             variables: {
        //                 teamId: teamId,
        //             }};
        //
        //         const teamTestData = proxy.readQuery(query);
        //
        //         teamTestData.teamById.push(updateTeamById.team);
        //
        //         query.teamTestData = teamTestData;
        //
        //         proxy.writeQuery(query);
        //     },
        // }),

        props: ({ selectProblemMutation }) => ({
            selectProblem: (teamId, problemId) => {

                return selectProblemMutation({
                    variables: {
                        updateTeamByIdInput: {
                            id: teamId,
                            teamPatch: {
                                selectedProblemId: problemId
                            }
                        }
                    }
                })
                    .then(({ data }) => {

                        console.log("Data returned on selectProblemMutation:");
                        console.log(data);


                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),


)(ProblemPanel);



ProblemPanelWithData.propTypes = ProblemPanelWithDataPropTypes;


export default ProblemPanelWithData;