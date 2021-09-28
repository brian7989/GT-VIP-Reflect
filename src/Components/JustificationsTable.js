import React, {Component} from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ConsiderationsTableWithData from '../DataComponents/ConsiderationsTableWithData';
import SelectedSymphysisProposalWithData from '../DataComponents/SelectedSymphysisProposalWithData';
import InstructionsPanel from "./InstructionsPanel";

import _ from 'lodash';


import validUrl from 'valid-url';


import PropTypes from 'prop-types';


import {
    Bootstrap,
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
    Checkbox, Popover, OverlayTrigger
} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import ReactHtmlParser from "react-html-parser";








const JustificationsTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    //getProposals: PropTypes.func.isRequired,
    addProposal: PropTypes.func.isRequired,
    //addStakeholderProposal: PropTypes.func.isRequired,
    refetch: PropTypes.func,
    deleteProposal: PropTypes.func.isRequired,
    //deleteStakeholderProposal: PropTypes.func.isRequired,
    updateProposal: PropTypes.func.isRequired,
    //updateStakeholderProposal: PropTypes.func.isRequired,
    proposals: PropTypes.array,
    onSelectReason: PropTypes.func.isRequired,
    onSelectEvidence: PropTypes.func.isRequired,
    instructions: PropTypes.object,
    //weightEnabled: PropTypes.bool.isRequired,
    deleteEnabled: PropTypes.bool,
    readonly: PropTypes.bool,
    userEnabled: PropTypes.bool.isRequired,
    //symphysisModeEnabled: PropTypes.bool,
    missingExpertiseModeEnabled: PropTypes.bool,
    researchProposalModeEnabled: PropTypes.bool,
    loadingTeam: PropTypes.bool,
    refetchTeam: PropTypes.func,
    //teamInfo: PropTypes.object,
    teamMembers: PropTypes.array,
    selectSymphysisProposal: PropTypes.func,
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

function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}



const userFormatter = (cell, row) => (<div>{cell.fullName}</div>);


const urlFormatter = ((cell, row) => {

    if(_.isNil(cell) || cell.length <= 0 || !validUrl.isUri(cell))
        return "";

    return <a href={cell} target="_blank">{cell}</a>;
});




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








const CurrentTeamMemberEditorPropTypes = {
    teamMembers: PropTypes.array.isRequired,
};


class CurrentTeamMemberEditor extends React.Component {
    constructor(props) {
        super(props);

        this.updateData = this.updateData.bind(this);

        //this.handleChange = this.handleChange.bind(this);

        // console.log("CurrentTeamMemberEditor");
        // console.log(props);


        this.state = {
            //currentStakeholderId: props.row.currentStakeholderId,
            currentTeamMember: props.row.user,

        };
    }
    focus() {
        //this.refs.inputRefA.focus();
    }
    updateData() {
        // console.log("updating with: ");
        // console.log(this.state.currentStakeholder);

        if(!this.state.currentTeamMember)
            this.props.onUpdate(null);
        else
            this.props.onUpdate(this.state.currentTeamMember.id);
    }

    close = () => {
        //this.setState({ open: false });

        let val = this.props.defaultValue;

        if(val === "")
            val = null;

        if(!val)
            val = null;

        this.props.onUpdate(val);
    }




    render() {


        //https://react-bootstrap.github.io/components/forms/?
        //
        // console.log("CurrentTeamMemberEditor:render()");
        // console.log(this.props.teamMembers);





        return (
            <form>
                <FormGroup
                    controlId="formSelectTeamMemberJustifications"
                    //validationState={this.getValidationState()}
                >

                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        value={this.state.currentTeamMember ? this.state.currentTeamMember.id : undefined}
                        onChange={ e => {

                            if(!e)
                                return;

                            // console.log("onChange");
                            // console.log(e);

                            let idVal = e.target.value;
                            // console.log("selected: ");
                            // console.log(idVal);
                            //
                            // console.log("will look in: " );
                            // console.log(this.props.stakeholders);

                            let sel = this.props.teamMembers.find((s) => { return s.id.toString() === idVal});

                            // console.log("sel obj: ");
                            // console.log(sel);

                            this.setState({ currentTeamMember: sel });
                        } }
                    >

                        {!this.props.teamMembers ? '' : this.props.teamMembers.map((s) => {

                            //console.log(s.id + "::" + s.name)

                            return <option key={s.id} value={s.id}>{s.fullName}</option>;

                        })}

                    </FormControl>



                </FormGroup>

                <div className='modal-footer'>
                    <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
                    <button type='button' className='btn btn-default' onClick={ this.close }>Close</button>
                </div>

            </form>

        );
    }
}


CurrentTeamMemberEditor.propTypes = CurrentTeamMemberEditorPropTypes;




const createCurrentTeamMemberEditor = (teamMembers) => {


    console.log("createCurrentTeamMemberEditor");


    return (onUpdate, props) => (<CurrentTeamMemberEditor onUpdate={ onUpdate } {...props} teamMembers={teamMembers}/>);

};


class JustificationsTable extends Component {


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




    //used for setting up react-bootstrap-table remote teamTestData wiring config
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

    //TODO I think delete [item] is passed the selected array and possibly doesn't need to be accessed by state
    //but examples showed that I need to track selected as state. not sure why...
    deleteProposal() {

        if (this.state.selected.length > 0) {

            let sel = this.state.selected[0];


            this.props.deleteProposal(sel);


            this.setState({selected: []});
        }

    }

    addProposal(row) {

        let newData = row;

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete newData.ignoreMe1;

        delete newData.user;

        if (!this.props.weightEnabled)
            delete newData.weight;


        this.props.addProposal(newData);

    }


    updateProposal(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
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



        patch[fieldName] = newValue;

        this.props.updateProposal(row.id, patch);
        //.then(() => this.refetch());



    }

    receiveProposals(proposals) {

        this.setState({proposals: proposals});
    }


    //
    // // dataFormat={(row, id) => {return this.proposalSelectFormatter(row, id);}}
    // proposalSelectFormatter(cell, row) {
    //
    //
    //     // console.log("proposalSelectFormatter:");
    //     // console.log(cell);
    //     // console.log(row);
    //
    //     let selected = -1; //this.props.selectedProblemId
    //
    //     if(this.props.teamInfo)
    //         selected = this.props.teamInfo.selectedSymphysisProposalId;
    //
    //     return <form><Checkbox readOnly checked={row.id === selected}></Checkbox></form>;
    //
    // };



    activeFormatter(cell, row) {

        // console.log("activeFormatter");
        // console.log(row);

        return <form><Checkbox readOnly checked={row.isActive}></Checkbox></form>;
    };



    customTextInsertEditor =(column, attr, editorClass, ignoreEditable) => {
        return (<textarea placeholder="Enter text here." rows='15' className={`${editorClass}` + ' edit-text'} {...attr}></textarea>);
    };



    currentTeamMemberFormatter(cell, row) {

        // console.log("currentTeamMemberFormatter");
        // console.log(cell);
        // console.log(row);

        return <div>{row.user ? row.user.fullName : "Not Assigned"}</div>;

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

            <div>

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
                        defaultSortName: 'displayOrder',  // default sort column name
                        defaultSortOrder: 'asc'  // default sort order
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
                                       tdStyle={{whiteSpace: 'pre-wrap'}}
                                       editColumnClassName='editing-proposal-class'
                                       invalidEditColumnClassName='invalid-proposal-class'>{this.props.missingExpertiseModeEnabled ? "Missing Expertise" : "Proposal Component"}</TableHeaderColumn>

                    <TableHeaderColumn dataField='proposalUrl'
                                       width={this.props.missingExpertiseModeEnabled ? "30%" : "10%"}
                                       editable={!this.props.readonly ? {type: 'textarea', validator: this.props.missingExpertiseModeEnabled ? false : urlValidator} : false}
                                       hiddenOnInsert={!this.props.missingExpertiseModeEnabled}
                                       dataFormat={this.props.missingExpertiseModeEnabled ? undefined : urlFormatter}

                        //editable={!this.props.readonly ? {type: 'textarea', validator: proposalValidator} : false}
                        //customInsertEditor={ { getElement: this.customTextInsertEditor } }
                        //tdStyle={{whiteSpace: 'normal'}}
                        //editColumnClassName='editing-proposal-class'
                        //invalidEditColumnClassName='invalid-proposal-class'
                    >{this.props.missingExpertiseModeEnabled ? "Strategies to find experts" : (this.props.researchProposalModeEnabled ? "Links to more detailed versions" : "Reference")}</TableHeaderColumn>


                    <TableHeaderColumn dataField='note'
                                       width={this.props.missingExpertiseModeEnabled || this.props.researchProposalModeEnabled ? "30%" : "10%"}
                                       editable={!this.props.readonly ? {type: 'textarea', validator: (this.props.missingExpertiseModeEnabled || this.props.researchProposalModeEnabled) ? false : urlValidator} : false}
                                       hiddenOnInsert={!this.props.missingExpertiseModeEnabled}
                                       dataFormat={(this.props.missingExpertiseModeEnabled || this.props.researchProposalModeEnabled) ? undefined : urlFormatter}
                        //editable={!this.props.readonly ? {type: 'textarea', validator: proposalValidator} : false}
                        //customInsertEditor={ { getElement: this.customTextInsertEditor } }
                        //tdStyle={{whiteSpace: 'normal'}}
                        //editColumnClassName='editing-proposal-class'
                        //invalidEditColumnClassName='invalid-proposal-class'
                    >{this.props.missingExpertiseModeEnabled ? "Names of possible experts" : "Justification"}</TableHeaderColumn>


                    <TableHeaderColumn dataField='user'
                                       width={"10%"}
                                       editable={false}

                                       hiddenOnInsert
                                       dataFormat={userFormatter}
                                       tdStyle={{whiteSpace: 'normal'}}
                                       editColumnClassName='editing-stakeholder-class'
                                       invalidEditColumnClassName='invalid-stakeholder-class'
                                       hidden={this.props.missingExpertiseModeEnabled || this.props.researchProposalModeEnabled}
                    >User</TableHeaderColumn>






                    <TableHeaderColumn dataField='userId'
                                       width="10%"
                        //editable={ this.props.updateTeamMember ? {type: 'select', options: {values:  }} : false}
                                       tdStyle={ { whiteSpace: 'normal' } }
                        //editColumnClassName='editing-teamMember-class'
                        //invalidEditColumnClassName='invalid-teamMember-class'
                                       hiddenOnInsert
                                       hidden={this.props.missingExpertiseModeEnabled}
                                       dataFormat={this.currentTeamMemberFormatter}

                                       editable={this.props.readonly ? false : undefined}

                                       customEditor={ this.props.readonly ? false : {getElement: createCurrentTeamMemberEditor(this.props.teamMembers)} }
                    >{(this.props.researchProposalModeEnabled ? "Experts" : "Author")}</TableHeaderColumn>




                    {/*<TableHeaderColumn dataField='bibliographyUrl'*/}
                    {/*width="200px"*/}
                    {/*editable={!this.props.readonly ? {type: 'textarea', validator: urlValidator} : false}*/}
                    {/*hiddenOnInsert*/}
                    {/*dataFormat={urlFormatter}*/}

                    {/*//editable={!this.props.readonly ? {type: 'textarea', validator: proposalValidator} : false}*/}
                    {/*//customInsertEditor={ { getElement: this.customTextInsertEditor } }*/}
                    {/*//tdStyle={{whiteSpace: 'normal'}}*/}
                    {/*//editColumnClassName='editing-proposal-class'*/}
                    {/*//invalidEditColumnClassName='invalid-proposal-class'*/}
                    {/*>Resource URL</TableHeaderColumn>*/}



                    {/*<TableHeaderColumn dataField='note'*/}
                    {/*                   width="13%"*/}
                    {/*                   hidden={true}*/}
                    {/*                   hiddenOnInsert*/}
                    {/*                   editable={true}*/}
                    {/*    //editable={!this.props.readonly ? {type: 'textarea', validator: proposalValidator} : false}*/}
                    {/*    //customInsertEditor={ { getElement: this.customTextInsertEditor } }*/}
                    {/*    //tdStyle={{whiteSpace: 'normal'}}*/}
                    {/*    //editColumnClassName='editing-proposal-class'*/}
                    {/*    //invalidEditColumnClassName='invalid-proposal-class'*/}
                    {/*>Notes</TableHeaderColumn>*/}


                    <TableHeaderColumn dataField='displayOrder'
                                       width={"10%"}
                                       editable={!this.props.readonly ? {type: 'number', defaultValue: '0'} : false}
                                       dataSort={ true }
                    >Order</TableHeaderColumn>

                    <TableHeaderColumn dataField='isActive'
                                       width="10%"
                                       hidden={this.props.missingExpertiseModeEnabled}
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

                </BootstrapTable>
            </Panel>
        </div>

        );




    }

}

JustificationsTable.propTypes = JustificationsTablePropTypes;


export default JustificationsTable;


