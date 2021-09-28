import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const RulesTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    addRule: PropTypes.func.isRequired,
    refetch: PropTypes.func,
    deleteRule: PropTypes.func.isRequired,
    updateRule: PropTypes.func.isRequired,
    rules: PropTypes.array,
    readonly: PropTypes.bool,
}


// validator function pass the user input value and should return true|false.
function ruleValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The rule must be a sentence';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}




class RulesBootstrapTable extends Component {


    constructor(props) {
        super(props);


        this.state = {
            rules: [],
            selected: [], //used for deletion
            // currPage: 1
        };


        this.onRowSelect = this.onRowSelect.bind(this);

    }


    remote(remoteObj) {
        // Only cell editing, insert and delete row will be handled by remote store
        remoteObj.cellEdit = true;
        remoteObj.insertRow = true;
        remoteObj.dropRow = true;
        return remoteObj;
    }


    onRowSelect({ id }, isSelected) {
        if (isSelected) {
            this.setState({
                selected: [id],
                //  currPage: this.refs.table.state.currPage
            });
        } else {
            this.setState({selected: []});
        }
        return false;
    }

    refetch() {

        if(this.props.refetch)
            return this.props.refetch();
    }

    //TODO I think delete rule is passed the selected array and possibly doesn't need to be accessed by state
    //but examples showed that I need to track selected as state. not sure why...
    deleteRule() {

        if (this.state.selected.length > 0) {
            this.props.deleteRule(this.state.selected[0]);
            //this.props.deleteRule(this.state.selected[0]).then(() => this.refetch());

            this.setState({selected: []});
        }

    }

    addRule(row) {

        this.props.addRule(row.rule);

    }


    updateRule(row, fieldName, newValue) {

        this.props.updateRule(row.id, newValue);

    }


    receiveRules(rules) {

        this.setState({rules: rules});
    }


    render() {


        const cellEditProp = {

            mode: 'click',
            blurToSave: true,
            //afterSaveCell: this.onAfterSaveCell,

        };

        const selectRowProp = {
            mode: 'radio',
            bgColor: 'pink',
            onSelect: this.onRowSelect,
            selected: this.state.selected
        };



        //let refetch = this.refetch; //so anon function can access


        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html



        return (

            <Panel>
            <BootstrapTable

        ref='table'
        remote={this.remote}
        data={
            this.props.rules
            //this.props.getRules()
        }
        //cellEdit={ cellEditProp }
        selectRow={ selectRowProp }
        options={ {

            handleConfirmDeleteRow: customConfirm,
            onCellEdit: (row, fieldName, newValue) => {this.updateRule(row, fieldName, newValue)},
            onDeleteRow: () => {this.deleteRule()},
            onAddRow: (row) => {this.addRule(row)},
        } }
        insertRow={!this.props.readonly}
        deleteRow={!this.props.readonly}
        striped
        hover
        //can force scrolling by using the following
        //maxHeight="100px"
        //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
        >
        <TableHeaderColumn dataField='id' isKey={ true } hidden hiddenOnInsert>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='rule'
        editable={this.props.readonly ? false : { type: 'textarea', validator: ruleValidator } }
        tdStyle={ { whiteSpace: 'normal' } }
        editColumnClassName='editing-rule-class'
        invalidEditColumnClassName='invalid-rule-class'>Rule</TableHeaderColumn>
            </BootstrapTable>
            </Panel>

    );

    }

}

RulesBootstrapTable.propTypes = RulesTablePropTypes;


export default RulesBootstrapTable;


