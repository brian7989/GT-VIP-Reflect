import React, { Component } from 'react';

import ClassDropdownSelector from '../Components/ClassDropdownSelector';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';



import Configuration from './Configuration';


import ReflectSchema from './ReflectSchema';

import _ from 'lodash';



const ClassQueryByMembership = gql`
query userById($userId:Int!) {
  
  userById(id:$userId) {
    ...UserMembers
    classesByUserId {
      nodes {
        ...ClassMembers
      }
    }
  }
  
}
${ReflectSchema.user}
${ReflectSchema.reflectClass}
`;



const ClassQuery = gql`
query {
	allClasses {
    totalCount
    nodes {
      ...ClassMembers     
    }   
  }
}
${ReflectSchema.reflectClass}
`;



const ClassesQueryByOwnerId = gql`
query getClassesByUserId($userId:Int!){
  userById(id:$userId){
    id
    fullName
     classesByOwnerId {
     nodes {
      ...ClassMembers
     }
   }
  }

 }   

${ReflectSchema.reflectClass}
`;


const ClassDropdownSelectorWithDataPropTypes = {

    active: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    isEditor: PropTypes.bool
}


const ClassDropdownSelectorWithData = compose (

    graphql(ClassesQueryByOwnerId, {
        name: 'classesQuery',
        options: ({userId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId}
        }),

        props: ({ownProps, classesQuery: {loading, error, userById, refetch}}) => ({
            loading: loading,

            classes: (()=>{

                let ret = [];
                console.log("From the editor tab. These are the classes!!!");
                console.log(userById);
                console.log(ownProps);

                if (!(error || loading || !userById || !userById.classesByOwnerId.nodes  ))
                    ret = userById.classesByOwnerId.nodes;
                return ret;

            })(),

            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, isAdmin, isEditor}) => !active  || !isEditor || isAdmin
    }),


    graphql(ClassQuery, {
        name: 'classQuery',
        options: ({}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {}
        }),

        props: ({ownProps, classQuery:  {loading, error, allClasses, refetch}}) => ({
            loading: loading,

            classes: (error || loading || !_.has(allClasses, "nodes") ) ?
                (() => {
                    console.log("NOTHING");
                    return [];
                })()
                :(()=> {
                    console.log("ALL CLASSES");
                    console.log(allClasses.nodes);
                    return allClasses.nodes;
                })(),
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, isAdmin, isEditor}) => (
            () =>
            {
                return !active || !isAdmin || isEditor;
            }
        )()
    }),


)(ClassDropdownSelector);



ClassDropdownSelectorWithData.propTypes = ClassDropdownSelectorWithDataPropTypes;


export default ClassDropdownSelectorWithData;