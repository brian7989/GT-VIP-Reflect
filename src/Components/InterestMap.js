import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import createUrlEditor from "./KnowledgeReferenceTable";

const InterestsTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    //getInterests: PropTypes.func.isRequired,
    addInterest: PropTypes.func,
    refetch: PropTypes.func,
    deleteInterest: PropTypes.func,
    updateInterest: PropTypes.func,
    interests: PropTypes.array,
    //onSelectEvidence: PropTypes.func.isRequired,
    deleteEnabled: PropTypes.bool,
    readonly: PropTypes.bool,
    userEnabled: PropTypes.bool,
    showEdit: PropTypes.bool,
    onSelectEdit: PropTypes.func,
}


// validator function pass the user input value and should return true|false.
function InterestValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The Interest name must be at least 3 characters.';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


class EditEditor extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {  };

    }

    focus() {


        //immediately complete the "edit" and "save"
        this.updateData();

    }

    updateData() {
        //don't actually save anything
        this.props.onUpdate();

        //now notify back that we were clicked so parent GUI and switch tabs to proposal screen
        if (this.props.onSelect && this.props.row.isActive) {
            this.props.onSelect({});
        }

        // this.props.history.push(ReflectRoutes.user.url);
    }

    render() {

        return (
            <div></div>
        );
    }
}





function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}





class EvidenceEditor extends React.Component {
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

        //now notify back that we were clicked so parent GUI and switch tabs to Interest screen
        if(this.props.onSelect)
        {
            this.props.onSelect({InterestId: this.props.row.id});
        }
    }
    render() {

        return (
            <div></div>
    );
    }
}





const evidenceFormatter = (cell, row) => (<span><button>Go To</button></span>);

const evidenceFormatterReadOnly = (cell, row) => (<span><button>Go To</button></span>);

const userFormatter = (cell, row) => (<div>{cell.fullName}</div>);




const createEvidenceEditor = (onUpdate, props) => (<EvidenceEditor onUpdate={ onUpdate } {...props}/>);



const editButtonFormatter= (cell, row) => <span><button>Edit</button></span>


const createEditEditor = (onUpdate, props) => (<EditEditor onUpdate={onUpdate} {...props}/>);






class ActiveEditor extends React.Component {
    constructor(props) {
        super(props);


    }
    focus() {

        this.updateData();

    }
    updateData() {


        let val = !this.props.defaultValue;



        this.props.onUpdate(val);

    }
    render() {

        return (
            <div></div>
    );
    }
}


const createActiveEditor = (onUpdate, props) => (<ActiveEditor onUpdate={ onUpdate } {...props}/>);









class InterestsTable extends Component {


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


    selectEvidence(evidenceInfo) {


        if(this.props.onSelectEvidence)
        {
            this.props.onSelectEvidence(evidenceInfo);
        }

    }


    //used for setting up react-bootstrap-table remote data wiring config
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
    deleteInterest() {

        if (this.state.selected.length > 0) {

            this.props.deleteInterest(this.state.selected[0])
                .then(() => this.refetch());

            this.setState({selected: []});
        }

    }

    addInterest(row) {

        let newData = row;

        delete newData.ignoreMe1;

        delete newData.user;

        this.props.addInterest(newData);
        // .then(() => this.refetch());

    }


    updateInterest(row, fieldName, newValue) {

        let patch = {};

        if(fieldName === 'ignoreMe1')
            return;

        if(fieldName === 'ignoreMe2')
            return;

        if(fieldName === 'user')
            return;

        if (fieldName === "isActive" && (typeof newValue) !== "boolean") {
            if (newValue === "true")
                newValue = true;
            else
                newValue = false;

        }


        patch[fieldName] = newValue;

        this.props.updateInterest(row.id, patch);
        //.then(() => this.refetch());



    }

    receiveInterests(Interests) {

        this.setState({Interests: Interests});
    }


    activeFormatter(cell, row) {

        // console.log("activeFormatter");
        // console.log(row);

        return <form><Checkbox readOnly checked={row.isActive}></Checkbox></form>;
    };




    customTextInsertEditor =(column, attr, editorClass, ignoreEditable) => {
        return (<textarea placeholder="Enter text here." rows='5' className={`${editorClass}` + ' edit-text'} {...attr}></textarea>);
    };




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


        if (this.props.deleteEnabled)
            selectRowProp['mode'] = 'radio';




        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html


        console.log("INTERESTS ARE");
        console.log(this.props.interests);


        return (



            <Panel>
            <BootstrapTable
        ref='table'
        remote={this.remote}
        data={ this.props.interests }
        cellEdit={ cellEditProp }
        selectRow={ selectRowProp }
        options={ {

            handleConfirmDeleteRow: customConfirm,

                onCellEdit: (row, fieldName, newValue) => {this.updateInterest(row, fieldName, newValue)},
                onDeleteRow: () => {this.deleteInterest()},
                onAddRow: (row) => {this.addInterest(row)},
                //          deleteBtn: this.createCustomDeleteButton,
                //          insertModal: this.createCustomModal,
                //defaultSortName: 'isActive',  // default sort column name
                //defaultSortOrder: 'desc'  // default sort order
        } }
        insertRow={!this.props.readonly}
        deleteRow={!this.props.readonly && this.props.deleteEnabled}
        striped
        hover
        //can force scrolling by using the following
        //maxHeight="100px"
        //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
        >
        <TableHeaderColumn dataField='id' isKey={ true } hidden hiddenOnInsert>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='interestText'
        editable={ !this.props.readonly  ? { type: 'textarea', validator: InterestValidator } : false }
        customInsertEditor={ { getElement: this.customTextInsertEditor } }
        tdStyle={ { whiteSpace: 'normal' } }
        editColumnClassName='editing-Interest-class'
        invalidEditColumnClassName='invalid-Interest-class'>Interest</TableHeaderColumn>



                <TableHeaderColumn
                    dataField={'ignoreMe2'}
                    hidden={!this.props.showEdit}
                    hiddenOnInsert
                    dataFormat={editButtonFormatter}
                    customEditor={{
                        getElement: createEditEditor,
                        customEditorParameters: {
                            onSelect: (e) => {
                                console.log("EDIT");
                                //this.props.history.push(ReflectRoutes.user.url);

                                if(this.props.onSelectEdit)
                                    this.props.onSelectEdit();
                            }
                        }}}
                ></TableHeaderColumn>


                {/*        <TableHeaderColumn dataField='user'*/}
    {/*    editable={false}*/}
    {/*    hidden={true}//{!this.props.userEnabled}*/}
    {/*    hiddenOnInsert*/}
    {/*    dataFormat={userFormatter}*/}
    {/*    tdStyle={{whiteSpace: 'normal'}}*/}
    {/*    editColumnClassName='editing-stakeholder-class'*/}
    {/*    invalidEditColumnClassName='invalid-stakeholder-class'*/}
    {/*        >User</TableHeaderColumn>*/}

    {/*        <TableHeaderColumn dataField='knowledgeReference'*/}
    {/*    width="200px"*/}
    {/*    dataField='ignoreMe1'*/}
    {/*    editable={false}*/}
    {/*    hiddenOnInsert*/}
    {/*  //  dataFormat={createUrlEditor}*/}
    {/*    tdStyle={{whiteSpace: 'normal'}}*/}
    {/*>*/}

    {/*    References</TableHeaderColumn>*/}

        {/*<TableHeaderColumn dataField='isActive'*/}
        {/*width="80px"*/}
        {/*hiddenOnInsert*/}
        {/*dataSort={true}*/}
        {/*dataFormat={(cell,row) => {return this.activeFormatter(cell, row);}}*/}
        {/*//editable={!this.props.readonly  ? {type: 'checkbox', options: {values: 'true:false'}} : false}*/}
        {/*editable={!this.props.readonly}*/}
        {/*customEditor={this.props.readonly ? false : {*/}
        {/*            getElement: createActiveEditor,*/}
        {/*            customEditorParameters: {*/}
        {/*            },*/}
        {/*        }}*/}
        {/*    >*/}
        {/*    Active*/}
        {/*    </TableHeaderColumn>*/}

            </BootstrapTable>
            </Panel>

    );




    }

}

InterestsTable.propTypes = InterestsTablePropTypes;


export default InterestsTable;


