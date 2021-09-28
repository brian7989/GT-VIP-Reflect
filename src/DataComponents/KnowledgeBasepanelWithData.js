import React, { Component } from 'react';

import KnowledgeBaseSearchPanel from '../Components/KnowledgeBasePanel.js';

import { gql, graphql} from 'react-apollo';



import Configuration from './Configuration';




const LoginMutation = gql`
mutation($authInput:AuthenticateInput!) {
    authenticate(input: $authInput) {
        jwtToken
    }
}
`;



const  KnowledgeBasePanelWithData = graphql(LoginMutation, {
    props: ({ mutate }) => ({
        submit: (links) =>
            mutate({ variables: { citationLinks: {links: links} } })
                .then(({ data }) => {
                    //console.log('got data', data);
                  //  alert("Your link has been saved!")
                }).catch((error) => {
                console.log('there was an error sending the query', error);

                localStorage.removeItem("token");
            }),
    }),
})(KnowledgeBaseSearchPanel);



export default KnowledgeBasePanelWithData;
