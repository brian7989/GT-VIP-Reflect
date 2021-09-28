import React, { Component } from 'react';
import { Timeline, Bookmark } from 'react-vertical-timeline';

import WorkplanTable from '../Components/WorkplanTable.js';

import { gql, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';


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

const WorkplanTableWithDataPropTypes = {
    workplanId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
}

const WorkplanTableWithData = compose (

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
)(WorkplanTable);

WorkplanTableWithData.propTypes = WorkplanTableWithDataPropTypes;

export default WorkplanTableWithData;
