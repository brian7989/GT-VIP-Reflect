import React, {Component, Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {ApolloClient, createNetworkInterface, ApolloProvider, graphql } from 'react-apollo';

import {MainAppWithData} from './DataComponents/MainAppWithData';


import Configuration from './DataComponents/Configuration';



const DEV_URL = Configuration.devUrl + "graphql";
const PROD_URL = Configuration.prodUrl + "graphql";


const url = !process.env.NODE_ENV || process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;
// const url = DEV_URL;


const networkInterface = createNetworkInterface({
    uri:  url
});


networkInterface.use([{
    applyMiddleware(req, next) {

        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists

        const token = localStorage.getItem('token');

        if (token !== null && token !== "null") {
            req.options.headers.authorization = `Bearer ${token}`;
        }
        else {

            delete req.options.headers;

            //TODO ideally we should tell the rest of the app to log out somehow
        }

        next();
    }
}]);


class ReflectApp extends Component {


    constructor(props) {
        super(props);

        this.state = {
            apolloClient: new ApolloClient({
                networkInterface
            }),
        };
    }

    resetStore() {
        return this.state.apolloClient.resetStore();
    }



    render() {
        return (
            <div className="App">
                <ApolloProvider client={this.state.apolloClient}>
                    <Suspense fallback="loading">
                    <MainAppWithData
                        resetStore={() => {return this.resetStore();}}
                    />
                    </Suspense>
                </ApolloProvider>
            </div>

        );

    }
}




export default ReflectApp;
