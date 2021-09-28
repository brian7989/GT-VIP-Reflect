import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PropTypes from "prop-types";


import {Bootstrap, Panel} from 'react-bootstrap';


const InstructionsPanelProps = {

    title: PropTypes.element.isRequired,
    body: PropTypes.element.isRequired

}

class InstructionsPanel extends Component {


    constructor(props) {

        super(props);

    }

    render() {

        return (
            <Panel

            id={'instructions-panel'}
            //style={{width:"800px"}}
                style={{textAlign:"left"}}
            defaultExpanded>

            <Panel.Heading>
            <Panel.Title toggle>
            {this.props.title}
            </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
            <Panel.Body>
            {this.props.body}
            </Panel.Body>
            </Panel.Collapse>

            </Panel>
        );
    }

}

InstructionsPanel.propTypes = InstructionsPanelProps;

export default  InstructionsPanel;
