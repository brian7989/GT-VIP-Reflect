import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';

import {diffChars, diffWords} from 'diff';

import {Bootstrap, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import _ from 'lodash';

import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



const ProblemTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    addProblem: PropTypes.func.isRequired,
    refetch: PropTypes.func,
    deleteProblem: PropTypes.func.isRequired,
    updateProblem: PropTypes.func.isRequired,
    touchProblem: PropTypes.func.isRequired,
    //receiveProblem: PropTypes.func.isRequired,
    problem: PropTypes.array,
    tag: PropTypes.string.isRequired,
    onSelectProblem: PropTypes.func.isRequired,
    teamId: PropTypes.number.isRequired,
    selectedProblemId: PropTypes.number,
    userId: PropTypes.number,//.isRequired,
    active: PropTypes.bool.isRequired,
    readonly: PropTypes.bool,
}


// validator function pass the user input value and should return true|false.
function problemValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The problem must be a sentence';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}


//May want to switch to custom modal at some point
//This was working last time I tried it, but needs better styling

//class CustomInsertModal extends React.Component {
//
//    handleSaveBtnClick = () => {
//        const { columns, onSave } = this.props;
//        const newRow = {};
//        columns.forEach((column, i) => {
//            newRow[column.field] = this.refs[column.field].value;
//        }, this);
//        // You should call onSave function and give the new row
//        onSave(newRow);
//    }
//
//    render() {
//        const {
//            onModalClose,
//            onSave,
//            columns,
//            validateState,
//            ignoreEditable
//            } = this.props;
//        return (
//            <div style={ { backgroundColor: '#eeeeee' } } className='modal-content'>
//                <h2 style={ { color: 'red' } }>Custom Insert Modal</h2>
//                <div>
//                    {
//                        columns.map((column, i) => {
//                            const {
//                                editable,
//                                format,
//                                field,
//                                name,
//                                hiddenOnInsert
//                                } = column;
//
//                            if (hiddenOnInsert) {
//                                // when you want same auto generate value
//                                // and not allow edit, for example ID field
//                                return null;
//                            }
//                            const error = validateState[field] ?
//                                (<span className='help-block bg-danger'>{ validateState[field] }</span>) :
//                                null;
//                            return (
//                                <div className='form-group' key={ field }>
//                                    <label>{ name } : </label>
//                                    <input ref={ field } type='text' defaultValue={ '' } />
//                                    { error }
//                                </div>
//                            );
//                        })
//                    }
//                </div>
//                <div>
//                    <button className='btn btn-danger' onClick={ onModalClose }>Leave</button>
//                    <button className='btn btn-success' onClick={ () => this.handleSaveBtnClick(columns, onSave) }>Confirm</button>
//                </div>
//            </div>
//        );
//    }
//}



class ProblemEditor extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            title: props.row.title,
            originalTitle: props.row.title,
            description: props.defaultValue,
            originalDescription: props.defaultValue,
            id: props.row.id,
            touchedAt: props.row.touchedAt,
            remoteEditDetected: false,
            remoteTouchDetected: false,
            open: true,
        };


        console.log("ProblemEditor PROPS");
        console.log(props);
    }


    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.tick(),
        //     5*1000
        // );
        //
        // this.touchTimerID = setInterval(
        //     () => this.props.touchProblem(this.state.id).then((data)=> {this.setState({touchedAt: data.touchProblemById.problem.touchedAt})}),
        //     10*1000
        // );

        this.tick();

        this.touchUpdate();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        clearInterval(this.touchTimerID);
    }

    touchUpdate() {

        console.log("touch update!");

        this.props.touchProblem(this.state.id).then((data)=> {

            if(data.touchProblemById.problem.prevTouchedAt !== this.state.touchedAt)
            {
                // must have another editor right now!
                this.setState({touchedAt: data.touchProblemById.problem.touchedAt, remoteTouchDetected: true});
            }
            else {
                this.setState({touchedAt: data.touchProblemById.problem.touchedAt});
            }
        });

        setTimeout(() => {return this.touchUpdate();}, 10 * 1000);
    }



    tick() {

        console.log("tick!");

        let prob = this.props.getCurrentProblem();

        //console.log(prob);

        let titleEditedLocally = this.state.title !== this.state.originalTitle;
        let descriptionEditedLocally = this.state.description !== this.state.originalDescription;

        let titleEditedRemotely = prob.title !== this.state.originalTitle;
        let descriptionEditedRemotely = prob.description !== this.state.originalDescription;

        let touchedRemotely = prob.touchedAt !== this.state.touchedAt;

        if(touchedRemotely) console.log("TOUCHED REMOTE!!!!");

        let mergedTitle = this.state.title;
        let mergedDescription = this.state.description;

        if(titleEditedRemotely)
        {
            if(!titleEditedLocally) {
                mergedTitle = prob.title;
            }
            else
            {
                const diff = diffWords(prob.title, this.state.title);

                mergedTitle = "";

                diff.forEach((part) => {

                    //if(part.added || !part.removed)
                    {
                        mergedTitle = mergedTitle.concat(part.value);
                    }
                });
            }
        }

        if(descriptionEditedRemotely)
        {
            if(!descriptionEditedLocally) {
                mergedDescription = prob.description;
            }
            else
            {
                const diff = diffWords(prob.description, this.state.description);

                mergedDescription = "";

                // console.log(diff);
                // console.log("length");
                // console.log(diff.length);

                diff.forEach((part) => {

                    console.log(part);

                    //if(part.added || !part.removed)
                    {
                        mergedDescription = mergedDescription.concat(part.value);
                    }
                });
            }
        }

        if(descriptionEditedRemotely || titleEditedRemotely || touchedRemotely) {

            this.setState({
                remoteEditDetected: descriptionEditedRemotely || titleEditedRemotely,
                remoteTouchDetected: touchedRemotely,
                title: mergedTitle,
                originalTitle: titleEditedRemotely ? prob.title : this.state.originalTitle,
                description: mergedDescription,
                originalDescription: descriptionEditedRemotely ? prob.description : this.state.originalDescription
            });
        }

        // if(prob.description !== this.state.originalDescription)
        // {
        //     console.log("Remote edit change!!!!!");
        //
        //     this.setState({
        //         title: mergedTitle,
        //         originalTitle: titleEditedRemotely ? prob.title : this.state.originalTitle,
        //         description: mergedDescription,
        //         originalDescription: descriptionEditedRemotely ? prob.description : this.state.originalDescription
        //     });
        // }

        // this.setState({
        //     date: new Date()
        // });

        setTimeout(() => {return this.tick();},  5 * 1000);

    }

    focus() {
        this.refs.inputRefB.focus();
    }
    updateData() {
        console.log("updating with: " + this.state.description);
        //this.props.onUpdate(this.state.description);
        //this.props.onUpdate('{"title":"' + this.state.title + '", "description":"' + JSON.stringify(this.state.description) +'"}');
        this.props.onUpdate(JSON.stringify({title:this.state.title, description:this.state.description}));
    }
    //TODO this delete hack is sad, but I couldn't come up with another way to do it without modifying
    //the bootstrap-table code
    delete() {
        console.log("deleting with: " + this.state.description);
        console.log(this.props);
        //this.props.onUpdate("DELETE-DELETE");

        this.props.onUpdate('{"delete":true}');

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
            <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <div>Title: </div>
                            <input
                                ref='inputRefA'
                                className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                                style={ { display: 'inline', width: '90%' } }
                                type='text'
                                value={ this.state.title ? this.state.title : '' }
                                onChange={  e => {  this.setState({ title: e.currentTarget.value }); } } />
                            <div>Description: </div>
                            <textarea
                                ref='inputRefB'
                                className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                                style={ { display: 'inline', width: '90%' } }
                                rows={10}
                                value={ this.state.description ? this.state.description: '' }
                                onChange={ e => {
                                    let descriptionText = e.currentTarget.value;
                                    console.log(descriptionText);
                                    this.setState({ description: descriptionText });
                                } }

                            />
                            {/*<input*/}
                                {/*ref='inputRefB'*/}
                                {/*className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }*/}
                                {/*style={ { display: 'inline', width: '50%' } }*/}
                                {/*type='text'*/}
                                {/*value={ this.state.description ? this.state.description : '' }*/}
                                {/*onChange={ e => { this.setState({ description: e.currentTarget.value }); } } />*/}
                        </div>
                        <div className='modal-footer'>

                            <button type='button' className='btn btn-default' onClick={ this.close }>Cancel</button>
                            <button type='button' className='btn btn-primary' onClick={ this.delete }>Delete</button>
                            <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
                        </div>
                        <div style={{color: 'red'}}>
                            {this.state.remoteEditDetected || this.state.remoteTouchDetected  ? <b>WARNING: Another user is working on this entry. Please click cancel. </b> : ""}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}






class ProblemSelectEditor extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {  };
    }

    focus() {
        // console.log("ProblemSelectEditor:focus()");
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
        if(this.props.onSelect)
        {
            this.props.onSelect({problemId: this.props.row.id});
        }
    }
    render() {

        return (
            <div></div>
        );
    }
}





const createProblemSelectEditor = (onUpdate, props) => (<ProblemSelectEditor onUpdate={ onUpdate } {...props}/>);







class ProblemTable extends Component {


    createProblemEditor = (onUpdate, props) => (<ProblemEditor getCurrentProblem={() => this.getProblem(props.row.id)} onUpdate={ onUpdate }
                                                               touchProblem={this.props.touchProblem} {...props}/>);


    getProblem(id) {
        // console.log("Returning problem! The id is: ");
        // console.log(id);
        // console.log(this.props.problem);

        let problem = this.props.problem.find(elm => elm.id === id);

        return problem;
    }


    constructor(props) {
        super(props);


        this.state = {
            problem: [],
            selected: [], //used for deletion
            // currPage: 1
        };


        this.onRowSelect = this.onRowSelect.bind(this);

    }


    customTextInsertEditor =(column, attr, editorClass, ignoreEditable) => {
        return (<textarea placeholder="Enter text here." rows='15' className={`${editorClass}` + ' edit-text'} {...attr}></textarea>);
    };


    refetch() {

        if(this.props.refetch)
            return this.props.refetch();
    }


    problemSelectFormatter(cell, row) {

        return <form><Checkbox readOnly checked={row.id === this.props.selectedProblemId}></Checkbox></form>;

    };



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


    //onAfterSaveCell(row, cellName, cellValue) {
    //    alert(`Save cell ${cellName} with value ${cellValue}`);
    //
    //    let rowStr = '';
    //    for (const prop in row) {
    //        rowStr += prop + ': ' + row[prop] + '\n';
    //    }
    //
    //    alert('Thw whole row :\n' + rowStr);
    //}

    //TODO I think delete problem is passed the selected array and possibly doesn't need to be accessed by state
    //but examples showed that I need to track selected as state. not sure why...
    deleteProblem() {

        if (this.state.selected.length > 0) {
            this.props.deleteProblem(this.state.selected[0])
                .then(() => this.refetch());

            this.setState({selected: []});
        }

    }

    addProblemInternal(row) {

        this.props.addProblem(row.title, row.description);
        //.then(() => this.refetch());

    }


    updateProblem(row, fieldName, newValue) {

        // console.log("row_id: " + row.id);
        // console.log("title: " + row.title);
        // console.log("description: " + row.description);
        // console.log("fieldName: " + fieldName);
        // console.log("newValue: " + newValue);

        let patchData = {};

        let jsonVal = null;

        if(fieldName === 'ignoreMe1')
            return;


        try {
            jsonVal = JSON.parse(newValue);
        } catch(e) {
            console.log("JSON parse failed");
            jsonVal = null;
        }

        //a regular object?
        if(_.isObject(jsonVal) && !_.isFunction(jsonVal) && !_.isArray(jsonVal))
        {
            //special payload is passed in the newValue for a compound update maybe

            if(jsonVal['delete'])
            {
                this.props.deleteProblem(row.id)
                    .then(() => this.refetch());

                this.setState({selected: []});

            }
            else
            {
                //some sanitization effort
                if(_.isString(jsonVal['title']))
                    patchData['title'] = jsonVal['title'];

                if(_.isString(jsonVal['description']))
                    patchData['description'] = jsonVal['description'];

                this.props.updateProblem(row.id, patchData);
                //.then(() => this.refetch());

            }

        }
        else {


            patchData[fieldName] = newValue;

            this.props.updateProblem(row.id, patchData);
            //.then(() => this.refetch());

        }






        //Always use the default title
        //patchData['title'] = this.props.defaultTitle;



        //
        // //TODO this delete hack is sad, but I couldn't come up with another way to do it without modifying
        // //the bootstrap-table code
        // if(newValue === "DELETE-DELETE")
        // {
        //
        //     this.props.deleteProblem(row.id).then(() => this.refetch());
        //
        //     this.setState({selected: []});
        //
        // }
        // else {
        //     this.props.updateProblem(row.id, patchData).then(() => this.refetch());
        // }
    }


    receiveProblem(problem) {

        this.setState({problem: problem});
    }



    //Example of custom button. probably similar for all buttons
    //handleDeleteButtonClick = (onClick) => {
    //    // Custom your onClick event here,
    //    // it's not necessary to implement this function if you have no any process before onClick
    //    console.log('This is my custom function for DeleteButton click event');
    //    onClick();
    //}
    //
    //createCustomDeleteButton = (onClick) => {
    //    return (
    //        <DeleteButton
    //            btnText='CustomDeleteText'
    //            btnContextual='btn-warning'
    //            className='my-custom-class'
    //            btnGlyphicon='glyphicon-edit'
    //            onClick={ () => this.handleDeleteButtonClick(onClick) }/>
    //    );
    //}


    //Example of supporting custom creation modal
    //createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
    //    const attr = {
    //        onModalClose, onSave, columns, validateState, ignoreEditable
    //    };
    //    return (
    //        <CustomInsertModal { ... attr } />
    //    );
    //}



    userFormatter(value, row){

        return row.userByUserId.fullName;
    }


    descriptionFormatter(value, row){

        //return row.userByUserId.fullName + " " + row.description;


        // return <Grid>
        //     <Row className="show-grid">
        //         <Col md={5}>
        //             <h6><b>{row.title}</b></h6>
        //         </Col>
        //         <Col md={2}>
        //
        //         </Col>
        //     </Row>
        //     <Row className="show-grid">
        //         <Col md={5}>
        //             {row.description}
        //         </Col>
        //         <Col md={2}>
        //
        //         </Col>
        //     </Row>
        //     <Row className="show-grid">
        //         <Col md={5}>
        //
        //         </Col>
        //         <Col md={2}>
        //             <h6>{row.userByUserId.fullName}</h6>
        //         </Col>
        //     </Row>
        // </Grid>;


        return <div>


            <h6>
                <b>{row.title}</b>
            </h6>
            <div>
                {row.description}
            </div>


            <Grid>
                <Row className="show-grid">
                    <Col md={1}></Col><Col md={2}><h6 >{row.userByUserId.fullName}</h6></Col>
                </Row>
            </Grid>





        </div>;
    }



    render() {


        const cellEditProp = {

            mode: 'click',
            //blurToSave: true,
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


        let title = "INVALID";

        if(this.props.tag === "MORE_SPECIFIC")
            title = "More Specific Problem Formulations";

        if(this.props.tag === "MORE_GENERAL")
            title = "More General Problem Formulations";


        return (


            <BootstrapTable


                ref='table'
                remote={this.remote}
                data={
                        this.props.problem
                     //this.props.getProblem()
                     }
                cellEdit={ cellEditProp }
                //selectRow={ selectRowProp }
                options={ {



                handleConfirmDeleteRow: customConfirm,

                onCellEdit: (row, fieldName, newValue) => {
                    console.log("updating: " +row + " " + fieldName + " " + newValue);
                    this.updateProblem(row, fieldName, newValue);
                },
                onDeleteRow: () => {this.deleteProblem()},
                onAddRow: (row) => { console.log("onaddrow: "); console.log(row); this.addProblemInternal(row);},
                //          deleteBtn: this.createCustomDeleteButton,
                //          insertModal: this.createCustomModal,

                //toolBar: this.createCustomToolBar,
                toolbarPosition: 'bottom',
                      } }
                insertRow={!this.props.readonly}
                //deleteRow
                striped
                hover
                //can force scrolling by using the following
                //maxHeight="100px"
                //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
            >
                <TableHeaderColumn dataField='id' isKey={ true } hidden hiddenOnInsert>ID</TableHeaderColumn>
                {/*<TableHeaderColumn dataField='userByUserId.fullName'*/}
                                   {/*editable={ false}*/}
                                   {/*hiddenOnInsert*/}
                                   {/*dataFormat={this.userFormatter}*/}
                                   {/*width='120px'*/}
                {/*>User</TableHeaderColumn>*/}
                <TableHeaderColumn dataField='title'
                                   hidden
                                   //editable={ { type: 'textarea', validator: problemValidator } }
                                   //tdStyle={ { whiteSpace: 'normal' } }
                                   //editColumnClassName='editing-problem-class'
                                   //invalidEditColumnClassName='invalid-problem-class'
                >Title</TableHeaderColumn>
                <TableHeaderColumn dataField='description'
                                   // width='300px'
                                   // editable={ { type: 'textarea', validator: problemValidator } }
                                   customInsertEditor={ { getElement: this.customTextInsertEditor } }
                                   tdStyle={ { whiteSpace: 'pre-wrap' } }
                                   // editColumnClassName='editing-problem-class'
                                   // invalidEditColumnClassName='invalid-problem-class'
                                   dataFormat={this.descriptionFormatter}
                                   editable={this.props.readonly ? false : undefined}
                                   customEditor={this.props.readonly ? false : {getElement: this.createProblemEditor} }
                >{title}</TableHeaderColumn>

                <TableHeaderColumn
                    width='70px'
                    dataField='ignoreMe1'
                    hiddenOnInsert
                    dataFormat={(row, id) => {return this.problemSelectFormatter(row, id);}}
                    editable={this.props.readonly ? false : undefined}
                    customEditor={this.props.readonly ? false : {
                        getElement: createProblemSelectEditor,
                        customEditorParameters: {
                            onSelect: (e) => {

                                this.props.onSelectProblem(e.problemId)
                                // this.props.selectProblem(this.props.teamId, e.problemId).then(
                                //
                                //             this.props.onSelectProblem(e.problemId)
                                //
                                // );
                            }
                        },
                    }}
                >Select</TableHeaderColumn>
            </BootstrapTable>



        );


    }

}

ProblemTable.propTypes = ProblemTablePropTypes;

export default ProblemTable;


