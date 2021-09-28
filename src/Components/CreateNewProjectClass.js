import {Button, Col, Modal, Nav, Row} from "react-bootstrap";
import RegisterNewUserForm from "./RegisterNewUserForm";
import React, {Component} from "react";

import StepWizard from 'react-step-wizard';
import {withRouter} from "react-router-dom";


const createNewClass = (showRegistrationModal, submitRegistrationFunction, onCloseFunctionFromCaller) => {
    let modal_div =
        <Modal show={showRegistrationModal} onHide={() => {
            onCloseFunctionFromCaller();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Create a New Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepWizard totalSteps={3} nav={<Nav />}>
                    <React.Fragment><h4>This is a multi-step form for creating classes</h4></React.Fragment>
                    <React.Fragment><div>Pick a class name</div></React.Fragment>
                    <React.Fragment><div>Pick an existing workplan or create a
                        <a target='_blank' href='/new_work_plan'>New workPlan</a></div>
                    </React.Fragment>
                </StepWizard>
            </Modal.Body>

        </Modal>;


    return modal_div;
}



class ClassCreationModalIntermed extends Component {

    constructor(props){
        super(props);

        this.state = {
            classCreationModal: false
        };

        this.closeModals = this.closeModals.bind(this);
        this.showClassCreationModal = this.showClassCreationModal.bind(this);

    }


    showClassCreationModal(event) {

        this.setState({classCreationModal: true});
        event.preventDefault();
    }

    closeModals() {
        //close the references modal and the context menu
        this.setState({classCreationModal: false});
    }


    render() {

        let newClassModal = "";

        if (this.state.classCreationModal) {
            newClassModal = createNewClass(this.state.classCreationModal, this.closeModals, this.closeModals)
        }

        return (

            <React.Fragment>
                <Button onClick={this.showClassCreationModal}>Create a new Class or Project </Button>
                {newClassModal}
            </React.Fragment>
        );

    }

}


const ClassCreationModal  = withRouter(ClassCreationModalIntermed);

export default ClassCreationModal;
