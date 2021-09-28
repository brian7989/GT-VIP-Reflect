import React, {Component, Suspense} from 'react';
import Row from "react-bootstrap/es/Row";
import {Col, DropdownButton, MenuItem} from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import Button from "react-bootstrap/es/Button";
import _ from "lodash"
import "../styles/UserPage.css"
import ReflectRoutes from "./ReflectRoutes";
import {NavLink, Redirect} from "react-router-dom";
import ClassCreationModal from "./CreateNewProjectClass";
import PropTypes from "prop-types";


import { withTranslation } from 'react-i18next';


import CurrentTeamDropdownSelectorWithData from "../DataComponents/CurrentTeamDropdownSelectorWithData";

import CurrentLanguageDropdownSelectorWithData from "../DataComponents/CurrentLanguageDropdownSelectorWithData";

import Version from "../DataComponents/Version";


import BatchUpload from "./BatchUpload";

import InstructionsData from "../DataComponents/InstructionsData";
import {GetLocalizedInstructions} from "../DataComponents/InstructionsData";

const UserPagePropTypes = {

    user: PropTypes.object.isRequired,
    logoutFunc: PropTypes.func.isRequired,

    //TODO someday the following should work in React
    //see: https://github.com/facebook/react/issues/3163

    //selected: PropTypes.oneOfType([null, PropTypes.number]).isRequired,


}


class UserPageIntermed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myFile: "",
            message: "",
            selectedClass: null,
        };
    }


    render() {

        // console.log("****USERPAGE****");
        // console.log(this.props);
        //

        const { t } = this.props;

        let locInstr = GetLocalizedInstructions(t);

        let user = this.props.user;

        let testTeamData = [{teamName:"Team 1", className: "pabel test class 1", problem: "Pabel test problem", workplan: "pabel test workplan"},
            {teamName: "team 2", className: "pabel test class 2", problem: "Pabel test 2", workplan: "pabel test 10"}
        ];

        let classTestData = [{className: "new test class", teams: [{name: "team 12", id: "12"}, {name: "team 20", id: "20"}]},
            {className: "new test 2 class", teams: [{name: "team 10", id: "10"}, {name: "team 22", id: "22"}]}];

        let teamsInWhichIamAMember =  testTeamData; //[];
        let myClassesField =  classTestData;//[];

        const renderClassesTeams = (teams) => {
            return teams.map( (data) => {
                return <MenuItem eventKey="userPage">
                    <NavLink to={ReflectRoutes.teamInfo.url + '/' + data.id}>  {data.name} </NavLink>
                </MenuItem>
            })

        }

        let components = teamsInWhichIamAMember.map( (data) => {
            return  <tr>
                <td> <Button><NavLink to={ReflectRoutes.homeRoute.home.url}>{data.teamName}</NavLink> </Button> </td>
                <td>{data.className}</td>
                <td>{data.problem}</td>
                <td>{data.workplan}</td>
            </tr>
        });

        let classesAndProjects = myClassesField.map( (data) => {
            return <tr>
                    <td> <DropdownButton  title={`${data.className}`}>
                        {renderClassesTeams(data.teams)}
                    </DropdownButton>
                    </td>
                    <td> <Button> Add Team </Button> </td>

                </tr>;
        });


        let currentTeam = user ? user.currentTeam : null;
        let currentTeamId = currentTeam ? currentTeam.id : null;
        let currentTeamClass = currentTeam ? currentTeam.class : null;
        let currentTeamClassId = currentTeamClass ? currentTeamClass.id : -1;
        let currentWorkplan = currentTeamClass ? currentTeamClass.currentWorkplan : -1;
        let currentWorkplanId = currentWorkplan ? currentWorkplan.id : -1;
        let currentProblem =  currentTeam ? currentTeam.currentProblem : null;
        let selectedProblem = currentTeam ? currentTeam.selectedProblem : null;

        console.log("CUrrent user");
        console.log(user);

        return (

            <Row>
                {/*<div id="REFLECT_Heading">*/}
                {/*    <h1 align="center"> <NavLink to="/"> Home</NavLink></h1>*/}
                {/*</div>*/}

                <Col md={4}>
                    <table id="userDetailsTable">
                        <tr>
                            <td> User Name:</td>
                            <td>  {user.username}</td>
                        </tr>

                        <tr>
                            <td> Full Name:</td>
                            <td> {user.fullName}</td>
                        </tr>

                        <tr>
                            <td>Email: </td>
                            <td>{user.email}</td>
                        </tr>

                        <tr>
                            <td>Role: </td>
                            <td>{user.role}</td>
                        </tr>

                        <tr>
                            <td>Current Team's Class:</td>
                            <td>{currentTeamClass !== null ? currentTeamClass.name : ""}</td>
                        </tr>

                        <tr>
                            <td>Current Team Workplan:</td>
                            <td>{currentWorkplan ? currentWorkplan.name: ""}</td>
                        </tr>

                        <tr>
                            <td>Current Team: </td>
                            <td>{currentTeam !== null ? currentTeam.name : ""}</td>
                        </tr>

                        <tr>
                            <td>Current Problem: </td>
                            <td>{currentProblem !== null ? currentProblem.title : ""}</td>
                        </tr>

                        <tr>
                            <td>Selected Problem: </td>
                            <td>{selectedProblem !== null ? selectedProblem.title : ""}</td>
                        </tr>

                        <tr>
                            <td>Internal User ID:</td>
                            <td> {user.id}</td>
                        </tr>

                        <tr>
                            <td>Internal Team ID:</td>
                            <td>{user.currentTeamId}</td>
                        </tr>

                        <tr>
                            <td>Internal Curr. Class ID:</td>
                            <td>{currentTeamClass !== null ? currentTeamClass.id : ""}</td>
                        </tr>



                        <tr>
                            <td>Internal Curr. Class Workplan ID:</td>
                            <td>{currentWorkplan !== null ? currentWorkplan.id : ""}</td>
                        </tr>

                        <tr>
                            <td>Internal Curr. Problem ID: </td>
                            <td>{currentProblem !== null ? currentProblem.id : ""}</td>
                        </tr>

                        <tr>
                            <td>Selected Language:</td>
                            <td>{user !== null ? user.language : "undef"}</td>
                        </tr>

                        <tr>
                            <td>Status:</td>
                            <td>{JSON.stringify(user.status, null, 1)}</td>
                        </tr>

                        <tr>
                            <td> Reflect Version:</td>
                            <td>  {Version.version}</td>
                        </tr>
                        <tr>
                            <td> Build Date/Time:</td>
                            <td>  {Version.dateTime}</td>
                        </tr>


                    </table>
                </Col>



                <Col md={8}>
                    <Row><h1>{t("UserPage.MyAccount")}</h1></Row>

                    <div>
                        <Button onClick={this.props.logoutFunc}>Log Out</Button>
                    </div>

                    {/*<div>*/}
                    {/*    <Button onClick={console.log("RESET TODO")}>Reset Password</Button>*/}
                    {/*</div>*/}

                    <div id="userPageDiv">
                    {t("UserPage.Instructions.part1")}
                    <p />
                        <div style={{color:'darkslateblue'}}><b>{t("UserPage.Instructions.part1.1")}</b></div>
                        <div style={{color:'red'}}><b>{t("UserPage.Instructions.part2")}</b></div>
                        <p/>
                        <div style={{color:'blue'}}><b>{t("UserPage.Instructions.part3")}</b></div>
                    </div>
                    <div>
                        <h3>{t("UserPage.Teams")}</h3>



                        <div style={{display: 'flex',flexDirection: 'row', width: 300 }}>

                        <CurrentTeamDropdownSelectorWithData
                            userId={this.props.user.id}
                            currentTeamId={this.props.user.currentTeamId}
                            active={true}
                            style={{flex: 1}}
                        />
                        <NavLink to="/"
                            style={{flex: 1, alignSelf: 'flex-start'}}
                        > <Button>{t("UserPage.GoThere")}</Button></NavLink>

                        </div>



                   </div>

                    <div>
                        <h3>{t("UserPage.Language")}</h3>


                        <div style={{display: 'flex',flexDirection: 'row', width: 300 }}>

                            <Suspense fallback="loading">
                                <CurrentLanguageDropdownSelectorWithData
                                    user={this.props.user}
                                    active={true}
                                    style={{flex: 1}}
                                />
                            </Suspense>

                        </div>


                    </div>


                    {this.props.user.role == "ADMIN" ?

                        <div>


                            <h3>Admin Menu</h3>
                            <h4>Any Team Selection</h4>

                            <div style={{display: 'flex',flexDirection: 'row', width: 300 }}>
                            <CurrentTeamDropdownSelectorWithData
                                userId={this.props.user.id}
                                currentTeamId={this.props.user.currentTeamId}
                                queryAllTeams={true}
                                active={true}
                                style={{flex: 1}}
                            />
                            <NavLink to="/"
                                     style={{flex: 1, alignSelf: 'flex-start'}}
                            > <Button>Go There</Button></NavLink>

                            </div>
                            <h4>Batch Upload</h4>

                            <BatchUpload
                                userId={this.props.user.id}
                                active={true}
                                isAdmin={true}
                                isEditor={false}
                                instructions={locInstr.BatchUploads.Instructions}
                                // instructions={InstructionsData.BatchUploads.Instructions}
                            />
                        </div>: ""
                    }



                    {/*<div>*/}
                    {/*    <h3>My classes/ Projects</h3>*/}
                    {/*    <table id='classProjectsTable'>*/}
                    {/*        <tr>*/}
                    {/*            <th></th>*/}
                    {/*            <th></th>*/}
                    {/*            <th>Work plan</th>*/}
                    {/*        </tr>*/}
                    {/*        {classesAndProjects}*/}
                    {/*        <tr>*/}
                    {/*            <td> <ClassCreationModal /></td>*/}
                    {/*            <td></td>*/}
                    {/*            <td id="classCreationInstructions">*/}
                    {/*                When you create a class or project, you become the 'administrator' of it.*/}
                    {/*                    As an admin, you can:*/}
                    {/*                <ul>*/}
                    {/*                    <li>create teams by uploading a .csv file</li>*/}
                    {/*                    <li>See all entries of your teams.</li>*/}
                    {/*                </ul>*/}

                    {/*                If you want to become a member of a team that you are administrating, simply add your user information*/}
                    {/*                in the .csv file.*/}

                    {/*                As a user, you can create content on the team page like any other member.*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                </Col>
            </Row>
        );
    }


}



const UserPage = withTranslation()(UserPageIntermed)

UserPage.propTypes = UserPagePropTypes;


export default UserPage;
