import Argument from "../Components/Argument.js";

import { gql, graphql, compose } from "react-apollo";
import Configuration from "./Configuration";
import PropTypes from "prop-types";
import ReflectSchema from "./ReflectSchema.js";
import _ from 'lodash';

const UpdateArgumentClaim = gql `
    mutation updateArgumentClaim(
            $updateArgumentClaimByIdInput: UpdateArgumentClaimByIdInput!,
            $updateArgumentMapByIdInput: UpdateArgumentMapByIdInput!
        ){
        updateArgumentClaimById(input: $updateArgumentClaimByIdInput)
        {
            argumentClaim{
                ...ArgumentClaimInfo
            }
        }
        updateArgumentMapById(input: $updateArgumentMapByIdInput)
        {
            argumentMap{
                ...ArgumentMapClaim
            }
        }
    }
    ${ReflectSchema.argumentClaimInfo}
    ${ReflectSchema.argumentMapClaim}
    `;

const AddArgumentClaimReason = gql`
    mutation createArgumentReasonWrapper(
            $addArgumentClaimReasonInput: CreateArgumentReasonWrapperInput!
        ){
        createArgumentReasonWrapper( input: $addArgumentClaimReasonInput) 
        {
            argumentReasonWrapper {
                ...ArgumentReasonOnReasonWrapper
            }
        }
    }
    ${ReflectSchema.argumentReasonWrappers}
    `;

const ArgumentClaimQuery = gql`
    query ($argumentClaimId: Int!) {
        argumentClaimById(id: $argumentClaimId) {
            ...ArgumentClaimInfo
            ...ArgumentReasonWrapperOnClaim
        }
    }
    ${ReflectSchema.argumentReasonWrapperOnClaim}
    ${ReflectSchema.argumentClaimInfo}
`;


const ArgumentWithData = compose(
    graphql(UpdateArgumentClaim, {
        name: 'UpdateArgumentClaim',
        props: ({UpdateArgumentClaim, ownProps:{mapId, argumentClaim}})=> ({
            updateClaim : (text) => {
                return UpdateArgumentClaim({
                    variables: {
                        updateArgumentClaimByIdInput:{
                            id: argumentClaim.id,
                            argumentClaimPatch: {
                                description: text
                              }
                        },
                        updateArgumentMapByIdInput:{
                            id: mapId,
  	                        argumentMapPatch: {
    	                        title: text
                            }
                        }
                    }
                }).then(({data}) => {

                }).catch((error) => {
                    console.log('there was an error sending the update mutation', error)
                })
            }
        })
    }),
    graphql(AddArgumentClaimReason, {
        name: 'AddArgumentClaimReason',
        options: ({argumentClaim}) => ({
            update: (proxy, {data: {createArgumentReasonWrapper}}) => {
                const data = proxy.readQuery(
                    {query: ArgumentClaimQuery,
                        variables: {
                            argumentClaimId: argumentClaim.id
                        }
                    });
    
                if(!_.has(createArgumentReasonWrapper, 'argumentReasonWrapper'))
                    return;

                if(!_.has(data, 'argumentClaimById.argumentReasonWrappersByParentArgumentClaimId'))
                    return;

                data.argumentClaimById.argumentReasonWrappersByParentArgumentClaimId.nodes.push(
                    createArgumentReasonWrapper.argumentReasonWrapper
                );

                proxy.writeQuery(
                    {query: ArgumentClaimQuery,
                        variables: {
                            argumentClaimId: argumentClaim.id
                        },
                        data: data,
                    });
            },
        }),
        props:({AddArgumentClaimReason, ownProps:{argumentClaim}}) => ({
            addClaim : () => {
                return AddArgumentClaimReason({
                    variables: {
                        addArgumentClaimReasonInput: {
                            argumentReasonWrapper: {
                                argumentReasonsUsingId:{
                                    create: [
                                        {
                                            description: "New Reasoning"
                                        }
                                    ]
                                },
                                argumentClaimToParentArgumentClaimId: {
                                    connectById: {
                                        id: argumentClaim.id
                                    }
                                }
                            }
                        }
                    }
                }).then(({data}) => {

                }).catch((error) => {
                    console.log('there was an error sending the update mutation', error)
                })
            }
        })
    })
    
)(Argument);

export default ArgumentWithData;
