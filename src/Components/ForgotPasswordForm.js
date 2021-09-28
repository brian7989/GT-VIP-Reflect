import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



import PropTypes from 'prop-types';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';




const ForgotPasswordPropTypes = {

    submit: PropTypes.func.isRequired,
    errorMesg: PropTypes.string,
}

class ForgotPasswordForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            emailValue: '',

        };

        this.handleEmailChange = this.handleEmailChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleEmailChange(event) {
        this.setState({emailValue: event.target.value});
    }



    handleSubmit(event) {

        this.props.submit(this.state.emailValue);

        event.preventDefault();
    }

    render() {

        return (


            <Well >
                <p>You will receive a password reset link via email</p>
                    <Form  horizontal  onSubmit= {(event) => {this.handleSubmit(event)}} >

                    <FormGroup>
                        <FormControl type="text" placeholder="username" value={this.state.emailValue} onChange={this.handleEmailChange} />
                    </FormGroup>

                        <FormGroup>
                    <Button type="submit">Submit</Button>
                            </FormGroup>
                        {this.props.errorMesg ? this.props.errorMesg : ""}
                    </Form>

            </Well>


        );

    }

}

ForgotPasswordForm.propTypes = ForgotPasswordPropTypes;


export default ForgotPasswordForm;

