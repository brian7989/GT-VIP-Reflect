import React, { Component } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Well, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, DropdownButton, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import _ from "underscore";

const TeamDropdownSelectorPropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    teams: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.number,
    formId: PropTypes.string
        //.isRequired
    ,
    classId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,

    //TODO someday the following should work in React
    //see: https://github.com/facebook/react/issues/3163

    //selected: PropTypes.oneOfType([null, PropTypes.number]).isRequired,


}





class TeamDropdownSelector extends Component {


    constructor(props) {
        super(props);


        this.state = {


        };

    }

    onChange(e) {

        let myTeams = this.props.teams ? this.props.teams.slice(0) : null;

        if(!myTeams)
            myTeams = [];

        myTeams.unshift({id: -1, name: "Team"});

        if(this.props.onSelect && e && e.target && e.target.value)
        {
            let foundTeam = null;

            if(myTeams)
            {
                foundTeam = _.find(myTeams, (d) => {
                    return d.id === parseInt(e.target.value) ;
                });
            }

            let s = {
                id: parseInt(e.target.value),
                team: foundTeam
            };


            this.props.onSelect(s);
        }

    }



    componentDidUpdate(prevProps, prevState) {

        if((this.props.selected === null || this.props.selected === -1) && this.props.loading === false &&
            this.props.teams && this.props.teams.length > 0)  {

            let s = {
                id: this.props.teams[0].id,
                team: this.props.teams[0]
            }

            this.props.onSelect(s);

        }

    }



    render() {

        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html
        console.log("From the teamsDropdwonSelector!!!!!!!!!!!!!");
        console.log(this.props);

        let myTeams = this.props.teams ? this.props.teams.slice(0) : null;

        if(!myTeams)
            myTeams = [];

        myTeams.unshift({id: -1, name: "Team"});

        return (


            <form id = "teamDropdownSelector">
            <FormGroup >


                <FormControl
                    componentClass="select"
                    value={this.props.selected ? this.props.selected : undefined}
                    placeholder="select"
                    onChange={this.onChange.bind(this)}
                >
                    {

                            myTeams ?
                                myTeams.map((s) => {

                                let isSelected = this.props.selected && s.id === this.props.selected;

                                return (
                                    <option value={s.id}
                                            key={s.id}
                                            // selected={isSelected}
                                    >
                                        {s.name}
                                    </option>

                                );
                            }) : ""



                    }
                </FormControl>

            </FormGroup>
            </form>


        );


    }

}

TeamDropdownSelector.propTypes = TeamDropdownSelectorPropTypes;


export default TeamDropdownSelector;


