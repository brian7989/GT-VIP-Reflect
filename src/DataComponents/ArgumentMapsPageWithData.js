import ArgumentMapsPage from  '../Components/ArgumentMapsPage.js'
import ReflectSchema from "./ReflectSchema";

import { gql, graphql, compose } from 'react-apollo';
import Configuration from "./Configuration";
import PropTypes from "prop-types";
import _ from 'lodash';

const ArgumentMapsWithUsersQuery = gql `
    query($currentTeamId:Int!) {
        teamById(id:$currentTeamId){
            id,
            name,
            argumentMapsByTeamId{
                nodes {
                    ...ArgumentMapClaim
                    userByUserId{
                        ...UserMembers
                    }
                }
            }
        }
    }
    ${ReflectSchema.argumentMapClaim}
    ${ReflectSchema.user}
    `;

const CreateArgumentMapWithClaimMutation = gql `
    mutation createArgumentMap($createArgumentMapInput: CreateArgumentMapInput!){
        createArgumentMap(input: $createArgumentMapInput){
            argumentMap{
                ...ArgumentMapClaim
                userByUserId {
                    ...UserMembers
                }
            }
        }
    }
    ${ReflectSchema.argumentMapClaim}
    ${ReflectSchema.user}
    `;

const DeleteArgumentMapByIdMutation = gql `
    mutation($deleteArgumentMapByIdInput: DeleteArgumentMapByIdInput!){
        deleteArgumentMapById(input:$deleteArgumentMapByIdInput){
            deletedArgumentMapId
        }
    }
    `;

const UpdateArgumentMap = gql `
    mutation($updateArgumentMapByIdInput: UpdateArgumentMapByIdInput!) {
        updateArgumentMapById(input: $updateArgumentMapByIdInput) {
            argumentMap{
                ...ArgumentMapInfo
            }
        }
    }
    ${ReflectSchema.argumentMapInfo}
    `;

const ArgumentMapsPageWithDataPropTypes = {
    argumentMaps: PropTypes.array,
    teamMembers: PropTypes.array
}

const ArgumentMapsPageWithData = compose (
    graphql(ArgumentMapsWithUsersQuery,{
        name: 'ArgumentMapsWithUsersQuery',
        options: ({currentTeamId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {currentTeamId: currentTeamId}
        }),
        props: ({ownProps, ArgumentMapsWithUsersQuery:  {loading, error, teamById, refetch}}) => ({
            loading: loading,
            argumentMaps: (error || loading || !teamById || !teamById.argumentMapsByTeamId ) ? []
                :(() => {
                    let ret = teamById.argumentMapsByTeamId.nodes.map((d) => {
                        return {
                            id: d.id,
                            title: d.title,
                            user: d.userByUserId.fullName,
                            isActive: d.isActive,
                            claim: d.argumentClaimsByArgumentMapId.nodes[0],
                            
                        };
                    },[]);
                    return ret;

                })(),
            refetch: () => {
                return refetch();
            }
        }),  
    }),
    graphql(CreateArgumentMapWithClaimMutation, {
        name:'createArgumentMapWithClaimMutation',
        options: ({currentTeamId}) => ({
            update: (proxy, {data: {createArgumentMap}}) => {
                const data = proxy.readQuery(
                    {query: ArgumentMapsWithUsersQuery,
                        variables: {
                            currentTeamId: currentTeamId
                        }
                    });
    
                if(!_.has(createArgumentMap, 'argumentMap'))
                    return;
    
                if(!_.has(data, 'teamById.argumentMapsByTeamId.nodes'))
                    return;
                    
                data.teamById.argumentMapsByTeamId.nodes.push(createArgumentMap.argumentMap);
                    
                proxy.writeQuery(
                    {query: ArgumentMapsWithUsersQuery,
                        variables: {
                            currentTeamId: currentTeamId,
                        },
                        data: data,
                    });
            },
        }),
        props: ({createArgumentMapWithClaimMutation, ownProps:{currentTeamId, userId}}) => ({
            addMap : (claim) => {
                return createArgumentMapWithClaimMutation({
                    variables: {
                        createArgumentMapInput: {
                            argumentMap :{
                                userId: userId,
                                teamId: currentTeamId,
                                title: claim,
                                isActive: true,
                                argumentClaimsUsingId :{
                                    create: [
                                      {description: claim}
                                    ]
                                  }
                            }
                        }
                    }
                }).then(({ data }) => {
                }).catch((error) => {
                    console.log('there was an error sending the create mutation', error);
                })
            }
        })
    }),
    graphql(DeleteArgumentMapByIdMutation, {
        name: 'deleteArgumentMapByIdMutation',
        options: ({currentTeamId}) => ({
            update: (proxy, {data: {deleteArgumentMapById}}) => {
                const data = proxy.readQuery(
                    {query: ArgumentMapsWithUsersQuery,
                        variables: {
                            currentTeamId: currentTeamId
                        }
                    })
    
                if(!_.has(deleteArgumentMapById, 'deletedArgumentMapId'))
                    return;
    
                if(!_.has(data, 'teamById.argumentMapsByTeamId.nodes'))
                    return;
    
                const index = data.teamById.argumentMapsByTeamId.nodes.findIndex((d) =>

                {return d.nodeId === deleteArgumentMapById.deletedArgumentMapId;});

                if (index !== -1)
                    data.teamById.argumentMapsByTeamId.nodes.splice(index, 1);

                proxy.writeQuery(
                    {query: ArgumentMapsWithUsersQuery,
                        variables: {
                            currentTeamId: currentTeamId,
                        },
                        data: data,
                    });
            },
        }),
        props: ({ deleteArgumentMapByIdMutation }) => ({
            deleteMap: (mapId) => {
                return deleteArgumentMapByIdMutation({
                    variables: {
                        deleteArgumentMapByIdInput: {
                            id: mapId
                        }
                    }
                })
                    .then(({ data }) => {

                    }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                    })
            }
        }),
        
        

    }),
    graphql(UpdateArgumentMap, {
        name: 'UpdateArgumentMap',
        props: ({UpdateArgumentMap}) => ({
            updateArgumentMap: (mapId, patch) => {
                return  UpdateArgumentMap({
                    variables: {
                        updateArgumentMapByIdInput :{
                            id: mapId,
                            argumentMapPatch: patch
                        }
                    }
                })
                .then(({ data }) => {


                }).catch((error) => {
                    console.log('there was an error sending the update mutation', error);

                })
            }
            
        })
    })

)(ArgumentMapsPage);

ArgumentMapsPageWithData.propTypes = ArgumentMapsPageWithDataPropTypes;

export default ArgumentMapsPageWithData;