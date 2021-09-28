import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


//import TeamHomeScreen from "./TeamHomeScreen";


//import TeamMembersTableWithData from "../DataComponents/TeamMembersTableWithData";

//import RulesBootstrapTableWithData from "../DataComponents/RulesBootstrapTableWithData";

//import StakeholdersTableWithData from "../DataComponents/StakeholdersTableWithData";

import ProblemTableWithData from '../DataComponents/ProblemTableWithData';

import CurrentProblem from './CurrentProblem';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {Link, NavLink, Route, Switch, withRouter} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

import HiddenRouteReporter from "./HiddenRouteReporter";



import InstructionsPanel from "./InstructionsPanel";
//import InstructionsData from "../DataComponents/InstructionsData";

//import TeamMemberStakeholderAssignmentTableWithData from "../DataComponents/TeamMemberStakeholderAssignmentTableWithData";


const ProblemPanelPropTypes = {

    userInfo: PropTypes.object, //optional. only needed if not readonly
    teamInfo: PropTypes.object, //provided by Apollo HOC
    teamId: PropTypes.number.isRequired,
    classInfo: PropTypes.object,
    active: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    //basePath: PropTypes.string.isRequired,
    instructionsData: PropTypes.object,
    readonly: PropTypes.bool,


}

class ProblemPanelIntermed extends Component {

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


        let userInfo = this.props.userInfo;
        let teamInfo = this.props.teamInfo;
        let classInfo = this.props.classInfo;


        let teamId = this.props.teamId;


        let userId = userInfo && userInfo.id ? userInfo.id : -1;



        //let defaultProblem = (classInfo && classInfo.currentProblem) ? classInfo.currentProblem : null;
        let defaultProblem = (teamInfo && teamInfo.currentProblem) ? teamInfo.currentProblem: null;

        let defaultProblemTitle = defaultProblem && defaultProblem.title ? defaultProblem.title : "";



        return (

            <div>
                {
                    <div >
                        {/*<LinkContainer to="/my_stakeholders/proposals">*/}
                        {/*<Button>proposals</Button>*/}
                        {/*</LinkContainer>*/}

                        {


                                /*took out style={{width:"800px"}}*/
                            <div>
                            <CurrentProblem

                                heading ={<h4>Assigned Problem</h4>}
                                problem={

                                    defaultProblem
                                }
                                useHTMLFormatting={true}

                            />
                            </div>

                        }
                            {/*took out style={{width:"800px"}}*/}
                        <div >
                        {this.props.instructionsData ?
                            <InstructionsPanel title={this.props.instructionsData.Team_WickedProblemFormulation.title}
                                               body={this.props.instructionsData.Team_WickedProblemFormulation.body}/>
                            : <div></div>
                        }


                        </div>



                        {
                            <Panel
                                //style={{width:"800px"}}

                            >

                                <Grid
                                    fluid={true}
                                >


                                    <Row className="show-grid">
                                        <Col md={6}>

                                            {/*<panel style={{width:'100px'}}>*/}
                                            <ProblemTableWithData
                                                userId={userId}
                                                teamId={teamId}
                                                tag={"MORE_SPECIFIC"}

                                                onSelectProblem={
                                                    (problemId) => {

                                                        this.setState({selectedProblemId: problemId});
                                                        this.props.selectProblem(teamId, problemId);
                                                        //.then(() => { this.refetch()});

                                                    }}
                                                selectedProblemId={this.state.selectedProblemId}
                                                active={this.props.active }
                                                readonly={this.props.readonly}
                                            />
                                            {/*</panel>*/}

                                        </Col>
                                        <Col md={6}>
                                            {/*<panel style={{width:'100px'}}>*/}

                                            <ProblemTableWithData
                                                userId={userId}
                                                teamId={teamId}
                                                tag={"MORE_GENERAL"}

                                                onSelectProblem={
                                                    (problemId) => {

                                                        this.setState({selectedProblemId: problemId});
                                                        this.props.selectProblem(teamId, problemId);
                                                        //.then(this.refetch());

                                                    }}
                                                selectedProblemId={this.state.selectedProblemId}
                                                active={this.props.active }
                                                readonly={this.props.readonly}
                                            />

                                            {/*</panel>*/}
                                        </Col>
                                    </Row>
                                </Grid>
                            </Panel>

                        }

                    </div>


                }


            </div>


        );

    }




}


ProblemPanelIntermed.propTypes = ProblemPanelPropTypes;

const ProblemPanel = withRouter(ProblemPanelIntermed);


export default ProblemPanel;
