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



class NewUser extends Component {

    constructor(props){
        super(props);
        this.state = {
        };

    }


    render() {
        return <div><p>Registration successful. Please check your email for activation link.</p>
            <NavLink to="/"
                                                                                                         style={{flex: 1, alignSelf: 'flex-start'}}
        > <Button>Go to Login Screen</Button></NavLink></div>;

        //
        // <Row>
        //     <Col md={4}>
        //         <Row><button id = "homeButton">
        //             <NavLink to="/">Home</NavLink>
        //         </button></Row>
        //         <Row><p>User data here, requires data fetching</p></Row>
        //     </Col>
        //     <Col md={8}>
        //         <Row><h2>New User</h2></Row>
        //         <Row><h4>My Classes/Projects</h4></Row>
        //         <Row>
        //             <Col md={4}><button className="createTeam">Create a class or project</button></Col>
        //             <Col md={8}><p id="instructionsmall">Welcome to Reflect! To get started, please create a team or join an existing one.</p></Col>
        //         </Row>
        //     </Col>
        //
        //
        // </Row>


    }

}

export default NewUser;
