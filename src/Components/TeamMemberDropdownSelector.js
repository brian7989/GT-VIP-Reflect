import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Well, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, DropdownButton, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';

import _ from "underscore";

import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const TeamMemberDropdownSelectorPropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    teamMembers: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.number,
    active:PropTypes.bool.isRequired,
    controlId:PropTypes.string.isRequired,

    //TODO someday the following should work in React
    //see: https://github.com/facebook/react/issues/3163

    //selected: PropTypes.oneOfType([null, PropTypes.number]).isRequired,


}





class TeamMemberDropdownSelector extends Component {


    constructor(props) {
        super(props);
        this.state = {};

    }


    onChange(e) {


        if(this.props.onSelect && e && e.target && e.target.value)
        {
            let foundUser = null;

            if(this.props.teamMembers)
            {
                foundUser = _.find(this.props.teamMembers, (d) => {
                    return d.id === parseInt(e.target.value) ;
                });
            }

            let s = {
                id: parseInt(e.target.value),
                user: foundUser
            };


            this.props.onSelect(s);
        }

    }


    componentDidUpdate(prevProps, prevState) {


        if((this.props.selected === null || this.props.selected === -1) && this.props.loading === false &&
            this.props.teamMembers && this.props.teamMembers.length > 0)  {

            let s = {
                id: this.props.teamMembers[0].id,
                user: this.props.teamMembers[0]
            }

            this.props.onSelect(s);

        }


    }




    render() {


        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html

        return (

            <Well>
            <form>
            <FormGroup controlId={this.props.controlId} >
                <ControlLabel>Team Member:</ControlLabel>
                <FormControl
                    componentClass="select"
                    value={this.props.selected ? this.props.selected : undefined}
                    placeholder="select"
                    onChange={this.onChange.bind(this)}
                >
                    {

                        this.props.teamMembers ?
                        this.props.teamMembers.map((s) => {

                            let isSelected = this.props.selected && s.id === this.props.selected;



                            return (
                                <option value={s.id}
                                        key={s.id}
                                        // selected={isSelected}
                                >
                                    {s.fullName}
                                </option>

                            );
                        }) : ""

                    }
                </FormControl>
            </FormGroup>
            </form>
            </Well>

        );


    }

}

TeamMemberDropdownSelector.propTypes = TeamMemberDropdownSelectorPropTypes;


export default TeamMemberDropdownSelector;


