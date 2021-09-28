import React, {Component} from 'react';
import '../styles/StakeholderAnalysis.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PropTypes from "prop-types";


import {Bootstrap, Panel} from 'react-bootstrap';

import * as d3 from "d3";

var StakeholderAnalysis = require('../Visualizations/stakeholderAnalysis.js');
var stakeholderAnalysis = [];
var margin = {top: 25, right: 250, bottom: 25, left: 250}
var link_width = window.innerWidth/4 - (margin.left/4 + margin.right/4);

// Basic style for visualization
var style = {
    header_style: {
        width: link_width + 'px',
        display: 'inline-block'
    },
    header_wrapper_style: {
        width:window.innerWidth,
        paddingRight: 250,
        paddingLeft: 250,
        font: '15px sans-serif',
        position:'sticky',
        top:'0'
    },
    stakeholder_style: {
        transform: 'translateX(-' + link_width + 'px)',
        textAlign: 'right',
        width: link_width + 'px',
        display: 'inline-block'
    }
}


const VisualizeStakeholdersProps = {

    stakeholders: PropTypes.array,

}

class VisualizeStakeholders extends Component {


    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    // Get stakeholder data
    getData() {
        var data = [];
        var offsetHeight = 0;
        for (var x in this.props.stakeholders) {
            var height = 0;
            var stakeholder = this.props.stakeholders[x];
            var stakeholderObj = {};
            stakeholderObj.name = stakeholder.name;
            stakeholderObj.isActive = stakeholder.isActive;
            stakeholderObj.children = [];
            for (var y in stakeholder.stakeholderProposals.nodes) {
                var proposal = stakeholder.stakeholderProposals.nodes[y];
                var proposalObj = {};
                proposalObj.name = proposal.proposal.proposalText;
                proposalObj.isActive = proposal.proposal.isActive;
                proposalObj.children = [];
                for (var z in proposal.proposal.reasons.nodes) {
                    var reason = proposal.proposal.reasons.nodes[z];
                    var reasonObj = {};
                    reasonObj.name = reason.reasonText;
                    reasonObj.isActive = reason.isActive;
                    reasonObj.children = [];
                    for (var h in reason.interests.nodes) {
                        var interest = reason.interests.nodes[h];
                        var interestObj = {};
                        interestObj.name = interest.interestText;
                        interestObj.isActive = interest.isActive;

                        if(interestObj.isActive)
                            reasonObj.children.push(interestObj);
                        height += 25;
                    }
                    if(reasonObj.isActive)
                        proposalObj.children.push(reasonObj);
                    height += 60;
                }
                if(proposalObj.isActive)
                    stakeholderObj.children.push(proposalObj);
                height += 100;
            }
            if(stakeholderObj.isActive)
                data.push({stakeholderObj:stakeholderObj, height:height, offsetHeight:offsetHeight});
            offsetHeight += (height + 3);
        }
        return data;
    }

    // Display visualization
    render() {

        // console.log("From the visualization!!!!!!!!!!!!");
        // console.log(this.props);

        for (var stak in stakeholderAnalysis) {
            stakeholderAnalysis[stak].destroy();
        }
        stakeholderAnalysis = [];
        var data = this.getData();

        var availableColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            stakeholderColor = d3.scaleOrdinal(d3.schemeCategory20);
        data.map(function(val, stakeholder) {
            var colorIndex = (stakeholder * 2) % 20;
            stakeholderAnalysis.push(new StakeholderAnalysis('#stakeholderAnalysis', data[stakeholder].stakeholderObj, stakeholderColor(colorIndex), stakeholderColor(colorIndex + 1), data[stakeholder].height, data[stakeholder].offsetHeight));
        });

        return (
            <div>
            <div id="headers-wrapper" style={style.header_wrapper_style}>
            <div id="headers">
            <h5 id="stakeholderHeader" style={style.stakeholder_style}>Stakeholder</h5>
            <h5  style={style.header_style}>Proposal</h5>
            <h5  style={style.header_style}>Reason</h5>
            <h5  style={style.header_style}>Interest</h5>
            </div>
            </div>
            <div id="stakeholderAnalysis" className="col-md-12">
            </div>
            </div>
    );
    }

}

VisualizeStakeholders.propTypes = VisualizeStakeholdersProps;

export default  VisualizeStakeholders;