import {
    stakeHoldersVisualizationData,
    teamStakeHoldersVisualizationData,
    VisualizeStakeholdersWithData
} from "./VisualizeStakeholdersWithData";
import VisualizeStakeholders from "../Components/VisualizeStakeholders";
import PropTypes from "prop-types";

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';




const ProjectSummaryVisualizationWithDataPropTypes = {

    userId: PropTypes.number.isRequired,
    step: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    teamQuery: PropTypes.bool,
};



let ProjectSummaryVisualizationWithData = compose(
    stakeHoldersVisualizationData,
    teamStakeHoldersVisualizationData
)(VisualizeStakeholders);

ProjectSummaryVisualizationWithData.propTypes = ProjectSummaryVisualizationWithDataPropTypes;

export default ProjectSummaryVisualizationWithData;
