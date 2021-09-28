import React, { Component } from 'react';

import UserInfo from '../Components/UserInfo.js';

import { gql, graphql, compose } from 'react-apollo';


import ReflectSchema from './ReflectSchema';
import PropTypes from "prop-types";
import TeamDropdownSelectorWithData from "./TeamDropdownSelectorWithData";


import Configuration from './Configuration';




const CurrentUserQuery = gql`
query {
  currentUser {
    ...DeepUserMembers
  }
}
${ReflectSchema.deepUser}


`;


const UserInfoWithDataPropTypes = {

    active: PropTypes.bool.isRequired
}



const UserInfoWithData = compose (

    graphql(CurrentUserQuery, {
        name: 'currentUserQuery',
        options: {
//            fetchPolicy: 'network-only',
//            pollInterval: Configuration.pollIntervalMS,
        },

        props: ({ownProps, currentUserQuery:  {loading, currentUser, refetch}}) => ({
            loading: loading,
            user: (() => {


                if(loading) {

                    return null;
                }

                if(currentUser) {






                    //TODO hopefully this can go away once currentProblem is implemented on DB side

                    //TODO As above, also a hack clone here...
                    // let cu = JSON.parse(JSON.stringify(currentUser));
                    //


                    let cu = currentUser;


                    return cu;

                }


                return null;
            })(),
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
    })

)(UserInfo);


UserInfoWithData.propTypes = UserInfoWithDataPropTypes;

export default UserInfoWithData;