import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-vertical-timeline-component/style.min.css';
import { Link, NavLink } from "react-router-dom";
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

const TeamMaterialsPropTypes = {

    teamInfo: PropTypes.object.isRequired,
    classInfo: PropTypes.object,
    userId: PropTypes.number.isRequired,
    currentClassId: PropTypes.number,
    active: PropTypes.bool.isRequired,
    readonly: PropTypes.bool,

}


class TeamMaterialsPage extends Component {


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

                <Col >

                    <div>These are the materials for your team</div>

                    <MaterialsTableWithData
                        userId={this.props.userId}
                        teamId={teamInfo.id}
                        classId={teamInfo.classId}
                        active={this.props.active}
                        deleteEnabled={true}
                        readonly={false}
                        userEnabled={true}
                    />
                </Col>

            </Panel>

        );


    }

}

TeamMaterialsPage.propTypes = TeamMaterialsPropTypes;


export default TeamMaterialsPage;

