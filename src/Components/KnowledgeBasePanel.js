import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import PropTypes from 'prop-types';

import {
    Bootstrap,
    Form,
    FormGroup,
    FormControl,
    ControlLabel, Nav, NavItem, NavDropdown, MenuItem, Col
} from 'react-bootstrap';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {withRouter} from "react-router-dom";
import Panel from "react-bootstrap/es/Panel";

const  KnowledgeBasePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    bibliographyUrl: PropTypes.string,
    title: PropTypes.string,
}


class KnowledgeBaseSearchPanelIntermed extends Component {

    constructor(props){
        super(props);

        this.state = {
            citationLinks: '',
        };

        this.handleCitationLinksInputChange = this.handleCitationLinksInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleCitationLinksInputChange(event) {
        this.setState({citationLinks: event.target.value});
    }

    getValidationState() {
        if (this.state.citationLinks.includes('<script>') || this.state.citationLinks.includes('%27%3Cscript%3E%27') )
            return 'error'
        return null
    }


    handleSubmit(event) {

        event.preventDefault();
        console.log("the user attempted to login");
        this.props.submit(this.state.citationLinks);
    }


    render() {

        let problemTitle = this.props.title !== null ? this.props.title : "Not Assigned";

        return (

            <div style={{padding: '2%', width: '100%'}}>
                {
                    this.props.bibliographyUrl ?  <h3> Link to the Knowledge Base for: <a rel="noopener noreferrer" target="_blank" href={this.props.bibliographyUrl}>{problemTitle}</a>  </h3> : <h3>No knowledge base link defined!</h3>
                }

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h2">
                            <a data-toggle="collapse" >How to get access</a>
                        </Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <p>To keep references to the literature organized, the Reflect! platform can be linked to Mendeley.com. Click <a style={{"color":'red'}} rel="noopener noreferrer" target="_blank" href="https://www.mendeley.com/" > here </a> and create an account. Then do the following:
                        </p>
                        <div>
                            <ul>
                                <li>Sign in</li>
                                <li>“Search” for “Groups” (click on the tab) and enter: "Reflect! group" (with quotation marks).
                                </li>
                                <li>Select the group that is about your problem. Note that “group” is a Mendeley term, it is not identical with your team. </li>
                                <li>All Reflect! groups in Mendeley are public, that means:
                                    <ul>
                                        <li>everybody has access and can see your entries.</li>
                                        <li>The material that you find there has been added by all who worked so far in Reflect! on the same problem, or by other people.</li>
                                        <li>So, please be careful and do not delete stuff.</li>
                                        <li>Do not upload pdf-files if you are not sure that you violate copyrights.
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    In your Mendeley group, when you click on “View group documents in library,” you can install a few things if you like, and you will see a short intro. When you click on a title, you will see more “Details” of this publication in the panel on the right.
                                </li>

                            </ul>
                        </div>
                    </Panel.Body>

                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h2">Download the Mendeley Desktop app (for free)</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <div>
                            <ul>
                                <li>In Mendeley, click on the small arrow on the right side of your name on top and download the Mendeley desktop app</li>
                                <li>Every time you open your desktop app, you should first “Synchronize” your data via the icon on top. This way, everything that others added to the database will be included in your database. Before you close the desktop app, synchronize again.</li>
                            </ul>
                        </div>


                    </Panel.Body>

                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h2"> How to add new references to the Mendeley library </Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <div>
                            <ul>
                                <li>Watch the short Video Tutorial <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/watch?v=qRiAIaqdAOg">“How to import your documents (2:05)”</a> about how to do it.  <a target="_blank" href="https://www.mendeley.com/guides?dgcid=Mendeley_Desktop_Help-Online-guides">Click here for more videos and guides</a> .
                                </li>
                                <li>Make sure that imported references end up in your group library.
                                </li>
                            </ul>
                        </div>

                    </Panel.Body>

                </Panel>

                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h2">How to add references to the Knowledge base on Reflect! pages</Panel.Title>
                    </Panel.Heading>

                    <Panel.Body>
                        <ul>
                            <li>For the stakeholder analysis in Reflect -- and maybe also in your problem formulation -- you need to provide references to publications as evidence for what you enter. There are several fields where you can enter a URL that leads to a particular reference in your Mendeley library.</li>
                            <li>To get this URL: In the group library in your desktop app, mark a publication you want to refer to and click on “View research catalog entry for this paper” in the right panel. This opens a web page of your reference in the “Mendeley Web Catalog,” a database with over 300m entries. Copy the URL of the entry that you would like to quote and insert it in Reflect! where you need it. Note that you can reach the Web Catalog only from your desktop app.</li>
                            <li>After you read an article, mark the article in your Mendeley online group library so that the full reference pops up in the panel on the right, click there on the tab “Notes,” and write a few lines about why this article is relevant for your project, or which parts in particular are relevant.</li>
                        </ul>

                    </Panel.Body>

                </Panel>


            </div>




        );

    }

}

KnowledgeBaseSearchPanelIntermed.propTypes = KnowledgeBasePropTypes;

const KnowledgeBaseSearchPanel = withRouter(KnowledgeBaseSearchPanelIntermed);

export default KnowledgeBaseSearchPanel;

