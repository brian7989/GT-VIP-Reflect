import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-vertical-timeline-component/style.min.css';
import {Link, NavLink} from "react-router-dom";
import ReflectRoutes from "./ReflectRoutes";



import PropTypes from 'prop-types';


import {
    Bootstrap, Col, Grid, Panel, Row
} from 'react-bootstrap';


import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import TeamMembersTableWithData from "../DataComponents/TeamMembersTableWithData";
import RulesBootstrapTableWithData from "../DataComponents/RulesBootstrapTableWithData";
import TeamMemberStakeholderAssignmentTableWithData
    from "../DataComponents/TeamMemberStakeholderAssignmentTableWithData";
import MaterialsTableWithData from "../DataComponents/MaterialsTableWithData";
import { InsertButton } from 'react-bootstrap-table';


const TeamHomeScreenPropTypes = {

    teamInfo: PropTypes.object.isRequired,
    classInfo: PropTypes.object,
    userId: PropTypes.number.isRequired,
    currentClassId: PropTypes.number,
    active: PropTypes.bool.isRequired,
    readonly: PropTypes.bool,

}


class TeamHomeScreen extends Component {


    constructor(props) {
        super(props);


        this.state = {};
        this.gotoTeamMaterialsPage = this.gotoTeamMaterialsPage.bind(this);
    }

    gotoTeamMaterialsPage() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }


    render() {

        let teamInfo = this.props.teamInfo;
        //let classInfo = this.props.classInfo;
        if (!teamInfo || !teamInfo.id) {
            return <div>No team set. Sorry!</div>
        }
        console.log(teamInfo)

        return (

            <Panel>

                <h3>Your team is: {teamInfo.name}</h3>
                <Grid
                    fluid={true}
                >

                    <Row className="show-grid">
                        <Col md={6}>




                            <div>Here are the members of your team</div>
                            <TeamMembersTableWithData
                                //uniqueRef={"teamMembersOverview"}
                                teamId={teamInfo.id}
                                classId={teamInfo.classId}
                                hideId={true}
                                isAdmin={this.props.isAdmin}
                                active={this.props.active}
                            />

                            <div>These are the rules agreed upon by your team</div>
                            <RulesBootstrapTableWithData
                                teamId={teamInfo.id}
                                active={this.props.active}
                                readonly={this.props.readonly}

                            />


                            <div>These are the team research assignments</div>
                            <TeamMemberStakeholderAssignmentTableWithData
                                teamId={teamInfo.id}
                                active={this.props.active}
                                readonly={this.props.readonly}

                            />



                            <div>
                                {console.log(this.props.userId)}
                            </div>

                        </Col>
                        <Col>
                            <div>Goto Team Materials Page</div>
                            <div>
                                <NavLink to={ReflectRoutes.teamMaterialsPage.teamMaterials.url}>
                                    <InsertButton onClick={this.gotoTeamMaterialsPage}/>
                                </NavLink>
                            </div>
                        </Col>
                    </Row>




                </Grid>

            </Panel>

        );


    }

}

TeamHomeScreen.propTypes = TeamHomeScreenPropTypes;


export default TeamHomeScreen;


