import React, { Component } from 'react';

import CurrentLanguageDropdownSelectorTable from '../Components/CurrentLanguageDropdownSelector';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';



import Configuration from './Configuration';

import ReflectSchema from './ReflectSchema';

import _ from 'lodash';

//
// query {
//     currentUser {
//         username
//         teamsByUserId {
//             totalCount
//             nodes {
//                 name
//             }
//         }
//     }
// }

// query($userId:Int!) {
//     userById(id:$userId) {
//         username
//         teamsByUserId {
//             totalCount
//             nodes {
//                 name
//             }
//         }
//     }
// }

//
// const TeamsQuery = gql`
// query($userId:Int!) {
//   userById(id:$userId) {
//     ...DeepUserMembers
//     teamsByUserId {
//       totalCount
//       nodes {
//         ...TeamMembers
//       }
//     }
//   }
// }
// ${ReflectSchema.deepUser}
// ${ReflectSchema.team}
// `;
//
//
//
// const AllTeamsQuery = gql`
// query {
//   allTeams {
//     totalCount
//     nodes {
//       ...TeamMembers
//     }
//   }
// }
// ${ReflectSchema.team}
// `;
//



const UpdateCurrentLanguageMutation = gql`
mutation($updateUserByIdInput:UpdateUserByIdInput!) {
  
    updateUserById(input:$updateUserByIdInput) {
    user {
      ...DeepUserMembers
      teamsByUserId {
        totalCount
        nodes {
           ...TeamMembers
        }
      }
    }
  }
}

${ReflectSchema.deepUser}
${ReflectSchema.team}
`;

// const UpdateCurrentLanguageMutation = gql`
// mutation($teamAddUserInput:TeamAddUserInput!) {
//
//   teamAddUser(input:$teamAddUserInput)
//   {
//     user {
//       ...DeepUserMembers
//       teamsByUserId {
//         totalCount
//         nodes {
//            ...TeamMembers
//         }
//       }
//
//     }
//   }
// }
// ${ReflectSchema.deepUser}
// ${ReflectSchema.team}
// `;
//



const CurrentLanguageDropdownSelectorWithDataPropTypes = {


}


const CurrentLanguageDropdownSelectorWithData = compose (


    graphql(UpdateCurrentLanguageMutation, {
        name: 'UpdateCurrentLanguageMutation',

        props: ({UpdateCurrentLanguageMutation, ownProps: {user}}) => ({
            updateCurrentLanguage: (language) => {

                console.log("UpdateCurrentLanguageMutation: GOT: userid" + user.id + " and language" + language);

                return UpdateCurrentLanguageMutation({
                    variables: {
                        updateUserByIdInput: {
                            id: user.id,
                            userPatch: {
                                language: language
                            }
                        }
                    }
                })
                    .then(({data}) => {

                        console.log("UpdateCurrentLanguageMutation succeeded");

                        return data;

                    }).catch((error) => {
                        console.log('there was an error sending the mutation', error);

                    })
            }
        }),
    }),



)(CurrentLanguageDropdownSelectorTable);



CurrentLanguageDropdownSelectorWithData.propTypes = CurrentLanguageDropdownSelectorWithDataPropTypes;


export default CurrentLanguageDropdownSelectorWithData;
