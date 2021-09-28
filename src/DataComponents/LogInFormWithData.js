import React, { Component } from 'react';

import LogInForm from '../Components/LogInForm.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';



import Configuration from './Configuration';




const LoginMutation = gql`
mutation($authInput:AuthenticateInput!) {
    authenticate(input: $authInput) {
        jwtToken
    }
}
`;



const LogInFormWithData = graphql(LoginMutation, {
    props: ({ mutate }) => ({
        submit: (username, password) =>
            mutate({ variables: { authInput: {username: username, password:password} } })
                .then(({ data }) => {
                    console.log('got data', data);

                    if(data.authenticate.jwtToken !== null && data.authenticate.jwtToken !== 'null') {
                        localStorage.setItem("token", data.authenticate.jwtToken);
                        //alert("You are now logged in!");
                        console.log("user now logged in");
                    }
                    else {

                        console.log("invalid log in return");

                        localStorage.removeItem("token");
                    }

                }).catch((error) => {
                console.log('there was an error sending the query', error);

                localStorage.removeItem("token");
            }),
    }),
})(LogInForm);



export default LogInFormWithData;