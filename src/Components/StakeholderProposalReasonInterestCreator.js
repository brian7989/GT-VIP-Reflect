
import React, {Component} from 'react';

import PropTypes from 'prop-types';
import  {Constants,contextMenuKeys} from "./Constants";
import {stakeholderFunctions} from "./StakeholdersProposalsReasonsInterestsFunctions";

import {
    Bootstrap,

    Form,
    FormGroup,
    FormControl,
    Checkbox
} from 'react-bootstrap';



const ModalEditorPropTypes = {
    createData: PropTypes.func,
    updateData: PropTypes.func,
    deleteData: PropTypes.func,
    functionSelector:  PropTypes.object.isRequired,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
}

class StakeholderProposalReasonInterestCreator extends React.Component {

    constructor(props) {
        super(props);
        //this.updateData = this.updateData.bind(this);
        this.selectFunctionCall = this.selectFunctionCall.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.state = {
            text: props.defaultValue,
            open: true
        };
        console.log("These are the props from the constructor!!!!");
        console.log(props);
        this.stakeholderFunctions = stakeholderFunctions(props);
    }


    focus() {
        this.refs.inputRefB.focus();
    }




    createData() {
        //alert(this.state.text);
        let id = -1
        if (this.props.node && this.props.node.parent)
            id = this.props.node.parent.data.id;

        if (this.props.node && this.props.createDirectChildNode) {
            id = this.props.node.data.id;
            this.props.setCreateForNextComponentToFalse();
        }

        if (this.props.formDescription.includes(contextMenuKeys.stakeholder)) {
            this.stakeholderFunctions.createNewStakeholders(this.props.userId, this.props.teamId, this.props.problemId,
                this.props.step, this.state.power, this.state.text);

        } else if (this.props.formDescription.includes(contextMenuKeys.reason)) {
            this.stakeholderFunctions.createNewReasons(this.props.userId, id, this.state.text);
            //alert("It created a reason!");

        } else if (this.props.formDescription.includes(contextMenuKeys.proposal)) {
            this.stakeholderFunctions.createNewProposals(id, this.state.text);

        } else if (this.props.formDescription.includes(contextMenuKeys.interestKeys)) {
            this.stakeholderFunctions.createNewInterests(this.props.userId, id, this.state.text);

        } else {
            //close the modal and show the error
            this.close();
            alert("Can only create Stakeholders/Proposals/Reasons/Interests")
        }
    }

    updateData() {
        if (this.props.formDescription.includes(contextMenuKeys.stakeholder)) {
            this.stakeholderFunctions.updateStakeholders(this.props.node.data.id, this.state.text);
        } else if (this.props.formDescription.includes(contextMenuKeys.reason)) {
            this.stakeholderFunctions.updateReasons(this.props.node.data.id, this.state.text);
        } else if (this.props.formDescription.includes(contextMenuKeys.proposal)) {
            this.stakeholderFunctions.updateProposals(this.props.node.parent.data.id, this.props.node.data.id, this.state.text);
        } else if (this.props.formDescription.includes(contextMenuKeys.interestKeys)) {
            this.stakeholderFunctions.updateInterests(this.props.node.data.id, this.state.text);
        } else {
            //close the modal and show the error
            this.close();
            alert("Can only update Stakeholders/Proposals/Reasons/Interests")
        }
    }

    deleteData() {

        if (this.props.formDescription.includes(contextMenuKeys.stakeholder)) {
            this.stakeholderFunctions.deleteStakeholders(this.props.node.data.id);
        } else if (this.props.formDescription.includes(contextMenuKeys.reason)) {
            this.stakeholderFunctions.deleteReasons(this.props.node.data.id);
        } else if (this.props.formDescription.includes(contextMenuKeys.proposal)) {
            this.stakeholderFunctions.deleteProposals(this.props.node.parent.data.id, this.props.node.data.id);
        } else if (this.props.formDescription.includes(contextMenuKeys.interestKeys)) {
            this.stakeholderFunctions.deleteInterests(this.props.node.data.id);
        } else {
            //close the modal and show the error
            this.close();
            alert("Can only delete Stakeholders/Proposals/Reasons/Interests")
        }
    }

    selectFunctionCall() {

        if (this.props.functionSelector.shouldCreate) {
            this.createData();
        } else if (this.props.functionSelector.shouldUpdate) {
            this.updateData();
        } else if (this.props.functionSelector.shouldDelete) {
            this.deleteData();
        } else {
            alert("You have to pass the right function.")
        }

        //close the modal button
        this.close();
    }

    componentDidMount(){
        this.setState({text: this.props.text})
    }


    displayModal(){
        this.setState({open: true});
    }



    close = () => {
        this.setState({ open: false });
        if (this.props.onClose != undefined) {
            this.props.onClose();
        }

        //this.props.onUpdate(this.props.defaultValue);
    }

    render() {

        const fadeIn = (this.state.open)? 'in' : '';
        const display = (this.state.open ) ? 'block' : 'none';
        return (
            <div className={ `modal fade ${fadeIn}` } id='myProposalModal' role='dialog' style={ { display } }>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>

                            <div> {this.props.formDescription} </div>
                            { ( !this.props.buttonText.includes(Constants.delete)) ?
                                <div>
                                    {/*<Form.Group controlId="formBasicChecbox">*/}
                                        {/*<Form.Text className="text-muted">*/}
                                            {/*Please select the power value for this stakeholder*/}
                                        {/*</Form.Text>*/}
                                        {/*<Form.Check type="radio" label="1" />*/}
                                        {/*<Form.Check type="radio" label="2" />*/}
                                        {/*<Form.Check type="radio" label="3" />*/}
                                        {/*<Form.Check type="radio" label="4" />*/}
                                        {/*<Form.Check type="radio" label="5" />*/}
                                    {/*</Form.Group>*/}
                                    <textarea
                                        ref='inputRefB'
                                        className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                                        style={ { display: 'inline', width: '80%' } }
                                        rows={this.props.numberOfRows}
                                        value={ this.state.text ? this.state.text: '' }
                                        onChange={ e => {
                                            let proposalText = e.currentTarget.value;
                                            //console.log(proposalText);
                                            this.setState({ text: proposalText });
                                        } }

                                    />
                                </div>
                        : <div></div> }

                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' onClick={ this.selectFunctionCall }>{this.props.buttonText}</button>
                            <button type='button' className='btn btn-default' onClick={ this.close }>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


StakeholderProposalReasonInterestCreator.propTypes = ModalEditorPropTypes;

export default StakeholderProposalReasonInterestCreator;
