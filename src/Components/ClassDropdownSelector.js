import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';




import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Well, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, DropdownButton, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import _ from "underscore";

const ClassDropdownSelectorPropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    classes: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.number,
    formId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,


    //TODO someday the following should work in React
    //see: https://github.com/facebook/react/issues/3163

    //selected: PropTypes.oneOfType([null, PropTypes.number]).isRequired,


}





class ClassDropdownSelector extends Component {


    constructor(props) {
        super(props);


        this.state = {


        };


//        this.onRowSelect = this.onRowSelect.bind(this);

    }


    // onChange(e) {
    //
    //
    //     if(this.props.onSelect && e && e.target && e.target.value)
    //     {
    //         let s = {
    //             id: parseInt(e.target.value),
    //         };
    //
    //         this.props.onSelect(s);
    //     }
    //
    // }



    onChange(e) {


        if(this.props.onSelect && e && e.target && e.target.value)
        {
            let foundClass = null;

            if(this.props.classes)
            {
                foundClass = _.find(this.props.classes, (d) => {
                    return d.id === parseInt(e.target.value) ;
                });
            }

            let s = {
                id: parseInt(e.target.value),
                class: foundClass
            };


            this.props.onSelect(s);
        }

    }



    componentDidUpdate(prevProps, prevState) {

        //
        // if(prevProps.active === false && this.props.active === true)
        // {
        //     this.props.refetch();
        // }



        if((this.props.selected === null || this.props.selected === -1) && this.props.loading === false &&
            this.props.classes && this.props.classes.length > 0)  {

            let s = {
                id: this.props.classes[0].id,
                class: this.props.classes[0]
            }

            this.props.onSelect(s);

        }


    }




    render() {


        return (

            <Well>
                <form>
                    <FormGroup controlId={this.props.formId} >
                        <ControlLabel>Class:</ControlLabel>
                        <FormControl
                            componentClass="select"
                            value={this.props.selected}
                            placeholder="select"
                            onChange={this.onChange.bind(this)}
                        >
                            {

                                this.props.classes ?
                                    this.props.classes.map((s) => {

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
            </Well>

        );


    }

}

ClassDropdownSelector.propTypes = ClassDropdownSelectorPropTypes;


export default ClassDropdownSelector;


