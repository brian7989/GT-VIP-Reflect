import React, {Component} from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {
    Bootstrap,
    OverlayTrigger,
    Tooltip,
    Navbar,
    Panel,
    ListGroup,
    ListGroupItem,
    Grid,
    Row,
    Col,
    Nav,
    ButtonToolbar,
    Button,
    ButtonGroup,
    Tab,
    NavItem,
    MenuItem,
    NavDropdown,
    Table,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Checkbox
} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReflectRoutes from "./ReflectRoutes";
import {Redirect} from "react-router-dom";


const StakeholdersTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    //getStakeholders: PropTypes.func.isRequired,
    //addStakeholder: PropTypes.func.isRequired,
    refetch: PropTypes.func,
    deleteStakeholder: PropTypes.func,
    updateStakeholder: PropTypes.func,
    stakeholders: PropTypes.array,
    onSelectProposal: PropTypes.func.isRequired,
    //onSelectInterest: PropTypes.func.isRequired,
    powerEnabled: PropTypes.bool.isRequired,
    //interestsEnabled: PropTypes.bool.isRequired,
    deleteEnabled: PropTypes.bool,
    readonly: PropTypes.bool,
    userEnabled: PropTypes.bool.isRequired,

    symphysisModeEnabled: PropTypes.bool,
    selectedSymphysisStakeholdersOnly: PropTypes.bool,
    showEdit: PropTypes.bool,
    onSelectEdit: PropTypes.func,

}


// validator function pass the user input value and should return true|false.
function stakeholderValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The stakeholder name must be at least 3 characters.';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}


class ProposalEditor extends React.Component {
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
        this.props.onUpdate({});

        //now notify back that we were clicked so parent GUI and switch tabs to proposal screen
        if (this.props.onSelect && this.props.row.isActive) {
            this.props.onSelect({stakeholderId: this.props.row.id});
        }
    }

    render() {

        return (
            <div></div>
        );
    }
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



const proposalFormatter = (cell, row) => (row.isActive ? <span><button>Go To</button></span> : <div></div>);
const proposalFormatterReadOnly = (cell, row) => (row.isActive ? <span><button>Go To</button></span> : <div></div>);

const editButtonFormatter= (cell, row) => <span><button>Edit</button></span>


const userFormatter = (cell, row) => (<div>{cell.fullName}</div>);


const createProposalEditor = (onUpdate, props) => (<ProposalEditor onUpdate={onUpdate} {...props}/>);

const createEditEditor = (onUpdate, props) => (<EditEditor onUpdate={onUpdate} {...props}/>);



class StakeholderActiveEditor extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {  };

        // console.log("StakeholderActiveEditor");
        // console.log(props);

    }
    focus() {

        //immediately complete the "edit" and "save"
        this.updateData();

    }
    updateData() {

        // console.log("StakeholderActiveEditor:updateData()");
        // console.log("exclude: " + this.props.row.excludeFromSymphysis);
        // console.log("active: " + this.props.row.isActive);
        // console.log("default: " + this.props.defaultValue);
        // console.log("typeof default: " + (typeof this.props.defaultValue));
        // console.log(this.props);

        let val = !this.props.defaultValue;



        this.props.onUpdate(val);

    }
    render() {

        return (
            <div></div>
        );
    }
}


const createStakeholderActiveEditor = (onUpdate, props) => (<StakeholderActiveEditor onUpdate={ onUpdate } {...props}/>);



class StakeholderExcludedEditor extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {  };

        // console.log("StakeholderActiveEditor");
        // console.log(props);

    }
    focus() {

        //immediately complete the "edit" and "save"
        this.updateData();

    }
    updateData() {

        // console.log("StakeholderExcludedEditor:updateData()");
        // console.log("exclude: " + this.props.row.excludeFromSymphysis);
        // console.log("active: " + this.props.row.isActive);
        // console.log(this.props);


        this.props.onUpdate(!this.props.defaultValue);

    }
    render() {

        return (
            <div></div>
        );
    }
}


const createStakeholderExcludedEditor = (onUpdate, props) => (<StakeholderExcludedEditor onUpdate={ onUpdate } {...props}/>);








class StakeholdersTable extends Component {


    constructor(props) {
        super(props);


        this.state = {
            selected: [], //used for deletion
            // currPage: 1
        };


        this.onRowSelect = this.onRowSelect.bind(this);

    }


    refetch() {

        if (this.props.refetch)
            return this.props.refetch();
    }

    selectProposal(proposalInfo) {


        if (this.props.onSelectProposal) {
            this.props.onSelectProposal(proposalInfo);
        }

    }


    selectInterest(interestInfo) {


        if (this.props.onSelectInterest) {
            this.props.onSelectInterest(interestInfo);
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


    onRowSelect({id}, isSelected) {
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


    // onAfterSaveCell(row, cellName, cellValue) {
    //    alert(`Save cell ${cellName} with value ${cellValue}`);
    //
    //    let rowStr = '';
    //    for (const prop in row) {
    //        rowStr += prop + ': ' + row[prop] + '\n';
    //    }
    //
    //    alert('Thw whole row :\n' + rowStr);
    // }

    //TODO I think delete [item] is passed the selected array and possibly doesn't need to be accessed by state
    //but examples showed that I need to track selected as state. not sure why...
    deleteStakeholder() {

        if (this.state.selected.length > 0) {
            this.props.deleteStakeholder(this.state.selected[0]).then(() => this.refetch());

            this.setState({selected: []});
        }

    }

    addStakeholder(row) {

        let newData = row;

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete newData.ignoreMe1;

        if (!this.props.powerEnabled)
            delete newData.power;


        delete newData.user;


        this.props.addStakeholder(newData);
        //this.props.addStakeholder(newData).then(() => this.refetch());

    }


    updateStakeholder(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        if (fieldName === 'ignoreMe1')
            return;

        if(fieldName === 'user')
            return;


        //console.log("fieldName:" + fieldName + " newValue: " + newValue);

        if (fieldName === "isActive" && (typeof newValue) !== "boolean") {
            if (newValue === "true")
                newValue = true;
            else
                newValue = false;

        }

        if (fieldName === "excludeFromSymphysis" && (typeof newValue) !== "boolean") {
            if (newValue === "true")
                newValue = true;
            else
                newValue = false;

        }

        patch[fieldName] = newValue;


        this.props.updateStakeholder(row.id, patch);
        //this.props.updateStakeholder(row.id, patch).then(() => this.refetch());
    }

    receiveStakeholders(stakeholders) {

        this.setState({stakeholders: stakeholders});
    }


    activeFormatter(cell, row) {

        // console.log("activeFormatter");
        // console.log(row);

        return <form><Checkbox readOnly checked={row.isActive}></Checkbox></form>;
    };


    excludedFormatter(cell, row) {

        // console.log("excludedFormatter");
        // console.log(row);

        return <form><Checkbox readOnly checked={!row.excludeFromSymphysis}></Checkbox></form>;
    };



    render() {


        const cellEditProp = {

            mode: 'click',
            blurToSave: true,
            //afterSaveCell: this.onAfterSaveCell,

        };

        const selectRowProp = {
            // mode: 'radio',
            bgColor: 'pink',
            onSelect: this.onRowSelect,
            selected: this.state.selected
        };

        if (this.props.deleteEnabled)
            selectRowProp['mode'] = 'radio';


        //let refetch = this.refetch; //so anon function can access


        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html

        let overlayStyle = {
            display: 'inline-block',
            width: 'fit-content'
        };

        let defaultSortName = this.props.symphysisModeEnabled ? 'excludeFromSymphysis' : 'isActive';

        return (

            <Panel>
                <BootstrapTable
                    ref='table'
                    remote={this.remote}
                    data={this.props.stakeholders}
                    cellEdit={cellEditProp}
                    selectRow={selectRowProp}
                    options={{

                        handleConfirmDeleteRow: customConfirm,

                        onCellEdit: (row, fieldName, newValue) => {
                            this.updateStakeholder(row, fieldName, newValue)
                        },
                        onDeleteRow: () => {
                            this.deleteStakeholder()
                        },
                        onAddRow: (row) => {
                            this.addStakeholder(row)
                        },
                        //          deleteBtn: this.createCustomDeleteButton,
                        //          insertModal: this.createCustomModal,
                        defaultSortName: defaultSortName,  // default sort column name
                        defaultSortOrder: this.props.symphysisModeEnabled ? 'asc' : 'desc'  // default sort order
                    }}
                    insertRow={!this.props.readonly && !this.props.symphysisModeEnabled && !!this.props.addStakeholder}
                    deleteRow={!this.props.readonly && this.props.deleteEnabled}
                    striped
                    hover
                    //can force scrolling by using the following
                    //maxHeight="100px"
                    //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
                >
                    <TableHeaderColumn dataField='id' isKey={true}
                                       hidden
                                       hiddenOnInsert>ID</TableHeaderColumn>

                    <TableHeaderColumn dataField='name'
                                       editable={!this.props.readonly && !this.props.symphysisModeEnabled && this.props.updateStakeholder ? {
                                           type: 'textarea',
                                           validator: stakeholderValidator
                                       } : false}
                                       tdStyle={{whiteSpace: 'normal'}}
                                       editColumnClassName='editing-stakeholder-class'
                                       invalidEditColumnClassName='invalid-stakeholder-class'>Stakeholder</TableHeaderColumn>


                    <TableHeaderColumn dataField='user'
                                       editable={false}
                                       hidden={true}//{!this.props.userEnabled}
                                       hiddenOnInsert
                                       dataFormat={userFormatter}
                                       tdStyle={{whiteSpace: 'normal'}}
                                       editColumnClassName='editing-stakeholder-class'
                                       invalidEditColumnClassName='invalid-stakeholder-class'
                    >User</TableHeaderColumn>


                    <TableHeaderColumn dataField='power'
                                       width="80px"
                                       hidden={!this.props.powerEnabled}
                                       hiddenOnInsert={!this.props.powerEnabled}
                                       editable={!this.props.readonly && this.props.updateStakeholder ? {
                                           type: 'select',
                                           options: {values: [0, 1, 2, 3, 4, 5]}
                                       } : false}
                    >


                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id="tooltip"><strong>Power</strong> The stakeholder's power
                                            (Some stakeholders have more power to influence decision making than others)</Tooltip>}>
                            <div>Power</div>
                        </OverlayTrigger>


                    </TableHeaderColumn>


                    <TableHeaderColumn dataField={this.props.symphysisModeEnabled ? 'excludeFromSymphysis' : 'isActive'}
                                       width="80px"
                                       hiddenOnInsert
                                       dataSort={true}
                                       hidden={this.props.selectedSymphysisStakeholdersOnly}
                                       dataFormat={(cell,row) => {

                                           console.log("symphysisModeEnabled: " + this.props.symphysisModeEnabled)
                                           console.log("selectedSymphysisStakeholdersOnly: " + this.props.selectedSymphysisStakeholdersOnly);

                                           if (this.props.symphysisModeEnabled) {
                                               if(this.props.selectedSymphysisStakeholdersOnly)
                                                   return null;
                                               else
                                                   return this.excludedFormatter(cell, row);
                                           }
                                           else
                                               return this.activeFormatter(cell, row);


                                       }}
                                       //editable={!this.props.readonly ? {type: 'checkbox', options: {values: 'true:false'}} : false}

                                       editable={!this.props.readonly}

                                       customEditor={this.props.readonly ? false : {
                                           getElement: this.props.symphysisModeEnabled ? createStakeholderExcludedEditor : createStakeholderActiveEditor,
                                           customEditorParameters: {
                                               // onSelect: (e) => {
                                               //
                                               //     this.chooseSymphysisProposal(e);
                                               //
                                               // }
                                           },
                                       }}
                    >
                        {this.props.symphysisModeEnabled ? 'Active' : 'Active'}
                    </TableHeaderColumn>


                    <TableHeaderColumn
                        dataField='ignoreMe1'
                        hidden={this.props.symphysisModeEnabled}
                        hiddenOnInsert
                        dataFormat={this.props.readonly ? proposalFormatterReadOnly : proposalFormatter}
                        customEditor={{
                            getElement: createProposalEditor,
                            customEditorParameters: {
                                onSelect: (e) => {
                                    this.selectProposal(e)
                                }
                            },
                        }}
                    >Proposals</TableHeaderColumn>

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


                </BootstrapTable>
            </Panel>

        );


    }


//
// <TableHeaderColumn
// dataField='ignoreMe1'
// hidden={!this.props.interestsEnabled}
// hiddenOnInsert
// dataFormat={ proposalFormatter }
// customEditor={ {
//     getElement: createProposalEditor,
//     customEditorParameters: {
//         onSelect: (e) => {this.selectInterest(e)}
//     },
// } }
// >Interests</TableHeaderColumn>

}

StakeholdersTable.propTypes = StakeholdersTablePropTypes;


export default StakeholdersTable;


