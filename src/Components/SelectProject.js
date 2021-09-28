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



class SelectProject extends Component {

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
                <button id = "serButton">
                    <NavLink to={ReflectRoutes.user.url}>User</NavLink>
                </button>
                <h2>Select a Project Type with a Corresponding Work Plan</h2>
                <br></br>
                <p id="instructionlarge">Click on the various project types to check them out. Then get back to this page and select one. All teams in your class or project will work along the same work plan. Work plans cannot be changed after the project started.</p>
                <br></br>
                <label for="project-select">Class / project: </label>
                <select id="project-select">
                    <option value="test1">Temporary 1</option>
                    <option value="test2">Temporary 2</option>
                    <option value="test3">Temporary 3</option>
                    <option value="test4">Angi is awesome</option>
                </select>
                <br></br>
                <div text-align="center">
                    <div display="inline-block" content-align="left">
                        <form>
                            <label text-align="left">
                                <input type="radio" value="reflect-traditional" checked={true} />
                                Reflective Consensus Building on Wicked Problems in Education (selected)
                            </label>
                            <br></br>
                            <label text-align="left">
                                <input type="radio" value="reflect-instructor" checked={false} />
                                Reflective Consensus Building on Wicked Problems in Education (Instructor version)
                            </label>
                            <br></br>
                            <label>
                                <input type="radio" value="small-workshop" checked={false} />
                                3-hour workshop for small teams to familiarize them with the Reflect! Approach
                            </label>
                            <br></br>
                            <label>
                                <input type="radio" value="stakeholder" checked={false} />
                                Stakeholder deliberation
                            </label>
                            <br></br>
                            <label>
                                <input type="radio" value="stakeholder-support" checked={false} />
                                Stakeholder deliberation. Work plan for support teams
                            </label>
                            <br></br>
                            <label>
                                <input type="radio" value="proposal" checked={false} />
                                Proposal development
                            </label>
                        </form>
                        <button className="btn btn-default" type="submit">Select</button>
                    </div>

                </div>

            </Row>

        </div>

    }

}

export default SelectProject;
