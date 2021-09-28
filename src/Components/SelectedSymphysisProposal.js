import React, {Component} from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


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
    Checkbox
} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const SelectedSymphysisProposalPropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    proposal: PropTypes.object,

}




class SelectedSymphysisProposal extends Component {


    constructor(props) {
        super(props);


        this.state = {

        };

    }

    render() {



        return (

            <Panel>

            <div>
            <h4>Selected Symphysis Proposal</h4>
        {this.props.proposal && this.props.proposal.proposalText ?
        <div style={{ whiteSpace: 'pre-wrap' }}>
            {this.props.proposal.proposalText }
        </div>
        : "Not set!"}
    </div>
        </Panel>

    );



    }

}

SelectedSymphysisProposal.propTypes = SelectedSymphysisProposalPropTypes;


export default SelectedSymphysisProposal;


