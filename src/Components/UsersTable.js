import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, OverlayTrigger, Tooltip, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



const UsersTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    users: PropTypes.array,

}


// validator function pass the user input value and should return true|false.
function userValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The user name must be at least 3 characters.';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}



const teamFormatter = (cell, row) => {

    console.log(cell);
    console.log(row);

    return <div>{}</div>;

};







class UsersTable extends Component {


    constructor(props) {
        super(props);


        this.state = {
            selected: [], //used for deletion
            // currPage: 1
        };


        this.onRowSelect = this.onRowSelect.bind(this);

    }

    refetch() {

        if(this.props.refetch)
            return this.props.refetch();
    }

    selectProposal(proposalInfo) {


        if(this.props.onSelectProposal)
        {
            this.props.onSelectProposal(proposalInfo);
        }

    }


    //used for setting up react-bootstrap-table remote teamTestData wiring config
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


    //TODO I think delete [item] is passed the selected array and possibly doesn't need to be accessed by state
    //but examples showed that I need to track selected as state. not sure why...
    deleteUser() {

        if (this.state.selected.length > 0) {
            this.props.deleteUser(this.state.selected[0]).then(() => this.refetch());

            this.setState({selected: []});
        }

    }

    addUser(row) {

        let newData = row;

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete newData.ignoreMe1;

        this.props.addUser(newData).then(() => this.refetch());

    }


    updateUser(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        if(fieldName === 'ignoreMe1')
            return;

        patch[fieldName] = newValue;

        this.props.updateUser(row.id, patch).then(() => this.refetch());
    }

    receiveUsers(users) {

        this.setState({users: users});
    }




    render() {


        const cellEditProp = {

            mode: 'click',
            blurToSave: true,
            //afterSaveCell: this.onAfterSaveCell,

        };

        const selectRowProp = {
            //mode: 'radio',
            bgColor: 'pink',
            onSelect: this.onRowSelect,
            selected: this.state.selected
        };


        if(this.props.deleteUser)
            selectRowProp['mode'] = 'radio';


        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html

        let overlayStyle = {
            display: 'inline-block',
            width: 'fit-content'
        };

        return (

            <Panel>


                    <BootstrapTable
                        ref='table'
                        remote={this.remote}
                        data={this.props.users}
                        cellEdit={cellEditProp}
                        selectRow={selectRowProp}
                        options={{

                            handleConfirmDeleteRow: customConfirm,

                            onCellEdit: (row, fieldName, newValue) => {
                                this.updateUser(row, fieldName, newValue)
                            },
                            onDeleteRow: () => {
                                this.deleteUser()
                            },
                            onAddRow: (row) => {
                                this.addUser(row)
                            },
                            //          deleteBtn: this.createCustomDeleteButton,
                            //          insertModal: this.createCustomModal,
                        }}
                        insertRow = {!!this.props.addUser}
                        deleteRow = {!!this.props.deleteUser}
                        striped
                        hover
                        //can force scrolling by using the following
                        //maxHeight="100px"
                        //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
                    >
                        <TableHeaderColumn dataField='id' isKey={true} hiddenOnInsert>ID</TableHeaderColumn>

                        <TableHeaderColumn dataField='username'
                                           editable={ this.props.updateUser ? {type: 'textarea', validator: userValidator} : false}
                                           tdStyle={{whiteSpace: 'normal'}}
                                           editColumnClassName='editing-user-class'
                                           invalidEditColumnClassName='invalid-user-class'>User</TableHeaderColumn>

                        <TableHeaderColumn dataField='firstName'
                                           editable={ this.props.updateUser ? {type: 'textarea', validator: userValidator} : false}
                                           tdStyle={{whiteSpace: 'normal'}}
                                           editColumnClassName='editing-user-class'
                                           invalidEditColumnClassName='invalid-user-class'>First</TableHeaderColumn>

                        <TableHeaderColumn dataField='lastName'
                                           editable={ this.props.updateUser ? {type: 'textarea', validator: userValidator} : false}
                                           tdStyle={{whiteSpace: 'normal'}}
                                           editColumnClassName='editing-user-class'
                                           invalidEditColumnClassName='invalid-user-class'>Last</TableHeaderColumn>

                        <TableHeaderColumn dataField='email'
                                           editable={ this.props.updateUser ? {type: 'textarea', validator: userValidator} : false}
                                           tdStyle={{whiteSpace: 'normal'}}
                                           editColumnClassName='editing-user-class'
                                           invalidEditColumnClassName='invalid-user-class'>Email</TableHeaderColumn>

                        <TableHeaderColumn dataField='role'
                                           editable={ this.props.updateUser ? {type: 'textarea', validator: userValidator} : false}
                                           tdStyle={{whiteSpace: 'normal'}}
                                           editColumnClassName='editing-user-class'
                                           invalidEditColumnClassName='invalid-user-class'>Role</TableHeaderColumn>

                        <TableHeaderColumn dataField='team'
                                           editable={ false}
                                           dataFormat={teamFormatter}
                                           tdStyle={{whiteSpace: 'normal'}}
                                           editColumnClassName='editing-user-class'
                                           invalidEditColumnClassName='invalid-user-class'>Team Name</TableHeaderColumn>



                    </BootstrapTable>





            </Panel>

        );


    }

}







UsersTable.propTypes = UsersTablePropTypes;


export default UsersTable;


