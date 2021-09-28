import React, { Component } from 'react';

import UsersTable from '../Components/UsersTable.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';


import Configuration from './Configuration';


import ReflectSchema from './ReflectSchema';


const UsersQuery = gql`
query {
  
  allUsers {
    totalCount
    nodes {
      ...DeepUserMembers
    }
  }
}
${ReflectSchema.deepUser}
`;


//first get all the classes this user can see and then retrieve
// all the users in all of those classes.
//Has to come up with a way of avoiding duplicates
const getUsersInClassesByOwnerId =  gql`

query getUsersInClassesByUserId($userId:Int!){
  userById(id:$userId){
     id
     classesByOwnerId {
     nodes {
      classUsersByClassId {
       nodes {
          userByUserId {
           ...DeepUserMembers
          }
        }
        
      }
     }
   }
  }
 }  
${ReflectSchema.deepUser}
`;


const CreateUserMutation =  gql`
mutation createUser($createUserInput:CreateUserInput!)
{
  createUser(input:$createUserInput) {
    user {
      nodeId
      id
      name
      isActive
      power
      problemId
      userId
    }
  }
}
`;

const DeleteUserMutation = gql`
mutation deleteUserById($deleteUserByIdInput:DeleteUserByIdInput!)
{
  deleteUserById(input:$deleteUserByIdInput) {

    deletedUserId

  }
}
`;


const UpdateUserMutation = gql`
mutation updateUserById($updateUserByIdInput:UpdateUserByIdInput!)
{
  updateUserById(input:$updateUserByIdInput) {

    user {
      nodeId
      id
      name
      isActive
      power
      problemId
      userId
    }

  }
}

`;




const UsersTableWithDataPropTypes = {

    //userId: PropTypes.number.isRequired,
    //problemId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    isEditor: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired
}


const UsersTableWithData = compose (

    graphql(UsersQuery, {
       name: 'usersQuery',
        options: ({}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {}
        }),

        props: ({ownProps, usersQuery:  {loading, error, allUsers, refetch, active}}) => ({
            loading: loading,

            users: (error || loading || !allUsers ||  !allUsers.nodes ) ? []
                :allUsers.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, isEditor}) => !active || isEditor
    }),

    graphql(getUsersInClassesByOwnerId , {
        name: 'usersQuery',
        options: ({userId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId}
        }),

        props: ({ownProps, usersQuery:  {loading, error, userById, refetch, active}}) => ({
            loading: loading,

            users: (()=> {
                let ret = [];
                if (!(error || loading || !userById ))
                    if (userById.classesByOwnerId)
                        var classUsersByClassId  = userById.classesByOwnerId.nodes
                        for (var classes in classUsersByClassId) {
                            var users = classUsersByClassId[classes].classUsersByClassId.nodes
                            for (var index in users) {
                                ret.push(users[index].userByUserId)
                            }
                        }
                return ret;

            })(),

            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, isEditor}) => !active || !isEditor
    }),



)(UsersTable);



UsersTableWithData.propTypes = UsersTableWithDataPropTypes;


export default UsersTableWithData;