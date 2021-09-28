import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import styles from '../styles/SideBarMenu.css';
import { LinkContainer } from 'react-router-bootstrap';
import NavigationBar from"./NavigationBar"



import PropTypes from 'prop-types';

import {
    Bootstrap,
    Panel,
    Well,
    Navbar,
    ListGroup,
    ListGroupItem,
    Grid,
    Row,
    Col,
    Nav,
    ButtonToolbar,
    Button,
    ButtonGroup,
    Tab,
    NavItem,
    MenuItem,
    NavDropdown,
    Table,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Checkbox
} from 'react-bootstrap';


//import 'reactsideBarMenu.css-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import _ from 'lodash';
import InstructionsPanel from "./InstructionsPanel";
import CurrentProblem from "./CurrentProblem";
import SelectedSymphysisProposalWithData from "../DataComponents/SelectedSymphysisProposalWithData";
import StakeholdersTableWithData from "../DataComponents/StakeholdersTableWithData";
import ConsiderationsTableWithData from "../DataComponents/ConsiderationsTableWithData";
import { JustificationsTableWithData, getProposals, OnlyProposalsQuery, getTeams} from "../DataComponents/JustificationsTableWithData";
import ProjectSummaryVisualizationWithData from '../DataComponents/ProjectSummaryVisualizationWithData';
import {VisualizeStakeholdersWithData} from "../DataComponents/VisualizeStakeholdersWithData";

import {Link, NavLink, Route, Switch, withRouter} from "react-router-dom";
import InstructionsData from "../DataComponents/InstructionsData";
import ProjectSummaryWithData from "../DataComponents/ProjectSummaryWithData";
import HiddenRouteReporter from "./HiddenRouteReporter";
import qs from "query-string";
import Tabs from "react-bootstrap/es/Tabs";

import InterestMapWithData from "../DataComponents/InterestMapWithData";



const ProjectSummaryPropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,

    //onSelect: PropTypes.func.isRequired,
    //selected: PropTypes.number,
    //enabled: PropTypes.bool.isRequired,

    //TODO someday the following should work in React
}


class SidebarMenu extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        console.log("base path!!!!");
        console.log(this.props.basepath );
        let stakeholderId = -1;
        let considerations = <div></div>
        let instructions = <div></div>
        let currentProblemAndStakeholders = <div></div>
        let visualization = <div></div>
        let justifications = <div></div>

        if (this.props.userInfo && this.props.userInfo.id
            && this.props.teamInfo && this.props.teamInfo.id
            && this.props.classInfo
            && _.has(this.props, "teamInfo.currentProblem.id")
            // && this.props.classInfo.currentProblem
            // && this.props.classInfo.currentProblem.id
            && this.props.step ) {

            instructions  =   <InstructionsPanel title={this.props.instructions.projectSummary.title}
            body={this.props.instructions.projectSummary.body}/>

            currentProblemAndStakeholders = <Row>
            <Col md={4}>

                <Panel>


                <h4>Stakeholders</h4>
                <StakeholdersTableWithData
            userId={this.props.userInfo.id}
            teamId={this.props.teamInfo.id}
            stakeholderId={this.props.stakeholderId}
            problemId={this.props.teamInfo.currentProblem.id}//{this.props.classInfo.currentProblem.id}
            onSelectProposal={(e) => {

            }}
            powerEnabled={this.props.powerEnabled}
            step={this.props.step}
            useTeamStakeholderQuery={true}
            active={this.props.tabName == "summary"}
            readonly={true}
            userEnabled={true}
            symphysisModeEnabled={true}
            powerEnabled={false}
            selectedSymphysisStakeholdersOnly={true}

            />



            </Panel>


            </Col>
            <Col md={6} style={{maxWidth: '70%'}}>
                <CurrentProblem
            heading={<h4>Problem</h4>}
            problem={
                this.props.teamInfo.selectedProblem
            }
            disableCollapse={true}
            useHTMLFormatting={false}
            />
            </Col>
            </Row>

            considerations =      <Panel style={{width:'100%'}}>
        <h4>Considerations</h4>

            <ConsiderationsTableWithData
            userId={this.props.userInfo.id}
            teamId={this.props.teamInfo.id}
            proposalType={"PROPOSAL"}
            problemId={this.props.teamInfo.currentProblem.id}//{this.props.classInfo.currentProblem.id}
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
            active={this.props.tabName === "summary"}
            readonly={true}
            userEnabled={true}
            symphysisModeEnabled={this.props.symphysisModeEnabled}

            />
            </Panel>

            justifications =  <Panel style={{width:'100%'}}>
        <h4>Justifications</h4>
            <JustificationsTableWithData
            userId={this.props.userInfo.id}
            teamId={this.props.teamInfo.id}
            proposalType={"PROPOSAL"}
            problemId={this.props.teamInfo.currentProblem.id}//{this.props.classInfo.currentProblem.id}
            stakeholderId={stakeholderId}
            onSelectReason={(e) => {
                //this.selectProposal(e);
                //this.gotoReason();
            }}
            onSelectEvidence={(e) => {
                //this.selectEvidence(e);
            }}
            //weightEnabled={this.props.weightEnabled}
            step={"justifications"}
            active={ this.props.tabName === "summary"}
            readonly={this.props.readonly}
            userEnabled={this.props.userEnabled}
            symphysisModeEnabled={this.props.symphysisModeEnabled}
            />
            </Panel>

            visualization =    <ProjectSummaryVisualizationWithData userId={this.props.userInfo.id}
            step={this.props.step}
            teamQuery={this.props.tabName == "summary"}
            active={this.props.tabName == "summary"}/>
        }


            return <div>

            <Tab.Container id="project-summary" defaultActiveKey="problem-stakeholders">

                <Row className="clearfix">
                    <Col sm={4}>
                    <Nav id="project-summary-nav" bsStyle="pills" stacked>
                {/*<NavItem eventKey="instruction">Instructions</NavItem>*/}
                    <NavItem eventKey="problem-stakeholders">Problem and Stakeholders</NavItem>
                {/*<NavItem eventKey="considerations">Considerations</NavItem>*/}
                {/*    <NavItem eventKey="visualization">Visualization</NavItem>*/}
                {/*    <NavItem eventKey="justification">Components of the symphysis proposal and justifications</NavItem>*/}
                </Nav>
                </Col>
                <Col sm={8}>
                    <Tab.Content id="project-summary-content" animation>
                <Tab.Pane eventKey="instruction">
                    {instructions}
                    </Tab.Pane>

                    <Tab.Pane eventKey="problem-stakeholders">
                    {currentProblemAndStakeholders}
                    </Tab.Pane>
                    <Tab.Pane eventKey="considerations">{considerations}</Tab.Pane>
                    <Tab.Pane eventKey="visualization">{visualization}</Tab.Pane>
                    <Tab.Pane eventKey="justification">{justifications}</Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>


                </div>
        }
    };





    class ProjectSummaryIntermed extends Component {


    constructor(props) {
        super(props);

        this.state = {};

    }


    onChange(e) {


        if(this.props.onSelect && e && e.target && e.target.value)
        {
            let s = {
                proposalId: parseInt(e.target.value),
            };

            this.props.onSelect(s);

        }

    }



    componentDidUpdate(prevProps, prevState) {


        if(!_.isNil(prevProps) && !prevProps.enabled && this.props.enabled)
        {

            if(this.props.refetch)
                this.props.refetch();

            return; //ignore any other updates because we want the latest data before possibly changing selected
        }


        if(_.isNil(this.props.loading)) //means that Apollo is not enabled yet
            return;

        if(this.props.loading === false && !_.isNil(this.props.proposals) ) { //Apollo loading is done


            if (this.props.proposals.length > 0) //Any data from Apollo query?
            {

                //don't change selected unless we really need to (due to new query or nothing currently selected)
                if (_.isNil(this.props.selected) || this.props.selected < 0 ||
                    !_.find(this.props.proposals, (v) => {
                        return v.id === this.props.selected
                    })) {

                    let s = {proposalId: this.props.proposals[0].id};

                    this.props.onSelect(s);

                }
            }
            else {
                //only deselect selected if that isn't already the case
                if(!_.isNil(this.props.selected) && this.props.selected >= 0)
                    this.props.onSelect(null);
            }

        }


    }

    render() {
        let justificationsPresentationModeEnabled = true;
        let stakeholderId = -1;
        console.log("project summary!!!!1!!!!!!!!!");
        console.log("ProjectSummaryWithData !!!!!!!!!!!!!!!!!!!!!!!!!!");

        console.log(this.props);

        return (

            <div>
            <h4>Project Summary for Presentations</h4>
            <SidebarMenu
        instructions={this.props.instructions}
        userId={this.props.userId}
        userInfo={this.props.userInfo}
        teamInfo={this.props.teamInfo}
        classInfo={this.props.classInfo}
        problemId={this.props.problemId}
        step={"team"}
        tabName="summary"
        active={this.props.active && this.state.activeTabName === "summary"}
        readonly={this.props.readonly}
        userEnabled={true}
        basepath='/summary'
        symphysisModeEnabled={this.props.symphysisModeEnabled}
        basePath={this.props.basePath}/>
            </div>
    );


    }

}

ProjectSummaryIntermed.propTypes = ProjectSummaryPropTypes;




const ProjectSummary = withRouter(ProjectSummaryIntermed);
export default ProjectSummary;


