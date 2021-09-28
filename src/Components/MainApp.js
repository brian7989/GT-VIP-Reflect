import React, { Component, Suspense } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import TeamMaterialsPage from './TeamMaterialsPage';

import PropTypes from "prop-types";

import _ from "lodash";

import ReactTextCollapse from 'react-text-collapse';
import { SymphysisProposalNavigator, SymphysisProposalComponentsFunctions } from "./SymphysisProposal";
import ReflectRoutes from "./ReflectRoutes";
import { StakeholderAnalysisNavigator, StakeholderAnalysisComponentsFunction } from "./StakeholderAnalysis";


import { Router, Route, withRouter, NavLink, Switch, Redirect } from "react-router-dom";

import qs from 'query-string';

import Configuration from "../DataComponents/Configuration";

import "../styles/PageFormatter.css";

import "../styles/Problem.css";


import {
    Bootstrap,
    Row,
    Col, DropdownButton, MenuItem
} from 'react-bootstrap';


import { withTranslation } from 'react-i18next';




import TeamDropdownSelectorWithData from "../DataComponents/TeamDropdownSelectorWithData";

import CurrentTeamDropdownSelectorWithData from "../DataComponents/CurrentTeamDropdownSelectorWithData";

import TeamHomeScreen from "./TeamHomeScreen";
import ProjectSummary from "./ProjectSummary";
import HowTo from "./HowTo";
import LandingPage from "./LandingPage";
import UserPage from "./UserPage";
import KnowledgeBasePanelWithData from "../DataComponents/KnowledgeBasepanelWithData";

import ProblemPanelWithData from "../DataComponents/ProblemPanelWithData";

import AuthorizeNewUserForm from "./AuthorizeNewUserForm";


import WorkplanCalendarWithData from "../DataComponents/WorkplanCalendarWithData";
import NavigationBar from "./NavigationBar"
import reflectLogo from "../images/reflectLogo.png"


import ResetUserForm from "./ResetUserForm"

import CurrentProblem from "./CurrentProblem";


import InstructionsData from "../DataComponents/InstructionsData";

import Parser from "html-react-parser";
import NewUser from "./NewUser";

import backgroundImage from "../images/AutumnLeaves_low_res.jpg"


const MainAppPropTypes = {
    logInSubmit: PropTypes.func.isRequired,
    getIsLoggedIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    installLoginStatusCallback: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object
}

const userButtons = (classObject) => {

    return <Row className={"mainHeader"}>

        <DropdownButton
            title='My Account'
            className={`user-button`}
        >
            <MenuItem eventKey="userPage">
                <NavLink to={ReflectRoutes.user.url}>User</NavLink>
            </MenuItem>

            <MenuItem eventKey="logoutButton" active onClick={() => {
                classObject.props.logOut();
            }}> Log Off

            </MenuItem>
        </DropdownButton>


    </Row>
}



// const topPageButtons = (classObject,  userButtonsDiv) => {
//
//     return <div id = "topNavigationsButtonsDiv">
//         {/*<TeamDropdownSelectorWithData onSelect={(e) => {classObject.selectTeam(e);}}*/}
//         {/*                              classId={classObject.props.user.currentClassId} active = {true}/>*/}
//
//
//         {/*TODO figure out how to render the team dropdown on the main page*/}
//         {/*{this.props.user ? <CurrentTeamDropdownSelectorWithData*/}
//         {/*    userId={this.props.user.id}*/}
//         {/*    currentTeamId={this.props.user.currentTeamId}*/}
//         {/*    active={true}*/}
//         {/*/> : <div></div>}*/}
//
//         {/*<div className='pull-left'>*/}
//            {/**/}
//         {/*</div>*/}
//
//         <NavigationBar></NavigationBar>
//
//     </div>
//
// }

const getKnowledgeBase = (userInfo, props) => {
    let knowledgeBase = userInfo && _.has(userInfo, 'currentTeam.currentProblem') ?
        <KnowledgeBasePanelWithData
            isLoading={true}
            title={userInfo.currentTeam.currentProblem.title}
            bibliographyUrl={userInfo.currentTeam.currentProblem.bibliographyUrl}
            // basePath="/knowledge_base"
            {...props}
        /> : <div>The knowledge base cannot be displayed</div>

    return knowledgeBase;
}


const getProblemPanel = (userInfo, props) => {

    let problemPanel = userInfo && userInfo.currentTeam && userInfo.currentTeam.class ?
        <ProblemPanelWithData
            instructionsData={InstructionsData}
            userInfo={userInfo}
            teamId={userInfo.currentTeam.id}
            classInfo={userInfo.currentTeam.class}
            active={true}
        //active={ this.state.activeTabName === "problem"}
        //basePath="/problem"
        /> : <div>No team and/or class assigned for you</div>
    return problemPanel;

}




const checkEnabledPath = (user, path) => {

    console.log("checkEnabledPath");
    console.log(user);

    if (!user)
        return false;

    let team = _.has(user, "currentTeam.name") ? user.currentTeam.name : "undefined_team";
    let problem = _.has(user, "currentTeam.currentProblem.title") ? user.currentTeam.currentProblem.title : "undefined_problem";

    let isEnabled = ("status" in user) && (!_.isNil(user.status)) && (team in user.status) && (problem in user.status[team]) ? user.status[team][problem][path] : false;

    return isEnabled;
}


const landingPageBody = (classObject, userButtonsDiv) => {

    //let userHasLoaded = classObject.props.user;

    let userHasLoaded = _.has(classObject, "props.user.currentTeam.currentProblem");

    if (!userHasLoaded) return <div>Missing user, current team, or current problem</div>;


    let visitedMissingExpertise = checkEnabledPath(classObject.props.user, ReflectRoutes.missing_expertise.url);
    let visitedResearchProposal = checkEnabledPath(classObject.props.user, ReflectRoutes.research_proposal.url);
    let visitedAnySpecialPath = visitedMissingExpertise || visitedResearchProposal;

    let specialNavigator = (userHasLoaded && (visitedAnySpecialPath)) ? <div>
        <div id="symphysisProposalAnalysisDiv" >
            <div id='symphysisProposalDivText'> Team Formation </div>
            <div id='symphysisProposalButtonsDiv'>

                {visitedMissingExpertise ?
                    <button className="symphysisProposalButtons">
                        <NavLink to={ReflectRoutes.missing_expertise.url}>Missing Expertise</NavLink>
                    </button>
                    : <div></div>
                }

                {visitedResearchProposal ?
                    <button className="symphysisProposalButtons">
                        <NavLink to={ReflectRoutes.research_proposal.url}>Research Proposal</NavLink>
                    </button>
                    : <div></div>
                }

            </div>
        </div>
    </div> : <div></div>;



    let visitedMyAnalysis = checkEnabledPath(classObject.props.user, ReflectRoutes.stakeholderAnalysis.myAnalysis.url);
    let visitedTeamAnalysis = checkEnabledPath(classObject.props.user, ReflectRoutes.stakeholderAnalysis.teamAnalysis.url);
    let visitedWeights = checkEnabledPath(classObject.props.user, ReflectRoutes.stakeholderAnalysis.weights.url);
    let visitedArgumentMap = checkEnabledPath(classObject.props.user, ReflectRoutes.stakeholderAnalysis.argumentMap.url);

    let visitedAnyStakeholderAnalysis = visitedMyAnalysis || visitedTeamAnalysis || visitedWeights;


    let stakeholderAnalsysisNavigator = (userHasLoaded && visitedAnyStakeholderAnalysis) ?
        <StakeholderAnalysisNavigator teamInfo={classObject.props.user.currentTeam}
            userInfo={classObject.props.user}
            classInfo={classObject.props.user.currentTeam.class}
            enableMyAnalysis={visitedMyAnalysis}
            enableTeamAnalysis={visitedTeamAnalysis}
            enableWeights={visitedWeights}
        />
        : <div></div>;


    let visitedProposalMap = checkEnabledPath(classObject.props.user, ReflectRoutes.symphysisProposal.proposalMap.url);
    let visitedProposalWeights = checkEnabledPath(classObject.props.user, ReflectRoutes.symphysisProposal.proposalWeights.url);
    let visitedAnySymphysisProposal = visitedProposalMap || visitedProposalWeights;

    let symphysisProposalNav = (userHasLoaded && visitedAnySymphysisProposal) ?
        <SymphysisProposalNavigator
            userInfo={classObject.props.user}
            teamInfo={classObject.props.user.currentTeam}
            enableProposalMap={visitedProposalMap}
            enableProposalWeights={visitedProposalWeights}
        />
        : <div></div>


    // if(classObject.props.user.currentClass.currentWorkplan.id == 25)
    // {
    //     stakeholderAnalsysisNavigator = <div></div>;
    //     symphysisProposalNav = <div></div>;
    // }
    // else {
    //     specialNavigator = <div></div>;
    // }



    let selectedTeamInfo = (classObject.state.selectedTeam === null) ? classObject.props.user.currentTeam : classObject.state.selectedTeam.team;
    let title = (selectedTeamInfo.currentProblem === null) ? "You do not currently have a team problem" : selectedTeamInfo.currentProblem.title;
    let description = (selectedTeamInfo.currentProblem === null) ? "" : selectedTeamInfo.currentProblem.description;

    let selectedProblem = (selectedTeamInfo && selectedTeamInfo.selectedProblem) ? selectedTeamInfo.selectedProblem : (selectedTeamInfo && selectedTeamInfo.currentProblem) ? selectedTeamInfo.currentProblem : null;

    //let topPageButtonsDiv = topPageButtons(classObject, userButtonsDiv);

    //dynamic rendering of components
    let shouldRenderTeamAnalysis = classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.teamAnalysis.url);

    let shouldRenderIndividualAnalysis = classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.individualAnalyses.url);

    let shouldRenderStakeholderWeights = classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.weights.url);

    let shouldRendermyAnalysis = classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.myAnalysis.url);

    let shouldRenderInterestMap = classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.interestMap.url);

    let shouldRenderArgumentMap = classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.argumentMap.url);

    const symphysisRoutes = ReflectRoutes.symphysisProposal;
    //let shouldRenderInterestMap =  classObject.props.location.pathname.includes(symphysisRoutes.interests.url);

    let shouldRenderProposalDevelopment = classObject.props.location.pathname.includes(symphysisRoutes.symphysisproposal.url);

    let shouldRenderProposalWeights = classObject.props.location.pathname.includes(symphysisRoutes.proposalWeights.url);

    let shouldRenderSymphysisProposal = classObject.props.location.pathname.includes(symphysisRoutes.proposalMap.url);

    let shouldRenderJustifications = classObject.props.location.pathname.includes(symphysisRoutes.justifications.url);

    let shouldRenderStakeholdersMap = classObject.props.location.pathname.includes(symphysisRoutes.stakeholders.url);
    let shouldRenderProjectSummary = classObject.props.location.pathname.includes(ReflectRoutes.projectSummary.summary.url);


    let shouldRenderProblemFormulation = classObject.props.location.pathname.includes(ReflectRoutes.problemStatement.problemPanel.url);

    let shouldRenderUserPage = classObject.props.location.pathname.includes(ReflectRoutes.user.url);

    let shouldRenderTeamInfo = classObject.props.location.pathname.includes(ReflectRoutes.teamInfo.url);

    let shouldRenderHowTo = classObject.props.location.pathname.includes(ReflectRoutes.howTo.url);

    let shouldRenderNewUser = classObject.props.location.pathname.includes(ReflectRoutes.newuser.url);

    let shouldRenderTeamMaterialsPage = classObject.props.location.pathname.includes(ReflectRoutes.teamMaterialsPage.teamMaterials.url);

    let shouldRenderMissingExpertise = classObject.props.location.pathname.includes(ReflectRoutes.missing_expertise.url);

    let shouldRenderResearchProposal = classObject.props.location.pathname.includes(ReflectRoutes.research_proposal.url);

    //<Route path ={ReflectRoutes.problemStatement.problemPanel.url} render ={(props) => getProblemPanel(classObject.props.user, props)}/>

    let componentToRender = null;

    if (shouldRenderInterestMap) {
        //componentToRender = SymphysisProposalComponentsFunctions(classObject).interests;
        componentToRender = StakeholderAnalysisComponentsFunction(classObject).interestsMap;
    } else if (shouldRenderTeamMaterialsPage) {
        componentToRender = <Route path={ReflectRoutes.teamMaterialsPage.teamMaterials.url} exact render={(props) => <TeamMaterialsPage teamInfo={selectedTeamInfo}
            userId={classObject.props.user.id}
            currentClassId={classObject.props.user.currentTeam.class.id}
            active={true}
            readonly={false} {...props} />} />
    } else if (shouldRenderProposalDevelopment) {
        componentToRender = SymphysisProposalComponentsFunctions(classObject).proposalMap;
    } else if (shouldRenderProposalWeights) {
        componentToRender = SymphysisProposalComponentsFunctions(classObject).weights;
    } else if (shouldRenderStakeholdersMap) {
        componentToRender = SymphysisProposalComponentsFunctions(classObject).stakolders;
    } else if (shouldRenderSymphysisProposal) {
        componentToRender = SymphysisProposalComponentsFunctions(classObject).symphysisProposal;
    } else if (shouldRenderJustifications) {
        componentToRender = SymphysisProposalComponentsFunctions(classObject).justifications;
    } else if (shouldRenderMissingExpertise) {
        componentToRender = SymphysisProposalComponentsFunctions(classObject).missingExpertise;
    } else if (shouldRenderResearchProposal) {
        componentToRender = SymphysisProposalComponentsFunctions(classObject).researchProposal;
    } else if (shouldRenderTeamAnalysis) {
        componentToRender = StakeholderAnalysisComponentsFunction(classObject).teamAnalysis;
    } else if (shouldRenderIndividualAnalysis) {
        componentToRender = StakeholderAnalysisComponentsFunction(classObject).individualAnalysis;
    } else if (shouldRenderStakeholderWeights) {
        componentToRender = StakeholderAnalysisComponentsFunction(classObject).weights;
    } else if (shouldRendermyAnalysis) {
        componentToRender = StakeholderAnalysisComponentsFunction(classObject).myAnalysis;
    } else if (shouldRenderArgumentMap) {
        componentToRender = StakeholderAnalysisComponentsFunction(classObject).argumentMap;
    } else if (shouldRenderProjectSummary) {
        componentToRender = StakeholderAnalysisComponentsFunction(classObject).projectSummary;
    } else if (shouldRenderProblemFormulation) {
        componentToRender =
            <Route path={ReflectRoutes.problemStatement.problemPanel.url}
                render={(props) => getProblemPanel(classObject.props.user, props)} />;
    } else if (shouldRenderUserPage) {
        componentToRender =
            <Route path={ReflectRoutes.user.url} render={(props) => <UserPage user={classObject.props.user} logoutFunc={classObject.props.logOut} />} />
    } else if (shouldRenderTeamInfo) {
        componentToRender =
            <Route path={ReflectRoutes.teamInfo.url} exact render={(props) => <TeamHomeScreen teamInfo={selectedTeamInfo}
                userId={classObject.props.user.id}
                currentClassId={classObject.props.user.currentTeam.class.id}
                active={true}
                readonly={false} {...props} />} />
    } else if (shouldRenderHowTo) {
        componentToRender =
            <Route path={ReflectRoutes.howTo.url} render={(props) => <HowTo />} />
    } else if (shouldRenderNewUser) {
        componentToRender = <Route path={ReflectRoutes.newuser.url} render={(props) => <NewUser />} />
    }

    if (componentToRender != null) {
        return <div id="singlePageComponent">
            {userButtonsDiv}
            <NavigationBar
                isLoading={true}
                title={!_.has(classObject, "props.user.currentTeam.currentProblem.title") ?
                    "inavlid team or problem" :
                    classObject.props.user.currentTeam.currentProblem.title}
                bibliographyUrl={
                    !_.has(classObject, "props.user.currentTeam.currentProblem.bibliographyUrl") ?
                        "inavlid team or problem" :
                        classObject.props.user.currentTeam.currentProblem.bibliographyUrl} />
            <div id="container">
                {componentToRender}
            </div>
        </div>

    } else {

        return <div id="landingPage">
            {userButtonsDiv}

            <NavigationBar
                isLoading={true}
                title={
                    !_.has(classObject, "props.user.currentTeam.currentProblem.title") ?
                        "inavlid team or problem" :
                        classObject.props.user.currentTeam.currentProblem.title}
                bibliographyUrl={
                    !_.has(classObject, "props.user.currentTeam.currentProblem.bibliographyUrl") ?
                        "inavlid team or problem" :
                        classObject.props.user.currentTeam.currentProblem.bibliographyUrl} />
            <img id="bg" src={backgroundImage} />
            <div id="container">
                <div id="workplanCalendar">
                    <h2 >Work plan</h2>
                    {
                        !_.has(classObject, "props.user.currentTeam.class.currentWorkplan.id") ?
                            <div>Invalid user, current team, or currentWorkplan</div> :
                            <WorkplanCalendarWithData user={classObject.props.user}
                                workplanId={classObject.props.user.currentTeam.class.currentWorkplan.id}
                                showWorkplanTitle={false}
                                displayDueDate={true} active={true} />
                    }
                </div>

                <div id="landingPageBody">
                    <div id="Problem">


                        {
                            !_.has(classObject, "props.user") ?
                                <div>Invalid user</div> :
                                <CurrentProblem
                                    heading={<h4>Problem</h4>}
                                    problem={

                                        selectedProblem
                                    }
                                    showSelectProblemButton={checkEnabledPath(classObject.props.user, ReflectRoutes.problemStatement.problemPanel.url)}
                                />

                        }

                    </div> : <div></div>



                    <div>
                        {specialNavigator}
                    </div>

                    <div>
                        {stakeholderAnalsysisNavigator}
                    </div>

                    <div>
                        {symphysisProposalNav}
                    </div>

                    {/*<div id ="mainPageBody">*/}


                    {/*<Route path ={ReflectRoutes.homeRoute.home.url} exact render ={(props) => <TeamHomeScreen teamInfo = {selectedTeamInfo}*/}
                    {/*currentClassId = {classObject.props.user.currentClassId}*/}
                    {/*active = {true}*/}
                    {/*readonly = {false} {...props}/>} />*/}


                    {/*<Route path ={ReflectRoutes.knowledgeBase.url} render ={(props) => getKnowledgeBase(classObject.props.user, props)}/>*/}

                    {/*</div>*/}
                </div>
            </div>

        </div>
    }

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

class MainAppIntermed extends Component {

    constructor(props) {

        super(props);

        this.state = {
            showLogInModal: false,
            showLogInError: false,
            userInfo: null,
            userInfoObj: null,
            activeTabName: "",
            selectedMyProposalInfo: null,
            selectedTeam: null,
            doRegistration: false,
            registrationUser: null,
            registrationAuthorization: null,
            registrationErrorMesg: null,
            registrationEmail: null,
            delme_test: "/",
            toRender: null,
            goToUserPage: false,
        };

        this.userTab = null;
    }


    componentWillMount() {

        let isLoggedIn = (this.props.getIsLoggedIn());

        let showModal = !isLoggedIn;

        this.setState({ showLogInModal: showModal });

        if (this.props.installLoginStatusCallback)
            this.props.installLoginStatusCallback(this.setIsLoggedIn.bind(this));

    }



    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    //     if(this.state.goToUserPage)
    //         this.setState( {gotToUserPage: false});
    //
    // }


    setIsLoggedIn(isLoggedIn, logInError) {

        console.log("setIsLoggedIn():" + isLoggedIn + " " + logInError);

        this.setState({
            showLogInModal: !isLoggedIn,
            showLogInError: logInError,
            userInfo: isLoggedIn ? this.state.userInfo : null,
            goToUserPage: isLoggedIn,
        });
    }


    setIncomingUserInfo(userInfo) {

        console.log("setIncomingUserInfo");
        console.log(userInfo);

        this.setState({
            userInfo: userInfo,
        });

        if (userInfo === null) {

            this.setIsLoggedIn(false, false);
        }


    }

    selectProposal(proposalInfo) {

        this.setState({ selectedMyProposalInfo: proposalInfo, activeTabName: "my_proposals" });
    }

    selectStakeholder(s) {

        this.setState({ selectedMyProposalInfo: s });
    }


    selectTeam(info) {

        this.setState({ selectedTeam: info });
    }


    forgotPasswordSubmit(username, submitCompleteFunc) {
        console.log("forgotPasswordSubmit: username: " + username + " submitCompleteFunc: " + submitCompleteFunc);


        if (!username) {
            console.log("email not set");

            return;
        }

        const url = !process.env.NODE_ENV || process.env.NODE_ENV === "production" ? Configuration.prodUrl : Configuration.devUrl;


        //var formData  = new FormData();

        //formData.append("newusers", this.state.myFile);


        fetch(url + "api/users/" + username + "/passwordreset", {
            method: 'post',

            //body: formData,
        }).then(res => {

            console.log("the first then");

            let txt = res.text()

            //console.log("TXT: ")
            //console.log(txt);

            return txt;//res.json();

        })
            .then(
                (resText) => {
                    console.log("(reset pwd) FETCH RESULT as text: ");
                    console.log(resText);

                    const successMesg = "Success!! Check your email for the reset link. You can close this window now.";

                    if (resText === "Created") {
                        console.log("(reset pwd) CREATED");
                        submitCompleteFunc(true, successMesg);
                        return;
                    }

                    try {
                        let result = JSON.parse(resText);

                        console.log("(reset pwd) FETCH RESULT as json: ");
                        console.log(result);

                        //this.setState({isLoaded: true, items: result.items});

                        if (result.success) {

                            //this.setState({message: "SUCCESS!"});
                            console.log("(reset pwd) SUCCESS");
                            submitCompleteFunc(true, successMesg);
                        } else {

                            console.log("(reset pwd) FAIL");
                            submitCompleteFunc(false, result.error.name + "::" + result.error.message);

                            // if(result.error && result.error.message)
                            //     this.setState({message: result.error.message});
                            // else
                            //     this.setState({message: "unknown error"});

                        }
                    }
                    catch (err) {
                        console.log("(reset pwd) - probably json err");
                        console.log(err);
                        submitCompleteFunc(false, "Unknown error.");

                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log("(reset pwd) ERROR: " + error);
                    submitCompleteFunc(false, "Web service error!");
                    //this.setState({isLoaded: true, error});

                    //this.setState({registrationErrorMesg: "unknown error"});
                }
            );

    }



    render() {




        //This shouldn't be here (language setting)
        console.log("******Language INit**********");
        console.log("**********************");
        console.log("**********************");
        const languages = Configuration.languages;
        let foundLanguage = null;
        let targetLanguage = _.has(this.props.user, "language") ? this.props.user.language : "Default";
        if (languages) {
            foundLanguage = _.find(languages, (d) => {
                return d === targetLanguage;
            });
        }

        console.log("found Language");
        console.log(foundLanguage);
        console.log(this.props.user);
        if (foundLanguage && foundLanguage != this.props.i18n.language) {
            this.props.i18n.changeLanguage(foundLanguage, (err, t) => {
                if (err) return console.log('something went wrong loading new language', err);
            });

        }


        if (this.props.location.pathname.includes('/resetpassword')) {
            let key = qs.parse(this.props.location.search).authorization;
            let regUser = qs.parse(this.props.location.search).username;
            let regEmail = qs.parse(this.props.location.search).email;

            console.log("key: " + key);
            console.log("user: " + regUser);
            console.log("email: " + regEmail);

            return <ResetUserForm
                registrationUser={regUser}
                registrationAuthorization={key}

            />
        }

        if (this.props.location.pathname.includes('/register')) {
            let key = qs.parse(this.props.location.search).authorization;
            let regUser = qs.parse(this.props.location.search).username;
            let regEmail = qs.parse(this.props.location.search).email;

            console.log("key: " + key);
            console.log("user: " + regUser);
            console.log("email: " + regEmail);

            return <AuthorizeNewUserForm
                registrationUser={regUser}
                registrationAuthorization={key}

            />
        }

        if (this.props.location.pathname.includes(ReflectRoutes.registration.url)) {

            return <LandingPage message="" doRegister={true} logInSubmit={this.props.logInSubmit} forgotPasswordSubmit={this.forgotPasswordSubmit} renderWorkPlans={true} />;
        }


        let isloggedIn = this.props.getIsLoggedIn();


        if (isloggedIn && this.state.goToUserPage && !this.props.location.pathname.includes(ReflectRoutes.user.url)) {
            return <Redirect to={ReflectRoutes.user.url} />
        }


        //TODO This is a real fragile way to handle the logged out status, but we need to redirect folks that logout to
        // a valid screen
        if (!isloggedIn && !((this.props.location.pathname == "/") || this.props.location.pathname.includes(ReflectRoutes.workplanComponent.landingPageWorkplan.url)
            || this.props.location.pathname.includes(ReflectRoutes.newuser.url)
        )) {

            console.log("Redirecting to root");
            return <Redirect to={'/'} />
        }

        if (this.props.location.pathname.includes(ReflectRoutes.newuser.url)) {
            return <NewUser />
        }

        if ((!(isloggedIn) || (this.props.user == null)) && !this.props.location.pathname.includes(ReflectRoutes.newuser.url)) {


            // const loginPromise = (username, password) => {return new Promise((resolve, reject) => {
            //     console.log("In promise");
            //
            //     let ret = this.props.logInSubmit(username, password);
            //     resolve(ret);
            // }).then(() => {
            //     console.log("in promise then!");
            //     //this.props.history.push('/user');
            // });};

            //show the landing page
            //return <LandingPage message=""  logInSubmit={() => {promise.then(() => {return this.props.history.push('/user');});}} renderWorkPlans={true}/>;

            //let shouldRenderRegisterPage = this.props.location.pathname.includes(ReflectRoutes.register.url);

            return <LandingPage message="" doRegister={false} logInSubmit={this.props.logInSubmit} forgotPasswordSubmit={this.forgotPasswordSubmit} renderWorkPlans={true} />;
        }

        let userButtonsDiv = userButtons(this);
        //if this is a new user
        if (isloggedIn && (this.props.user != null) && (this.props.user.currentTeam == null || this.props.user.currentTeam.class == null)) {
            return <div>
                {userButtonsDiv}
                <Suspense fallback="loading">
                    <UserPage user={this.props.user} logoutFunc={this.props.logOut} />
                </Suspense>
            </div>
        }


        let hasWorkplanName = this.props.user && this.props.user.currentTeam && this.props.user.currentTeam.class && this.props.user.currentTeam.class.currentWorkplan;
        let shouldDisplayWorkplanName = hasWorkplanName && this.props.location.pathname === ReflectRoutes.homeRoute.home.url;

        let workplanTitle = (shouldDisplayWorkplanName) ? <h2>{this.props.user.currentTeam.class.currentWorkplan.name}</h2> : <div></div>


        console.log("Returning landingPageBody");

        return (
            <Row>
                <Switch>
                    {/*<Route path = {ReflectRoutes.user.url} render ={(props) => <UserPage user ={this.props.user}/>}/>*/}
                    <Route path={ReflectRoutes.homeRoute.home.url} render={(props) => landingPageBody(this, userButtonsDiv)} />
                </Switch>

            </Row>

        );
    }

}


MainAppIntermed.propTypes = MainAppPropTypes;
const MainApp = withRouter(withTranslation()(MainAppIntermed));

export default MainApp;

