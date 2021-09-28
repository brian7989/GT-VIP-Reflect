
import {gql, graphql} from "react-apollo";
import Configuration from "./Configuration";
import _ from 'lodash';



import  {CreateProposalMutation, StakeholdersQuery, OnlyProposalsQuery, TeamStakeholdersQuery, InterestsQuery, CreateInterestMutation, UpdateInterestMutation, DeleteInterestMutation,
    StakeholderProposalQuery, UpdateProposalMutation, CreateStakeholderProposalMutation, UpdateStakeholderProposalMutation, DeleteStakeholderProposalMutation,
    ReasonsQuery, CreateReasonMutation, UpdateReasonMutation, DeleteReasonMutation, CreateStakeholderMutation, UpdateStakeholderMutation,
    DeleteStakeholderMutation} from "./VisualizeWithRightClickQueries";
import ReflectSchema from "./ReflectSchema";




const createStakeholderMutationFunction = graphql(CreateStakeholderMutation, {
    name: 'createStakeholderMutation',

    options: ({userId, step, useTeamStakeholderQuery}) => ({
        update: (proxy, {data: {createStakeholder}}) => {
            //these are extracted from the props of the component that uses this query
            let query = useTeamStakeholderQuery ? TeamStakeholdersQuery : StakeholdersQuery;

            // if(query === TeamStakeholdersQuery && symphysisModeEnabled)
            //     query = TeamSymphysisStakeholdersQuery;

            const data = proxy.readQuery(
                {
                    query: query,
                    variables: {
                        userId: userId,
                        step: step
                    }
                });


            if(!_.has(createStakeholder, 'stakeholder'))
                return;



            if (useTeamStakeholderQuery) {

                //Should work for symphysis mode or not, as only a filter is changed

                if(!_.has(data, 'userById.currentTeam.stakeholdersByTeamId.nodes'))
                    return;

                data.userById.currentTeam.stakeholdersByTeamId.nodes.push(createStakeholder.stakeholder);
            }
            else {

                if(!_.has(data, 'userById.stakeholdersByUserId.nodes'))
                    return;

                data.userById.stakeholdersByUserId.nodes.push(createStakeholder.stakeholder);
            }

            proxy.writeQuery(
                {
                    query: query,
                    variables: {
                        userId: userId,
                        step: step
                    },
                    data: data,
                });
        },
    }),

    props: ({createStakeholderMutation, ownProps: {userId, teamId, problemId, step}}) => ({
        addStakeholder: (stakeholder) => {

            delete stakeholder.id; //server will generate

            stakeholder.userId = userId;
            stakeholder.teamId = teamId;
            stakeholder.problemId = problemId;
            stakeholder.step = step;
            stakeholder.isActive = true;

            let power = parseInt(stakeholder.power);
            stakeholder.power = power;


            return createStakeholderMutation({
                variables: {
                    createStakeholderInput: {
                        stakeholder: stakeholder
                    }
                }
            })
                .then(({data}) => {
                   // alert("the stakeholder was created!!!");
                    console.log("the stakeholder was created!!!");
                    return data;
                }).catch((error) => {
                    console.log('there was an error sending the create mutation', error);

                })
        }
    }),
})

const updateStakeholderMutationFunction = graphql(UpdateStakeholderMutation, {
    name: 'updateStakeholderMutation',

    props: ({updateStakeholderMutation}) => ({
        updateStakeholder: (stakeholderId, patch) => {

            return (() => {

                //console.log("will update: " + stakeholderId);
                //console.log("patch:");
                //console.log(patch);

                return updateStakeholderMutation({
                    variables: {
                        updateStakeholderByIdInput: {
                            id: stakeholderId,
                            stakeholderPatch: patch
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
});

const deleteStakeholderMutationFunction = graphql(DeleteStakeholderMutation, {
    name: 'deleteStakeholderMutation',

    props: ({deleteStakeholderMutation}) => ({
        deleteStakeholder: (stakeholderId) => {

            return deleteStakeholderMutation({
                variables: {
                    deleteStakeholderByIdInput: {
                        id: stakeholderId
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



const createProposalMutationFunction =  graphql(CreateProposalMutation, {
    name: 'createProposalMutation',


    options:  ({teamId, problemId, step, symphysisModeEnabled}) => ({
        update: (proxy, { data: { createProposal } }) => {

            // if not symphsis just return
            //because otherwise a diff query is used

            console.log('update');

            if(!symphysisModeEnabled)
                return;

            let query = {query: OnlyProposalsQuery,
                variables: {
                    teamId: teamId,
                    problemId: problemId,
                    step: step,
                }};

            const data = proxy.readQuery(query);

            console.log(data);
            console.log(createProposal);

            if(!_.has(createProposal, 'proposal'))
                return;



            if(!_.has(data, 'allProposals.nodes'))
                return;

            data.allProposals.nodes.push(createProposal.proposal);

            query.data = data;

            proxy.writeQuery(query);
        },
    }),



    props: ({ createProposalMutation, ownProps: {userId, problemId, addStakeholderProposal} }) => ({
        addProposal: (proposal) => {

            delete proposal.id; //server will generate

            proposal.userId = userId;
            proposal.problemId = problemId;

            return createProposalMutation({
                variables: {
                    createProposalInput: {
                        proposal: proposal
                    }
                }
            })
                .then(({ data }) => {

                    //alert("created proposal data");
                    console.log("created proposal data");

                    return  data ;

                    //addStakeholderProposal(data.createProposal.proposal.id);

                }).catch((error) => {

                    console.log('there was an error sending the create mutation', error);

                });
        }
    }),
})

const createStakeholderProposalMutationFunction = graphql(CreateStakeholderProposalMutation, {
    name: 'createStakeholderProposalMutation',

    options:  ({stakeholderId}) => ({
        update: (proxy, { data: { createStakeholderProposal } }) => {

            let query = {query: StakeholderProposalQuery,
                variables: {
                    stakeholderId: stakeholderId,
                }};

            const data = proxy.readQuery(query);

            if(!_.has(createStakeholderProposal, 'stakeholderProposal'))
                return;

            if(!_.has(data, 'stakeholderById.stakeholderProposalsByStakeholderId.nodes'))
                return;

            data.stakeholderById.stakeholderProposalsByStakeholderId.nodes.push(createStakeholderProposal.stakeholderProposal);

            query.data = data;

            proxy.writeQuery(query);
        },
    }),

    props: ({ createStakeholderProposalMutation, ownProps: {userId, problemId} }) => ({
        addStakeholderProposal: (stakeholderId, proposalId, weight) => {


            let stakeholderProposal = {
                proposalId: proposalId,
                stakeholderId: stakeholderId,
                weight: weight,
                isOwner: true,
            }

            return createStakeholderProposalMutation({
                variables: {
                    createStakeholderProposalInput: {
                        stakeholderProposal: stakeholderProposal
                    }
                }
            })
                .then(({ data }) => {

                    // console.log("addStakeholderProposal() result in then: ");
                    // console.log(data);
                    console.log("the proposal was created!!!");

                    return data;

                }).catch((error) => {

                    console.log('there was an error sending the create mutation', error);

                });
        }
    }),
})




const updateProposalMutationFunction = graphql(UpdateProposalMutation, {
    name: 'updateProposalMutation',

    props: ({ updateProposalMutation }) => ({
        updateProposal: (proposalId, patch) => {

            return updateProposalMutation({
                variables: {
                    updateProposalByIdInput: {
                        id: proposalId,
                        proposalPatch: patch
                    }
                }
            })
                .then(({ data }) => {


                }).catch((error) => {
                    console.log('there was an error sending the update mutation', error);

                })
        }
    }),
});


const updateStakeholderProposalMutationFunction = graphql(UpdateStakeholderProposalMutation, {
    name: 'updateStakeholderProposalMutation',

    props: ({ updateStakeholderProposalMutation }) => ({
        updateStakeholderProposal: (stakeholderId, proposalId, weight) => {

            return updateStakeholderProposalMutation({
                variables: {
                    updateStakeholderProposalByProposalIdAndStakeholderIdInput: {
                        proposalId: proposalId,
                        stakeholderId: stakeholderId,
                        stakeholderProposalPatch: {
                            weight: weight,
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
})

const  deleteStakeholderProposalMutationFunction =  graphql(DeleteStakeholderProposalMutation, {
    name: 'deleteStakeholderProposalMutation',

    props: ({ deleteStakeholderProposalMutation }) => ({
        deleteStakeholderProposal: (stakeholderId, proposalId) => {

            return deleteStakeholderProposalMutation({
                variables: {
                    deleteStakeholderProposalByProposalIdAndStakeholderIdInput: {
                        proposalId: proposalId,
                        stakeholderId: stakeholderId,

                    }
                }
            })
                .then(({ data }) => {

                }).catch((error) => {
                    console.log('there was an error sending the delete mutation', error);

                })
        }
    }),
});



const reasonsQueryFunction  =  graphql(ReasonsQuery, {
    name: 'reasonsQuery',
    options: ({proposalId}) => ({

        pollInterval: Configuration.pollIntervalMS,
        variables: {proposalId: proposalId}
    }),

    props: ({ownProps, reasonsQuery:  {loading, error, proposalById, refetch}}) => ({
        loading: loading,
        reasons: (error || loading || !proposalById || !proposalById.reasonsByProposalId || !proposalById.reasonsByProposalId.nodes ) ? []
            :proposalById.reasonsByProposalId.nodes,
        refetch: () => {

            return refetch();
        },
    })
});



const createReasonMutationFunction  =  graphql(CreateReasonMutation, {
    name: 'createReasonMutation',

    options:  ({proposalId}) => ({
        update: (proxy, { data: { createReason } }) => {

            let query = {query: ReasonsQuery,
                variables: {
                    proposalId: proposalId,
                }};

            const data = proxy.readQuery(query);

            if(!_.has(createReason, 'reason'))
                return;

            if(!_.has(data, 'proposalById.reasonsByProposalId.nodes'))
                return;

            data.proposalById.reasonsByProposalId.nodes.push(createReason.reason);

            query.data = data;

            proxy.writeQuery(query);
        },
    }),

    props: ({ createReasonMutation, ownProps: {userId} }) => ({
        addReason: (proposalId, reason) => {

            delete reason.id; //server will generate

            reason.userId = userId;
            reason.proposalId = proposalId;
            reason.isActive = true;

            return createReasonMutation({
                variables: {
                    createReasonInput: {
                        reason: reason
                    }
                }
            })
                .then(({ data }) => {
                    console.log("The reason was created!!");
                    return  data ;


                }).catch((error) => {

                    console.log('there was an error sending the create mutation', error);

                });
        }
    }),
});



const updateReasonMutationFunction  = graphql(UpdateReasonMutation, {
    name: 'updateReasonMutation',

    props: ({ updateReasonMutation }) => ({
        updateReason: (reasonId, patch) => {

            return updateReasonMutation({
                variables: {
                    updateReasonByIdInput: {
                        id: reasonId,
                        reasonPatch: patch
                    }
                }
            })
                .then(({ data }) => {


                }).catch((error) => {
                    console.log('there was an error sending the update mutation', error);

                })
        }
    }),
});



const deleteReasonMutatationFunction =  graphql(DeleteReasonMutation, {
    name: 'deleteReasonMutation',

    props: ({ deleteReasonMutation }) => ({
        deleteReason: (reasonId) => {

            return deleteReasonMutation({
                variables: {
                    deleteReasonByIdInput: {
                        id: reasonId
                    }
                }
            })
                .then(({ data }) => {

                }).catch((error) => {
                    console.log('there was an error sending the delete mutation', error);

                })
        }
    }),
});



const interestQueryFunction  =  graphql(InterestsQuery, {
    name: 'interestsQuery',
    options: ({reasonId}) => ({

        pollInterval: Configuration.pollIntervalMS,
        variables: {reasonId: reasonId}
    }),

    props: ({ownProps, interestsQuery:  {loading, error, reasonById}}) => ({
        loading: loading,
        interests: (error || loading || !reasonById || !reasonById.interestsByReasonId || !reasonById.interestsByReasonId.nodes ) ? []
            :reasonById.interestsByReasonId.nodes
    }),
    skip: ({active}) => !active
});



const createInterestMutationFunction =   graphql(CreateInterestMutation, {
    name: 'createInterestMutation',

    // options:  ({reasonId}) => ({
    //     update: (proxy, { data: { createInterest } }) => {
    //
    //         let query = {query: InterestsQuery,
    //             variables: {
    //                 reasonId: reasonId,
    //             }};
    //
    //         const data = proxy.readQuery(query);
    //
    //         if(!_.has(createInterest, 'interest'))
    //             return;
    //
    //         if(!_.has(data, 'reasonById.interestsByReasonId.nodes'))
    //             return;
    //
    //         data.reasonById.interestsByReasonId.nodes.push(createInterest.interest);
    //
    //         query.data = data;
    //
    //         proxy.writeQuery(query);
    //     },
    // }),

    props: ({ createInterestMutation, ownProps: {userId} }) => ({
        addInterest: (reasonId, interest) => {

            delete interest.id; //server will generate

            interest.userId = userId;
            interest.reasonId = reasonId;
            interest.isActive = true;

            return createInterestMutation({
                variables: {
                    createInterestInput: {
                        interest: interest
                    }
                }
            })
                .then(({ data }) => {

                    // console.log("addInterest() result in then: ");
                    // console.log(data);
                    console.log("The interest was created!!!");

                    return  data ;


                }).catch((error) => {

                    console.log('there was an error sending the create mutation', error);

                });
        }
    }),
});



const updateInterestMutationFunction =  graphql(UpdateInterestMutation, {
    name: 'updateInterestMutation',

    props: ({ updateInterestMutation }) => ({
        updateInterest: (interestId, patch) => {

            return updateInterestMutation({
                variables: {
                    updateInterestByIdInput: {
                        id: interestId,
                        interestPatch: patch
                    }
                }
            })
                .then(({ data }) => {


                }).catch((error) => {
                    console.log('there was an error sending the update mutation', error);

                })
        }
    }),
});


const deleteInterestMutationFunction = graphql(DeleteInterestMutation, {
    name: 'deleteInterestMutation',

    props: ({ deleteInterestMutation }) => ({
        deleteInterest: (interestId) => {

            return deleteInterestMutation({
                variables: {
                    deleteInterestByIdInput: {
                        id: interestId
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


//stakeholdersProposalQuery,
export {createProposalMutationFunction, createStakeholderMutationFunction, updateStakeholderMutationFunction,  deleteStakeholderMutationFunction,
    createReasonMutationFunction, deleteReasonMutatationFunction, reasonsQueryFunction,
    updateReasonMutationFunction, interestQueryFunction, createInterestMutationFunction,
    updateInterestMutationFunction, createStakeholderProposalMutationFunction, updateProposalMutationFunction,
    deleteInterestMutationFunction,  updateStakeholderProposalMutationFunction, deleteStakeholderProposalMutationFunction}
