import React, {Component} from 'react';

import MaterialsTable from '../Components/MaterialsTable.js';

import {gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose} from 'react-apollo';

import PropTypes from 'prop-types';

import ReflectSchema from './ReflectSchema';


import Configuration from './Configuration';

import _ from 'lodash';


// const MaterialsQuery = gql`
// query MaterialsByUserId($userId:Int!, $step:String!) {
//   userById(id:$userId) {
//     ...UserMembers
//     MaterialsByUserId(condition:{step:$step}) {
//       totalCount
//       nodes {
//         ...MaterialMembers
//         user: userByUserId {
//            ...UserMembers
//         }
//       }
//     }
//   }
// }
// ${ReflectSchema.user}
// ${ReflectSchema.material}
// `;




const TeamMaterialsQuery = gql`
query MaterialsByUsersTeam($userId:Int!){
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      materialsByTeamId {
        totalCount
        nodes {
          ...MaterialMembers       
        }
      }
    }
  }
  
}
${ReflectSchema.user}
${ReflectSchema.team}
${ReflectSchema.material}
`;




const CreateMaterialMutation = gql`
mutation createMaterial($createMaterialInput:CreateMaterialInput!)
{
  createMaterial(input:$createMaterialInput) {
    material {
        ...MaterialMembers
    }
  }
}
${ReflectSchema.material}
`;


const DeleteMaterialMutation = gql`
mutation deleteMaterialById($deleteMaterialByIdInput:DeleteMaterialByIdInput!)
{
  deleteMaterialById(input:$deleteMaterialByIdInput) {

    deletedMaterialId

  }
}
`;


const UpdateMaterialMutation = gql`
mutation updateMaterialById($updateMaterialByIdInput:UpdateMaterialByIdInput!)
{
  updateMaterialById(input:$updateMaterialByIdInput) {

    material {
        ...MaterialMembers
    }

  }
}
${ReflectSchema.material}
`;


const MaterialsTableWithDataPropTypes = {

    userId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,
    //problemId: PropTypes.number.isRequired,
    //step: PropTypes.string.isRequired,
    //useTeamMaterialQuery: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
}


const MaterialsTableWithData = compose(

    graphql(TeamMaterialsQuery, {
        name: 'teamMaterialsQuery',
        options: ({userId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId: userId}
        }),

        props: ({ownProps, teamMaterialsQuery: {loading, error, userById, refetch}}) => ({
            loading: loading,

            Materials: (error || loading || !userById || !userById.currentTeam || !userById.currentTeam.materialsByTeamId || !userById.currentTeam.materialsByTeamId.nodes) ? []
                : userById.currentTeam.materialsByTeamId.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active}) => !active,
    }),


    graphql(CreateMaterialMutation, {
        name: 'createMaterialMutation',



        props: ({createMaterialMutation, ownProps: {teamId, classId}}) => ({
            addMaterial: (material) => {

                delete material.id; //server will generate

                //material.userId = userId;
                material.teamId = teamId;
                material.classId = classId;


                let order = parseInt(material.order);
                material.order = order;


                console.log("Material to add: ");
                console.log(material);

                return createMaterialMutation({
                    variables: {
                        createMaterialInput: {
                            material: material
                        }
                    }
                })
                    .then(({data}) => {

                        //console.log("material added: ");
                        //console.log(data);

                    }).catch((error) => {
                        console.log('there was an error sending the create mutation', error);

                    })
            }
        }),
    }),

    graphql(UpdateMaterialMutation, {
        name: 'updateMaterialMutation',

        props: ({updateMaterialMutation}) => ({
            updateMaterial: (materialId, patch) => {

                return (() => {

                    //console.log("will update: " + materialId);
                    //console.log("patch:");
                    //console.log(patch);

                    return updateMaterialMutation({
                        variables: {
                            updateMaterialByIdInput: {
                                id: materialId,
                                materialPatch: patch
                            }
                        }
                    });
                })()
                    .then(({data}) => {

                        //console.log("got this back: ");
                        //console.log(data);

                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),


    graphql(DeleteMaterialMutation, {
        name: 'deleteMaterialMutation',

        props: ({deleteMaterialMutation}) => ({
            deleteMaterial: (materialId) => {

                return deleteMaterialMutation({
                    variables: {
                        deleteMaterialByIdInput: {
                            id: materialId
                        }
                    }
                })
                    .then(({data}) => {

                    }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                    })
            }
        }),
    })
)(MaterialsTable);


MaterialsTableWithData.propTypes = MaterialsTableWithDataPropTypes;


export default MaterialsTableWithData;
