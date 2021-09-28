import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';
import '../proposalMap.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';


import {Bootstrap, OverlayTrigger, Tooltip, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var ProposalMap = require('../Visualizations/proposalMap.js');
var proposalMap;


const VisualizationTransposedTeamStakeholderProposalWeightsPropTypes = {

    //TODO custom validator could check args
    loadingStakeholders: PropTypes.bool,
    loadingProposals: PropTypes.bool,
    refetch: PropTypes.func,
    stakeholders: PropTypes.array,
    proposals: PropTypes.array,

    //userId: PropTypes.number.isRequired,
    teamId: PropTypes.number.isRequired,
    //problemId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,

}




class VisualizationTransposedTeamStakeholderProposalWeights extends Component {


    constructor(props) {
        super(props);


        this.state = {

        };


    }

    shouldComponentUpdate() {
        return true;
    }


    render() {
        if (proposalMap) {
            console.log("destroying proposal map...");
            proposalMap.destroy();
        }

        if ((!this.props.loadingProposals && !this.props.loadingStakeholders && this.props.proposals && this.props.stakeholders)) {
            var originalPoints = [];
            var modifiedPoints = [];
            var positionNames = [];
            var stakeholderNames = [];


            this.props.stakeholders.map((s) => {
              stakeholderNames.push(s.name);
            });

            this.props.proposals.map((p) => {
              positionNames.push(p.proposalText);
            });

            //add to 2d array of each stakeholders' weight for each proposal
            for (var prop in this.props.proposals) {
              let proposal = this.props.proposals[prop];
              let stakeholderWeights = [];
              for (var stak in this.props.stakeholders) {
                  let stakeholder = this.props.stakeholders[stak];
                  let propKey = 'stakeholder-' + stakeholder.id
                  if (propKey in proposal && proposal[propKey] ) {
                      stakeholderWeights.push(proposal[propKey])
                  } else {
                      stakeholderWeights.push(0);
                  }
              }

              var modified = [];
              for (var i = 0; i < stakeholderWeights.length; i++) {
                  var val = stakeholderWeights[i];
                  if (val < 0) {
                      val -= 2;
                  }
                  else if (val > 0) {
                      val += 2;
                  }
                  modified.push(val);
              }
              originalPoints.push(stakeholderWeights);
              modifiedPoints.push(modified);

            }

            if (originalPoints.length > 0 && modifiedPoints.length > 0) {
                proposalMap = new ProposalMap(originalPoints, modifiedPoints, positionNames, stakeholderNames, 'plot');
            }
        }

        return (

            <div>
                {
                    (this.props.loadingProposals || this.props.loadingStakeholders || !this.props.proposals || !this.props.stakeholders) ? <div>"Loading Stakeholders and/or Proposals"</div> :
                    <div></div>
                }
                <div className="col-md-6" id="plot"></div>
                <div className="col-md-6" id="radarChart"></div>
            </div>
        );


    }

}







VisualizationTransposedTeamStakeholderProposalWeights.propTypes = VisualizationTransposedTeamStakeholderProposalWeightsPropTypes;


export default VisualizationTransposedTeamStakeholderProposalWeights;


