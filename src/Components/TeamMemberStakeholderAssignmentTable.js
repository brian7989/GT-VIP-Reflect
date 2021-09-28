import React, { Component } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, Panel, FormGroup, FormControl} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const TeamMembersTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    loadingStakeholders: PropTypes.bool,

    refetch: PropTypes.func,

    teamMembers: PropTypes.array,
    stakeholders: PropTypes.array,

    teamId: PropTypes.number.isRequired,
    active:PropTypes.bool,
    readonly: PropTypes.bool,
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

    //right now, deletes immediately work

    next();

}




const CurrentStakeholderEditorPropTypes = {
    stakeholders: PropTypes.array.isRequired,
};


class CurrentStakeholderEditor extends React.Component {
    constructor(props) {
        super(props);

        this.updateData = this.updateData.bind(this);

        //this.handleChange = this.handleChange.bind(this);


        this.state = {
            //currentStakeholderId: props.row.currentStakeholderId,
            currentStakeholder: props.row.currentStakeholder,

        };
    }
    focus() {
        //this.refs.inputRefA.focus();
    }
    updateData() {

        if(!this.state.currentStakeholder)
            this.props.onUpdate(null);
        else
            this.props.onUpdate(this.state.currentStakeholder.id);
    }

    close = () => {

        let val = this.props.defaultValue;

        if(val === "")
            val = null;

        if(!val)
            val = null;

        this.props.onUpdate(val);
    }

    render() {


        let stakeholders = this.props.stakeholders.slice(0);

        if(stakeholders !== null) {

            let unassigned = {
                id: -1,
                name: "Unassigned"
            }
            stakeholders.unshift(unassigned);

        }


        return (
            <form>
                <FormGroup
                    controlId="formSelectStakeholder"
                    //validationState={this.getValidationState()}
                >

                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        value={this.state.currentStakeholder ? this.state.currentStakeholder.id : undefined}
                        onChange={ e => {

                            if(!e)
                                return;

                            let idVal = e.target.value;

                            let sel = stakeholders.find((s) => { return s.id.toString() === idVal});

                            if(sel.id === -1) {
                                console.log("-1 was selected");
                                console.log(sel.name);

                            }

                            this.setState({ currentStakeholder: sel });
                        } }
                    >

                        {!stakeholders ? '' : stakeholders.map((s) => {

                            return <option key={s.id} value={s.id}>{s.name}</option>;

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


CurrentStakeholderEditor.propTypes = CurrentStakeholderEditorPropTypes;




const createCurrentStakeholderEditor = (stakeholders) => {


    console.log("createCurrentStakeholderEditor");


    return (onUpdate, props) => (<CurrentStakeholderEditor onUpdate={ onUpdate } {...props} stakeholders={stakeholders}/>);

};







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





const reasonFormatter = (cell, row) => (<span><button>Go To</button></span>);


const createReasonEditor = (onUpdate, props) => {

    return <ReasonEditor onUpdate={ onUpdate } {...props}/>;
};



class TeamMemberStakeholderAssignmentTable extends Component {


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

    addTeamMember(row) {

        let newData = row;

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete newData.ignoreMe1;

        this.props.addTeamMember(newData)
            .then(() => this.refetch());

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



    currentStakeholderFormatter(cell, row) {

        return <div>{row.currentStakeholder ? row.currentStakeholder.name : "Not Assigned"}</div>;

    };


    createCurrentStakeholderEditorExtended(stakeholders) {

        return (onUpdate, props) => (<CurrentStakeholderEditor onUpdate={ onUpdate } {...props} stakeholders={stakeholders}/>);

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

        if(this.props.deleteTeamMember)
            selectRowProp['mode'] = 'radio';

        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html

        return (

            //!this.props.teamMembers || !this.props.stakeholders ? <div></div> :
            <Panel>
                <BootstrapTable
                    ref='table'
                    remote={this.remote}
                    data={ this.props.teamMembers }
                    cellEdit={ cellEditProp }
                    selectRow={ selectRowProp }
                    options={{

                        handleConfirmDeleteRow: customConfirm,

                        onCellEdit: (row, fieldName, newValue) => {


                            this.updateTeamMember(row, fieldName, newValue)
                        },
                        onDeleteRow: () => {
                            this.deleteTeamMember()
                        },
                        onAddRow: (row) => {
                            this.addTeamMember(row)
                        }
                    }}
                    insertRow = {!!this.props.addUser}
                    deleteRow = {!!this.props.deleteUser}
                    striped
                    hover
                    //can force scrolling by using the following
                    //maxHeight="100px"
                    //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
                >
                    <TableHeaderColumn dataField='id'
                                       isKey={ true }
                                       editable={false}
                                       hidden={true}
                                       hiddenOnInsert
                    >ID</TableHeaderColumn>

                    <TableHeaderColumn dataField='fullName'
                                       editable={ false}
                                       tdStyle={ { whiteSpace: 'normal' } }
                                       editColumnClassName='editing-teamMember-class'
                                       invalidEditColumnClassName='invalid-teamMember-class'> Name</TableHeaderColumn>


                    <TableHeaderColumn dataField='currentStakeholderId'
                                       //editable={ this.props.updateTeamMember ? {type: 'select', options: {values:  }} : false}
                                       tdStyle={ { whiteSpace: 'normal' } }
                                       //editColumnClassName='editing-teamMember-class'
                                       //invalidEditColumnClassName='invalid-teamMember-class'
                                       dataFormat={this.currentStakeholderFormatter}

                                       editable={this.props.readonly ? false : undefined}

                                       customEditor={ this.props.readonly ? false : {getElement: createCurrentStakeholderEditor(this.props.stakeholders)} }
                    >Assigned Stakeholder</TableHeaderColumn>


                </BootstrapTable>
            </Panel>

        );
    }

}

TeamMemberStakeholderAssignmentTable.propTypes = TeamMembersTablePropTypes;


export default TeamMemberStakeholderAssignmentTable;


