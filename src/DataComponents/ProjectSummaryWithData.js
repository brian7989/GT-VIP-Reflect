import ProblemTable from "../Components/ProblemTable";
import ProjectSummary from "../Components/ProjectSummary";

import StakeholderProposalQuery from "./JustificationsTableWithData";
import {getProposals, getTeams} from "./JustificationsTableWithData";

import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql, compose } from 'react-apollo';
import React from "react";

const ProjectSummaryWithDataProptypes = {

};



const ProjectSummaryWithData = compose(
    getProposals,
    getTeams
)(ProjectSummary);



ProjectSummaryWithData.propTypes = ProjectSummaryWithDataProptypes;

export default ProjectSummaryWithData;
