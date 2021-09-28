import React, {Component} from 'react';



import "../styles/contextMenu.css";
import StakeholderProposalReasonInterestCreatorWithData from "../DataComponents/StakeholderProposalReasonInterestCreatorWithData"
import {displayKnowledgeBaseModal} from "./KnowledgeReferenceTable"

import {Constants, contextMenuKeys} from "./Constants";
import StakeholderAnalysisInstructions from "./StakeholderAnalysisInstructions";
import PropTypes from "prop-types";
import VisualizeStakeholdersWithRightClick from "./VisualizeStakeholdersWithRightClick";



//https://codepen.io/devhamsters/pen/yMProm
//https://github.com/vkbansal/react-contextmenu
//https://github.com/mui-org/material-ui/issues/8711
const CreateEvidencesEditorFunctionForVisualization = (data, key, showKnowledgeReferenceModal, functionToExecuteOnModalClose) =>  {

    //  A HACK GIVEN HOW TIGHTLY COUPLED BOOTSTRAP TABLE IS TO OUR DATA
    let proposalId = -1

    //in this case, the reasons table is what has been rendered
    if (key == contextMenuKeys.interest) { //because only an interest row will pre-require a reasonId
        data.id = data.interestId;
        data.type = contextMenuKeys.interest;
        return displayKnowledgeBaseModal(data, showKnowledgeReferenceModal, data.proposalId, data.reasonId, data.interestId, contextMenuKeys.interest, functionToExecuteOnModalClose);

    } else if ( key == contextMenuKeys.reason)  {
        data.id = data.reasonId;
        data.type = contextMenuKeys.reason;
        return displayKnowledgeBaseModal(data, showKnowledgeReferenceModal, data.proposalId, data.reasonId, data.interestId, contextMenuKeys.reason, functionToExecuteOnModalClose);

    } else if (key == contextMenuKeys.proposal){
        //in this case the proposal table is what has been rendered
        data.id = data.proposalId;
        data.type = contextMenuKeys.proposal;
        return displayKnowledgeBaseModal(data, showKnowledgeReferenceModal, data.proposalId, data.reasonId, data.interestId, contextMenuKeys.proposal, functionToExecuteOnModalClose);
    } else{
        alert("An invalid key has been passed");
    }



}




const D3ContextMenuPropTypes = {
    onSuccess: PropTypes.func.isRequired,
}





class D3ContextMenu extends Component {

    constructor(props) {
        super(props);
        this.proccessAddOrReferencesModal = this.proccessAddOrReferencesModal.bind(this);
        this.processDelete = this.processDelete.bind(this);
        this.processUpdate = this.processUpdate.bind(this);
        this.setVisibleContextMenuToFalse = this.setVisibleContextMenuToFalse.bind(this);
        this.getVisible = this.getVisible.bind(this);
        this.setNodeClickEventParamaeters = this.setNodeClickEventParamaeters.bind(this);
        this.closeEvidencesModal = this.closeEvidencesModal.bind(this);
        this.setCreateForNextComponentToFalse = this.setCreateForNextComponentToFalse.bind(this);
        this.state = {
            shouldDelete: false,
            shouldUpdate: false,
            shouldCreate: false,
            numberOfFormRows: 0,
            showModal: false,
            formDescription: "",
            showReferences: false,
            visible: false,
            node: null,
            nodeClickEvent: null,
            createDirectChildNode: false
        };

        this.depthToObjectMap = {0:contextMenuKeys.stakeholder, 1:contextMenuKeys.proposal, 2:contextMenuKeys.reason, 3: contextMenuKeys.interest, 4:contextMenuKeys.references};

    }


    componentDidUpdate(prevProps, prevState) {
       // console.log("componentDidUpdate: !!!!!!!!!!!!!!!!!");
        //console.log(this.state.node);
        this._handleContextMenu();
    }



    getVisible() {
        return this.state.visible;
    }

    setVisibleContextMenuToFalse() {
        this.setState({visible: false, shouldCreate: false, shouldUpdate: false, shouldDelete: false, showReferences: false});
    }

    setVisibleToTrue() {
        this.setState({visible: true});
    }

    setNodeClickEventParamaeters(node, event) {
        this.setState({visible: true, node: node, nodeClickEvent: event});
    }


    setCreateForNextComponentToFalse() {
        this.setState({createDirectChildNode: false});
    }

    proccessAddOrReferencesModal(event, key, specialLogicFlag) {
        if (this.modalEditor) this.modalEditor.displayModal();
        if(specialLogicFlag) this.setState({createDirectChildNode: true});
        event.stopPropagation();
        //console.log(this.state.node);
        //we need a stakeholderId, proposalId, and reseaonsId to create an interest
        let keyVal = this.depthToObjectMap[key]
        //alert(key);
        switch (keyVal) {
            case contextMenuKeys.interest:
                this.setState({shouldUpdate: false, shouldDelete: false, shouldCreate: true, showModal: true, numberOfFormRows: 1, formDescription: "Create Interests",  visible:false});
                break;
            case contextMenuKeys.reason:
                this.setState({shouldUpdate: false, shouldDelete: false, shouldCreate: true, showModal: true, numberOfFormRows: 5, formDescription: "Create Reasons",  visible:false});
                break;
            case contextMenuKeys.proposal:
                this.setState({shouldUpdate: false, shouldDelete: false, shouldCreate: true, showModal: true, numberOfFormRows: 5, formDescription: "Create Proposals",  visible:false});
                break
            case contextMenuKeys.references:
                this.setState({shouldUpdate: false, shouldDelete: false, shouldCreate: false, showReferences: true,  visible:false});
                break
            default:
                this.setState({shouldUpdate: false, shouldDelete: false, shouldCreate: true, showModal: true, numberOfFormRows: 1, formDescription: "Create Stakeholders",  visible:false});
                break;
                //treat this like a case for stakeholders
        }

        return false;
    }

    processUpdate(event) {
        if (this.modalEditor) this.modalEditor.displayModal();
        event.stopPropagation();
        //alert("processing the Update request!!!!!!!!!!!!!!!!");
        var key = this.depthToObjectMap[this.state.node.depth];
        switch (key) {
            case  contextMenuKeys.interest:
                this.setState({shouldUpdate: true, shouldDelete: false, shouldCreate: false, showModal: true, numberOfFormRows: 1, formDescription: "Edit Interests", visible:false});
                break;
            case contextMenuKeys.reason:
                this.setState({shouldUpdate: true, shouldDelete: false, shouldCreate: false, showModal: true, numberOfFormRows: 5, formDescription: "Edit Reasons",  visible:false});
                break;
            case contextMenuKeys.proposal:
                this.setState({shouldUpdate: true, shouldDelete: false, shouldCreate: false, showModal: true, numberOfFormRows: 5, formDescription: "Edit Proposals",  visible:false});
                break
            default:
                this.setState({shouldUpdate: true, shouldDelete: false, shouldCreate: false, showModal: true, numberOfFormRows: 1, formDescription: "Edit Stakeholders",  visible:false});
                break;
        }
        return false;
    }

    processDelete(event) {
        if (this.modalEditor) this.modalEditor.displayModal();
        event.stopPropagation();
        //alert("processing the Delete request!!!!!!!!!!!!!!!!");
        var key = this.depthToObjectMap[this.state.node.depth]
        switch (key) {
            case contextMenuKeys.interest:
                this.setState({shouldUpdate: false, shouldDelete: true, shouldCreate: false, showModal: true, numberOfFormRows: 1, formDescription: "Delete Interests"});
                break;
            case contextMenuKeys.reason:
                this.setState({shouldUpdate: false, shouldDelete: true, shouldCreate: false, showModal: true, numberOfFormRows: 5, formDescription: "Delete Reasons"});
                break;
            case contextMenuKeys.proposal:
                this.setState({shouldUpdate: false, shouldDelete: true, shouldCreate: false, showModal: true, numberOfFormRows: 5, formDescription: "Delete Proposals"});
                break

            default:
                this.setState({shouldUpdate: false, shouldDelete: true, shouldCreate: false, showModal: true, numberOfFormRows: 1, formDescription: "Delete Stakeholders"});
                break;
        }
        return false;
    }


    getData() {
        let data = { userId: this.props.userId, teamId : this.props.teamId, proposalId: -1, reasonId: -1, interestId: -1};
        if (this.state.node == null) return data;
        let depth =  this.state.node.depth;
        switch (depth) {
            case 1: //a proposal
                data.proposalId = this.state.node.data.id;
                data.stakeholderId = this.state.node.parent.data.id;
                break;
            case 2: // a reason (has proposal and stakeholders as parents)
                data.reasonId = this.state.node.data.id;
                data.proposalId = this.state.node.parent.data.id;
                data.stakeholderId = this.state.node.parent.parent.data.id;
                break;
            case 3: // an interest (has a proposal, reaosn, and stakeholder as parents respectively )
                data.interestId = this.state.node.data.id;
                data.reasonId = this.state.node.parent.data.id;
                data.proposalId = this.state.node.parent.parent.data.id;
                data.stakeholderId = this.state.node.parent.parent.parent.data.id;
                break;
            default:
                 data.stakeholderId = this.state.node.data.id;
        }


        return data;

    }

    conditionallyDisplayCreateButtonOfChildInContext() {
        let displayAddContextMenuButton = "";
        let referencesButton = "";
        //if the node clicked is not an interest node
        let key = this.state.node.depth;
        if (key < 3) {
            key += 1;
        }  else {
            return displayAddContextMenuButton;
        }
        let createForChildComponent = true;
        displayAddContextMenuButton = <div>
            <div className="contextMenu--option"> <button onClick={ (event) => { this.proccessAddOrReferencesModal(event, key, createForChildComponent) } } className="context-menu-button"> Add {this.depthToObjectMap[key]}</button> </div>
            <div className="contextMenu--separator" />
        </div>;

        return displayAddContextMenuButton;
    }



    conditionallyDisplayCreateButtonInContext() {
        let displayAddContextMenuButton = "";
        let referencesButton = "";
        //if the node clicked is not an interest node
        let key = this.state.node.depth;
        displayAddContextMenuButton = <div>
            <div className="contextMenu--option"> <button onClick={ (event) => { this.proccessAddOrReferencesModal(event, key) } } className="context-menu-button"> Add {this.depthToObjectMap[key]}</button> </div>
            <div className="contextMenu--separator" />
        </div>;

        return displayAddContextMenuButton;
    }

    conditionallyDisplayReferencesButtonInContext() {
        let referencesButton = "";
        let key = 4; // use the key that displays references
        //if the node clicked is not a stakeholder node then show references table
        if (this.state.node.depth != 0) {
            referencesButton =  <div>
                <div className="contextMenu--option"> <button onClick={ (event) => { this.proccessAddOrReferencesModal(event, key) } } className="context-menu-button"> {Constants.addOrEditReferences} </button> </div>
                <div className="contextMenu--separator" />
            </div>
        }

        return referencesButton;
    }



    _handleContextMenu = () => {
        //alert(JSON.stringify(this.state.event));
        let event = this.state.nodeClickEvent;
        if (event == null) return;

        event.preventDefault();

        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;

        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }

        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }

        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }

        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    closeEvidencesModal() {
        //close the references modal and the context menu
        this.setState({showReferences: false, visible: false});
    }


    render() {

        if (!this.props.renderContextMenu) return <div>Context menu isn't rendered yet.</div>
        let data = this.getData();
        let selector = {shouldCreate: false, shouldUpdate: false, shouldDelete: false};


        let modalEditor = "";
        //alert("Re-rendering the context menu!!!!");
        if (this.state.shouldDelete) {
            selector.shouldDelete = true;
            //alert("Re-rendering the context menu delete!!!!");
            modalEditor = <StakeholderProposalReasonInterestCreatorWithData
                problemId={this.props.problemId}
                teamQuery={this.props.teamQuery}
                teamId={this.props.teamId}
                step={this.props.step}
                userId={this.props.userId}
            createDirectChildNode={this.state.createDirectChildNode}
            setCreateForNextComponentToFalse={this.setCreateForNextComponentToFalse}
            functionSelector={selector} node={this.state.node} reasonId={data.reasonId} proposalId={data.proposalId} interestId={data.interestId} stakeholderId={data.stakeholderId}
            onClose={() => {this.setVisibleContextMenuToFalse(); this.props.onClose();}} buttonText={Constants.delete} ref={modalEditor => { this.modalEditor = modalEditor }}
            numberOfRows={0} shouldOpen={this.state.showModal} formDescription={this.state.formDescription} text={this.state.node.data.name}/>

        } else if (this.state.shouldUpdate) {
            selector.shouldUpdate = true;
            //alert("Re-rendering the context menu update!!!!");
            modalEditor = <StakeholderProposalReasonInterestCreatorWithData
                problemId={this.props.problemId}
                teamQuery={this.props.teamQuery}
                teamId={this.props.teamId}
                step={this.props.step}
                userId={this.props.userId}
                createDirectChildNode={this.state.createDirectChildNode}
                setCreateForNextComponentToFalse={this.setCreateForNextComponentToFalse}
                functionSelector={selector} node={this.state.node}  reasonId={data.reasonId} proposalId={data.proposalId} interestId={data.interestId} stakeholderId={data.stakeholderId}
            onClose={() => {this.setVisibleContextMenuToFalse(); this.props.onClose();}}  buttonText={Constants.update} ref={modalEditor => { this.modalEditor = modalEditor }}
            numberOfRows={this.state.numberOfFormRows} shouldOpen={this.state.showModal} formDescription={this.state.formDescription} text={this.state.node.data.name}/>

        } else if (this.state.shouldCreate) {
            selector.shouldCreate = true;
            //alert("Re-rendering the context menu create!!!!");
            modalEditor = <StakeholderProposalReasonInterestCreatorWithData
                problemId={this.props.problemId}
                teamQuery={this.props.teamQuery}
                teamId={this.props.teamId}
                step={this.props.step}
                userId={this.props.userId}
                createDirectChildNode={this.state.createDirectChildNode}
                setCreateForNextComponentToFalse={this.setCreateForNextComponentToFalse}
                functionSelector={selector} node={this.state.node}  reasonId={data.reasonId} proposalId={data.proposalId} interestId={data.interestId} stakeholderId={data.stakeholderId}
                onClose={() => {this.setVisibleContextMenuToFalse();}} buttonText={Constants.create} ref={modalEditor => { this.modalEditor = modalEditor }}
                numberOfRows={this.state.numberOfFormRows} shouldOpen={this.state.showModal} formDescription={this.state.formDescription} text={""}
                onSuccess={() => {console.log("success!!!!"); this.props.onSuccess();}}
            />

        } else if (this.state.showReferences) {
            modalEditor =  CreateEvidencesEditorFunctionForVisualization(data, this.depthToObjectMap[this.state.node.depth], this.state.showReferences, this.closeEvidencesModal)
        }
        let menu = <div ref={ref => {this.root = ref}}></div>
        //show the menu of state is set to visible
        if (this.state.visible) {
            let displayCreateButtonInContext = this.conditionallyDisplayCreateButtonInContext();
            let referencesButton = this.conditionallyDisplayReferencesButtonInContext();
            let displayChildOfCurrentComponent = this.conditionallyDisplayCreateButtonOfChildInContext();
            menu = <div id="tree-context-menu" ref={ref => {this.root = ref}} className="contextMenu">
                <div className="contextMenu--option"> <button onClick= { this.processUpdate } className="context-menu-button"> Edit {this.depthToObjectMap[this.state.node.depth]}</button></div>
                {referencesButton}
                {displayCreateButtonInContext}

                <div className="contextMenu--separator" />
                <div className="contextMenu--option"> <button onClick={ this.processDelete } className="context-menu-button"> Delete {this.depthToObjectMap[this.state.node.depth]} </button></div>
                {displayChildOfCurrentComponent}
            </div>

        }

        return (
            <div>
                {modalEditor}
                {menu}
            </div>

        )
    };
}


D3ContextMenu.propTypes = D3ContextMenuPropTypes;

export default D3ContextMenu;

