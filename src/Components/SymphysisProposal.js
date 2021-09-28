import React, {Component} from 'react';

import {
    Bootstrap,
    Row,
    Grid,
    Col, Popover, OverlayTrigger, Button, Panel,

} from 'react-bootstrap';

import ReflectRoutes from "./ReflectRoutes";

import "../styles/SymphysisProposal.css";
import "../Components/JustificationsTable.js";
import "../DataComponents/JustificationsTableWithData.js";
import Weights from "./Weights";
import ProposalMap from "./ProposalMap";

import {Router, Route, Switch, withRouter, NavLink} from "react-router-dom";

import _ from 'lodash';

import InterestMapWithData from "../DataComponents/InterestMapWithData.js";
import { JustificationsTableWithData, getProposals, OnlyProposalsQuery, getTeams} from "../DataComponents/JustificationsTableWithData";
import {JustificationsViewWithData} from "../DataComponents/JustificationsViewWithData";
//import SymphysisProposalInstructions from "./SymphysisProposalInstructions";
import {ComposedRouteChangeManager, HiddenRouteReporter} from "./HiddenRouteReporter";
import InstructionsData from "../DataComponents/InstructionsData";
//import InstructionsDataDelib from "../DataComponents/TemporaryInstructionsData";

import TeamStakeholdersWeightingProposalsTableWithData
    from "../DataComponents/TeamStakeholdersWeightingProposalsTableWithData";

import TransposedTeamStakeholdersWeightingProposalsTableWithData
    from "../DataComponents/TransposedTeamStakeholdersWeightingProposalsTableWithData";


import InstructionsPanel from "./InstructionsPanel";

import ConsiderationsTableWithData from "../DataComponents/ConsiderationsTableWithData";
import ReactHtmlParser from "react-html-parser";


import InterestsTableWithData from "../DataComponents/InterestsTableWithData";
import StakeholdersTableWithData from "../DataComponents/StakeholdersTableWithData";
import CurrentProblem from "./CurrentProblem";

import PropTypes from 'prop-types';
import {StakeholderAnalysisNavigator} from "./StakeholderAnalysis";


const SymphysisProposalNavigatorPropTypes = {
    enableProposalMap: PropTypes.bool,
    enableProposalWeights: PropTypes.bool,
}


const popover = (title, content) => {


    let titleobj = <div>{title}</div>;

    let cont = '<div>' + content + '</div>';

    return   <Popover id="xxxpopover-positioned-left" title={titleobj} style={{maxWidth: '500px', overflow: 'scroll'}}>
        {content}
    </Popover>
};


const  overlayPopupTrigger = (title, content) => {



    return <OverlayTrigger className="overlayTrigger" trigger="focus"
                           placement="bottom"
                           overlay={popover(title, content)}>
        <div>
            <Button style={{ overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right'}}>?</Button>
        </div>
    </OverlayTrigger>
}





//
// const Navigation = () => {
//
//     return (
//         <div id="symphysisProposalAnalysisDiv" >
//             <div id='symphysisProposalDivText'> PROPOSAL DEVELOPMENT </div>
//             <div id='symphysisProposalButtonsDiv'>
//
//                 {this.props.enableProposalMap ?
//                     <button className="symphysisProposalButtons">
//                         <NavLink to={ReflectRoutes.symphysisProposal.proposalMap.url}>Proposal Components</NavLink>
//                     </button>
//                     : <div></div>
//                 }
//                 {/*<button className= "symphysisProposalButtons">*/}
//                 {/*    <NavLink to ={ReflectRoutes.symphysisProposal.interests.url}>Stakeholder interests</NavLink>*/}
//                 {/*</button>*/}
//
//
//
//             {/*<button className= "symphysisProposalButtons">*/}
//             {/*    <NavLink to={ReflectRoutes.symphysisProposal.stakeholders.url}>Stakeholders</NavLink>*/}
//             {/*</button>*/}
//
//
//
//             {/*<button className= "symphysisProposalButtons">*/}
//             {/*    <NavLink to={ReflectRoutes.symphysisProposal.stakeholders.url}>Stakeholders</NavLink>*/}
//             {/*</button>*/}
//
//                 {this.props.enableProposalMap ?
//                     <button className="symphysisProposalButtons">
//                         <NavLink to={ReflectRoutes.symphysisProposal.symphysisproposal.url}> Symphysis
//                             Proposal </NavLink>
//                     </button>
//                     : <div></div>
//                 }
//
//                 {this.props.enableProposalWeights ?
//                     <button className="symphysisProposalButtons">
//                         <NavLink to={ReflectRoutes.symphysisProposal.proposalWeights.url}>Weights</NavLink>
//                     </button>
//                     : <div></div>
//                 }
//
//             {/*<button className= "symphysisProposalButtons" >*/}
//                 {/*<NavLink to={ReflectRoutes.symphysisProposal.justifications.url}>Justifications</NavLink>*/}
//             {/*</button>*/}
//
//         </div>
//         </div>
//     );
// };

const symphysisProposal = ReflectRoutes.symphysisProposal;
const  symphysisProposalRoutes = {};
symphysisProposalRoutes[symphysisProposal.justifications.url] = symphysisProposal.justifications.stateKeys;
symphysisProposalRoutes[symphysisProposal.interests.url] = symphysisProposal.interests.stateKeys;
symphysisProposalRoutes[symphysisProposal.symphysisproposal.url] = symphysisProposal.symphysisproposal.stateKeys;
symphysisProposalRoutes[symphysisProposal.proposalWeights.url] = symphysisProposal.proposalWeights.stateKeys;
symphysisProposalRoutes[symphysisProposal.proposalMap.url] = symphysisProposal.proposalMap.stateKeys;



class SymphysisProposalNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    nextPath(path) {
        this.props.history.push(path);
    }



    render() {

        return (
            <div id="SymphysisProposal">
                <div id="symphysisProposalAnalysisDiv" >
                    <div id='symphysisProposalDivText'> PROPOSAL DEVELOPMENT </div>
                    <div id='symphysisProposalButtonsDiv'>

                        {this.props.enableProposalMap ?

                                <NavLink to={ReflectRoutes.symphysisProposal.proposalMap.url}>
                                    <button className="symphysisProposalButtons">Proposal Components</button>
                                    </NavLink>

                            : <div></div>
                        }
                        {/*<button className= "symphysisProposalButtons">*/}
                        {/*    <NavLink to ={ReflectRoutes.symphysisProposal.interests.url}>Stakeholder interests</NavLink>*/}
                        {/*</button>*/}



                        {/*<button className= "symphysisProposalButtons">*/}
                        {/*    <NavLink to={ReflectRoutes.symphysisProposal.stakeholders.url}>Stakeholders</NavLink>*/}
                        {/*</button>*/}



                        {/*<button className= "symphysisProposalButtons">*/}
                        {/*    <NavLink to={ReflectRoutes.symphysisProposal.stakeholders.url}>Stakeholders</NavLink>*/}
                        {/*</button>*/}

                        {this.props.enableProposalMap ?
                            <NavLink to={ReflectRoutes.symphysisProposal.symphysisproposal.url}>
                                <button className="symphysisProposalButtons">
                                 Symphysis Proposal
                                </button>
                            </NavLink>

                            : <div></div>
                        }

                        {this.props.enableProposalWeights ?
                            <button className="symphysisProposalButtons">
                                <NavLink to={ReflectRoutes.symphysisProposal.proposalWeights.url}>Weights</NavLink>
                            </button>
                            : <div></div>
                        }

                        {/*<button className= "symphysisProposalButtons" >*/}
                        {/*<NavLink to={ReflectRoutes.symphysisProposal.justifications.url}>Justifications</NavLink>*/}
                        {/*</button>*/}

                    </div>
                </div>
            </div>
        );

    }
}


const SymphysisProposalComponentsFunctions = (classObject) => {

    let  stakeholderId = -1;
    //TODO: fix this logic here for some specific workplans
    //we will need this for the special logic required by some work plans.
    // let ignoreMyStakeHoldersTab = false;
    // let workplanId = -1;
    // let userInfo = user;
    // if (userInfo != null && userInfo.currentClass) {
    //     workplanId = userInfo.currentClass.currentWorkplan.id;
    //     ignoreMyStakeHoldersTab =  workplanId == 8 || workplanId == 9 || workplanId == 10;
    // }
    //
    // let teamsData = InstructionsData.StakeholderAnalysis.Team;
    // let symphysisData = InstructionsData.StakeholderAnalysis.Symphysis;
    // if (ignoreMyStakeHoldersTab) {
    //     teamsData = InstructionsDataDelib.StakeholderAnalysis.Team;
    //     symphysisData = InstructionsDataDelib.StakeholderAnalysis.Symphysis;
    // }

    // return {
    //     "interests":
    // }


    let assignedProblemObj = _.has(classObject, "props.user.currentTeam.currentProblem") ? classObject.props.user.currentTeam.currentProblem : null;
    let testSelProblemObj = _.has(classObject, "props.user.currentTeam.selectedProblem") ? classObject.props.user.currentTeam.selectedProblem : null;
    let selectedProblemObj = testSelProblemObj ? testSelProblemObj : assignedProblemObj;


    let instructions = InstructionsData;



    console.log("INSTRUCTIONS");
    console.log(instructions);




    let propCompInstr = overlayPopupTrigger(instructions.ProposalComponents.Instructions.title, instructions.ProposalComponents.Instructions.body);

    let researchPropInstr = overlayPopupTrigger(instructions.ResearchProposalComponents.Instructions.title, instructions.ResearchProposalComponents.Instructions.body);

    let justInstr = overlayPopupTrigger(instructions.StakeholderAnalysis.Symphysis.Justifications.title, instructions.StakeholderAnalysis.Symphysis.Justifications.body);

    let considInstr = overlayPopupTrigger(instructions.StakeholderAnalysis.Symphysis.JustificationsAdditionalConsiderations.title, instructions.StakeholderAnalysis.Symphysis.JustificationsAdditionalConsiderations.body);


    return {
        justifications:
            <div>
                <h4>JUSTIFICATIONS</h4>
                <JustificationsTableWithData userId={classObject.props.user.id}
                teamId={classObject.props.user.currentTeam.id}
                proposalType={"PROPOSAL"}
                problemId={classObject.props.user.currentTeam.currentProblem.id}
                stakeholderId={stakeholderId}
                onSelectReason={(e) => {}}
                onSelectEvidence={(e) => {}}
                step={"justifications"}
                active={classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.justifications.url)}
                userEnabled={false}
                symphysisModeEnabled={classObject.props.symphysisModeEnabled}  />
            </div>,

        stakolders: <div>

            <Row>
                <Col md={4}>

                    <Panel>


                        <h4>Stakeholders</h4>
                        <StakeholdersTableWithData
                            userId={classObject.props.user.id}
                            teamId={classObject.props.user.currentTeam.id}
                            stakeholderId={classObject.props.stakeholderId}
                            problemId={classObject.props.user.currentTeam.currentProblem.id}//{this.props.classInfo.currentProblem.id}
                            onSelectProposal={(e) => {

                            }}
                            powerEnabled={classObject.props.powerEnabled}
                            step={"team"}
                            useTeamStakeholderQuery={true}
                            active={classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.stakeholders.url)}
                            readonly={true}
                            userEnabled={true}
                            symphysisModeEnabled={true}
                            powerEnabled={false}
                            selectedSymphysisStakeholdersOnly={true}
                            showEdit={true}
                            onSelectEdit={()=> {classObject.props.history.push(ReflectRoutes.stakeholderAnalysis.teamAnalysis.url);}}

                        />

                    </Panel>


                </Col>
                <Col md={6} style={{maxWidth: '70%'}}>
                    <CurrentProblem
                        heading={<h4>Problem</h4>}
                        problem={
                            //classObject.props.user.currentTeam.selectedProblem
                            selectedProblemObj
                        }
                        disableCollapse={true}
                        useHTMLFormatting={false}
                    />

                    <a onClick={()=> {classObject.props.history.push(ReflectRoutes.problemStatement.problemPanel.url);}}>Go to the problem formulation</a>
                </Col>
            </Row>


        </div>,

        weights:
            <div>
                <h3>How much does each stakeholder like or dislike the final proposal?<br/></h3>
                {instructions ?
                    <div style={{width:"800px"}}>
                    {/*<InstructionsPanel title={instructions.StakeholderAnalysis.Symphysis.Weighting.title}*/}
                    {/*                   body={instructions.StakeholderAnalysis.Symphysis.Weighting.body}/>*/}

                                       <div id="userPageDiv">
                                           Click on each cell and select a value from -3 (dislikes very much) to 3 (likes very much). This value needs to refer to the entire proposal, not just particular components.  If all weights are positive or neutral, proceed to the next step. If not, continue working on this problem (divide labor into individual homework or sub-teams as you see fit).
                                       <br/>
                                       </div>

                    </div>
                    : <div></div>
                }

                <br/>


                <Row>
                    <Col md={4}>

                <JustificationsViewWithData userId={classObject.props.user.id}
                                             teamId={classObject.props.user.currentTeam.id}
                                             proposalType={"PROPOSAL"}
                                             problemId={classObject.props.user.currentTeam.currentProblem.id}
                                             stakeholderId={stakeholderId}
                                             onSelectReason={(e) => {}}
                                             onSelectEvidence={(e) => {}}
                                             step={"justifications"}
                                             active={classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.proposalWeights.url)}
                                             userEnabled={false}
                                             symphysisModeEnabled={classObject.props.symphysisModeEnabled}  />

                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>

                {/*<TeamStakeholdersWeightingProposalsTableWithData*/}
                {/*    userId={classObject.props.user.id}*/}
                {/*    teamId={classObject.props.user.currentTeam.id}*/}
                {/*    problemId={classObject.props.user.currentTeam.currentProblem.id}//{this.props.classInfo.currentProblem.id}*/}
                {/*    step={'justifications'}*/}
                {/*    stakeholderStep={'team'}*/}
                {/*    symphysisModeEnabled={true}*/}
                {/*    readonly={false}*/}
                {/*    //active={true}*/}
                {/*    active={classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.proposalWeights.url)}*/}
                {/*/>*/}

                <TransposedTeamStakeholdersWeightingProposalsTableWithData
                    userId={classObject.props.user.id}
                    teamId={classObject.props.user.currentTeam.id}
                    problemId={classObject.props.user.currentTeam.currentProblem.id}//{this.props.classInfo.currentProblem.id}
                    step={'justifications'}
                    stakeholderStep={'team'}
                    symphysisModeEnabled={true}
                    readonly={false}
                    //active={true}
                    active={classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.proposalWeights.url)}
                />

            </div>,

        proposalMap:
            <div>

                <h4>Symphysis Proposal</h4>

                <Row>
                    <Col md={4}>





                            <JustificationsViewWithData userId={classObject.props.user.id}
                                                        teamId={classObject.props.user.currentTeam.id}
                                                        proposalType={"PROPOSAL"}
                                                        problemId={classObject.props.user.currentTeam.currentProblem.id}
                                                        stakeholderId={stakeholderId}
                                                        onSelectReason={(e) => {}}
                                                        onSelectEvidence={(e) => {}}
                                                        step={"justifications"}
                                                        active={classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.symphysisproposal.url)}
                                                        userEnabled={false}
                                                        symphysisModeEnabled={classObject.props.symphysisModeEnabled}  />




                        <a onClick={()=> {classObject.props.history.push(ReflectRoutes.symphysisProposal.proposalMap.url);}}>Go to the proposal components</a>

                    </Col>
                    <Col md={4} style={{maxWidth: '70%'}}>
                        <CurrentProblem
                            heading={<h4>Problem</h4>}
                            problem={
                                //classObject.props.user.currentTeam.selectedProblem
                                selectedProblemObj
                            }
                            disableCollapse={true}
                            useHTMLFormatting={false}
                        />

                        <a onClick={()=> {classObject.props.history.push(ReflectRoutes.problemStatement.problemPanel.url);}}>Go to the problem formulation</a>
                    </Col>
                </Row>




            </div>,

        interests:
            <div>
                <h4>INTERESTS</h4>
                {/*<InterestsTableWithData*/}
                {/*    userId={classObject.props.user.id}*/}
                {/*    active={true}*/}

                {/*/>*/}
                <InterestMapWithData userId={classObject.props.user.id}
                                        teamId={classObject.props.user.currentTeam.id}
                                        proposalType={"PROPOSAL"}
                                        problemId={classObject.props.user.currentTeam.currentProblem.id}
                                        stakeholderId={stakeholderId}
                                        onSelectReason={(e) => {}}
                                        onSelectEvidence={(e) => {}}
                                        step={"interests"}
                                        active={classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.interests.url)}
                                        active = {true}
                                        userEnabled={false}
                                        symphysisModeEnabled={classObject.props.symphysisModeEnabled} />
            </div>
        ,

        symphysisProposal:

            <div>
                <h4>Symphysis Proposal</h4>

                <Grid>

                    <Row className="show-grid">
            {/*<SymphysisProposalInstructions userId={classObject.props.user.id}*/}
            {/*teamId={classObject.props.user.currentTeam.id}*/}
            {/*proposalType={"PROPOSAL"}*/}
            {/*problemId={classObject.props.user.currentTeam.currentProblem.id}*/}
            {/*stakeholderId={stakeholderId}*/}
            {/*onSelectReason={(e) => {}}*/}
            {/*onSelectEvidence={(e) => {}}*/}
            {/*step={"symphysisproposal"}*/}
            {/*active={ classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.symphysisproposal.url)}*/}
            {/*active = {true}*/}
            {/*userEnabled={false}*/}
            {/*symphysisModeEnabled={classObject.props.symphysisModeEnabled} />*/}

<Col md={8}>

<div>
        <h4>Proposal Components </h4>
        {propCompInstr}


    <div>
        <br />
    </div>

    <div id="userPageDiv">
        Collect here ideas for what you would propose to solve the problem. Don't write long texts, but divide your ideas into the smallest possible components. Use as many boxes as possible. You can always add further components.
    </div>

    <a onClick={()=> {classObject.props.history.push(ReflectRoutes.stakeholderAnalysis.interestMap.url);}}>See the interests that need to be taken into account</a>
    <br />
    <a onClick={()=> {classObject.props.history.push(ReflectRoutes.symphysisProposal.stakeholders.url);}}>See all the stakeholders</a>
    <div>
        <br />
    </div>

    <JustificationsTableWithData
                            userId={classObject.props.user.id}
                            teamId={classObject.props.user.currentTeam.id}
                            proposalType={"PROPOSAL"}
                            problemId={classObject.props.user.currentTeam.currentProblem.id}//{this.props.classInfo.currentProblem.id}
                            // stakeholderId={stakeholderId}
                            onSelectReason={(e) => {
                                //this.selectProposal(e);
                                //this.gotoReason();
                            }}
                            onSelectEvidence={(e) => {
                                //this.selectEvidence(e);
                            }}
                            //weightEnabled={this.props.weightEnabled}
                            step={"justifications"}
                            active={true}
                            readonly={false}
                            userEnabled={true}
                            symphysisModeEnabled={true}

                        />
    </div>



</Col>
                        <Col md={4}>

                            <div>

                            <h4>Justifications </h4>
                            {justInstr}


                            <div>
                                <br />
                            </div>

                            <div id="userPageDiv">
                                Add links to your justifications below.
                            </div>

                            <div>
                                <br />
                            </div>


                                <h4>Additional Considerations</h4>
                                {considInstr}

                                <h4>Considerations</h4>
                <ConsiderationsTableWithData
                    userId={classObject.props.user.id}
                    teamId={classObject.props.user.currentTeam.id}
                    proposalType={"PROPOSAL"}
                    problemId={classObject.props.user.currentTeam.currentProblem.id}//{this.props.classInfo.currentProblem.id}
                    stakeholderId={stakeholderId}
                    onSelectReason={(e) => {
                        //this.selectProposal(e);
                        //this.gotoReason();
                    }}
                    onSelectEvidence={(e) => {
                        //this.selectEvidence(e);
                    }}
                    //weightEnabled={this.props.weightEnabled}
                    step={"considerations"}
                    active={true}
                    readonly={false}
                    userEnabled={false}
                    symphysisModeEnabled={true}

                />

                            </div>

                        </Col>

                    </Row>

                </Grid>
            </div>,



        researchProposal:

            <div>
                <h4>Components of Your Research Proposal</h4>

                <Grid>

                    <Row className="show-grid">
                        {/*<SymphysisProposalInstructions userId={classObject.props.user.id}*/}
                        {/*teamId={classObject.props.user.currentTeam.id}*/}
                        {/*proposalType={"PROPOSAL"}*/}
                        {/*problemId={classObject.props.user.currentTeam.currentProblem.id}*/}
                        {/*stakeholderId={stakeholderId}*/}
                        {/*onSelectReason={(e) => {}}*/}
                        {/*onSelectEvidence={(e) => {}}*/}
                        {/*step={"symphysisproposal"}*/}
                        {/*active={ classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.symphysisproposal.url)}*/}
                        {/*active = {true}*/}
                        {/*userEnabled={false}*/}
                        {/*symphysisModeEnabled={classObject.props.symphysisModeEnabled} />*/}

                        <Col md={12}>

                            <div>
                                <h4>Proposal Components </h4>
                                {researchPropInstr}


                                <div>
                                    <br />
                                </div>

                                <div id="userPageDiv">
                                    Add components of a possible research plan below. Under "Justifications," explain why each component is needed. Don't write long texts, but divide your ideas into the smallest possible components. Use as many boxes as possible. You can always add further components.
                                </div>


                                <div>
                                    <br />
                                </div>

                                <JustificationsTableWithData
                                    userId={classObject.props.user.id}
                                    teamId={classObject.props.user.currentTeam.id}
                                    proposalType={"PROPOSAL"}
                                    problemId={classObject.props.user.currentTeam.currentProblem.id}//{this.props.classInfo.currentProblem.id}
                                    // stakeholderId={stakeholderId}
                                    onSelectReason={(e) => {
                                        //this.selectProposal(e);
                                        //this.gotoReason();
                                    }}
                                    onSelectEvidence={(e) => {
                                        //this.selectEvidence(e);
                                    }}
                                    //weightEnabled={this.props.weightEnabled}
                                    step={"justifications"}
                                    active={true}
                                    readonly={false}
                                    userEnabled={true}
                                    symphysisModeEnabled={true}
                                    researchProposalModeEnabled={true}

                                />
                            </div>



                        </Col>
                {/*        <Col md={4}>*/}



                {/*        </Col>*/}

                    </Row>

                </Grid>
            </div>,



        missingExpertise:

            <div>
                <h4>Missing Expertise</h4>

                <Grid>

                    <Row className="show-grid">
                        {/*<SymphysisProposalInstructions userId={classObject.props.user.id}*/}
                        {/*teamId={classObject.props.user.currentTeam.id}*/}
                        {/*proposalType={"PROPOSAL"}*/}
                        {/*problemId={classObject.props.user.currentTeam.currentProblem.id}*/}
                        {/*stakeholderId={stakeholderId}*/}
                        {/*onSelectReason={(e) => {}}*/}
                        {/*onSelectEvidence={(e) => {}}*/}
                        {/*step={"symphysisproposal"}*/}
                        {/*active={ classObject.props.location.pathname.includes(ReflectRoutes.symphysisProposal.symphysisproposal.url)}*/}
                        {/*active = {true}*/}
                        {/*userEnabled={false}*/}
                        {/*symphysisModeEnabled={classObject.props.symphysisModeEnabled} />*/}

                        <Col md={8}>

                            <div>

                                {/*{propCompInstr}*/}


                                <div>
                                    <br />
                                </div>

                                <div id="userPageDiv">
                                    Add areas for which you need expertise by clicking on <b>New</b>. After you saved your additions, click on the corresponding other cells in the same row to enter <b>Strategies</b> and <b>Names</b>.
                                </div>


                                <div>
                                    <br />
                                </div>

                                <JustificationsTableWithData
                                    userId={classObject.props.user.id}
                                    teamId={classObject.props.user.currentTeam.id}
                                    proposalType={"PROPOSAL"}
                                    problemId={classObject.props.user.currentTeam.currentProblem.id}//{this.props.classInfo.currentProblem.id}
                                    // stakeholderId={stakeholderId}
                                    onSelectReason={(e) => {
                                        //this.selectProposal(e);
                                        //this.gotoReason();
                                    }}
                                    onSelectEvidence={(e) => {
                                        //this.selectEvidence(e);
                                    }}
                                    //weightEnabled={this.props.weightEnabled}
                                    step={"missing_expertise"}
                                    active={true}
                                    readonly={false}
                                    userEnabled={true}
                                    symphysisModeEnabled={true}
                                    missingExpertiseModeEnabled={true}

                                />
                            </div>



                        </Col>
                        <Col md={4}>

                            <CurrentProblem
                                heading={<h4>Problem</h4>}
                                problem={
                                    //classObject.props.user.currentTeam.selectedProblem
                                    selectedProblemObj
                                }
                                disableCollapse={true}
                                useHTMLFormatting={false}
                            />

                            <a onClick={()=> {classObject.props.history.push(ReflectRoutes.problemStatement.problemPanel.url);}}>Go to the problem formulation</a>

                        </Col>

                    </Row>

                </Grid>
            </div>,
    }
}



//const SymphysisProposalNavigator= withRouter(SymphysisProposalIntermed);

//const  SymphysisProposalNavigator = withRouter(ComposedRouteChangeManager(SymphysisProposalIntermed, symphysisProposalRoutes));

SymphysisProposalNavigator.propTypes = SymphysisProposalNavigatorPropTypes;




export  {SymphysisProposalNavigator, SymphysisProposalComponentsFunctions};
