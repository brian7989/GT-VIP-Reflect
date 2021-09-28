import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../App.css';
import "../styles/Problem.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import ReactTextCollapse from 'react-text-collapse';

import PropTypes from 'prop-types';


import {Bootstrap, Navbar, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';

import Parser from 'html-react-parser';
import {NavLink} from "react-router-dom";
import ReflectRoutes from "./ReflectRoutes";
import {LinkContainer} from "react-router-bootstrap";
import ReactHtmlParser from "react-html-parser";




const CurrentProblemPropTypes = {

    heading: PropTypes.object.isRequired,
    problem: PropTypes.object,
    showSelectProblemButton: PropTypes.bool,
    disableCollapse: PropTypes.bool,
    useHTMLFormatting: PropTypes.bool,

}


const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, // default state when component rendered
    collapseText: '... show more', // text to show when collapsed
    expandText: 'show less', // text to show when expanded
    minHeight: 100, // component height when closed
    maxHeight: 180, // expanded to
    textStyle: { // pass the css for the collapseText and expandText here
        color: "blue",
        fontSize: "12px"
    }
}


class CurrentProblem extends Component {


    constructor(props) {
        super(props);

    }



    render() {

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


        let currProblem = this.props.problem;

        let currProbDescription = "No description";
        let currProbTitle = "NOT SELECTED";


        if(currProblem && currProblem.description && currProblem.description.trim().length >= 0)
            currProbDescription =currProblem.description;


        if(currProblem && currProblem.title && currProblem.title.trim().length >= 0)
            currProbTitle = currProblem.title;



        let probDescript = <div style={{whiteSpace: "pre-wrap"}}>{Parser(currProbDescription, parserOptions)}</div>;

        //let probDescript = this.props.useHTMLFormatting ? <div style={{whiteSpace: "pre-wrap"}}>{Parser(currProbDescription, parserOptions)}</div> : <div style={{whiteSpace: "pre-wrap"}}>{currProbDescription}</div>;

        // let fakie = `<div style="white-space:normal;"><p>Within this text box, the initial problem formulation that you select for a team will be displayed. You can create a class or a project with one or more teams on your “My account” page.\n  In the process, you have to select a “Work plan” for the entire class or project, determine dates on which certain things should happen or are due, and select a problem for each team.</p>\n<ul>\n  <li>Find here a <a href=\"/\" id=\"replace\">list of all work plans that are currently available</a></li>\n  <li>Find here a <a href=\"/\" id=\"replace\">list of all problems. If you want to create your own problems</a>, please contact <a href=\"mailto:m.hoffmann@gatech.edu\">m.hoffmann@gatech.edu</a>.</li>\n</ul>\n<p>The page on which you are right now looks like the “team page” that each member of a team will see.</p>\n<ul>\n  <li>In the box on the left will be the work plan that you selected. Right now, you see there our most comprehensive work plan for “Reflective Consensus Building on Wicked Problems in Education.” Click on the various steps to see more details.</li>\n  <li>Whereas a work plan provides step-by-step guidance, the space on the right of the team page is reserved for systematic navigation. Many of the buttons there, though, will make sense only after you worked through the work plan. The systematic navigation allows you to move quickly between the various parts of a project.</li>\n</ul>\n<p>Feel free to play around within your own “sandbox.” You have access to the full functionality of the platform (as determined by this particular work plan), but this is not a place to collaborate with others. For this you need to create a class or project with a team.</p>\n<p>Have fun!</p>\n<p>Please contact <a href=\"mailto:m.hoffmann@gatech.edu\">m.hoffmann@gatech.edu</a> if you have suggestions or concerns.</p>\n\n<p>After you completed your stakeholder analysis in your team, it is important to know what each stakeholder thinks about each proposal. To reflect on this question, click here and fill out the <a href=\"/weights\" id=\"replace\">Stakeholders Weighting Proposals Table</a>.</p>\n</div>`
        //
        // console.log(fakie);
        //
        // probDescript = <div style={{whiteSpace: "pre-wrap"}}>{Parser(fakie, parserOptions)}</div>;

        return (



            <Panel

                defaultExpanded
            >


                    <Panel.Heading>
                        <Panel.Title toggle>
                            {this.props.heading}
                        </Panel.Title>
                    </Panel.Heading>

                    <Panel.Collapse>
                    <Panel.Body style={{ textAlign: "left"}}>

                        {
                            this.props.showSelectProblemButton ?
                            <NavLink to={ReflectRoutes.problemStatement.problemPanel.url}>
                                <button
                                    className={"problemFormulationButton"}
                                >Problem Formulation</button>
                            </NavLink>
                            : ''
                        }

                        <p>
                        <b>{currProbTitle}</b>
                        </p>

                            {
                                probDescript
                                // !this.props.disableCollapse ?
                                //     <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                //         <div style={{whiteSpace: 'pre-wrap', textAlign: "left"}}>
                                //         {Parser(currProbDescription, parserOptions)}
                                //         </div>
                                //     </ReactTextCollapse> :
                                //     <div style={{whiteSpace: 'pre-wrap', textAlign: "left"}}>
                                //         {Parser(currProbDescription, parserOptions)}
                                //     </div>
                            }


                    </Panel.Body>
                    </Panel.Collapse>
            </Panel>



        );

    }

}

CurrentProblem.propTypes = CurrentProblemPropTypes;

export default CurrentProblem;


