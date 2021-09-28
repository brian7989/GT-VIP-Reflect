import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



import PropTypes from 'prop-types';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';




const LogInPropTypes = {

    submit: PropTypes.func.isRequired,
    errorMesg: PropTypes.string,
}

class LogInForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            nameValue: '',
            passwordValue: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(event) {
        this.setState({nameValue: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({passwordValue: event.target.value});
    }


    handleSubmit(event) {

        this.props.submit(this.state.nameValue, this.state.passwordValue);
        //TODO JBW where did this come from? Seems unimplemented so I commented it out
        //this.props.showUserPage();

        event.preventDefault();
    }

    render() {

        return (


            <Well >
                    <Form  horizontal  onSubmit= {(event) => {this.handleSubmit(event)}} >

                    <FormGroup>
                        <FormControl type="text" placeholder="user name" value={this.state.nameValue} onChange={this.handleNameChange} />
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="password" placeholder="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}/>
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

LogInForm.propTypes = LogInPropTypes;


export default LogInForm;

