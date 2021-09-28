import {Component} from "react";
import React from "react";
import {Constants, contextMenuKeys} from "./Constants";
import StakeholderProposalReasonInterestCreatorWithData from "../DataComponents/StakeholderProposalReasonInterestCreatorWithData";
import "../styles/contextMenu.css";
import Row from "react-bootstrap/es/Row";
import Navbar from "react-bootstrap/es/Navbar";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const InstructionsModal = (instructionsData, fadeIn, display, classObject) => {
    let title = instructionsData.title;
    let body = instructionsData.body;

    return <div className={ `modal fade ${fadeIn}` } id='myProposalModal' role='dialog' style={ { display, textAlign:"left", } }>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'> {title}</div>
                    <div className='modal-body'>

                        {body}

                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-default' onClick={ classObject.close }>Close</button>
                    </div>
                </div>
            </div>
        </div>
    ;
}


class StakeholderAnalysisInstructions extends Component {

    constructor(props) {
        super(props);
        this.state = {displayStakeHolders: false, displayProposals: false, open: false,
            displayReasons: false, displayInterests: false, createStakeholders: false, position: "" }
        this.stakeholderAnalysis = [];
        //this.resetCreateStakeholders = this.resetCreateStakeholders(this);
        this.close = this.close.bind(this);
    }

    handleInstructionsButtonClicks(signal) {

        switch(signal) {
            case "proposals":
                this.setState({displayStakeHolders: false, displayProposals: true, open: true,
                    displayReasons: false, displayInterests: false, createStakeholders :false })
                break;
            case "interests":
                this.setState({displayStakeHolders: false, displayProposals: false, open: true,
                    displayReasons: false, displayInterests: true, createStakeholders: false })
                break
            case "reasons":
                this.setState({displayStakeHolders: false, displayProposals: false, open: true,
                    displayReasons: true, displayInterests: false, createStakeholders: false })
                break;
            case "create":
                this.setState({displayStakeHolders: false, displayProposals: false, open: false,
                    displayReasons: false, displayInterests: false, createStakeholders: true })
                break;
            default:
                this.setState({displayStakeHolders: true, displayProposals: false, open: true,
                    displayReasons: false, displayInterests: false, createStakeholders: false })
                break;

        }
    }

    resetCreateStakeholders() {
        this.setState({createStakeholders: false});
    }


    getCorrectInstructionsData() {

        let interestTabInstructions = "";
        let reasonsTabInstructions = "";
        let proposalsTabInstructions = "";
        let stakeholderTabInstructions = this.props.instructions.Stakeholders;



        ///TEMPORARY FIX THAT SHOULD BE REPLACED WITH A PERMANENT DESIGN
        if (this.props.showClarificationsTab && this.props.instructions) {
            console.log("here rendering the deliberations interest tab!!!!!!");
            interestTabInstructions = this.props.instructions.Interestsdelib;
            reasonsTabInstructions = this.props.instructions.Reasonsdelib;
            proposalsTabInstructions = this.props.instructions.Proposalsdelib;
        }

        if (!this.props.showClarificationsTab && this.props.instructions) {
            interestTabInstructions = this.props.instructions.Interests;
            reasonsTabInstructions = this.props.instructions.Reasons;
            proposalsTabInstructions = this.props.instructions.Proposals;
        }

        return {interestTabInstructions, reasonsTabInstructions, proposalsTabInstructions, stakeholderTabInstructions}
    }

    handleCheckButtonClick(event) {
        const target = event.target;
        const value = target.checked ? 'fixed' : ''; //set position to fix
        this.setState({ position: value});
    }



    close() {
        this.setState({open: false});
    }

    headerStyle() {
        if (this.props.createButton) {
            return {
                zIndex: 1000,
                backgroundColor: '#0066CC',
                position: 'sticky',
                top:'0'
            }
        }
        return {
            // zIndex: 1000,
            backgroundColor: '#0066CC',
            position: 'sticky',
            top:'0',
            height: '80px',
            width: '100%'
        }

    }


    render() {

        const fadeIn = (this.state.open)? 'in' : '';
        const display = (this.state.open ) ? 'block' : 'none';
        //console.log(this.props.instructions);
        let instructions = this.getCorrectInstructionsData();
        let interestTabInstructions = instructions.interestTabInstructions;
        let reasonsTabInstructions = instructions.reasonsTabInstructions
        let proposalsTabInstructions = instructions.proposalsTabInstructions;
        let stakeholderTabInstructions = instructions.stakeholderTabInstructions;

        let instructionsModal = "";
        if (this.state.displayStakeHolders) {
            instructionsModal = InstructionsModal(stakeholderTabInstructions, fadeIn, display, this);
        } else if (this.state.displayProposals) {
            instructionsModal = InstructionsModal(proposalsTabInstructions, fadeIn, display, this);
        } else if (this.state.displayInterests) {
            instructionsModal = InstructionsModal(interestTabInstructions, fadeIn, display, this);
        } else if (this.state.createStakeholders) {
            let selector  = {shouldCreate: true}
            instructionsModal =  <StakeholderProposalReasonInterestCreatorWithData
                                    problemId={this.props.problemId}
                                    teamQuery={this.props.teamQuery}
                                    teamId={this.props.teamId}
                                    step={this.props.step}
                                    userId={this.props.userId}
                                   functionSelector={selector}
                                   onClose = {  () => { this.resetCreateStakeholders() } }
                                   buttonText={Constants.create} ref={modalEditor => { this.modalEditor = modalEditor }}
                                   numberOfRows={1} shouldOpen={this.state.createStakeholders} formDescription={"Create new " + contextMenuKeys.stakeholder} text={""}
                                   onSuccess={() => {this.props.onSuccess();}}
                                />

        } else {
            instructionsModal = InstructionsModal(reasonsTabInstructions, fadeIn, display, this);
        }

        return (

            <div   style={this.headerStyle()}>



                <div   style={this.props.style.header_wrapper_style}>

                    <div style={this.props.style.stakeholder_style}>
                        <h5 className="visualizationHeadingsText" >{contextMenuKeys.stakeholder}</h5>
                        <button onClick={() => this.handleInstructionsButtonClicks("stakeholder")}
                                className="stakeholderVisualizationInstructionsButtons">?
                        </button>
                    </div>
                    <div style={this.props.style.stakeholder_style}>
                        <h5 className="visualizationHeadingsText" >{contextMenuKeys.proposal}</h5>
                        <button onClick={() =>  this.handleInstructionsButtonClicks("proposals")}
                                className="stakeholderVisualizationInstructionsButtons">?
                        </button>
                    </div>
                    <div style={this.props.style.stakeholder_style}>
                        <h5 className="visualizationHeadingsText" >{contextMenuKeys.reason}</h5>
                        <button onClick={() =>  this.handleInstructionsButtonClicks("reasons")}
                                className="stakeholderVisualizationInstructionsButtons">?
                        </button>
                    </div>

                    <div style={this.props.style.stakeholder_style}>
                        <h5 className="visualizationHeadingsText">{contextMenuKeys.interest}</h5>
                        <button onClick={() =>  this.handleInstructionsButtonClicks("interests")}
                                className="stakeholderVisualizationInstructionsButtons">?
                        </button>
                    </div>

                </div>

                <div style={this.props.style.header_wrapper_style}>
                    <h5 style={this.props.style.stakeholder_style}>  </h5>
                    {   (this.props.showCreateButton)    ?
                        <button  style={this.props.style.stakeholder_style} id="createStakeholdersButton" onClick={() => this.handleInstructionsButtonClicks("create")} >create stakeholders</button>
                        : <div></div>
                    }

                    <h5 style={this.props.style.stakeholder_style}>  </h5>
                    {/*<label style={this.props.style.stakeholder_style}>  Click to fix instuction header: <input type="checkbox" onChange={ (event) => {this.handleCheckButtonClick(event)} } /> </label>*/}
                    <h5 style={this.props.style.stakeholder_style}>  </h5>
                </div>

                {instructionsModal}
            </div> );
    }


}


export default StakeholderAnalysisInstructions;
