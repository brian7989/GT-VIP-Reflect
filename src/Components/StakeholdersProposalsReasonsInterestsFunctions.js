

function checkForNullVals() {
    for (var i=0; i<arguments.length; i++) {
        if (arguments[i] == null || arguments[i] == undefined) {
            alert("Argument passed cannot be null")
            return true
        }
    }
    return false;
}


const stakeholderFunctions = (props) => {


    let onSuccess = () => {
        console.log("stakeholderFunction was successful");

        return props.onSuccess();
    };


    return {
        createNewStakeholders: (userId, teamId, problemId, step, power, stakeholderText) => {
            let stakeholder = {}
            power = -1; // for testing purposes
            let boolean = checkForNullVals(userId, teamId, problemId, step, power, stakeholderText);
            if(boolean) {
                return;
            }

            stakeholder.userId = userId;
            stakeholder.teamId = teamId;
            stakeholder.problemId = problemId;
            stakeholder.step = step;
            stakeholder.isActive = true;
            stakeholder.name = stakeholderText;
            let p = parseInt(power);
            stakeholder.power = p;
            props.addStakeholder(stakeholder).then(() => onSuccess());//props.refetch());
        },

        createNewProposals: (stakeholderId, proposalText) => {
            let boolean = checkForNullVals(stakeholderId, proposalText);
            if(boolean) return;
            let proposal = {};
            proposal.userId = props.userId;
            proposal.problemId = props.problemId;
            proposal.proposalText = proposalText;
            proposal.isActive = true;
            proposal.weight = -1; //FIX ME


            //
            // //add a proposal then add the weight of the proposal
            // if (!props.weightEnabled)
            //     delete proposal.weight;
            props.addProposal(proposal).then(
                (d) => props.addStakeholderProposal(stakeholderId, d.createProposal.proposal.id, proposal.weight)
                    .then(() => onSuccess()));//props.refetch()));
        },

        createNewReasons: (userId, proposalId, reasonText) => {
            let reason = {}
            let boolean =  checkForNullVals(userId, proposalId, reasonText);
            if(boolean) return;

            reason.userId = userId;
            reason.proposalId = proposalId;
            reason.isActive = true;
            reason.reasonText = reasonText;
            props.addReason(proposalId, reason).then(() => onSuccess());//props.refetch());
        },

        createNewInterests: (userId, reasonId, interestText) => {
            //userId, reasonId, interest
            let boolean = checkForNullVals(userId, reasonId, interestText);
            if(boolean) return;
            let interest = {};
            interest.userId = userId;
            interest.reasonId = reasonId;
            interest.isActive = true;
            interest.interestText = interestText;

            props.addInterest(reasonId, interest).then(() => onSuccess());//props.refetch());
        },

        updateStakeholders: (stakeholderId, stakeholderText) => {
            let boolean = checkForNullVals(stakeholderId, stakeholderText);
            if(boolean) return;
            let patch = {};
            patch.name = stakeholderText;
            props.updateStakeholder(stakeholderId, patch).then(() => onSuccess());//props.refetch());
        },

        updateProposals: (stakeholderId, proposalId, newText) => {
            checkForNullVals(stakeholderId, proposalId, newText);
            let patch = {};
            patch.proposalText = newText;
            props.updateProposal(proposalId, patch).then(() => onSuccess());//props.refetch());
        },

        updateReasons: (reasonId, newText) => {
            let boolean = checkForNullVals(reasonId, newText);
            if(boolean) return;
            let patch = {};
            patch.reasonText = newText;
            props.updateReason(reasonId, patch).then(() => onSuccess());//props.refetch());
        },

        updateInterests: (interestId, newText) => {
            let boolean = checkForNullVals(interestId, newText);
            if(boolean) return;
            let patch = {};
            patch.interestText = newText;
            props.updateInterest(interestId, patch).then(() => onSuccess());//props.refetch());
        },

        deleteStakeholders: (id)  => {
            let boolean = checkForNullVals(id);
            if(boolean) return;

            let patch = {};
            patch.isActive = false;
            props.updateStakeholder(id, patch).then(() => onSuccess());//props.refetch());
            //props.deleteStakeholder(id).then(() => props.refetch());
        },

        deleteProposals: (stakeholderId, proposalId)  => {
            let boolean =  checkForNullVals(stakeholderId, proposalId);
            if(boolean) return;
            let patch = {};
            patch.isActive = false;
            props.updateProposal(proposalId, patch).then(() => onSuccess());//props.refetch());
            //props.deleteStakeholderProposal(stakeholderId, proposalId).then(() => props.refetch());
        },

        deleteReasons: (id)  => {
            let boolean = checkForNullVals(id);
            if(boolean) return;
            let patch = {};
            patch.isActive = false;
            props.updateReason(id, patch).then(() => onSuccess());//props.refetch());
            //props.deleteReason(id).then(() => props.refetch());
        },

        deleteInterests: (id)  => {
            let boolean = checkForNullVals(id);
            if(boolean) return;
            let patch = {};
            patch.isActive = false;
            props.updateInterest(id, patch).then(() => onSuccess());//props.refetch());
           //props.deleteInterest(id).then(() => props.refetch());
        }
    }

}



export {stakeholderFunctions}
