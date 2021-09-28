import ArgumentReason from "../Components/ArgumentReason"

import { gql, graphql, compose } from "react-apollo";
import Configuration from "./Configuration";
import ReflectSchema from "./ReflectSchema.js";
import _ from 'lodash';

const UpdateArgumentReason = gql `
    mutation updateArgumentReasonById(
        $updateArgumentReasonByIdInput: UpdateArgumentReasonByIdInput!
        ){
        updateArgumentReasonById(input: $updateArgumentReasonByIdInput)
        {
            argumentReason{
                ...ArgumentReasonInfo
            }
        }
    }
    ${ReflectSchema.argumentReasoningInfo}
    `;
const ArgumentReasonQuery = gql `
    query ($id: Int!){
        argumentReasonById(id: $id){
            ...ArgumentReasonInfo,
            argumentReasonWrappersByParentArgumentReasonId{
                nodes {
                    parentArgumentReasonId
                    ...ArgumentReasonOnReasonWrapper
                }
            }
          }
    }
    ${ReflectSchema.argumentReasoningInfo}
    ${ReflectSchema.argumentReasonWrappers}
    `;
    
const ArgumentReasonWrappersQuery = gql`
    query($id:Int!){
        argumentReasonWrapperById(id: $id){
          ...ArgumentReasonOnReasonWrapper
          
        }
      }
      ${ReflectSchema.argumentReasonWrappers}
    `
    ;

const AddArgumentReasonWrapper = gql`
    mutation createArgumentReasonWrapper(
            $addArgumentReasonInput: CreateArgumentReasonWrapperInput!
        ){
        createArgumentReasonWrapper( input: $addArgumentReasonInput) 
        {
            argumentReasonWrapper {
                parentArgumentReasonId
                ...ArgumentReasonOnReasonWrapper
            }
        }
    }
    ${ReflectSchema.argumentReasonWrappers}
    `;

const DeleteArgumentReason = gql `
    mutation deleteArgumentReason(
        $deleteArgumentReasonInput: DeleteArgumentReasonInput!
        ){
        deleteArgumentReason(input: $deleteArgumentReasonInput){
            argumentReason{
                ...ArgumentReasonInfo
            }
        }
    }
    ${ReflectSchema.argumentReasoningInfo}
    `;

const ArgumentReasonWithData = compose(
    graphql(UpdateArgumentReason, {
        name: "UpdateArgumentReason",
        props:({UpdateArgumentReason, ownProps:{id}}) => ({
            updateReasoning : (text) => {
                return UpdateArgumentReason({
                    variables: {
                        updateArgumentReasonByIdInput :{
                            id: id,
                            argumentReasonPatch:{
                                description: text
                            }
                        }
                    }
                }).then(({data}) => {
                    
                }).catch((error) => {
                    console.log('there was an error sending the update mutation', error);
                })
            }
        })
    }),
    graphql(ArgumentReasonQuery, {
        name: "ArgumentReasonQuery",
        options:({id}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {id: id},
        }),
        props: ({ownProps, ArgumentReasonQuery:  {loading, error, argumentReasonById, refetch}}) => ({
            loading: loading,
            reason: (error || !argumentReasonById) ? []
                :(() => {
                    return argumentReasonById
                })(),
            reasonWrappersOnReason: (error || !argumentReasonById) ? [] 
                : (()=> {
                    let ret = argumentReasonById.argumentReasonWrappersByParentArgumentReasonId.nodes.map(
                        (d) => {
                            return {
                                wrapperId: d.id,
                            };
                        },
                        []
                    );
                    return ret;
                })(),
            refetch: () => {
                return refetch();
            }

        })
    }),
    graphql(AddArgumentReasonWrapper, {
        name: 'AddArgumentReasonWrapper',
        options: ({id}) => ({
            update: (proxy, {data: {createArgumentReasonWrapper}}) => {
                
                if(!_.has(createArgumentReasonWrapper, 'argumentReasonWrapper')){
                    return;   
                }
                let parentId = createArgumentReasonWrapper.argumentReasonWrapper.parentArgumentReasonId
                const data = proxy.readQuery(
                    {query: ArgumentReasonQuery,
                        variables: {
                            id: parentId
                        }
                    });
                    
                if(!_.has(data, 'argumentReasonById.argumentReasonWrappersByParentArgumentReasonId.nodes'))
                    return;
                    
                console.log(data)
                data.argumentReasonById.argumentReasonWrappersByParentArgumentReasonId.nodes.push(createArgumentReasonWrapper.argumentReasonWrapper);
                console.log(data) 
                    proxy.writeQuery(
                        {query: ArgumentReasonQuery,
                            variables: {
                                id: parentId,
                            },
                            data: data,
                        });
            }
        }),
        props:({AddArgumentReasonWrapper, ownProps:{id}}) => ({
            addChildReason : () => {
                return AddArgumentReasonWrapper({
                    variables: {
                        addArgumentReasonInput: {
                            argumentReasonWrapper: {
                                argumentReasonsUsingId:{
                                    create: [
                                        {
                                            description: "New Reasoning"
                                        }
                                    ]
                                },
                                argumentReasonToParentArgumentReasonId: {
                                    connectById: {
                                        id: id
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
    }),
    graphql(DeleteArgumentReason, {
        name: "DeleteArgumentReason",
        options: ({wrapperId}) => ({
            update: (proxy, {data: {deleteArgumentReason}}) => {
                const data = proxy.readQuery(
                    {query: ArgumentReasonWrappersQuery,
                        variables: {
                            id:wrapperId
                        }
                    });
                
                if(!_.has(deleteArgumentReason, 'argumentReason')){
                    return;
                }
                    
                if(!_.has(data, 'argumentReasonWrapperById.argumentReasonsByArgumentReasonWrapperId.nodes'))
                    return;

                const index = data.argumentReasonWrapperById.argumentReasonsByArgumentReasonWrapperId.nodes.findIndex((d) =>

                {return d.nodeId === deleteArgumentReason.argumentReason.nodeId;});
    
                if (index !== -1)
                    data.argumentReasonWrapperById.argumentReasonsByArgumentReasonWrapperId.nodes.splice(index, 1);
                  
                proxy.writeQuery(
                    {query: ArgumentReasonWrappersQuery,
                        variables: {
                            id: wrapperId,
                        },
                        data: data,
                    });
            }
        }),
        props: ({ DeleteArgumentReason }) => ({
            delete: (nodeId) => {
                return DeleteArgumentReason({
                    variables: {
                        deleteArgumentReasonInput: {
                            nodeId: nodeId
                        }
                    }
                }).then(({ data }) => {

                }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                })
            }
        })
    }),
    

)(ArgumentReason);
export default ArgumentReasonWithData;