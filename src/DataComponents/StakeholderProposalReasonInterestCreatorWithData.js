import {createProposalMutationFunction, updateProposalMutationFunction,
    createStakeholderMutationFunction, updateStakeholderMutationFunction,  deleteStakeholderMutationFunction,
    createInterestMutationFunction,
    createReasonMutationFunction,
    createStakeholderProposalMutationFunction, deleteInterestMutationFunction, deleteReasonMutatationFunction,
    deleteStakeholderProposalMutationFunction, interestQueryFunction,
    reasonsQueryFunction, updateInterestMutationFunction,
    updateReasonMutationFunction,
    updateStakeholderProposalMutationFunction
} from "./VisualizationWithRightClickDataFunctions";

import  StakeholderProposalReasonInterestCreator from "../Components/StakeholderProposalReasonInterestCreator";
import PropTypes from "prop-types";
import { compose } from 'react-apollo';



const StakeholderProposalReasonInterestCreatorWithDataPropTypes = {

    active: PropTypes.bool.isRequired,
    stakeholderId: PropTypes.number,
    proposalId: PropTypes.number,
    reasonId: PropTypes.number,
    interestId: PropTypes.number,
    step: PropTypes.string.isRequired
}


const StakeholderProposalReasonInterestCreatorWithData = compose(
    createStakeholderMutationFunction,
    updateStakeholderMutationFunction,
    deleteStakeholderMutationFunction,

    // for proposals
    createProposalMutationFunction,
    createStakeholderProposalMutationFunction,
    updateStakeholderProposalMutationFunction,
    deleteStakeholderProposalMutationFunction,
    updateProposalMutationFunction,


    //for Reasons
    reasonsQueryFunction,
    createReasonMutationFunction,
    updateReasonMutationFunction,
    deleteReasonMutatationFunction,

    //for interests
    interestQueryFunction,
    createInterestMutationFunction,
    updateInterestMutationFunction,
    deleteInterestMutationFunction
)(StakeholderProposalReasonInterestCreator);


StakeholderProposalReasonInterestCreatorWithData.propTypes = StakeholderProposalReasonInterestCreatorWithDataPropTypes;
export default StakeholderProposalReasonInterestCreatorWithData ;
