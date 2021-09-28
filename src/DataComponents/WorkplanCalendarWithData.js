import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import WorkplanCalendar from "../Components/WorkplanCalendar";
import ReflectSchema from "./ReflectSchema";





const WorkplanQuery = gql`
query workplanById($workplanId:Int!){
  workplanById(id: $workplanId) {
    id
    name
    description   
    phasesByWorkplanId {
      nodes {
        id
        name
        description
        dueDate
        isDueDate
        dueDateType
        modulesByPhaseId {
          nodes {
            id
            name
            description
            dueDate
            isDueDate
            dueDateType
            hide
            moduleStepsByModuleId {
              nodes {
                id
                name
                description
                dueDate
                isDueDate
                dueDateType
                moduleScale {
                    scale
                    description
                }
              }
            }
          }
        }
      }
    }
  }
}
`;


const UpdateUserMutation = gql`
mutation updateUserById($updateUserByIdInput:UpdateUserByIdInput!) {
  
  updateUserById(input:$updateUserByIdInput)
  {
    user {
        ...UserMembers
    }
  }
  
}
${ReflectSchema.user}
`;



const WorkplanCalendarWithDataPropTypes = {
    workplanId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
}

const WorkplanCalendarWithData = compose (

    graphql(WorkplanQuery, {
        name: 'workplanQuery',
        options: ({workplanId}) => ({

            // pollInterval: Configuration.pollIntervalMS,
            variables: {workplanId: workplanId}
        }),

        props: ({ownProps, workplanQuery:  {loading, error, workplanById, refetch}}) => ({
            loading: loading,
            workplan: (error || loading || !workplanById) ? {}
                : (() => {
                    console.log('Fetch workplan = ', workplanById);
                    return workplanById;
                })(),
            refetch: () => {
                return refetch();
            },
        }),

        skip: ({ active }) => !active,
    }),

    graphql(UpdateUserMutation, {
        name: 'updateUserMutation',

        props: ({ updateUserMutation }) => ({
            updateUser: (userId, patch) => {

                console.log("Updating user from Workplan Calendar!");

                if(userId < 0) {
                    console.log("No user id set. Will not update!");
                    return;
                }

                return updateUserMutation({
                    variables: {
                        updateUserByIdInput: {
                            id: userId,
                            userPatch: patch
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

)(WorkplanCalendar);

WorkplanCalendarWithData.propTypes = WorkplanCalendarWithDataPropTypes;

export default WorkplanCalendarWithData;
