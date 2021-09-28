import React, {Component} from 'react';

import EvidenceTableWithData from '../DataComponents/EvidenceTableWithData';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import {
    Bootstrap,
    Modal,
} from 'react-bootstrap';
import {contextMenuKeys} from "./Constants";


const CreateEvidencesEditorFunction = (row, data) =>  {
    //  A HACKY APPRIACH GIVEN HOW TIGHTLY COUPLED BOOTSTRAP TABLE IS TO OUR DATA
    console.log("From this function!!!1");
    console.log(row);
    console.log("attr");
    console.log(data);
    let proposalId = -1
    //in this case, the reasons table is what has been rendered
    if (data.hasOwnProperty('interestText')) { //because only an interest row will pre-require a reasonId
        return <CreateEvidencesEditor  data={data} proposalId={proposalId} reasonId={data.reasonId} interestId={data.id} type={contextMenuKeys.interest}/>
    } else if ( data.hasOwnProperty('reasonText'))  {
        proposalId = data.proposalId //because only a reasons row will pre-require an interest id
        return <CreateEvidencesEditor  data={data} proposalId={proposalId} reasonId={data.id} interestId={-1} type={contextMenuKeys.reason}/>
    } else {
        //in this case the proposal table is what has been rendered
        proposalId = data.id
        return <CreateEvidencesEditor  data={data} proposalId={proposalId} reasonId={-1} interestId={-1} type={contextMenuKeys.proposal}/>
    }



}

///display the knowledge base evidences
const displayKnowledgeBaseModal = (data, showKnowledgeReferenceModal, proposalId, reasonId, interestId, type, onCloseFunctionFromCaller) => {
    //console.log("Yup the function was called");
    let modal_div =
        <Modal show={showKnowledgeReferenceModal } onHide={() => {
            onCloseFunctionFromCaller();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Please add/edit your references here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EvidenceTableWithData data={data} proposalId={proposalId} type={type} reasonId={reasonId} interestId={interestId}/>
            </Modal.Body>

        </Modal>;
    return modal_div;
}


class CreateEvidencesEditor extends Component {

    constructor(props){
        super(props);


        this.state = {
            showKnowledgeReferenceModal: false
        };

        this.hideModal =  this.hideModal.bind(this);
    }

    showModal(){
        this.setState({showKnowledgeReferenceModal: true});
    }

    hideModal(){
        this.setState({showKnowledgeReferenceModal: false});
    }



    render () {

        //const CreateEvidencesEditorFunction = (row, attr) => {
        console.log(this.props);
        let attr = this.props.data;
        let urls =  [];
        //render only if knowledge reference object exists in the data passed
        if ( typeof(attr.knowledgeReference) == "object" && typeof(attr.knowledgeReference.nodes) == "object") {
            urls = attr.knowledgeReference.nodes;
        }


        let urlDivs =  urls.map( (data, index) => {
            let title = data.title
            if (typeof(title) == "string" && title.length > 0 ) {
                return <div key={index}><a href={data.docUrl} rel="noopener noreferrer" target="_blank"  >{data.title} </a> </div>
            }
            return <div key={index}><a href={data.docUrl} rel="noopener noreferrer" target="_blank"  >{data.docUrl} </a> </div>
        });

        // let urlDivs = knowledgeBaseUrl(urls);
        let modal_div = displayKnowledgeBaseModal(attr, this.state.showKnowledgeReferenceModal, this.props.proposalId, this.props.reasonId, this.props.interestId, this.props.type, this.hideModal);

        return <div>
            {urlDivs}
            {modal_div}
            <button className="btn-info" onClick={() => { this.showModal() }} > Add/Edit References</button>
        </div>
    }
}


export  {CreateEvidencesEditorFunction, displayKnowledgeBaseModal};
