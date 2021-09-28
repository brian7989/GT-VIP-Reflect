import React, {Component} from "react";
import ReflectRoutes from "./ReflectRoutes";
import {Link, NavLink} from "react-router-dom";
import reflectLogo from "../images/reflectLogo.png";
import Button from "react-bootstrap/es/Button";
import KnowledgeBasePanelWithData from "../DataComponents/KnowledgeBasepanelWithData";
import PropTypes from "prop-types";
import DropdownMenu from "react-bootstrap/es/DropdownMenu";
import {Dropdown, DropdownButton, MenuItem} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import "../styles/NavigationBar.css";


class NavigationBar extends Component {
    render() {
        return(

            <div>
                <NavLink to="/"><img src={reflectLogo} height={80} width={180} className={"logo"}/></NavLink>
            <ul className = "topnav">
                <li id = "navbar-item">
                    <NavLink to={ReflectRoutes.homeRoute.home.url}>Dashboard</NavLink>
                </li >
                <li id = "navbar-item">
                    <NavLink to={ReflectRoutes.teamInfo.url}>Team Info + Materials</NavLink>
                </li >

                <li className = "navbar-external-item">
                        <a rel="noopener noreferrer" target="_blank" href={this.props.bibliographyUrl}>Knowledge Base
                            <a href = 'https://reflect.gatech.edu/how-to-get-access-to-the-knowledge-base-in-mendeley/'
                               rel="noopener noreferer"
                               target="_blank"
                               id = "knowledge-base-link">
                                <Button id = "knowledge-base-button">?</Button>
                            </a>
                        </a>

                </li>
                <li className = "navbar-external-item" id = "navbar-glossary">
                    <a href="https://reflect.gatech.edu/glossary/" rel="noopener noreferer"
                       target="_blank">Glossary</a>
                </li>
                <li className = "navbar-external-item">
                    <div className="how-to-dropdown">
                        <button className="how-to-dropbtn">How To
                        </button>
                        <div className="how-to-dropdown-content">
                            <a href="https://reflect.gatech.edu/how-to-formulate-a-problem/" rel="noopener noreferer"
                               target="_blank">How to formulate a problem</a>
                            <a href="https://reflect.gatech.edu/how-to-develop-a-stakeholder-analysis/" rel="noopener noreferer"
                               target="_blank">How to develop a stakeholder analysis</a>
                            <a href="https://reflect.gatech.edu/how-to-listen/" rel="noopener noreferer"
                               target="_blank">How to listen</a>
                            <a href="https://reflect.gatech.edu/how-to-develop-a-symphysis-proposal/" rel="noopener noreferer"
                               target="_blank">How to develop a symphysis proposal</a>
                            <a href="https://reflect.gatech.edu/how-to-construct-an-argument/" rel="noopener noreferer"
                               target="_blank">How to construct an argument</a>
                            <a href = 'https://reflect.gatech.edu/how-to-get-access-to-the-knowledge-base-in-mendeley/'
                               rel="noopener noreferer"
                               target="_blank">How to access the knowledge base</a>
                        </div>
                    </div>
                </li>
            </ul>
            </div>


        );
    }
}



export default NavigationBar;
