import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../Reflect.css';

import PropTypes from 'prop-types';


import {Bootstrap, OverlayTrigger, Tooltip, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



const TransposedStakeholdersTablePropTypes = {

    //TODO custom validator could check args
    loadingStakeholders: PropTypes.bool,
    loadingProposals: PropTypes.bool,

    teamId: PropTypes.number.isRequired,

    refetchProposals: PropTypes.func,
    refetchStakeholders: PropTypes.func,

    stakeholders: PropTypes.array,
    proposals: PropTypes.array,
    //onSelectProposal: PropTypes.func.isRequired,

    readonly: PropTypes.bool,

    symphysisModeEnabled: PropTypes.bool,

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
        if(this.props.onSelect)
        {
            this.props.onSelect({stakeholderId: this.props.row.id});
        }
    }
    render() {

        return (
            <div></div>
        );
    }
}




const defaultFormatter = (cell, row) => (<div>{cell}</div>);


//BUG https://github.com/AllenFang/react-bootstrap-table/issues/1348
const weightFormatter = (cell, row) => (cell === undefined || cell === null ? "<div>?</div>" : "<div>"+ cell.toString()+ "</div>" );


const proposalFormatter = (cell, row) => (<span><button>Go To</button></span>);


const createProposalEditor = (onUpdate, props) => (<ProposalEditor onUpdate={ onUpdate } {...props}/>);



class TransposedTeamStakeholdersWeightingProposalsTable extends Component {


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
    deleteStakeholder() {

        if (this.state.selected.length > 0) {
            this.props.deleteStakeholder(this.state.selected[0]).then(() => this.props.refetchProposals()).then(() => this.props.refetchStakeholders());

            this.setState({selected: []});
        }

    }

    addStakeholder(row) {

        let newData = row;

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete newData.ignoreMe1;

        this.props.addStakeholder(newData);
            //.then(() => this.props.refetchProposals()).then(() => this.props.refetchStakeholders());

    }


    updateStakeholder(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        if(fieldName === 'ignoreMe1')
            return;

        if(fieldName.startsWith('stakeholder-'))
        {
            let stakeholderId = parseInt(fieldName.replace('stakeholder-', ''));
            let proposalId = row.id;


            if(fieldName in row)
            {

                this.props.updateStakeholderProposal(stakeholderId, proposalId, newValue);
                    //.then(() => this.props.refetchProposals()).then(() => this.props.refetchStakeholders());
            }
            else
            {

                this.props.addStakeholderProposal(stakeholderId, proposalId, newValue);
                    //.then(() => this.props.refetchProposals()).then(() => this.props.refetchStakeholders());
            }
        }
        else {

            console.log("TODO!!!!");

            //patch[fieldName] = newValue;

            //this.props.updateStakeholder(row.id, patch).then(() => this.refetch());
        }
    }

    receiveStakeholders(stakeholders) {

        this.setState({stakeholders: stakeholders});
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


        let mainColumnData = [
            {
                dataField: 'id',
                dataFormat: defaultFormatter,
                name: 'ID',
                hidden: true,
                hiddenOnInsert: true,
                editable: null,
                tdStyle: null,
                className: null,
                editColumnClassName: null,
                invalidEditColumnClassName: null,
                tooltip: '',
            },
            {
                dataField: 'proposalText',
                width: "400px",
                dataFormat: defaultFormatter,
                name: 'Proposal',
                hidden: this.props.symphysisModeEnabled,
                hiddenOnInsert: false,
                editable: false,
                tdStyle: {whiteSpace: 'normal'},
                thStyle: {whiteSpace: 'normal'},
                className: 'react-bootstrap-table-vert-string-class',
                editColumnClassName: null,
                invalidEditColumnClassName: null,
                tooltip: 'Each proposal is considered by every stakeholder.',
            }


        ];


        let extraColumnData = this.props.loadingStakeholders || !this.props.stakeholders  ? [] : this.props.stakeholders.map((d) => {

            let name = d.name;//d.proposalText.substring(0, 10);

            //if(name.length < d.proposalText.length)
            //    name = name.concat('...');

            return {
                dataField: 'stakeholder-'+d.id.toString(),
                dataFormat: weightFormatter,
                name: name,
                hidden: false,
                hiddenOnInsert: false,
                //editable: {type: 'select', options: {values: [ -3, -2, -1, 0, 1, 2, 3]}},
                editable: !this.props.readonly && this.props.updateStakeholderProposal ? {type: 'select', options: {values: [ -3, -2, -1, 0, 1, 2, 3]}} : false,
                tdStyle: null,
                thStyle: {whiteSpace: 'normal'},
                className: 'react-bootstrap-table-vert-string-class',
                editColumnClassName: null,
                invalidEditColumnClassName: null,
                tooltip: d.name,
            }


        });

        let columnData = mainColumnData.concat(extraColumnData);


        return (


            <div>
                {/*<div className="scrollablePanel">*/}
                <Panel>


                    <BootstrapTable
                        tableHeaderClass='react-bootstrap-table-vert-header-class'
                        headerContainerClass='react-bootstrap-table-header-container-class'
                        ref='table'
                        remote={this.remote}
                        data={this.props.proposals}
                        keyField='id'
                        cellEdit={cellEditProp}
                        //selectRow={selectRowProp}
                        options={{

                            handleConfirmDeleteRow: customConfirm,

                            onCellEdit: (row, fieldName, newValue) => {
                                this.updateStakeholder(row, fieldName, newValue);
                            },
                            // onDeleteRow: () => {
                            //     this.deleteStakeholder()
                            // },
                            // onAddRow: (row) => {
                            //     this.addStakeholder(row)
                            // },
                            //          deleteBtn: this.createCustomDeleteButton,
                            //          insertModal: this.createCustomModal,
                        }}
                        striped
                        hover
                        //can force scrolling by using the following
                        //maxHeight="100px"
                        //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
                    >


                        {columnData.map((d) => {


                            return <TableHeaderColumn
                                dataField={d.dataField}
                                width={d.width}
                                dataFormat={d.dataFormat}
                                key={d.dataField}
                                hidden={d.hidden}
                                hiddenOnInsert={d.hiddenOnInsert}
                                editable={d.editable}
                                tdStyle={d.tdStyle}
                                thStyle={d.thStyle}
                                className={d.className}
                                editColumnClassName={d.editColumnClassName}
                                invalidEditColumnClassName={d.invalidColumnClassName}
                            >


                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">{d.tooltip}</Tooltip>}>
                                    <div>{d.name}</div>
                                </OverlayTrigger>

                            </TableHeaderColumn>

                        })}


                    </BootstrapTable>

                </Panel>

            </div>




        );


    }

}







TransposedTeamStakeholdersWeightingProposalsTable.propTypes = TransposedStakeholdersTablePropTypes;


export default TransposedTeamStakeholdersWeightingProposalsTable;


