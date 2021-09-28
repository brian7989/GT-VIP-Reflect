import React, { Component } from 'react';

import {Link, NavLink, withRouter} from "react-router-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ReflectRoutes from "./ReflectRoutes";
import HiddenRouteReporter from "./HiddenRouteReporter";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import "../styles/PageFormatter.css";



import PropTypes from 'prop-types';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';



class CreateClass extends Component {

    constructor(props){
        super(props);
        this.state = {
        };

    }


    render() {
        return <div>
            <Row>
                <button id = "homeButton">
                    <NavLink to={ReflectRoutes.homeRoute.home.url}>Home</NavLink>
                </button>
                <button id = "userButton">
                    <NavLink to={ReflectRoutes.user.url}>User</NavLink>
                </button>
                <h2>Create Class or Project</h2>
            </Row>
            <Row>
                <Col md="8">
                    <br></br>
                    <Row>
                        <form>
                            Name: <input type="text" name="name"/>
                        </form>
                        <br></br>
                    </Row>
                    <Row>
                        <button className="setProjType">Select project type with a corresponding work plan</button>
                    </Row>
                </Col>
                <Col md="4">
                    <div id="instructionsmall">
                        <p>When you create a class or project, you become the "administrator" of it. As an admin, you can:</p>
                        <ul>
                            <li>create teams by uploading a csv file</li>
                            <li>see all the entries of your teams</li>
                        </ul>
                        <p>If you want to become a member of a team that you are administrating, simply add your user information to the csv file.</p>
                        <p>As a team member, you can create content on the team page like any other member.</p>
                    </div>
                </Col>
            </Row>

        </div>

    }

}

export default CreateClass;
