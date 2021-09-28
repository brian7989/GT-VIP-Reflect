import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Well, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, DropdownButton, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


import _ from 'lodash';


const ProposalDropdownSelectorPropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    proposals: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.number,
    enabled: PropTypes.bool.isRequired,
    formId: PropTypes.string.isRequired,
    includeInactive: PropTypes.bool,
    stakeholderId: PropTypes.number.isRequired,

    //TODO someday the following should work in React
    //see: https://github.com/facebook/react/issues/3163

    //selected: PropTypes.oneOfType([null, PropTypes.number]).isRequired,


}



class ProposalDropdownSelector extends Component {


    constructor(props) {
        super(props);


        this.state = {


        };


//        this.onRowSelect = this.onRowSelect.bind(this);

    }


    onChange(e) {


        if(this.props.onSelect && e && e.target && e.target.value)
        {
            let s = {
                proposalId: parseInt(e.target.value),
            };

            this.props.onSelect(s);

        }

    }



    componentDidUpdate(prevProps, prevState) {


        if(!_.isNil(prevProps) && !prevProps.enabled && this.props.enabled)
        {

            if(this.props.refetch)
                this.props.refetch();

            return; //ignore any other updates because we want the latest data before possibly changing selected
        }


        if(_.isNil(this.props.loading)) //means that Apollo is not enabled yet
            return;

        if(this.props.loading === false && !_.isNil(this.props.proposals) ) { //Apollo loading is done


            if (this.props.proposals.length > 0) //Any data from Apollo query?
            {

                //don't change selected unless we really need to (due to new query or nothing currently selected)
                if (_.isNil(this.props.selected) || this.props.selected < 0 ||
                    !_.find(this.props.proposals, (v) => {
                        return v.id === this.props.selected
                    })) {

                    let s = {proposalId: this.props.proposals[0].id};

                    this.props.onSelect(s);

                }
            }
            else {
                //only deselect selected if that isn't already the case
                if(!_.isNil(this.props.selected) && this.props.selected >= 0)
                    this.props.onSelect(null);
            }

        }


    }





    render() {


        return (


            <form>
            <FormGroup controlId={this.props.formId} >
                <ControlLabel>Proposal:</ControlLabel>
                <FormControl componentClass="select" placeholder="select"  onChange={this.onChange.bind(this)}>
                    {

                            this.props.proposals ? this.props.proposals.map((s) => {

                                let isSelected = this.props.selected && s.id === this.props.selected;



                                return (
                                    <option value={s.id}
                                            key={s.id}
                                            selected={isSelected}
                                    >
                                        {s.proposalText}
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

ProposalDropdownSelector.propTypes = ProposalDropdownSelectorPropTypes;


export default ProposalDropdownSelector;


