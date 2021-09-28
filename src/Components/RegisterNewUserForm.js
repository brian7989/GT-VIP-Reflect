import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



import PropTypes from 'prop-types';


import {Bootstrap, Panel, Label, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';
import Configuration from "../DataComponents/Configuration";
import {withRouter} from "react-router-dom";

import ReflectRoutes from "./ReflectRoutes";


const RegisterNewUserPropTypes = {
}

class RegisterNewUserFormIntermed extends Component {

    constructor(props){
        super(props);

        this.state = {
            repeatPasswordValue: '',
            passwordValue: '',
            email: '',
            username: '',
            firstname:'',
            lastname:'',
            registrationErrorMesg: '',
            tosSignOff: false,
        };


        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleTosChange = this.handleTosChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleTosChange(event) {
        console.log("tos toggle");
        //console.log(event.target.value);
        this.setState({tosSignOff: !this.state.tosSignOff});
    }

    handlePasswordChange(event) {
        this.setState({passwordValue: event.target.value});
    }

    handleRepeatPasswordChange(event) {
        this.setState({repeatPasswordValue: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }


    handleFirstnameChange(event) {
        this.setState({firstname: event.target.value});
    }

    handleLastnameChange(event) {
        this.setState({lastname: event.target.value});
    }


    handleSubmit(event) {

        let password = this.state.passwordValue;
        let repeatPassword = this.state.repeatPasswordValue;
        let username = this.state.username;
        let email = this.state.email;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let defaultRole = "user";

        let tosSignoff = this.state.tosSignOff;
        event.preventDefault();


        if(!tosSignoff) {
            console.log("TOS fail");
            this.setState({registrationErrorMesg: 'You must agree to Terms of Service'});
            return;
        }

        // if (password !== repeatPassword) {
        //         alert("error");
        //         this.setState({registrationErrorMesg: "Repeat password entry does not match"});
        //
        // } else if ( password.length < 6 ) {
        //         alert("error");
        //         this.setState({registrationErrorMesg: "Password too short"});
        // } else
            {
            const url = !process.env.NODE_ENV || process.env.NODE_ENV === "production" ? Configuration.prodUrl : Configuration.devUrl;

            fetch(url + "api/users", {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        username: username,
                        firstName: firstname,
                        middleName: "",
                        lastName: lastname,
                        email: email
                    })
                }).then(res=>res.json())
                    .then(
                        (result) => {
                            console.log("FETCH RESULT: ")
                            console.log(result);
                            //this.setState({isLoaded: true, items: result.items});

                            //TODO if registration successful, go to user view and force user to log in

                            /**
                             * {"success":true,"data":[{"id":1343,"first_name":"Philip","middle_name":null,
                             * "last_name":"Abel","institution":null,"joined_date":"2019-04-17T18:31:57.669Z","last_login_date":null,
                             * "terms_conditions_signoff":false,"active":false,"created_at":"2019-04-17T18:31:57.669Z",
                             * "updated_at":"2019-04-17T18:31:57.669Z",
                             * "current_class_id":null,
                             * "current_team_id":null,
                             * "current_stakeholder_id":null}]}
                             */

                            if(result.success) {
                                // console.log("This is the user data!!!!!!!!!!!!!!!!!");
                                // //console.log(result);
                                let newPath = ReflectRoutes.newuser.url;
                                // if (result.current_class_id == null) {
                                //    newPath = "/" + "newUser"
                                // }
                                //
                                this.props.history.push(newPath);
                                //this.props.submit(username, password);
                                // this.setIsLoggedIn(false, false);
                                //this.props.setNewUserState();
                                //alert("user account created! Please login.");

                                this.setState({registrationErrorMesg: ''});
                            }
                            else {

                                if(result.error && result.error.message)
                                    this.setState({registrationErrorMesg: result.error.message});
                                else
                                    this.setState({registrationErrorMesg: "unknown error"});

                            }
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            console.log("FETCH ERROR: " + error);

                            this.setState({registrationErrorMesg: "unknown error"});
                        }
                    );
            }


    }

    render() {

        return (


            <Well >

                    <Form  horizontal  onSubmit= {(event) => {this.handleSubmit(event)}} >

                    <FormGroup>

                        <FormControl type="text" placeholder="User Name" value={this.state.username} onChange={this.handleUsernameChange} />
                    </FormGroup>

                        <FormGroup>

                            <FormControl type="text" placeholder="First Name" value={this.state.firstname} onChange={this.handleFirstnameChange} />
                        </FormGroup>

                        <FormGroup>

                            <FormControl type="text" placeholder="Last Name" value={this.state.lastname} onChange={this.handleLastnameChange} />
                        </FormGroup>

                        <FormGroup>

                            <FormControl type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                        </FormGroup>

                        <FormGroup>

                            <ControlLabel>Confirm agreement to <a href={"https://reflect.gatech.edu/terms-of-service/"} target="_blank">Terms of Service</a></ControlLabel>
                            <FormControl type="checkbox" label="Terms of Service" value={this.state.tosSignOff} onChange={this.handleTosChange} />
                        </FormGroup>

                        {/*<FormGroup>*/}

                        {/*    <FormControl type="text" placeholder="Password" value={this.state.passwordValue} onChange={this.handlePasswordChange} />*/}
                        {/*    <FormControl type="text" placeholder="Repeat Password" value={this.state.repeatPasswordValue} onChange={this.handleRepeatPasswordChange} />*/}
                        {/*</FormGroup>*/}

                        <FormGroup>
                    <Button type="submit">Submit</Button>
                            </FormGroup>
                        {this.state.registrationErrorMesg ? this.state.registrationErrorMesg : ""}
                    </Form>
            </Well>


        );

    }

}

RegisterNewUserFormIntermed.propTypes = RegisterNewUserPropTypes;
const RegisterNewUserForm = withRouter(RegisterNewUserFormIntermed);

export default RegisterNewUserForm;

