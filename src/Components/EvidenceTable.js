import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';
import _ from 'lodash';


import {Bootstrap, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import validUrl from "valid-url";
import {contextMenuKeys} from "./Constants";

const EvidenceTablePropTypes = {

    //TODO custom validator could check args
    //loading: PropTypes.bool.isRequired,
    //getEvidence: PropTypes.func.isRequired,
    addEvidence: PropTypes.func.isRequired,
    //addProposalEvidence: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    deleteEvidence: PropTypes.func.isRequired,
    deleteProposalEvidence: PropTypes.func.isRequired,
    updateEvidence: PropTypes.func.isRequired,
    evidence: PropTypes.array.isRequired,
    //onSelectEvidence: PropTypes.func.isRequired,
}


// validator function pass the user input value and should return true|false.
function evidenceValidator(value) {
    const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Creation requires a value be entered';
        response.notification.title = 'Invalid Value';
    } else if (value.trim().length < 3) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'The evidence name must be at least 3 characters.';
        response.notification.title = 'Invalid Value';
    }
    return response;
}


function customConfirm(next, dropRowKeys) {

    //TODO confirmation modal

    //right now, deletes immediately work

    next();

}

function createCustomInsertButton() {
    return <div></div>
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




class EvidenceEditor extends React.Component {

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

        //now notify back that we were clicked so parent GUI and switch tabs to evidence screen
        if(this.props.onSelect)
        {
            this.props.onSelect({evidenceId: this.props.row.id});
        }
    }

    render() {

        return (
            <div></div>
        );
    }
}

const urlFormatter = ((cell, row) => {

    // console.log("urlFormatter");
    // console.log(cell);
    // console.log(row);

    if(_.isNil(cell) || cell.length <= 0 || !validUrl.isUri(cell))
        return "";

    return <a href={cell} rel="noopener noreferrer" target="_blank">{cell}</a>;
});







const evidenceFormatter = (cell, row) => (<span><button>Go To</button></span>);


const createEvidenceEditor = (onUpdate, props) => (<EvidenceEditor onUpdate={ onUpdate } {...props}/>);



class EvidenceTable extends Component {


    constructor(props) {
        super(props);


        this.state = {
            selected: [], //used for deletion
            newUrl: "",
            evidenceTitle: ""
            // currPage: 1
        };


        this.onRowSelect = this.onRowSelect.bind(this);
    }

    refetch() {

        if(this.props.refetch)
            return this.props.refetch();
    }


    selectEvidence(evidenceInfo) {

        // console.log("EvidenceTable:selectEvidence()");
        // console.log(this.props);

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
    deleteEvidence() {

        if (this.state.selected.length > 0) {

            let sel = this.state.selected[0];
            this.props.deleteProposalEvidence(sel)
                .then(() => this.props.deleteEvidence(sel))
                .then(() => this.refetch());

            this.setState({selected: []});
        }
    }

    addEvidence(row) {

        let newData = row;

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        delete newData.ignoreMe1;

        this.props.addEvidence(newData)
            .then(() => this.refetch());

    }


    updateEvidence(row, fieldName, newValue) {

        let patch = {};

        //remove anything that should be ignored as 'hiddenOnInsert' option appears to only work
        //for table columns that are keys
        if(fieldName === 'ignoreMe1')
            return;



        patch[fieldName] = newValue;

        this.props.updateEvidence(row.id, patch).then(() => this.refetch());
    }

    receiveEvidence(evidence) {

        this.setState({evidence: evidence});
    }


    collectEvidenceTitle(newTitle) {
        this.state.evidenceTitle = newTitle;
    }


    collectEvidenceUrl(newUrl) {
        //validate the new url that has been added
        this.state.newUrl = newUrl
    }

    addUrl() {

        console.log("This is the input: " + this.state.newUrl);
        let response = complex_urlValidator([this.state.newUrl]);
        if (!response.isValid) {
            alert("Invalid url input");
            return;
        }

        if (this.state.newUrl.length ==  0) {
            return;
        }

        //the field that is to be passed to the knowledge reference
        let userId = this.props.data.userId;
        let teamId = this.props.data.currentTeamId ;
        let proposalId = this.props.data.id;

        let evidence =   {
                title: this.state.evidenceTitle,
                abstract: "",
                publicationType: 'JOURNAL',
                docUrl: this.state.newUrl,
                userId: userId,
                teamId: teamId,
                numLikes: 0,
                relevance: "",
                proposalEvidencesUsingId: {
                create: {
                    proposalToProposalId: {
                        connectById: {
                            id: proposalId
                        }
                    }
                }
            }
        }

        if ( this.props.type == contextMenuKeys.interest) {
           evidence =  {
               title: this.state.evidenceTitle,
               abstract: "",
               publicationType: 'JOURNAL',
               docUrl: this.state.newUrl,
               userId: userId,
               teamId: teamId,
               numLikes: 0,
               relevance: "",
               interestEvidencesUsingId: {
                   create: {
                       interestToInterestId: {
                            connectById: {
                               id: this.props.data.id //attr.id is the real id we need here
                           }
                       }
                   }
               }
           }
        } else if (this.props.type == contextMenuKeys.reason) {
           evidence =  {
                title: this.state.evidenceTitle,
                abstract: "",
                publicationType: 'JOURNAL',
                docUrl: this.state.newUrl,
                userId: userId,
                teamId: teamId,
                numLikes: 0,
                relevance: "",
                reasonEvidencesUsingId: {
                create: {
                    reasonToReasonId: {
                        connectById: {
                            id: this.props.data.id //attr.id is the real id we need here
                        }
                    }
                }
            }
            }
        }

        this.addEvidence(evidence);
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


        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html


        return (

            <Panel>

                <div id="knowledge-reference-input" className="input-append">
                    <input type="text" placeholder="Enter title"
                           aria-label="Enter title" aria-describedby="basic-addon2"  onChange={event => this.collectEvidenceTitle(event.target.value)} />
                    <input type="text" placeholder="Enter url"
                           aria-label="Enter url" aria-describedby="basic-addon2"  onChange={event => this.collectEvidenceUrl(event.target.value)} />
                    <button className="btn-info btn-outline-secondary" type="button" onClick={() => {this.addUrl(this.props.data.attr, this.props.type)}}>Save</button>
                </div>


            <BootstrapTable
                ref='table'
                remote={this.remote}
                data={ this.props.evidence }
                cellEdit={ cellEditProp }
                selectRow={ selectRowProp }
                options={ {

                handleConfirmDeleteRow: customConfirm,
                insertBtn: createCustomInsertButton,

                onCellEdit: (row, fieldName, newValue) => {this.updateEvidence(row, fieldName, newValue)},
                onDeleteRow: () => {this.deleteEvidence()},
               // onAddRow: (row) => {this.addEvidence(row)},
                //          deleteBtn: this.createCustomDeleteButton,
                //          insertModal: this.createCustomModal,
                      } }
                insertRow
                deleteRow
                striped
                hover
                //can force scrolling by using the following
                //maxHeight="100px"
                //also note the use of tdStyle to set whiteSpace to normal. This allows multiline text
            >
                <TableHeaderColumn dataField='id' isKey={ true } hidden hiddenOnInsert>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='title' editable={ { type: 'textarea', validator: evidenceValidator } }
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   editColumnClassName='editing-evidence-class'
                                   invalidEditColumnClassName='invalid-evidence-class'>Title</TableHeaderColumn>
                <TableHeaderColumn dataField='publicationType' editable={ { type: 'select', options: { values: ["JOURNAL", "BOOK", "REPORT", "WEBPAGE", "CONFERENCE_PAPER", "POSTER_SESSION", "NEWSPAPER", "BLOG", "THESIS", "PATENT", "OTHER" ] } } }>
                    Type</TableHeaderColumn>
                <TableHeaderColumn dataField='docUrl' width="250px"  editable={ { type: 'textarea', validator: evidenceValidator } }
                                   tdStyle={ { whiteSpace: 'normal' } }
                                   dataFormat={urlFormatter}
                                   editColumnClassName='editing-evidence-class'
                                   invalidEditColumnClassName='invalid-evidence-class'>URL</TableHeaderColumn>

            </BootstrapTable>
            </Panel>

        );


        //TODO add the bit within {} back when I need it
        // {
        //     <TableHeaderColumn
        //         dataField='ignoreMe1'
        //         hiddenOnInsert
        //         dataFormat={evidenceFormatter}
        //         customEditor={{
        //             getElement: createEvidenceEditor,
        //             customEditorParameters: {
        //                 onSelect: (e) => {
        //                     this.selectEvidence(e)
        //                 }
        //             },
        //         }}
        //     >Evidence</TableHeaderColumn>
        // }



    }

}

EvidenceTable.propTypes = EvidenceTablePropTypes;


export default EvidenceTable;


