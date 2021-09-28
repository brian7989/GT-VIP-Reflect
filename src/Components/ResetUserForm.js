import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import CreatePasswordForm from "./CreatePasswordForm";

import PropTypes from 'prop-types';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';
import Configuration from "../DataComponents/Configuration";
import {withRouter} from "react-router-dom";





const ResetUserFormPropTypes = {
    registrationUser: PropTypes.string.isRequired,
    registrationAuthorization: PropTypes.string.isRequired,

}

class ResetUserFormFormIntermed extends Component {

    constructor(props){
        super(props);

        this.state = {
            registrationErrorMesg:'',
        };

    }




    render() {

        return (


            <div>

            <Modal show={true}>


                {

                        < Modal.Header >
                            < Modal.Title > Reset Password for User: {this.props.registrationUser}</Modal.Title>
                            <CreatePasswordForm
                                submit={(password, repeatPassword) => {

                                    const url = !process.env.NODE_ENV || process.env.NODE_ENV === "production" ? Configuration.prodUrl : Configuration.devUrl;


                                    console.log("form password: " + password);
                                    console.log("form repeat password: " + repeatPassword);

                                    if(password !== repeatPassword)
                                    {
                                        this.setState({registrationErrorMesg: "Repeat password entry does not match"});

                                    }
                                    else if(password.length < 6 )
                                    {
                                        this.setState({registrationErrorMesg: "Password too short"});
                                    }
                                    else {

                                        fetch(url + "api/users/" + this.props.registrationUser + "/resetpassword", {
                                            method: 'put',
                                            headers: {
                                                'Accept': 'application/json, text/plain, */*',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                password: password,
                                                authorization: this.props.registrationAuthorization
                                            })
                                        }).then(
                                            (res) => {
                                                //res => res.json()
                                                return res.json();
                                            }
                                        )
                                            .then(
                                                (result) => {
                                                    console.log("FETCH RESULT: ")
                                                    console.log(result);
                                                    //this.setState({isLoaded: true, items: result.items});

                                                    //TODO if registration successful, go to user view and force user to log in

                                                    if(result.success) {
                                                        let newPath = "/";// + "user";
                                                        this.props.history.push(newPath);

                                                        // this.props.logOut();
                                                        // this.setIsLoggedIn(false, false);
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
                                                    //this.setState({isLoaded: true, error});

                                                    this.setState({registrationErrorMesg: "unknown error"});
                                                }
                                            );

                                    }


                                }}
                                errorMesg={this.state.registrationErrorMesg}
                            />
                        </Modal.Header>


                }


            </Modal>


            </div>
        );


    }

}

ResetUserFormFormIntermed.propTypes = ResetUserFormPropTypes;
const ResetUserFormForm = withRouter(ResetUserFormFormIntermed);

export default ResetUserFormForm;

