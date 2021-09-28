import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { gql, graphql, compose } from 'react-apollo';



import PropTypes from 'prop-types';


import MainApp from '../Components/MainApp';


import ReflectSchema from './ReflectSchema';

const MainAppIntermedDataPropTypes = {
    logInSubmit: PropTypes.func.isRequired,
    resetStore: PropTypes.func.isRequired,
    user: PropTypes.object,
}


class MainAppIntermedData extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loginStatusCallback: null,
        };

    }


    //A bit fragile; assumes no components loaded with Apollo bindings
    //Working on assumption that logInSubmit() can only be called from login modal
    //If modal is showing, I know that all other components are unloaded
    logInSubmit(username, password)
    {

        localStorage.removeItem("token");


        this.props.resetStore().then(
            () => {

                return this.props.logInSubmit(username, password);
            }
        ).then(
            () => {

                return this.props.resetStore();
            }
        ).then(
            () => {

                let loggedIn = this.getIsLoggedIn();

                return this.state.loginStatusCallback(loggedIn, !loggedIn);
            }
        );
    }




    getIsLoggedIn() {

        //TODO could further check by query
        const token = localStorage.getItem('token');
        console.log("getIsLoggedIn():"+(token !== null));

        if(token !== null && token !== "null") {
            return true;
        }

        return false;
    }

    logOut() {

        localStorage.removeItem("token");


        if(this.state.loginStatusCallback)
        {
            this.state.loginStatusCallback(this.getIsLoggedIn(), false);
        }
    }

    setLoginStatusCallback(cbk)
    {
        this.setState({loginStatusCallback: cbk});
    }


    render() {

        console.log("XXXXXXXXX");
        console.log(this.props.user);

        return (
            <div className="ApolloDemoForm">

                <MainApp
                    logInSubmit={(username, password) => {return this.logInSubmit(username, password)}}
                    installLoginStatusCallback={(cbk) => {return this.setLoginStatusCallback(cbk)}}
                    getIsLoggedIn={() => {return this.getIsLoggedIn()}}
                    logOut={() => {return this.logOut()}}
                    debugGetCurrentUser={() => {return this.props.getCurrentUser();}}
                    debugResetStore={() => {this.props.resetStore();}}
                    user={this.props.user}
                />

            </div>

        );

    }
}


MainAppIntermedData.propTypes = MainAppIntermedDataPropTypes;


const CurrentUserQuery = gql`
query {
  currentUser {
    ...DeepUserMembers
  }
}
${ReflectSchema.deepUser}


`;



const LoginMutation = gql`
mutation($authInput:AuthenticateInput!) {
    authenticate(input: $authInput) {
        jwtToken
    }
}
`;






//const MainAppIntermedDataRouting = withRouter(MainAppIntermedData);

const MainAppWithDataPropTypes = {

    userQueryActive: PropTypes.bool.isRequired
}




const MainAppWithData = compose (

    graphql(LoginMutation, {
        name: 'logInMutation',
        props: ({ logInMutation }) => ({
            logInSubmit: (username, password) => {

                return logInMutation({ variables: { authInput: {username: username, password:password} } })
                    .then(({ data }) => {


                        if(data.authenticate.jwtToken !== null && data.authenticate.jwtToken !== 'null') {
                            localStorage.setItem("token", data.authenticate.jwtToken);
                        }
                        else {

                            localStorage.removeItem("token");
                        }


                    }).catch((error) => {
                        console.log('there was an error sending the query', error);

                        localStorage.removeItem("token");
                    })},
        })
    }),


    // //NOT CURRENTLY USED
    //
    graphql(CurrentUserQuery, {
        name: 'currentUserQuery',
        //       options: { fetchPolicy: 'network-only' },

        props: ({ownProps, currentUserQuery:  {loading, currentUser, refetch}}) => ({
            loading: loading,
            user: (() => {

                if(loading) {

                    return null;
                }

                if(currentUser) {

                    return currentUser;

                }


                return null;
            })(),
            refetch: () => {

                return refetch();
            },
        }),
    })


)(MainAppIntermedData);


MainAppIntermedData.propTypes = MainAppIntermedDataPropTypes;


export { MainAppWithData};
