import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import _ from "underscore";

const WorkplansTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    //getWorkplans: PropTypes.func.isRequired,
    //addWorkplan: PropTypes.func.isRequired,
    refetch: PropTypes.func,
    //deleteWorkplan: PropTypes.func.isRequired,
    //updateWorkplan: PropTypes.func.isRequired,
    cloneWorkplan: PropTypes.func,
    workplans: PropTypes.array,

}


// validator function pass the user input value and should return true|false.
function userValidator(value) {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
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

    return <div>{ }</div>;

};


const CustomInsertModalPropTypes = {

    workplans: PropTypes.array,
    selected: PropTypes.number,
    onSelect: PropTypes.func,

}

class CustomInsertModal extends React.Component {

    handleSaveBtnClick = () => {
        const { columns, onSave } = this.props;
        const newRow = {};
        columns.forEach((column, i) => {
            newRow[column.field] = this.refs[column.field].value;
        }, this);
        // You should call onSave function and give the new row
        onSave(newRow);
    }

    //(onModalClose, onSave, columns, validateState, ignoreEditable) => {


    onChange(e) {


        if (
            //this.props.onSelect &&
            e && e.target && e.target.value) {
            let found = null;

            if (this.props.workplans) {
                found = _.find(this.props.workplans, (d) => {
                    return d.id === parseInt(e.target.value);
                });
            }

            let s = {
                id: parseInt(e.target.value),
                workplan: found
            };


            //this.props.onSelect(s);
        }

    }



    render() {
        const {
            onModalClose,
            onSave,
            columns,
            validateState,
            ignoreEditable
        } = this.props;
        return (
            <div style={{ backgroundColor: '#eeeeee' }} className='modal-content'>
                <h2 style={{ color: 'red' }}>Custom Insert Modal</h2>
                <div>
                    {
                        columns.map((column, i) => {
                            const {
                                editable,
                                format,
                                field,
                                name,
                                hiddenOnInsert
                            } = column;

                            if (hiddenOnInsert) {
                                // when you want same auto generate value
                                // and not allow edit, for example ID field
                                return null;
                            }
                            const error = validateState[field] ?
                                (<span className='help-block bg-danger'>{validateState[field]}</span>) :
                                null;
                            return (
                                <div className='form-group' key={field}>
                                    <label>{name} : </label>
                                    <input ref={field} type='text' defaultValue={''} />
                                    {error}
                                </div>
                            );
                        })


                    }

                    <FormGroup controlId={"blah"} >
                        <ControlLabel>Workplan to clone:</ControlLabel>
                        <FormControl
                            componentClass="select"
                            value={this.props.selected ? this.props.selected : undefined}
                            placeholder="select"
                            onChange={this.onChange.bind(this)}
                        >
                            {

                                this.props.workplans ?
                                    this.props.workplans.map((s) => {

                                        let isSelected = this.props.selected && s.id === this.props.selected;



                                        return (
                                            <option value={s.id}
                                                key={s.id}
                                            // selected={isSelected}
                                            >
                                                {s.name}
                                            </option>

                                        );
                                    }) : ""



                            }
                        </FormControl>
                    </FormGroup>

                </div>
                <div>
                    <button className='btn btn-danger' onClick={onModalClose}>Leave</button>
                    <button className='btn btn-success' onClick={() => this.handleSaveBtnClick(columns, onSave)}>Confirm</button>
                </div>
            </div>
        );
    }
}

CustomInsertModal.propTypes = CustomInsertModalPropTypes;





class WorkplansTable extends Component {


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
            this.setState({ selected: [] });
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
    deleteWorkplan() {

        if (this.state.selected.length > 0) {
            this.props.deleteWorkplan(this.state.selected[0]).then(() => this.refetch());

            this.setState({ selected: [] });
        }

    }

    addWorkplan(row) {

        let newData = row;

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete newData.ignoreMe1;

        this.props.addWorkplan(newData).then(() => this.refetch());

    }


    updateWorkplan(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        if (fieldName === 'ignoreMe1')
            return;

        patch[fieldName] = newValue;

        this.props.updateWorkplan(row.id, patch).then(() => this.refetch());
    }

    receiveWorkplans(workplans) {

        this.setState({ workplans: workplans });
    }



    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return (
            <CustomInsertModal {...attr} />
        );
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


        if (this.props.deleteWorkplan)
            selectRowProp['mode'] = 'radio';



        //let refetch = this.refetch; //so anon function can access


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
                    data={this.props.workplans}
                    cellEdit={cellEditProp}
                    selectRow={selectRowProp}
                    options={{

                        insertModal: this.createCustomModal,

                        handleConfirmDeleteRow: customConfirm,

                        onCellEdit: (row, fieldName, newValue) => {
                            this.updateWorkplan(row, fieldName, newValue)
                        },
                        onDeleteRow: () => {
                            this.deleteWorkplan()
                        },
                        onAddRow: (row) => {
                            this.addWorkplan(row)
                        },
                        //          deleteBtn: this.createCustomDeleteButton,
                        //          insertModal: this.createCustomModal,
                    }}
                    insertRow={!!this.props.cloneWorkplan}
                    deleteRow={!!this.props.deleteWorkplan}
                    striped
                    hover
                //can force scrolling by using the following
                //maxHeight="100px"
                //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
                >
                    <TableHeaderColumn dataField='id' isKey={true} hiddenOnInsert>ID</TableHeaderColumn>

                    <TableHeaderColumn dataField='name'
                        editable={this.props.updateWorkplan ? { type: 'textarea', validator: userValidator } : false}
                        tdStyle={{ whiteSpace: 'normal' }}
                        editColumnClassName='editing-user-class'
                        invalidEditColumnClassName='invalid-user-class'>Name</TableHeaderColumn>

                    <TableHeaderColumn dataField='description'
                        editable={this.props.updateWorkplan ? { type: 'textarea', validator: userValidator } : false}
                        tdStyle={{ whiteSpace: 'normal' }}
                        editColumnClassName='editing-user-class'
                        invalidEditColumnClassName='invalid-user-class'>Description</TableHeaderColumn>

                    <TableHeaderColumn dataField='tag'
                        editable={this.props.updateWorkplan ? { type: 'textarea' } : false}
                        tdStyle={{ whiteSpace: 'normal' }}
                        editColumnClassName='editing-user-class'
                        invalidEditColumnClassName='invalid-user-class'>Tag</TableHeaderColumn>



                </BootstrapTable>





            </Panel>

        );


    }

}







WorkplansTable.propTypes = WorkplansTablePropTypes;


export default WorkplansTable;


