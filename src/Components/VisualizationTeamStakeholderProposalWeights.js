import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, OverlayTrigger, Tooltip, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



const StakeholdersTablePropTypes = {

    //TODO custom validator could check args
    loadingStakeholders: PropTypes.bool.isRequired,
    loadingProposals: PropTypes.bool.isRequired,
    //getStakeholders: PropTypes.func.isRequired,
    //addStakeholder: PropTypes.func.isRequired,
    //addStakeholderProposal: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    //deleteStakeholder: PropTypes.func.isRequired,
    //updateStakeholder: PropTypes.func.isRequired,
    //updateStakeholderProposal: PropTypes.func.isRequired,
    stakeholders: PropTypes.array.isRequired,
    proposals: PropTypes.array.isRequired,
    //onSelectProposal: PropTypes.func.isRequired,
}











class VisualizationTeamStakeholderProposalWeights extends Component {


    constructor(props) {
        super(props);


        this.state = {

        };


    }







    render() {




        return (

            <Panel>





                    {
                        this.props.loadingStakeholders ? "Loading Stakeholders" :

                            <Table>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                </tr>
                                </thead>
                            <tbody>
                            {


                                this.props.stakeholders.map((s) => {

                                    return(
                                    <tr key={s.nodeId}>
                                        <td >
                                            {s.id}
                                        </td>
                                        <td >
                                            {s.name}
                                        </td>
                                    </tr>

                                    );

                                })
                            }

                            </tbody>
                            </Table>


                    }


                {
                    this.props.loadingProposals ? "Loading Proposals" :

                        <Table>
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>text</th>
                            </tr>
                            </thead>
                            <tbody>
                            {


                                this.props.proposals.map((s) => {


                                    return(
                                        <tr key={s.nodeId}>
                                            <td >
                                                {s.id}
                                            </td>
                                            <td >
                                                {s.proposalText}
                                            </td>
                                        </tr>

                                    );

                                })
                            }

                            </tbody>
                        </Table>


                }


                {
                    (this.props.loadingProposals || this.props.loadingStakeholders) ? "Loading Stakeholders and/or Proposals" :

                        <Table>
                            <thead>
                            <tr>
                                <th>Stakeholder</th>

                                {
                                    this.props.proposals.map((s) => {


                                        return (
                                            <th key={s.nodeId}>{s.proposalText.substring(0, 10) + "..."}</th>

                                        );

                                    })
                                }

                            </tr>
                            </thead>
                            <tbody>
                            {


                                this.props.stakeholders.map((s) => {


                                    return(
                                        <tr key={s.nodeId}>
                                            <td key={s.nodeId}>
                                                {s.name}
                                            </td>


                                            {
                                                this.props.proposals.map((p) => {


                                                    return (


                                                                (() => {

                                                                    let propKey = 'proposal-' + parseInt(p.id);

                                                                    if(propKey in s) {

                                                                        return (<td key={p.nodeId}>{s[propKey]}</td>);
                                                                    }
                                                                    else
                                                                        return(<td key={p.nodeId}>?</td>);


                                                                })()





                                                    );

                                                })
                                            }

                                        </tr>

                                    );

                                })
                            }

                            </tbody>
                        </Table>


                }



            </Panel>

        );


    }

}







VisualizationTeamStakeholderProposalWeights.propTypes = StakeholdersTablePropTypes;


export default VisualizationTeamStakeholderProposalWeights;


