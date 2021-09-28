import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import TeamHomeScreen from "./TeamHomeScreen";


import TeamMembersTableWithData from "../DataComponents/TeamMembersTableWithData";

import RulesBootstrapTableWithData from "../DataComponents/RulesBootstrapTableWithData";

import StakeholdersTableWithData from "../DataComponents/StakeholdersTableWithData";

import ProblemTableWithData from '../DataComponents/ProblemTableWithData';

import CurrentProblem from './CurrentProblem';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {Link, NavLink, Route, Switch, withRouter} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

import HiddenRouteReporter from "./HiddenRouteReporter";



import InstructionsPanel from "./InstructionsPanel";
import InstructionsData from "../DataComponents/InstructionsData";

import TeamMemberStakeholderAssignmentTableWithData from "../DataComponents/TeamMemberStakeholderAssignmentTableWithData";
import ProblemPanelWithData from "../DataComponents/ProblemPanelWithData";

const TeamTabPanelPropTypes = {

    userInfo: PropTypes.object, //optional. only needed if not readonly
    teamInfo: PropTypes.object, //provided by Apollo HOC
    teamId: PropTypes.number.isRequired,
    classInfo: PropTypes.object,
    active: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    basePath: PropTypes.string.isRequired,
    instructionsData: PropTypes.object,
    readonly: PropTypes.bool,
    isAdmin: PropTypes.bool,


}

class TeamTabPanelIntermed extends Component {

    constructor(props) {

        super(props);

        let selProbId = -1;

        let teamInfo = this.props.teamInfo;

        if(!this.props.loading && teamInfo && teamInfo.selectedProblemId)
            selProbId = teamInfo.selectedProblemId;

        this.state = {

            activeTabName: "overview",
            selectedProblemId: selProbId

        };


        //Can put handlers here
        //this.handleNameChange = this.handleNameChange.bind(this);


        //this.userTab = null;
    }

    refetch() {

        if(this.props.refetch)
            return this.props.refetch();
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.teamInfo &&
            nextProps.teamInfo.selectedProblemId !== this.state.selectedProblemId)
        {
            console.log("selectedProblemId: " + nextProps.teamInfo.selectedProblemId);
            console.log(nextProps.teamInfo);

            this.setState({selectedProblemId: nextProps.teamInfo.selectedProblemId});
        }

    }





    render() {

        console.log("From the team tab panel!!!!");
        console.log(this.props);


        let userInfo = this.props.userInfo;
        let teamInfo = this.props.teamInfo;
        let classInfo = this.props.classInfo;


        let teamId = this.props.teamId;


        let userId = userInfo && userInfo.id ? userInfo.id : -1;


        console.log("USER ID " + userId);

        //let defaultProblem = (classInfo && classInfo.currentProblem) ? classInfo.currentProblem : null;
        let defaultProblem = (teamInfo && teamInfo.currentProblem) ? teamInfo.currentProblem : null;

        let defaultProblemTitle = defaultProblem && defaultProblem.title ? defaultProblem.title : "";





        return (

            <div>
            {this.props.instructionsData ?
            <InstructionsPanel title={this.props.instructionsData.Team_Overview.title}
        body={this.props.instructionsData.Team_Overview.body}/>
    : <div></div>
    }

        {
            (teamInfo) ?
        <div>

        <TeamHomeScreen
            userId={userId}
            teamInfo={teamInfo}
            classInfo={classInfo}
            basePath = {this.props.basePath}
            isAdmin={this.props.isAdmin}
            active={this.props.active /*&& this.state.activeTabName === "overview"*/}
            readonly={this.props.readonly}
            />





            </div>
        : <div>Could not load. User/team may not be set...</div>
        }


        {
            this.props.isAdmin && teamId && classInfo ?
        <ProblemPanelWithData
            //userInfo={userInfo}
            instructionsData={InstructionsData}
            teamId={teamId}
            classInfo={classInfo}
            //active={true}
            active={ this.props.active}
            basePath="/dont_need_one_right_now"
            readonly={true}
            /> : <div></div>
        }
    </div>

        //     <div>
        //
        //     {
        //
        //         <div>
        //
        //
        //             <HiddenRouteReporter onRouteChange={(e) => {
        //
        //                 //console.log("onRouteChange: " + e);
        //
        //                 const beginPath = this.props.basePath;
        //
        //                 let routeStr = e;
        //
        //                 let beginPathIndex = e.indexOf(beginPath);
        //
        //                 if(beginPathIndex > -1)
        //                 {
        //
        //                     routeStr = e.substr(beginPathIndex+beginPath.length);
        //
        //                     let goodBasePath = false;
        //
        //                     if(routeStr.indexOf("/") === 0)
        //                     {
        //                         routeStr = routeStr.substr(1);
        //                         goodBasePath = true;
        //                     }
        //                     else if(routeStr.length === 0)
        //                     {
        //                         goodBasePath = true;
        //                     }
        //
        //
        //                     if(goodBasePath) {
        //
        //
        //                         let endPathIndex = routeStr.indexOf("/");
        //
        //                         if (endPathIndex > -1)
        //                             routeStr = routeStr.substr(0, endPathIndex);
        //
        //
        //                         switch (routeStr) {
        //                             case "overview":
        //                                 if (this.state.activeTabName !== "overview")
        //                                     this.setState({activeTabName: "overview"});
        //                                 break;
        //                             case "members":
        //                                 if (this.state.activeTabName !== "members")
        //                                     this.setState({activeTabName: "members"});
        //                                 break;
        //                             case "rules":
        //                                 if (this.state.activeTabName !== "rules")
        //                                     this.setState({activeTabName: "rules"});
        //                                 break;
        //                             // case "problem":
        //                             //     if (this.state.activeTabName !== "problem")
        //                             //         this.setState({activeTabName: "problem"});
        //                             //     break;
        //                             case "researchAssignments":
        //                                 if (this.state.activeTabName !== "researchAssignments")
        //                                     this.setState({activeTabName: "researchAssignments"});
        //                                 break;
        //                             default:
        //                                 let newPath = beginPath + "/overview";
        //
        //                                 //console.log("proposed new corrected path: " + newPath);
        //                                 this.props.history.push(newPath);
        //                                 break;
        //                         }
        //
        //                     }
        //                 }
        //
        //                 console.log("routeStr: " + routeStr);
        //
        //
        //             }}/>
        //
        //
        //
        //             {/*<LinkContainer to="/my_stakeholders/proposals">*/}
        //                 {/*<Button>proposals</Button>*/}
        //             {/*</LinkContainer>*/}
        //
        //             <Tab.Container
        //                 id="tabs-with-dropdown"
        //                 activeKey={this.state.activeTabName}
        //                 onSelect={(e) => {
        //                     this.setState({activeTabName: e});
        //                 }}
        //
        //             >
        //                 <Row className="clearfix">
        //                     <Col sm={12}>
        //                         <Nav bsStyle="tabs">
        //
        //                             <LinkContainer to={this.props.basePath + "/overview"}>
        //                             <NavItem eventKey="overview">
        //                                 Overview
        //                             </NavItem>
        //                             </LinkContainer>
        //
        //                             <LinkContainer to={this.props.basePath + "/members"}>
        //                             <NavItem eventKey="members">
        //                                 Members
        //                             </NavItem>
        //                             </LinkContainer>
        //
        //                             <LinkContainer to={this.props.basePath + "/rules"}>
        //                             <NavItem eventKey="rules">
        //                                 Rules
        //                             </NavItem>
        //                             </LinkContainer>
        //
        //                             {/*<LinkContainer to={this.props.basePath + "/problem"}>*/}
        //                             {/*<NavItem eventKey="problem">*/}
        //                                 {/*Problem*/}
        //                             {/*</NavItem>*/}
        //                             {/*</LinkContainer>*/}
        //
        //                             <LinkContainer to={this.props.basePath + "/researchAssignments"}>
        //                                 <NavItem eventKey="researchAssignments">
        //                                     Research Assignments
        //                                 </NavItem>
        //                             </LinkContainer>
        //
        //                             {/*<NavItem eventKey="stakeholders">*/}
        //                                 {/*Stakeholders*/}
        //                             {/*</NavItem>*/}
        //
        //
        //
        //
        //
        //                         </Nav>
        //                     </Col>
        //                     <Col sm={12}>
        //                         <Tab.Content animation>
        //
        //                             <Tab.Pane eventKey="overview">
        //
        //
        //
        //                                 {this.props.instructionsData ?
        //                                     <InstructionsPanel title={this.props.instructionsData.Team_Overview.title}
        //                                                        body={this.props.instructionsData.Team_Overview.body}/>
        //                                     : <div></div>
        //                                 }
        //
        //                                 {
        //                                     (teamInfo) ?
        //                                         <div>
        //
        //                                         <TeamHomeScreen
        //                                             teamInfo={teamInfo}
        //                                             classInfo={classInfo}
        //                                             active={this.props.active && this.state.activeTabName === "overview"}
        //                                             readonly={this.props.readonly}
        //                                         />
        //                                         </div>
        //                                             : <div>Could not load. User/team may not be set...</div>
        //                                 }
        //
        //
        //                             </Tab.Pane>
        //
        //
        //
        //                             <Tab.Pane eventKey="members">
        //
        //                                 {this.props.instructionsData ?
        //                                     <InstructionsPanel title={this.props.instructionsData.Team_Members.title}
        //                                                        body={this.props.instructionsData.Team_Members.body}/>
        //                                     : <div></div>
        //                                 }
        //
        //
        //                                     <div>
        //
        //                                         {
        //
        //                                             (classInfo && classInfo.id) ?
        //                                                 <TeamMembersTableWithData
        //                                                     //uniqueRef={"teamMembersTab"}
        //                                                     classId={classInfo.id}
        //                                                     teamId={teamId}
        //                                                     hideId={true}
        //                                                     active={this.props.active && this.state.activeTabName === "members"}
        //                                                 /> : <div>No class ID defined!</div>
        //                                         }
        //                                     </div>
        //
        //
        //                             </Tab.Pane>
        //
        //
        //
        //
        //                             <Tab.Pane eventKey="rules">
        //
        //                                 {this.props.instructionsData ?
        //                                     <InstructionsPanel title={this.props.instructionsData.Team_Rules.title}
        //                                                        body={this.props.instructionsData.Team_Rules.body}/>
        //                                     : <div></div>
        //                                 }
        //
        //
        //                                     <div>
        //
        //                                         <RulesBootstrapTableWithData
        //                                             teamId={teamId}
        //                                             active={this.props.active && this.state.activeTabName === "rules"}
        //                                             readonly={this.props.readonly}
        //                                         />
        //                                     </div>
        //
        //                             </Tab.Pane>
        //
        //
        //                             {/*<Tab.Pane eventKey="problem">*/}
        //
        //                                 {/*{*/}
        //
        //                                     {/*<div>*/}
        //
        //
        //                                         {/*<CurrentProblem*/}
        //
        //                                             {/*heading ={<h4>Assigned Problem</h4>}*/}
        //                                             {/*problem={*/}
        //
        //                                                 {/*defaultProblem*/}
        //                                             {/*}*/}
        //
        //                                         {/*/>*/}
        //                                     {/*</div>*/}
        //                                 {/*}*/}
        //
        //                                 {/*{this.props.instructionsData ?*/}
        //                                     {/*<InstructionsPanel title={this.props.instructionsData.Team_WickedProblemFormulation.title}*/}
        //                                                        {/*body={this.props.instructionsData.Team_WickedProblemFormulation.body}/>*/}
        //                                     {/*: <div></div>*/}
        //                                 {/*}*/}
        //
        //
        //
        //
        //
        //                                 {/*{*/}
        //
        //                                         {/*<Grid>*/}
        //
        //                                             {/*<Row className="show-grid">*/}
        //                                                 {/*<Col md={4}>*/}
        //
        //                                                     {/*<ProblemTableWithData*/}
        //                                                         {/*userId={userId}*/}
        //                                                         {/*teamId={teamId}*/}
        //                                                         {/*tag={"MORE_SPECIFIC"}*/}
        //
        //                                                         {/*onSelectProblem={*/}
        //                                                             {/*(problemId) => {*/}
        //
        //                                                                 {/*this.setState({selectedProblemId: problemId});*/}
        //                                                                 {/*this.props.selectProblem(teamId, problemId);*/}
        //                                                                 {/*//.then(() => { this.refetch()});*/}
        //
        //                                                             {/*}}*/}
        //                                                         {/*selectedProblemId={this.state.selectedProblemId}*/}
        //                                                         {/*active={this.props.active && this.state.activeTabName === "problem"}*/}
        //                                                         {/*readonly={this.props.readonly}*/}
        //                                                     {/*/>*/}
        //
        //                                                 {/*</Col>*/}
        //                                                 {/*<Col md={4}>*/}
        //
        //                                                     {/*<ProblemTableWithData*/}
        //                                                         {/*userId={userId}*/}
        //                                                         {/*teamId={teamId}*/}
        //                                                         {/*tag={"MORE_GENERAL"}*/}
        //
        //                                                         {/*onSelectProblem={*/}
        //                                                             {/*(problemId) => {*/}
        //
        //                                                                 {/*this.setState({selectedProblemId: problemId});*/}
        //                                                                 {/*this.props.selectProblem(teamId, problemId);*/}
        //                                                                 {/*//.then(this.refetch());*/}
        //
        //                                                             {/*}}*/}
        //                                                         {/*selectedProblemId={this.state.selectedProblemId}*/}
        //                                                         {/*active={this.props.active && this.state.activeTabName === "problem"}*/}
        //                                                         {/*readonly={this.props.readonly}*/}
        //                                                     {/*/>*/}
        //
        //                                                 {/*</Col>*/}
        //                                             {/*</Row>*/}
        //                                         {/*</Grid>*/}
        //
        //                                 {/*}*/}
        //
        //                             {/*</Tab.Pane>*/}
        //
        //                             <Tab.Pane eventKey="researchAssignments">
        //
        //                                 {this.props.instructionsData ?
        //                                     <InstructionsPanel title={this.props.instructionsData.Team_ResearchAssignments.title}
        //                                                        body={this.props.instructionsData.Team_ResearchAssignments.body}/>
        //                                     : <div></div>
        //                                 }
        //
        //                                 <TeamMemberStakeholderAssignmentTableWithData
        //                                     teamId={teamId}
        //                                     active={this.props.active && this.state.activeTabName == "researchAssignments"}
        //                                     readonly={this.props.readonly}
        //
        //                                 />
        //
        //                             </Tab.Pane>
        //
        //
        //                         </Tab.Content>
        //                     </Col>
        //                 </Row>
        //             </Tab.Container>
        //
        //         </div>
        //
        //
        //     }
        //
        //
        // </div>


    );

    }




}


TeamTabPanelIntermed.propTypes = TeamTabPanelPropTypes;

const TeamTabPanel = withRouter(TeamTabPanelIntermed);


export default TeamTabPanel;






