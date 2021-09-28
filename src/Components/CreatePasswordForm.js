import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



import PropTypes from 'prop-types';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';




const CreatePasswordPropTypes = {

    submit: PropTypes.func.isRequired,
    errorMesg: PropTypes.string,
}

class CreatePasswordForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            repeatPasswordValue: '',
            passwordValue: ''
        };


        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handlePasswordChange(event) {
        this.setState({passwordValue: event.target.value});
    }


    handleRepeatPasswordChange(event) {
        this.setState({repeatPasswordValue: event.target.value});
    }

    handleSubmit(event) {

        this.props.submit(this.state.passwordValue, this.state.repeatPasswordValue);

        event.preventDefault();
    }

    render() {

        return (


            <Well >
                    <Form  horizontal  onSubmit= {(event) => {this.handleSubmit(event)}} >

                    <FormGroup>
                        <ControlLabel>New Password</ControlLabel>
                        <FormControl type="password" placeholder="" value={this.state.passwordValue} onChange={this.handlePasswordChange} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Repeat New Password</ControlLabel>
                        <FormControl type="password" placeholder="" value={this.state.repeatPasswordValue} onChange={this.handleRepeatPasswordChange}/>
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

CreatePasswordForm.propTypes = CreatePasswordPropTypes;


export default CreatePasswordForm;

