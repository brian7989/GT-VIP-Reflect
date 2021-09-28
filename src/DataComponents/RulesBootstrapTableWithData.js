import React, { Component } from 'react';

import RulesBootstrapTable from '../Components/RulesBootstrapTable.js';

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';

import PropTypes from 'prop-types';

import Configuration from './Configuration';

import ReflectSchema from './ReflectSchema';

import _ from 'lodash';


const RulesQuery = gql`
query teamRulesByTeamId($teamId: Int!) {
    teamById(id: $teamId) {
    ...TeamMembers
    teamRulesByTeamId {
      nodes {
        ...TeamRuleMembers
      }
    }
  }
}
${ReflectSchema.team}
${ReflectSchema.teamRule}
`;

const CreateRuleMutation =  gql`
mutation createTeamRule($createTeamRuleInput: CreateTeamRuleInput!) {
  createTeamRule(input: $createTeamRuleInput) {
    teamRule {
      ...TeamRuleMembers
    }
  }
}
${ReflectSchema.teamRule}
`;



const DeleteRuleMutation = gql`
mutation deleteTeamRuleById($deleteTeamRuleByIdInput: DeleteTeamRuleByIdInput!) {
  deleteTeamRuleById(input: $deleteTeamRuleByIdInput) {

  	deletedTeamRuleId

  }
}
`;


const UpdateRuleMutation = gql`
mutation updateTeamRuleById($updateTeamRuleByIdInput: UpdateTeamRuleByIdInput!) {
  updateTeamRuleById(input: $updateTeamRuleByIdInput) {

  	teamRule {
      ...TeamRuleMembers
    }

  }
}
${ReflectSchema.teamRule}
`;



const RulesBootstrapTableWithDataPropTypes = {

    teamId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
}


const RulesBootstrapTableWithData = compose (

    graphql(RulesQuery, {
       name: 'rulesQuery',
        options: ({teamId}) => ({
            pollInterval: Configuration.pollIntervalMS,

            variables: {teamId: teamId}
        }),

        props: ({ownProps, rulesQuery:  {loading, teamById, error, refetch}}) => ({
            loading: loading,

            rules: (error || loading || !teamById || !teamById.teamRulesByTeamId || !teamById.teamRulesByTeamId.nodes ) ? []
                :teamById.teamRulesByTeamId.nodes
            ,
            refetch: () => {

                return refetch();
            },
        }),
        skip:({active}) => !active,
    }),

    graphql(CreateRuleMutation, {
        name: 'createRuleMutation',

        options:  ({teamId}) => ({
            update: (proxy, { data: { createTeamRule } }) => {

                const data = proxy.readQuery(
                    {query: RulesQuery,
                        variables: {
                            teamId: teamId,

                        }});

                if(!_.has(createTeamRule, 'teamRule'))
                    return;

                if(!_.has(data, 'teamById.teamRulesByTeamId.nodes'))
                    return;

                data.teamById.teamRulesByTeamId.nodes.push(createTeamRule.teamRule);

                proxy.writeQuery(
                    {query: RulesQuery,
                        variables: {
                            teamId: teamId,
                        },
                        data: data,
                    });

            },
        }),


        props: ({ createRuleMutation, ownProps: {teamId} }) => ({
            addRule: (rule) => {

                return createRuleMutation({

                    variables: {
                        createTeamRuleInput: {
                            teamRule: {
                                rule: rule,
                                teamId: teamId
                            }
                        }
                    }
                }).then(({ data }) => {


                    }).catch((error) => {
                        console.log('there was an error sending the create mutation', error);

                    })
            }
        }),
    }),

    graphql(UpdateRuleMutation, {
        name: 'updateRuleMutation',

        props: ({ updateRuleMutation }) => ({
            updateRule: (ruleId, ruleText) => {

                return updateRuleMutation({
                    variables: {
                        updateTeamRuleByIdInput: {
                            id: ruleId,
                            teamRulePatch: {
                                rule: ruleText
                            }
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


    graphql(DeleteRuleMutation, {
        name: 'deleteRuleMutation',

        options:  ({teamId}) => ({
            update: (proxy, { data: { deleteTeamRuleById } }) => {

                const data = proxy.readQuery(
                    {query: RulesQuery,
                        variables: {
                            teamId: teamId,
                        }});

                if(!_.has(deleteTeamRuleById, 'deletedTeamRuleId'))
                    return;

                if(!_.has(data, 'teamById.teamRulesByTeamId.nodes'))
                    return;

                const index = data.teamById.teamRulesByTeamId.nodes.findIndex((d) =>

                {return d.nodeId === deleteTeamRuleById.deletedTeamRuleId;});

                if (index !== -1)
                    data.teamById.teamRulesByTeamId.nodes.splice(index, 1);

                proxy.writeQuery(
                    {query: RulesQuery,
                        variables: {
                            teamId: teamId,
                        },
                        data: data,
                    });
            },
        }),

        props: ({ deleteRuleMutation }) => ({
            deleteRule: (ruleId) => {

                return deleteRuleMutation({
                    variables: {
                        deleteTeamRuleByIdInput: {
                            id: ruleId
                        }
                    }
                })
                    .then(({ data }) => {

                    }).catch((error) => {
                        console.log('there was an error sending the delete mutation', error);

                    })
            }
        }),
    })

)(RulesBootstrapTable);



RulesBootstrapTableWithData.propTypes = RulesBootstrapTableWithDataPropTypes;


export default RulesBootstrapTableWithData;
