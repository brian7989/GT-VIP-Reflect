import {Col, Panel, Row} from "react-bootstrap";
import {NavLink, withRouter, Switch, Route} from "react-router-dom";
import ReflectRoutes from "./ReflectRoutes";
import React, { Component } from "react";
import ArgumentMapsPage from '../DataComponents/ArgumentMapsPageWithData';
import {
    HiddenRouteReporter,
    ComposedRouteChangeManager,
    getDisplayName,
} from "./HiddenRouteReporter";

import "../styles/StakeholderAnalysis.css";
import _ from 'lodash';
import VisualizeStakeholdersWithRightClickData from "../DataComponents/VisualizeStakeholderWithRightClickData";
import InstructionsPanel from "./InstructionsPanel";
import TeamMemberDropdownSelectorWithData from "../DataComponents/TeamMemberDropdownSelectorWithData";
import InstructionsDataDelib from "../DataComponents/TemporaryInstructionsData"
import InstructionsData from "../DataComponents/InstructionsData";
import TransposedTeamStakeholdersWeightingProposalsTableWithData
    from "../DataComponents/TransposedTeamStakeholdersWeightingProposalsTableWithData";
import ProjectSummaryWithData from "../DataComponents/ProjectSummaryWithData";
import TeamIndividualTabPane from "./TeamIndividualTabPane";
import StakeholdersTableWithData from "../DataComponents/StakeholdersTableWithData";
import CurrentProblem from "./CurrentProblem";
import InterestMapWithData from "../DataComponents/InterestMapWithData";



import PropTypes from 'prop-types';

const StakeholderAnalysisNavigatorPropTypes = {
    //user: PropTypes.object,
    //updateUser: PropTypes.func.isRequired,
    // updateTeam: PropTypes.func.isRequired,
    enableMyAnalysis: PropTypes.bool,
    enableTeamAnalysis: PropTypes.bool,
    enableWeights: PropTypes.bool,
    enableArgumentMap: PropTypes.bool
}

const stakeholderAnalysis = ReflectRoutes.stakeholderAnalysis;
const stakeholderAnalysisRoutes = {};
stakeholderAnalysisRoutes[stakeholderAnalysis.myAnalysis.url] = stakeholderAnalysis.myAnalysis.stateKeys;
stakeholderAnalysisRoutes[stakeholderAnalysis.teamAnalysis.url] =  stakeholderAnalysis.teamAnalysis.stateKeys;
stakeholderAnalysisRoutes[stakeholderAnalysis.individualAnalyses.url] = stakeholderAnalysis.individualAnalyses.stateKeys;
stakeholderAnalysisRoutes[stakeholderAnalysis.weights.url] = stakeholderAnalysis.weights.stateKeys;
stakeholderAnalysisRoutes[stakeholderAnalysis.argumentMap.url] = stakeholderAnalysis.argumentMap.stateKeys;




class StakeholderAnalysisNavigator extends Component {

    constructor(props) {
        super(props);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {

        return (
            <div id="stakeholderAnalysisDiv" >
                <div id='stakeholderAnalysisDivText'>STAKEHOLDER ANALYSIS</div>
                <div id='stakeholderAnalysisButtonsDiv'>
                    {this.props.enableMyAnalysis ?
                        <NavLink to={ReflectRoutes.stakeholderAnalysis.myAnalysis.url}>
                            <button className="stakeholderAnalysisButtons">
                           My Analysis
                            </button>
                        </NavLink>
                        : <div></div>
                    }
                    {this.props.enableTeamAnalysis ?
                        <NavLink to={ReflectRoutes.stakeholderAnalysis.teamAnalysis.url}>
                            <button className="stakeholderAnalysisButtons">
                             Team Analysis
                            </button>
                        </NavLink>
                        : <div></div>
                    }
                    {this.props.enableTeamAnalysis ?
                        <NavLink to={ReflectRoutes.stakeholderAnalysis.individualAnalyses.url}>
                            <button className="stakeholderAnalysisButtons">
                            Individual Analyses
                            </button>
                        </NavLink>
                        : <div></div>
                    }
                    {this.props.enableTeamAnalysis ?
                        <NavLink to={ReflectRoutes.symphysisProposal.stakeholders.url}>
                            <button className="stakeholderAnalysisButtons">
                            Stakeholders
                            </button>
                        </NavLink>
                        : <div></div>
                    }
                    {this.props.enableTeamAnalysis ?
                        <NavLink to={ReflectRoutes.stakeholderAnalysis.interestMap.url}>
                            <button className="stakeholderAnalysisButtons">
                            Interest Map
                            </button>
                        </NavLink>
                        : <div></div>
                    }
                    {this.props.enableWeights ?
                        <NavLink to={ReflectRoutes.stakeholderAnalysis.weights.url}>
                            <button className="stakeholderAnalysisButtons">
                            Weights
                            </button>
                        </NavLink>
                        : <div></div>
                    }

                    {this.props.enableArgumentMap ?
                        <NavLink to={ReflectRoutes.stakeholderAnalysis.argumentMap.url}>
                            <button className="stakeholderAnalysisButtons">
                                Argument Map
                            </button>
                        </NavLink> :
                        <div></div>
                    }


                </div>


            </div>



        );

    }


}



const individualAnalysis = (classObject) => {
    let teamIndividualTabPane = "";
    console.log(classObject);
    let ignoreMyStakeHoldersTab = false;
    let instructions = InstructionsData.Team;
    //TODO /special logic needed to display instructions differently for some workplans
    if (ignoreMyStakeHoldersTab) {
        instructions = InstructionsDataDelib.Team;
    }

    if (classObject.props.user && classObject.props.user.id
        && classObject.props.user.currentTeam && classObject.props.user.currentTeamId
        //&& _.has(classObject.props.user, "currentClass")
        && _.has(classObject.props.user, "currentTeam.class")
        && _.has(classObject.props.user, "currentTeam.currentProblem.id")) {

        return {instructions, teamIndividualTabPane: <TeamIndividualTabPane instructions={instructions} classObject={classObject} classInfo={classObject.props.user.currentTeam.class} teamInfo={classObject.props.user.currentTeam}/>};

    } else {

        teamIndividualTabPane =  <div>Could not load. User may not be set, no team assigned, or no module/problem/etc. set.</div>;
    }

    return {instructions, teamIndividualTabPane};
}


const teamVisualization = (classObject) => {
    //alert("This is tring to render!!");
    //alert("team visualization");

    //TODO /special logic needed to display instructions differently for some workplans
    let ignoreMyStakeHoldersTab = false;
    let workplanId = -1;
    let userInfo = classObject.props.userInfo;
    if (userInfo != null && _.has(userInfo, "currentTeam.class")) {//userInfo.currentClass) {
        //workplanId = userInfo.currentClass.currentWorkplan.id;
        workplanId = userInfo.currentTeam.class.currentWorkplan.id;
        ignoreMyStakeHoldersTab =  workplanId == 8 || workplanId == 9 || workplanId == 10;
    }

    let teamsData = InstructionsData.StakeholderAnalysis.Team;
    let symphysisData = InstructionsData.StakeholderAnalysis.Symphysis;
    if (ignoreMyStakeHoldersTab) {
        teamsData = InstructionsDataDelib.StakeholderAnalysis.Team;
        symphysisData = InstructionsDataDelib.StakeholderAnalysis.Symphysis;
    }


    //let showClarificationsTab =
    return <VisualizeStakeholdersWithRightClickData userId={classObject.props.user.id}
                                                 d3TreeId={"teamStakeholderAnalysisWithRightClick"}
                                                 instructions={teamsData}
                                                 problemId={classObject.props.user.currentTeam.currentProblem.id}
                                                 teamId={classObject.props.user.currentTeamId}
                                                 teamQuery={true}
                                                 step={"team"}
                                                 readOnlyMode={false}
                                                 showClarificationsTab={classObject.props.showClarificationsTab}
                                                 active={classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.teamAnalysis.url)}
                                                />;


}


const myAnalysis = (classObject) => {

    return <VisualizeStakeholdersWithRightClickData
        d3TreeId={"stakeholderAnalysisWithRightClick"}
        instructions={InstructionsData.StakeholderAnalysis.Individual}
        problemId={classObject.props.user.currentTeam.currentProblem.id}
        teamId={classObject.props.user.currentTeamId}
        teamQuery={false}
        userId={classObject.props.user.id}
        step={"individual"}
        showClarificationsTab={false}
        readOnlyMode={false}
        active={classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.myAnalysis.url)}
    />

}

const argumentMap = (classObject) => {
    console.log("####################");
    return (
        <ArgumentMapsPage userId={classObject.props.user.id} currentTeamId = {classObject.props.user.currentTeamId}></ArgumentMapsPage>
    )

}


const StakeholderAnalysisComponentsFunction = (classObject) => {

    let probId = -1;

    let defaultProblem = (_.has(classObject, 'props.user.currentTeam.currentProblem.id')) ? classObject.props.user.currentTeam.currentProblem.id: -1;

    let selProblem = (_.has(classObject, 'props.user.currentTeam.selectedProblemId')) ? classObject.props.user.currentTeam.selectedProblemId: -1;

    probId = selProblem >= 0 ? selProblem : defaultProblem;

    let assignedProblemObj = _.has(classObject, "props.user.currentTeam.currentProblem") ? classObject.props.user.currentTeam.currentProblem : null;
    let testSelProblemObj = _.has(classObject, "props.user.currentTeam.selectedProblem") ? classObject.props.user.currentTeam.selectedProblem : null;
    let selectedProblemObj = testSelProblemObj ? testSelProblemObj : assignedProblemObj;

    //
    // console.log("prob ids");
    // console.log(defaultProblem);
    // console.log(selProblem);
    // console.log(probId);


    let instructions = InstructionsData;




    return {
        myAnalysis: myAnalysis(classObject),
        teamAnalysis: teamVisualization(classObject),
        individualAnalysis: <div>
            {individualAnalysis(classObject).instructions}
            {individualAnalysis(classObject).teamIndividualTabPane}
        </div>,
        weights:
            <div>
                {instructions ?
                    <div style={{width:"800px"}}>
                    <InstructionsPanel title={instructions.StakeholderAnalysis.Team.Weighting.title}
                                       body={instructions.StakeholderAnalysis.Team.Weighting.body}/>
                    </div>
                    : <div></div>
                }
            <TransposedTeamStakeholdersWeightingProposalsTableWithData
                userId={classObject.props.user.id}
                teamId={classObject.props.user.currentTeam.id}
                problemId={probId}//{classObject.props.user.currentTeamId}//{this.props.classInfo.currentProblem.id}
                step={'team'}
                symphysisModeEnabled={false}
                readonly={classObject.props.readonly}
                active={classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.weights.url)} />
            </div>,

        argumentMap: argumentMap(classObject),

    projectSummary:  <ProjectSummaryWithData
            instructions={InstructionsData.StakeholderAnalysis.Symphysis}
            userId={classObject.props.user.id}
            userInfo={classObject.props.user}
            teamInfo={classObject.props.user.currentTeam}
            //classInfo={classObject.props.user.currentClass}
            classInfo={classObject.props.user.currentTeam.class}
            problemId={classObject.props.user.currentTeam.currentProblem.id}
            teamId={classObject.props.user.currentTeam.id}
            step={"team"}
            tabName="summary"
            isActive={classObject.props.location.pathname.includes(ReflectRoutes.projectSummary.summary.url)}
            readonly={true}
            userEnabled={true}
            basepath='/summary'
            symphysisModeEnabled={true}

        />,


        interestsMap:

        <div>
            <h3>Stakeholder Interests and Values</h3>
            <Row>
                <Col md={4}>

                    <Panel>


                        <h4>Interests</h4>

                        <InterestMapWithData
                            userId={classObject.props.user.id}
                            active={classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.interestMap.url)}
                            step={"team"}
                            readonly={true}
                            showEdit={true}
                            onSelectEdit={()=> {classObject.props.history.push(ReflectRoutes.stakeholderAnalysis.teamAnalysis.url);}}
                        />
                    </Panel>


                </Col>
                <Col md={6} style={{maxWidth: '70%'}}>
                    <CurrentProblem
                        heading={<h4>Problem</h4>}
                        problem={
                            selectedProblemObj
                            //classObject.props.user.currentTeam.selectedProblem
                        }
                        disableCollapse={true}
                        useHTMLFormatting={false}
                    />
                </Col>
            </Row>


        </div>,

    }
}


//const StakeholderAnalysisNavigator = withRouter(StakeholderAnalysisIntermed);
//const StakeholderAnalysisNavigator = withRouter(ComposedRouteChangeManager(StakeholderAnalysisWithRouter, stakeholderAnalysisRoutes));

StakeholderAnalysisNavigator.propTypes = StakeholderAnalysisNavigatorPropTypes;



//export this component and information on which routes it uses
export { StakeholderAnalysisNavigator, StakeholderAnalysisComponentsFunction };
