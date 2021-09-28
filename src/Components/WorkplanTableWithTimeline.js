import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Timeline, Bookmark } from 'react-vertical-timeline';

import Moment from 'moment';

import Collapsible from 'react-collapsible';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import PropTypes from 'prop-types';
import ReflectRoutes from "./ReflectRoutes";


import {
    Badge,
    Bootstrap,
    OverlayTrigger,
    Tooltip,
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

import Parser from 'html-react-parser';

import {LinkContainer} from 'react-router-bootstrap';
import HiddenRouteReporter from "./SymphysisProposal";

// import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const WorkplanTablePropTypes = {
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    workplan: PropTypes.object,
    hideId: PropTypes.bool,
}

function dateFormatter(dateString, dueDateType) {
    // const dueString = dueDateType ? 'Due: ' : '';
    let dueString = '';

    switch (dueDateType) {
        case 'DUE':
            dueString = 'Due: ';
            break;
        case 'START':
            dueString = 'Start: ';
            break;
        case 'ON':
            dueString = '';
            break;
        default:
            break;
    }

    // return dateString ? `${Moment(dateString).format('M/D/YYYY')}` : null;
    return dateString ? `${dueString}${Moment(dateString).format('M/D/YYYY')}` : null;
}


class WorkplanTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true
        };

        this.routesData = [[ReflectRoutes.workplanComponent.workPlan.url, ReflectRoutes.workplanComponent.workPlan.stateKeys]]
    }

    setStatesOnRouteChange() {
        //find the index in the routesData that matches the current location route
        let currentRoute = this.props.location.pathname;
        console.log("This is the route match found!!!!!!!!!!!");
        console.log(this.props);
        console.log(currentRoute);
        let routeIndex = this.routesData.findIndex( (routes) =>  {return routes[0] == currentRoute });
        console.log(routeIndex)
        if (routeIndex != -1) {
            //alert("No route index found!");
            let stateKeys  = this.routesData[routeIndex][1]
            this.setState({activeComponentState: stateKeys})
        }

    }

    render() {
        let workplan = this.props.workplan;
        const badgeClasses = `badge badge-light`;

        const parserOptions = {
            replace: (domNode) => {
                if (domNode.attribs && domNode.attribs.id === 'replace') {
                    return (
                        <LinkContainer to={domNode.attribs.href}><a href="#">{domNode.children[0].data}</a></LinkContainer>
                    );
                }
                else {
                    return;
                }
            }
        };


        return (
            <div>

                {!this.props.loading && workplan ?
                    <Panel
                        style={{width:"800px"}}
                    >
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Workplan for {workplan.name}</Panel.Title>
                            {workplan.description}
                        </Panel.Heading>
                        <Panel.Body>

                            {
                                (workplan && workplan.phasesByWorkplanId) ?
                                    <div>
                                        {
                                            workplan.phasesByWorkplanId.nodes.map((phase) => {
                                                return (
                                                    <Panel id={`collapsible-panel-phase-${phase.id}`} key={phase.id}>
                                                        <Panel.Heading>
                                                            <Panel.Title toggle>
                                                                {phase.name} <span
                                                                className={badgeClasses}>{dateFormatter(phase.dueDate, phase.dueDateType)}</span>
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Collapse>
                                                            <Panel.Body>
                                                                {
                                                                    phase.modulesByPhaseId.nodes.map((module) => {
                                                                        return (
                                                                            <Panel
                                                                                id={`collapsible-panel-module-${module.id}`}
                                                                                defaultExpanded key={module.id}>
                                                                                <Panel.Heading>
                                                                                    <Panel.Title toggle>
                                                                                        {module.name} <span
                                                                                        className={badgeClasses}>{dateFormatter(module.dueDate, module.dueDateType)}</span>
                                                                                    </Panel.Title>
                                                                                </Panel.Heading>
                                                                                <Panel.Collapse>
                                                                                    <Panel.Body>
                                                                                        {module.description ? (
                                                                                            <div> {Parser(module.description, parserOptions)} </div>
                                                                                        ) : (null)}
                                                                                        <ul className="list-group">
                                                                                            {
                                                                                                (module.moduleStepsByModuleId && module.moduleStepsByModuleId.nodes) ?
                                                                                                    module.moduleStepsByModuleId.nodes.map((moduleStep) => {
                                                                                                        return (
                                                                                                            <li className="list-group-item"
                                                                                                                key={moduleStep.id}>
                                                                                                                <h5 className="list-group-item-heading">
                                                                                                                    <span
                                                                                                                        className={badgeClasses}>{moduleStep.moduleScale.description}</span>
                                                                                                                    <span
                                                                                                                        className={badgeClasses}>{dateFormatter(moduleStep.dueDate, moduleStep.dueDateType)}</span>
                                                                                                                </h5>
                                                                                                                {moduleStep.description ? (
                                                                                                                    <div
                                                                                                                        className="list-group-item-text"> {Parser(moduleStep.description, parserOptions)} </div>
                                                                                                                ) : (null)}
                                                                                                            </li>
                                                                                                        )
                                                                                                    }) : (<div>No
                                                                                                        ModuleSteps</div>)
                                                                                            }
                                                                                        </ul>
                                                                                    </Panel.Body>
                                                                                </Panel.Collapse>
                                                                            </Panel>
                                                                        )
                                                                    })
                                                                }
                                                            </Panel.Body>
                                                        </Panel.Collapse>
                                                    </Panel>
                                                )
                                            })
                                        }
                                    </div>
                                    : <div>No Workplan Assigned</div>
                            }
                        </Panel.Body>
                    </Panel>

                    : <div></div>

                }
            </div>
        );
    }

}


WorkplanTable.propTypes = WorkplanTablePropTypes;


export default WorkplanTable;
