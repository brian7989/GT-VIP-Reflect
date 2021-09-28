import _ from 'lodash';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import WorkplansTableForLandingPage from "../Components/WorkPlanForLandingPage";
import WorkplansTable from '../Components/WorkplansTable.js';
import Configuration from './Configuration';
import ReflectSchema from './ReflectSchema';



const WorkplansQuery = gql`
query {
  
  allWorkplans {
    totalCount
    nodes {
      ...WorkplanMembers
    }
  }
}
${ReflectSchema.workplan}
`;


const WorkplansQueryByClass = gql`
query getWorkPlansFromUsersClasses($userId:Int!){
  userById(id:$userId){
     id
     classesByOwnerId {
         nodes {
              workplanByCurrentWorkplanId{
                ...WorkplanMembers
         }
       }
   }
  }
 }  
${ReflectSchema.workplan}
`;


const CloneWorkplanMutation =  gql`
mutation cloneWorkplan($cloneWorkplanInput:CloneWorkplanInput!) 
{ 
  cloneWorkplan(input:$cloneWorkplanInput) {
    workplan {
      ...WorkplanMembers
    }
  } 
}
${ReflectSchema.workplan}
`;

// {
//     "cloneWorkplanInput":  {
//
//     "sourceWorkplanId": 1
// }
//
// }

const CreateWorkplanMutation =  gql`
mutation createWorkplan($createWorkplanInput:CreateWorkplanInput!)
{
  createWorkplan(input:$createWorkplanInput) {
    workplan {
      ...WorkplanMembers
    }
  }
}
${ReflectSchema.workplan}
`;
//INPUT
// {
//     "createWorkplanInput": {
//     "workplan": {
//         "name": "bob",
//             "power": 1,
//             "workplanId": 374
//
//     }
// }
// }

//A result:
// {
//     "data": {
//     "createWorkplan": {
//         "workplan": {
//             "nodeId": "WyJzdGFrZWhvbGRlcnMiLDEyXQ==",
//                 "id": 12,
//                 "name": "bob",
//                 "isActive": true,
//                 "power": 1,
//                 "problemId": null,
//                 "workplanId": 374
//         }
//     }
// }
// }

const DeleteWorkplanMutation = gql`
mutation deleteWorkplanById($deleteWorkplanByIdInput:DeleteWorkplanByIdInput!)
{
  deleteWorkplanById(input:$deleteWorkplanByIdInput) {

    deletedWorkplanId

  }
}
`;



const UpdateWorkplanMutation = gql`
mutation updateWorkplanById($updateWorkplanByIdInput:UpdateWorkplanByIdInput!)
{
  updateWorkplanById(input:$updateWorkplanByIdInput) {

    workplan {
        ...WorkplanMembers
    }

  }
}
${ReflectSchema.workplan}
`;





const WorkplansTableWithDataPropTypes = {

    //workplanId: PropTypes.number.isRequired,
    //problemId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    isEditor: PropTypes.bool.isRequired,
    userId:  PropTypes.number.isRequired
}



const WorkplansTableWithData = compose (

    graphql(WorkplansQuery, {
       name: 'workplansQuery',
        options: ({}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {}
        }),

        props: ({ownProps, workplansQuery:  {loading, error, allWorkplans, refetch}}) => ({
            loading: loading,

            workplans: (error || loading || !allWorkplans ||  !allWorkplans.nodes ) ? []
                :allWorkplans.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, isEditor}) => !active || isEditor
    }),

    graphql(WorkplansQueryByClass, {
        name: 'workplansQuery',
        options: ({userId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {userId}
        }),

        props: ({ownProps, workplansQuery:  {loading, error, userById, refetch}}) => ({
            loading: loading,

            workplans:(()=> {
                let ret = [];
                console.log("From the editor workplans !!!!!!!!!!!!!!!!!tab!!!");
                console.log(userById);
                if (!(error || loading || !userById))
                    var data = userById.classesByOwnerId.nodes
                    for (var index in data ) {
                            ret.push(data[index].workplanByCurrentWorkplanId)
                    }
                return ret;

            })(),

            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active, isEditor}) => !active || !isEditor
    }),


    graphql(CloneWorkplanMutation, {
        name: 'cloneWorkplanMutation',

        options:  ({}) => ({
            update: (proxy, { data: { cloneWorkplan } }) => {

                let query = {query: WorkplansQuery,
                    variables: {

                    }};

                const data = proxy.readQuery(query);

                if(!_.has(cloneWorkplan, 'workplan')) {
                    console.log( "no workplan" );
                    return;
                }

                if(!_.has(data, 'allWorkplans.nodes')) {
                    console.log( "no allWorkplans.nodes" );
                    return;
                }
                data.allWorkplans.nodes.push(cloneWorkplan.workplan);

                query.data = data;

                proxy.writeQuery(query);
            },
        }),


        props: ({ cloneWorkplanMutation, ownProps: {} }) => ({
            cloneWorkplan: (workplanId) => {

                return cloneWorkplanMutation({
                        variables: {
                            cloneWorkplanInput: {
                                sourceWorkplanId: workplanId
                            }
                        }
                    })
                    .then(({ data }) => {


                    }).catch((error) => {
                        console.log('there was an error sending the create mutation', error);

                    })
            }
        }),
    }),

    // graphql(CreateWorkplanMutation, {
    //     name: 'createWorkplanMutation',
    //
    //     props: ({ createWorkplanMutation, ownProps: {workplanId, problemId} }) => ({
    //         addWorkplan: (workplan) => {
    //
    //             delete workplan.id; //server will generate
    //
    //             workplan.workplanId = workplanId;
    //             workplan.problemId = problemId;
    //
    //             return createWorkplanMutation({
    //                     variables: {
    //                         createWorkplanInput: {
    //                             workplan: workplan
    //                         }
    //                     }
    //                 })
    //                 .then(({ data }) => {
    //
    //
    //                 }).catch((error) => {
    //                     console.log('there was an error sending the create mutation', error);
    //
    //                 })
    //         }
    //     }),
    // }),
    //
    graphql(UpdateWorkplanMutation, {
        name: 'updateWorkplanMutation',

        props: ({ updateWorkplanMutation }) => ({
            updateWorkplan: (workplanId, patch) => {

                return updateWorkplanMutation({
                    variables: {
                        updateWorkplanByIdInput: {
                            id: workplanId,
                            workplanPatch: patch
                        }
                    }
                })
                    .then(({ data }) => {


                    }).catch((error) => {
                        console.log('there was an error sending the update mutation', error);

                    })
            }
        }),
    }),
    //
    //
    // graphql(DeleteWorkplanMutation, {
    //     name: 'deleteWorkplanMutation',
    //
    //     props: ({ deleteWorkplanMutation }) => ({
    //         deleteWorkplan: (workplanId) => {
    //
    //             return deleteWorkplanMutation({
    //                 variables: {
    //                     deleteWorkplanByIdInput: {
    //                         id: workplanId
    //                     }
    //                 }
    //             })
    //                 .then(({ data }) => {
    //
    //                 }).catch((error) => {
    //                     console.log('there was an error sending the delete mutation', error);
    //
    //                 })
    //         }
    //     }),
    // })

)(WorkplansTable);



const WorkplansTableForLandingPageWithData = compose(
    graphql(WorkplansQuery, {
        name: 'workplansQuery',
        options: ({}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {}
        }),

        props: ({ownProps, workplansQuery:  {loading, error, allWorkplans, refetch}}) => ({
            loading: loading,

            workplans: (error || loading || !allWorkplans ||  !allWorkplans.nodes ) ? []
                :allWorkplans.nodes,
            refetch: () => {

                return refetch();
            },
        }),
        skip: ({active}) => !active
    })
)(WorkplansTableForLandingPage);

WorkplansTableWithData.propTypes = WorkplansTableWithDataPropTypes;


export { WorkplansTableWithData, WorkplansTableForLandingPageWithData };

