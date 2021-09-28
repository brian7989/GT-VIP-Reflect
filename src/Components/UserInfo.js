import React, { Component } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



import PropTypes from 'prop-types';


import {Bootstrap, Panel, Well, Navbar, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';




const UserInfoPropTypes = {

    loading: PropTypes.bool,
    //user: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    refetch: PropTypes.func,
}

class UserInfo extends Component {

    constructor(props){
        super(props);

        this.state = {

        };



    }

    componentWillReceiveProps(nextProps){

        console.log("UserInfo:loading:"+this.props.loading+":next:"+nextProps.loading);
        console.log(nextProps.user);

        if (!nextProps.loading && this.props.loading) {

            console.log("UserInfo:onChange!!!!");

            this.props.onChange(nextProps.user);
        }
    }


    render() {

        return (

            <div>THE USER PAGE</div>


        );

    }

}

UserInfo.propTypes = UserInfoPropTypes;


export default UserInfo;

