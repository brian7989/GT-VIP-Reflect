import ArgumentReasonWrapper from "../Components/ArgumentReasonWrapper"

import { gql, graphql, compose } from "react-apollo";
import Configuration from "./Configuration";
import ReflectSchema from "./ReflectSchema.js";
import _ from 'lodash';

const AddArgumentReasonMutation = gql `
    mutation createArgumentReason($createArgumentReasonInput: CreateArgumentReasonInput!){
        createArgumentReason(input: $createArgumentReasonInput){
            argumentReason{
                ...ArgumentReasonInfo
            }
        }
    }
${ReflectSchema.argumentReasoningInfo}
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


const DeleteArgumentReasonWrapper = gql `
    mutation deleteArgumentReasonWrapperById(
        $deleteArgumentReasonWrapperByIdInput: DeleteArgumentReasonWrapperByIdInput!
        ){
        deleteArgumentReasonWrapperById(input: $deleteArgumentReasonWrapperByIdInput){
            deletedArgumentReasonWrapperId
        }
    }
    `;

const ArgumentReasonWrapperWithData = compose(
    graphql(ArgumentReasonWrappersQuery, {
        name:"ArgumentReasonWrappersQuery",
        options:({id})=> ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {id: id},
        }),
        props: ({ownProps, ArgumentReasonWrappersQuery:  {loading, error, argumentReasonWrapperById, refetch}}) => ({
            loading: loading,
            reasons: (error || !argumentReasonWrapperById || !argumentReasonWrapperById.argumentReasonsByArgumentReasonWrapperId ) ? []
                :(() => {
                    return argumentReasonWrapperById.argumentReasonsByArgumentReasonWrapperId.nodes;
                })(),
            refetch: () => {
                return refetch();
            }
        }),
    }),


    graphql(AddArgumentReasonMutation, {
        name: "AddArgumentReasonMutation",
        options: ({id}) => ({
            update: (proxy, {data: {createArgumentReason}}) => {
                const data = proxy.readQuery(
                    {query: ArgumentReasonWrappersQuery,
                        variables: {
                            id:id
                        }
                    });
                
                if(!_.has(createArgumentReason, 'argumentReason')){
                    return;
                    
                }
                    
                if(!_.has(data, 'argumentReasonWrapperById.argumentReasonsByArgumentReasonWrapperId.nodes'))
                    return;
                    
                data.argumentReasonWrapperById.argumentReasonsByArgumentReasonWrapperId.nodes.push(createArgumentReason.argumentReason);    

                    proxy.writeQuery(
                        {query: ArgumentReasonWrappersQuery,
                            variables: {
                                id: id,
                            },
                            data: data,
                        });
            }
        }),
        props: ({AddArgumentReasonMutation, ownProps:{id}}) => ({
            addCodependentReason: () => {
                return AddArgumentReasonMutation({
                    variables:{
                        createArgumentReasonInput:{
                            argumentReason:{
                                description: "New co-dependent reason",
                                argumentReasonWrapperToArgumentReasonWrapperId:{
                                    connectById:{
                                      id:id
                                    }
                                  }
                            },
                        }
                    }
                }).then(({ data }) => {
                }).catch((error) => {
                    console.log('there was an error sending the create mutation', error);
                })
            }
        })
    }),
    graphql(DeleteArgumentReasonWrapper, {
        name:"DeleteArgumentReasonWrapper",
        options: ({id}) => ({
            update: (proxy, {data: {deleteArgumentReasonWrapperById}}) => {
                const data = proxy.readQuery(
                    {query: ArgumentReasonWrappersQuery,
                        variables: {
                            id:id
                        }
                    });
                
                if(!_.has(deleteArgumentReasonWrapperById, 'deletedArgumentReasonWrapperId')){
                    return;
                }
                    
                if(!_.has(data, 'argumentReasonWrapperById'))
                    return;
                
                console.log(data);
            }
        }),
        props: ({DeleteArgumentReasonWrapper}) => ({
            deleteReasonWrapper: (id) => {
                return DeleteArgumentReasonWrapper({
                    variables:{
                        deleteArgumentReasonWrapperByIdInput:{
                            id:id
                        }
                    }
                }).then(({ data }) => {

                }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                })
            }
        })
    })

)(ArgumentReasonWrapper);
export default ArgumentReasonWrapperWithData;