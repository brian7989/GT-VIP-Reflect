import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import _ from 'lodash';

const TeamMembersTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    addUser: PropTypes.func,
    refetch: PropTypes.func,
    teamMembers: PropTypes.array,
    teams: PropTypes.array,
    loadingTeams: PropTypes.bool,
    refetchTeams: PropTypes.func,
    hideId: PropTypes.bool,
    isAdmin: PropTypes.bool
}


// validator function pass the user input value and should return true|false.
function teamMemberValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The teamMember name must be at least 3 characters.';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal
    next();

}





class ReasonEditor extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {  };
    }
    focus() {

        this.updateData();

    }

    updateData() {
        //don't actually save anything
        this.props.onUpdate({});

        //now notify back that we were clicked so parent GUI and switch tabs to teamMember screen
        if(this.props.onSelect)
        {
            this.props.onSelect({teamMemberId: this.props.row.id});
        }
    }
    render() {

        return (
            <div></div>
        );
    }
}



const teamsFormatter = (cell, row) => (
    (
        () => {

            console.log('teamsFormatter');
            console.log(cell);

            if(_.isNil(cell) || _.isNil(cell.nodes))
                return '';

            return <FormGroup>
                <FormControl componentClass='select' >
                    {cell.nodes.map(c => <option value={c.name} key={c.name}>{c.name}</option>)}
                </FormControl>
            </FormGroup>

        }
    )()
);



const reasonFormatter = (cell, row) => (<span><button>Go To</button></span>);


const createReasonEditor = (onUpdate, props) => (<ReasonEditor onUpdate={ onUpdate } {...props}/>);






class TeamMembersTable extends Component {


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
    deleteTeamMember() {

        if (this.state.selected.length > 0) {

            this.props.deleteTeamMember(this.state.selected[0])
                .then(() => this.refetch());

            this.setState({selected: []});
        }

    }

    updateTeamMember(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        if(fieldName === 'ignoreMe1')
            return;


        patch[fieldName] = newValue;

        this.props.updateTeamMember(row.id, patch).then(() => this.refetch());



    }

    receiveTeamMembers(teamMembers) {

        this.setState({teamMembers: teamMembers});
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

        if(this.props.deleteTeamMember)
            selectRowProp['mode'] = 'radio';

        return (

            <Panel>
            <BootstrapTable
                //ref = {this.props.uniqueRef}
                ref='table'
                remote={this.remote}
                data={ this.props.teamMembers }
                cellEdit={ cellEditProp }
                selectRow={ selectRowProp }
                options={ {

                handleConfirmDeleteRow: customConfirm,

                onCellEdit: (row, fieldName, newValue) => {
                    (() => {
                        console.log("tried to edit, but we aren't allowing it");
                        //this.updateTeamMember(row, fieldName, newValue)
                    })()
                },
                onDeleteRow: () => {this.deleteTeamMember()},
                onAddRow: (row) => {this.props.addUser(row)},
                //          deleteBtn: this.createCustomDeleteButton,
                //          insertModal: this.createCustomModal,
                      } }
                insertRow = {!!this.props.addUser && this.props.isAdmin}
                deleteRow = {!!this.props.deleteTeamMember && this.props.isAdmin}
                striped
                hover
                //can force scrolling by using the following
                //maxHeight="100px"
                //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
            >
                <TableHeaderColumn dataField='id' isKey={ true }
                                   editable={false}
                                   hidden={this.props.hideId}
                                   hiddenOnInsert
                >ID</TableHeaderColumn>


                <TableHeaderColumn dataField='username'
                                   editable={ this.props.isAdmin && this.props.updateUser ? {type: 'text', validator: teamMemberValidator} : false}
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   editColumnClassName='editing-teamMember-class'
                                   invalidEditColumnClassName='invalid-teamMember-class'>User Name</TableHeaderColumn>

                <TableHeaderColumn dataField='password'
                                   editable={ this.props.isAdmin && this.props.updateUser ? {type: 'password', validator: teamMemberValidator} : false}
                                   hidden={true}
                >Password</TableHeaderColumn>

                <TableHeaderColumn dataField='firstName'
                                   editable={ this.props.isAdmin && this.props.updateUser ? {type: 'text', validator: teamMemberValidator} : false}
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   editColumnClassName='editing-teamMember-class'
                                   invalidEditColumnClassName='invalid-teamMember-class'>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField='lastName'
                                   editable={ this.props.isAdmin && this.props.updateUser ? {type: 'text', validator: teamMemberValidator} : false}
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   editColumnClassName='editing-teamMember-class'
                                   invalidEditColumnClassName='invalid-teamMember-class'>Last Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'
                                   editable={ this.props.isAdmin && this.props.updateUser ? {type: 'text', validator: teamMemberValidator} : false}
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   editColumnClassName='editing-teamMember-class'
                                   invalidEditColumnClassName='invalid-teamMember-class'>email</TableHeaderColumn>

                <TableHeaderColumn dataField='institution'
                                   editable={ this.props.isAdmin && this.props.updateUser ? {type: 'text', validator: teamMemberValidator} : false}
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   hidden={!this.props.isAdmin}
                                   editColumnClassName='editing-teamMember-class'
                                   invalidEditColumnClassName='invalid-teamMember-class'
                >Institution</TableHeaderColumn>


                <TableHeaderColumn dataField='currentTeamId'
                                   editable={ this.props.isAdmin && this.props.updateUser ? {type: 'number'} : false}
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   hidden={!this.props.isAdmin}
                                   hiddenOnInsert={true}

                >Current Team ID</TableHeaderColumn>

                <TableHeaderColumn dataField='teamsByUserId'
                                   dataFormat={teamsFormatter}
                                   //editable={ this.props.updateUser ? {type: 'number'} : false}
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   hidden={!this.props.isAdmin}
                                   hiddenOnInsert={true}

                >Current Team ID</TableHeaderColumn>


                <TableHeaderColumn dataField='role'
                                   editable={ this.props.updateUser ?  {type: 'select', options: {values: ['USER', 'TEACHING_ASSISTANT']}}: false}
                                   hidden={!this.props.isAdmin}
                >Role</TableHeaderColumn>

            </BootstrapTable>
            </Panel>

        );

    }

}

TeamMembersTable.propTypes = TeamMembersTablePropTypes;


export default TeamMembersTable;


