import React, { Component } from 'react';

import CurrentProblem from '../Components/CurrentProblem.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import ReflectSchema from './ReflectSchema';

import PropTypes from 'prop-types';

import Configuration from './Configuration';

// const ProblemQuery = gql`
// query problemsByUsersTeam($userId:Int!, $tag:String!) {
//
//   userById(id:$userId) {
//
//     nodeId
//     id
//     username
//     firstName
//     middleName
//     lastName
//     fullName
//     currentTeam {
//       nodeId
//       id
//       problemsByTeamId(condition:{tag:$tag}) {
//         totalCount
//         nodes {
//           nodeId
//           id
//           title
//           description
//           userId
//           teamId
//           tag
//           userByUserId {
//             nodeId
//             id
//             fullName
//           }
//         }
//       }
//     }
//   }
// }
// `;


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


//{"updateTeamProblemByIdInput": {
//    "id": 112,
//        "teamProblemPatch": {
//        "problem": "I like this problem better"
//    }
//}
//}




const CurrentProblemWithDataPropTypes = {

    userId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,

}


const CurrentProblemWithData = compose (

    // graphql(ProblemQuery, {
    //    name: 'problemQuery',
    //
    //     options: ({userId, tag}) => ({
    //         pollInterval: Configuration.pollIntervalMS,
    //
    //         variables: {
    //             userId: userId,
    //             tag:tag,
    //
    //         }
    //     }),
    //
    //     props: ({ownProps, problemQuery:  {loading, userById, error, refetch}}) => ({
    //         loading: loading,
    //         //getProblem: () => {
    //         //    console.log("getProblem() called for team:"+ownProps.teamId);
    //         //    console.log(teamById);
    //         //    if(teamById && teamById.teamProblemByTeamId && teamById.teamProblemByTeamId.nodes)
    //         //        return teamById.teamProblemByTeamId.nodes;
    //         //    else
    //         //        return [];
    //         //},
    //
    //         currentProblem: (error || loading || !userById || !userById.currentTeam || !userById.currentTeam.problemsByTeamId ||
    //             !userById.currentTeam.problemsByTeamId.nodes
    //         ) ? []
    //             :(() => {
    //                      //console.log(userById.currentTeam.problemsByTeamId.nodes);
    //                      return userById.currentTeam.problemsByTeamId.nodes;
    //                  })()
    //         //   :allProblems.nodes
    //
    //         // problemDescrption:  (() => {
    //         //     console.log(allProblems);
    //         //     return [];
    //         // })()
    //         ,
    //         refetch: () => {
    //
    //             return refetch();
    //         },
    //     })
    // }),



    graphql(SelectProblemMutation, {
        name: 'selectProblemMutation',

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




)(CurrentProblem);



CurrentProblemWithData.propTypes = CurrentProblemWithDataPropTypes;


export default CurrentProblemWithData;
