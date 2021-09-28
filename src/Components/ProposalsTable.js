import React, {Component} from 'react';
//import logo from '../logo.svg';
//import '../App.css';
import _ from 'lodash';
import EvidenceTableWithData from '../DataComponents/EvidenceTableWithData';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';
import  {CreateEvidencesEditorFunction} from "./KnowledgeReferenceTable";

import {
    Bootstrap,
    Panel,
    Modal,
    Checkbox
} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import validUrl from "valid-url";
import LogInFormWithData from "../DataComponents/LogInFormWithData";
import EvidenceTable from "./EvidenceTable";
import CreatePasswordForm from "./CreatePasswordForm";

const ProposalsTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    //getProposals: PropTypes.func.isRequired,
    addProposal: PropTypes.func.isRequired,
    addStakeholderProposal: PropTypes.func.isRequired,
    refetch: PropTypes.func,
    deleteProposal: PropTypes.func.isRequired,
    deleteStakeholderProposal: PropTypes.func.isRequired,
    updateProposal: PropTypes.func.isRequired,
    updateStakeholderProposal: PropTypes.func.isRequired,
    proposals: PropTypes.array,
    onSelectReason: PropTypes.func.isRequired,
    onSelectEvidence: PropTypes.func.isRequired,
    //weightEnabled: PropTypes.bool.isRequired,
    deleteEnabled: PropTypes.bool,
    readonly: PropTypes.bool,
    userEnabled: PropTypes.bool.isRequired,
    symphysisModeEnabled: PropTypes.bool,
    loadingTeam: PropTypes.bool,
    refetchTeam: PropTypes.func,
    teamInfo: PropTypes.object,
    selectSymphysisProposal: PropTypes.func,
    createKnowledgeReference: PropTypes.func,
}


// validator function pass the user input value and should return true|false.
function proposalValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The proposal name must be at least 3 characters.';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}


function urlValidator(value) {

    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (value && value.length > 0 && !validUrl.isUri(value)) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The URL must be legal format.';
        response.notification.title = 'Invalid URL';
    }
    return response;
}


function complex_urlValidator(values) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    for (let i in values) {
        let value = values[i]
        if (value && value.length > 0 && !validUrl.isUri(value)) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'The URL must be legal format.';
            response.notification.title = 'Invalid URL';
        }
    }

    return response;
}


const urlFormatter = ((cell, row) => {

    // console.log("urlFormatter");
    // console.log(cell);
    // console.log(row);

    if(_.isNil(cell) || cell.length <= 0 || !validUrl.isUri(cell))
        return "";

    return <a href={cell} rel="noopener noreferrer" target="_blank">{cell}</a>;
});






class ReasonEditor extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {  };
    }

    focus() {
        // console.log("ReasonEditor:focus()");
        //
        // console.log(this.state);
        // console.log(this.props);

        //immediately complete the "edit" and "save"
        this.updateData();

    }

    updateData() {
        //don't actually save anything
        this.props.onUpdate({});

        //now notify back that we were clicked so parent GUI and switch tabs to proposal screen
        if (this.props.onSelect && this.props.row.isActive) {
            this.props.onSelect({proposalId: this.props.row.id});
        }
    }

    render() {

        return (
            <div></div>
        );
    }
}


const reasonFormatter = (cell, row) => (row.isActive ? <span><button>Go To</button></span> : <div></div>);
const reasonFormatterReadOnly = (cell, row) => (row.isActive ? <span><button>Go To</button></span> : <div></div>);


const userFormatter = (cell, row) => (<div>{cell.fullName}</div>);


const createReasonEditor = (onUpdate, props) => (<ReasonEditor onUpdate={onUpdate} {...props}/>);


const renderData =  (cell, row) =>  {
    console.log("From the create url editor");
    console.log(cell);
    console.log(row);
    //  A HACK GIVEN HOW TIGHTLY COUPLED BOOTSTRAP TABLE IS TO OUR DATA
    // let proposalId = -1
    // //in this case, the reasons table is what has been rendered
    // if ( typeof(attr.row.proposalId) == "number" )  {
    //     proposalId = attr.row.proposalId
    //     return <CreateUrlEditor row={row} attr={attr} proposalId={proposalId} type={"reasons"}/>
    // } else{
    //     //in this case the proposal table is what has been rendered
    //     proposalId = attr.row.id
    //     return <CreateUrlEditor row={row} attr={attr} proposalId={proposalId} type={"proposals"}/>
    // }

    return <div>This is a test</div>



}



class ProposalSelectEditor extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {  };

        //console.log("ProposalSelectEditor:constructor()");
    }
    focus() {

        //immediately complete the "edit" and "save"
        this.updateData();

    }
    updateData() {

        //console.log("ProposalSelectEditor:updateData()");

        //don't actually save anything
        this.props.onUpdate({});


        //now notify back that we were clicked so parent GUI and switch tabs to proposal screen
        if(this.props.onSelect)
        {
            this.props.onSelect({proposalId: this.props.row.id});
        }
    }
    render() {

        //console.log("ProposalSelectEditor:render()");

        return (
            <div></div>
        );
    }
}


const createProposalSelectEditor = (onUpdate, props) => (<ProposalSelectEditor onUpdate={ onUpdate } {...props}/>);


class ActiveEditor extends React.Component {
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


const createActiveEditor = (onUpdate, props) => (<ActiveEditor onUpdate={ onUpdate } {...props}/>);






class ProposalEditor extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);

        //console.log("ProposalEditor: " );
        //console.log(props);

        this.state = {
            proposalText: props.defaultValue,
            open: true
        };
    }
    focus() {
        this.refs.inputRefB.focus();
    }
    updateData() {
        //console.log("updating with: " + this.state.proposalText);
        //this.props.onUpdate(this.state.description);
        //this.props.onUpdate('{"title":"' + this.state.title + '", "description":"' + JSON.stringify(this.state.description) +'"}');
        this.props.onUpdate(this.state.proposalText);
    }

    close = () => {
        this.setState({ open: false });
        this.props.onUpdate(this.props.defaultValue);
    }

    render() {

        //console.log(this.props);

        const fadeIn = this.state.open ? 'in' : '';
        const display = this.state.open ? 'block' : 'none';
        return (
            <div className={ `modal fade ${fadeIn}` } id='myProposalModal' role='dialog' style={ { display } }>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>

                            <div>Description: </div>
                            <textarea
                                ref='inputRefB'
                                className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                                style={ { display: 'inline', width: '80%' } }
                                rows={10}
                                value={ this.state.proposalText ? this.state.proposalText: '' }
                                onChange={ e => {
                                    let proposalText = e.currentTarget.value;
                                    //console.log(proposalText);
                                    this.setState({ proposalText: proposalText });
                                } }

                            />

                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
                            <button type='button' className='btn btn-default' onClick={ this.close }>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}






const createProposalEditor = (onUpdate, props) => (<ProposalEditor onUpdate={ onUpdate } {...props}/>);




class ProposalsTable extends Component {


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

    selectReason(reasonInfo) {

        // console.log("ProposalsTable:selectReason()");
        // console.log(this.props);

        if (this.props.onSelectReason) {
            this.props.onSelectReason(reasonInfo);
        }

    }


    chooseSymphysisProposal(proposalInfo) {


        if(this.props.selectSymphysisProposal) {

            //console.log("will selectSymphysisProposal");

            this.props.selectSymphysisProposal(this.props.teamId, proposalInfo.proposalId);
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
    deleteProposal() {

        if (this.state.selected.length > 0) {

            let sel = this.state.selected[0];

            if(this.props.symphysisModeEnabled)
            {
                this.props.deleteProposal(sel);

            }
            else {
                this.props.deleteStakeholderProposal(sel)
                    .then(() => this.props.deleteProposal(sel));

            }

            this.setState({selected: []});
        }

    }

    addProposal(row) {

        let newData = row;

        delete newData.knowledgeReference;

        delete newData.user;

        if (!this.props.weightEnabled)
            delete newData.weight;

        if(this.props.symphysisModeEnabled)
        {
            this.props.addProposal(newData);
        }
        else {

            this.props.addProposal(newData)
                .then(
                    (d) => this.props.addStakeholderProposal(d.createProposal.proposal.id, row.weight)
                );
        }

    }


    updateProposal(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete row.knowledgeReference;
        delete  fieldName.knowledgeReference;

        if (fieldName === 'ignoreMe1')
            return;

        if (fieldName === 'user')
            return;

        if (fieldName === "isActive" && (typeof newValue) !== "boolean") {
            if (newValue === "true")
                newValue = true;
            else
                newValue = false;

        }


        if (!this.props.symphysisModeEnabled && fieldName === 'weight') {
            this.props.updateStakeholderProposal(row.id, newValue);
            //      .then(() => this.refetch());
        } else {

            patch[fieldName] = newValue;

            this.props.updateProposal(row.id, patch);
            //.then(() => this.refetch());

        }

    }

    receiveProposals(proposals) {

        this.setState({proposals: proposals});
    }



    // dataFormat={(row, id) => {return this.proposalSelectFormatter(row, id);}}
    proposalSelectFormatter(cell, row) {


        // console.log("proposalSelectFormatter:");
        // console.log(cell);
        // console.log(row);

        let selected = -1; //this.props.selectedProblemId

        if(this.props.teamInfo)
            selected = this.props.teamInfo.selectedSymphysisProposalId;

        return <form><Checkbox readOnly checked={row.id === selected}></Checkbox></form>;

    };



    activeFormatter(cell, row) {

        // console.log("activeFormatter");
        // console.log(row);

        return <form><Checkbox readOnly checked={row.isActive}></Checkbox></form>;
    };


    // customNameField = (column, attr, editorClass, ignoreEditable) => {
//     return (
//         <select className={ `${editorClass}` } { ...attr }>
//             {
//                 fruits.map(name => (<option key={ name } value={ name }>{ name }</option>))
//             }
//         </select>
//     );
// }
// // ...
// <TableHeaderColumn dataField='name' customInsertEditor={ { getElement: this.customNameField } }>Product Name</TableHeaderColumn>
//
//


    customTextInsertEditor =(column, attr, editorClass, ignoreEditable) => {
        return (<textarea placeholder="Enter text here." rows='15' className={`${editorClass}` + ' edit-text'} {...attr}></textarea>);
    };





    render() {


        const cellEditProp = {

            mode: 'click',
            blurToSave: true,
            //afterSaveCell: this.onAfterSaveCell,

        };

        const selectRowProp = {
            bgColor: 'pink',
            onSelect: this.onRowSelect,
            selected: this.state.selected
        };


        if (this.props.deleteEnabled)
            selectRowProp['mode'] = 'radio';

        //let refetch = this.refetch; //so anon function can access


        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html


        return (

            <Panel>
                <BootstrapTable
                    ref='table'
                    remote={this.remote}
                    data={this.props.proposals}
                    cellEdit={cellEditProp}
                    selectRow={selectRowProp}
                    options={{

                        handleConfirmDeleteRow: customConfirm,

                        onCellEdit: (row, fieldName, newValue) => {
                            this.updateProposal(row, fieldName, newValue)
                        },
                        onDeleteRow: () => {
                            this.deleteProposal()
                        },
                        onAddRow: (row) => {
                            this.addProposal(row)
                        },
                        //          deleteBtn: this.createCustomDeleteButton,
                        //          insertModal: this.createCustomModal,
                        defaultSortName: 'isActive',  // default sort column name
                        defaultSortOrder: 'desc'  // default sort order
                    }}
                    insertRow={!this.props.readonly}
                    deleteRow={!this.props.readonly && this.props.deleteEnabled}
                    striped
                    hover
                    //can force scrolling by using the following
                    //maxHeight="100px"
                    //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
                >
                    <TableHeaderColumn dataField='id' isKey={true} hidden hiddenOnInsert>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='proposalText'
                                       editable={!this.props.readonly ? {type: 'textarea', validator: proposalValidator} : false}
                                       customInsertEditor={ { getElement: this.customTextInsertEditor } }
                                       customEditor={this.props.readonly ? false : {getElement: createProposalEditor} }
                        //tdStyle={{whiteSpace: 'normal'}}
                                       tdStyle={ { whiteSpace: 'pre-wrap' } }
                                       editColumnClassName='editing-proposal-class'
                                       invalidEditColumnClassName='invalid-proposal-class'>Proposal</TableHeaderColumn>

                    <TableHeaderColumn dataField='user'
                                       editable={false}
                                       hidden={true}//{!this.props.userEnabled}
                                       hiddenOnInsert
                                       dataFormat={userFormatter}
                                       tdStyle={{whiteSpace: 'normal'}}
                                       editColumnClassName='editing-stakeholder-class'
                                       invalidEditColumnClassName='invalid-stakeholder-class'
                    >User</TableHeaderColumn>

                    <TableHeaderColumn dataField='knowledgeReference'
                                       width="200px"
                                       editable={false}
                        //editable={!this.props.readonly ? {type: 'textarea', validator: complex_urlValidator} : false}
                                       hiddenOnInsert
                                       dataFormat={CreateEvidencesEditorFunction}
                        //customInsertEditor={ { getElement: this.customTextInsertEditor } }
                                       tdStyle={{whiteSpace: 'normal'}}
                    >

                        References</TableHeaderColumn>




                    <TableHeaderColumn dataField='isActive'
                                       width="80px"
                                       hidden={this.props.symphysisModeEnabled}
                                       hiddenOnInsert
                                       dataSort={true}
                                       dataFormat={(cell,row) => {return this.activeFormatter(cell, row);}}
                        //editable={!this.props.readonly ? {type: 'checkbox', options: {values: 'true:false'}} : false}
                                       editable={!this.props.readonly}
                                       customEditor={this.props.readonly ? false : {
                                           getElement: createActiveEditor,
                                           customEditorParameters: {
                                           },
                                       }}
                    >
                        Active
                    </TableHeaderColumn>




                    <TableHeaderColumn
                        dataField='ignoreMe1'
                        hidden={this.props.symphysisModeEnabled}
                        hiddenOnInsert
                        dataFormat={this.props.readonly ? reasonFormatterReadOnly : reasonFormatter}
                        customEditor={{
                            getElement: createReasonEditor,
                            customEditorParameters: {
                                onSelect: (e) => {
                                    this.selectReason(e)
                                }
                            },
                        }}
                    >Reasons</TableHeaderColumn>



                    <TableHeaderColumn
                        width='80px'
                        dataField='ignoreMe1'
                        hidden={!this.props.symphysisModeEnabled}
                        hiddenOnInsert
                        dataFormat={(cell, row) => {
                            // console.log("dataFormat:");
                            // console.log(cell);
                            // console.log(row);
                            return this.proposalSelectFormatter(cell, row);
                        }}
                        editable={this.props.readonly ? false : undefined}
                        customEditor={this.props.readonly ? false : {
                            getElement: createProposalSelectEditor,
                            customEditorParameters: {
                                onSelect: (e) => {

                                    this.chooseSymphysisProposal(e);

                                }
                            },
                        }}
                    >Select</TableHeaderColumn>

                </BootstrapTable>
            </Panel>

        );


        {/*<TableHeaderColumn*/
        }
        {/*dataField='ignoreMe1'*/
        }
        {/*hiddenOnInsert*/
        }
        {/*dataFormat={reasonFormatter}*/
        }
        {/*customEditor={{*/
        }
        {/*getElement: createReasonEditor,*/
        }
        {/*customEditorParameters: {*/
        }
        {/*onSelect: (e) => {*/
        }
        {/*this.selectEvidence(e)*/
        }
        {/*}*/
        }
        {/*},*/
        }
        {/*}}*/
        }
        {/*>Evidence</TableHeaderColumn>*/
        }


    }

}

ProposalsTable.propTypes = ProposalsTablePropTypes;


export default ProposalsTable;


