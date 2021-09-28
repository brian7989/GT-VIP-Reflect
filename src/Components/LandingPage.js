

import React, { Component } from 'react';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



import PropTypes from 'prop-types';


import {Bootstrap, Row, Col, Modal, Button} from 'react-bootstrap';
import LogInForm from "./LogInForm";
import RegisterNewUserForm from "./RegisterNewUserForm"
import {WorkplansTableForLandingPageWithData} from "../DataComponents/WorkplansTableWithData"
import WorkplanTableWithData from "../DataComponents/WorkplanTableWithData";
import {HiddenRouteReporter} from "./HiddenRouteReporter";
import UserPage from "./UserPage";
import {Route, Switch, withRouter} from "react-router-dom";
import ReflectRoutes from "./ReflectRoutes";
import WorkplanCalendarWithData from "../DataComponents/WorkplanCalendarWithData";
import ForgotPasswordForm from "./ForgotPasswordForm";



const loginForm = (showLoginModal, submitLoginFunction, closeFunc, onCloseFunctionFromCaller, message) => {
    //console.log("Yup the function was called");
    let modal_div =
        <Modal show={showLoginModal} onHide={() => {
            //onCloseFunctionFromCaller(true, "");
            closeFunc();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Please Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LogInForm submit={ (username, password) => submitLoginFunction(username, password) }
                       errorMesg={message}
                />
            </Modal.Body>

        </Modal>;
    return modal_div;
}


//forgotForm(this.state.showForgotPassword, this.props.forgotPasswordSubmit, this.closeModals, this.updateModal, this.props.message);
const forgotForm = (showModal, submitFunction, closeFunc, onCloseFunctionFromCaller, message) => {
    //console.log("Yup the function was called");
    let modal_div =
        <Modal show={showModal} onHide={() => {
            //onCloseFunctionFromCaller(true, "");
            closeFunc();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Please Enter User Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ForgotPasswordForm submit={ (email) => submitFunction(email, onCloseFunctionFromCaller) }
                           errorMesg={message}
                />
            </Modal.Body>

        </Modal>;
    return modal_div;
}



const registerForm = (showRegistrationModal, submitRegistrationFunction, closeFunc, onCloseFunctionFromCaller) => {
    let modal_div =
        <Modal show={showRegistrationModal} onHide={() => {
            //onCloseFunctionFromCaller(true, "");
            closeFunc();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Please Sign up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegisterNewUserForm submit={ (username, password) => submitRegistrationFunction(username, password) }/>
            </Modal.Body>

        </Modal>;
    return modal_div;
}




const LandingPageProptypes = {

    //errorMesg: PropTypes.string,
    doRegister: PropTypes.bool,
}

class LandingPageIntermed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            showForgotPassword: false,
            showRegistrationForm: this.props.doRegister,
            selectedWorkPlanId: null,
            selectedWorkPlanTitle: null,
            errorMesg: ""
        };

        this.closeModals = this.closeModals.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.updateModal = this.updateModal.bind(this);
    }

    handleLogin(event) {
        this.setState({showLogin: true});
        event.preventDefault();
    }

    handleForgotPassword(event) {
        this.setState({showForgotPassword: true});
        event.preventDefault();
    }


    handleRegistration(event) {
        this.setState({showRegistrationForm: true});
        event.preventDefault();
    }

    closeModals() {


        //close the references modal and the context menu
        this.setState({showLogin: false, showForgotPassword: false, showRegistrationForm: false});
    }


    updateModal(success, mesg) {
        console.log("updateModal: success: " + success + " mesg: " + mesg);
        this.setState({errorMesg: mesg});
    }


    displayWorkplanDetails =  () =>  {
        const  numberPattern = /\d+/g;
        const workplanIdList = this.props.location.pathname.match(numberPattern);
        const workplanId = (workplanIdList != null && workplanIdList.length > 0) ? workplanIdList[0] : null;

        if( workplanId != null) {
            return <Row>
                <Row>
                    <Col md={1} > </Col>
                    <Col md={1} > <button onClick={this.renderHome}> Home</button> </Col>
                    <Col md={7} >  </Col>
                    <Col md={3}>
                        <button onClick={this.handleRegistration}> Signup </button>
                        <button onClick={this.handleLogin}> Login </button>
                    </Col>
                </Row>

                <Row>
                    <Col md={1} > </Col>
                    <Col md={5} >
                        <WorkplanCalendarWithData workplanId={parseInt(workplanId)}
                                                  showWorkplanTitle={true}
                                                  active={workplanId != null} displayDueDate={false}/>
                        {/*<WorkplanTableWithData workplanId={parseInt(workplanId)} active={workplanId != null} />*/}
                    </Col>
                    <Col md={5} > </Col>
                    <Col md={1} > </Col>
                </Row>

            </Row>
        }
        return <Row>

            <Row>
                <Col md={3} >  </Col>
                <Col md={5} > <h1>The Reflect! Platform</h1>  </Col>

                <Col md={4}>
                    {/*<button onClick={this.handleRegistration} id="newUserButton" className="button">*/}
                    {/*    Registration (Only for new instructors or project*/}
                    {/*    managers. Team members and students get an invitation)*/}
                    {/*</button>*/}
                    <Button onClick={this.handleLogin}> Login </Button>
                    <Button onClick={this.handleForgotPassword}>Forgot Password</Button>
                </Col>
            </Row>


            {/*<Row>*/}
                {/*<Col md={1} >*/}

                {/*</Col>*/}
                {/*<Col md={5} >*/}
                    {/*<h3>Introductory Video</h3>*/}
                {/*</Col>*/}
                {/*<Col md={6} >*/}
                    {/*<h4> Check out published projects</h4>*/}
                {/*</Col>*/}
            {/*</Row>*/}
            <Row>
                <Col md={1} ></Col>
                <Col md={9} >
                    <h3 className='pull-left'>WorkPlans</h3>
                </Col>

            </Row>
            <Row>
                <Col md={1} ></Col>
                <Col md={9} >
                    <div id='landingPageWorkplanInstruction'>
                        <p>A workplan structures the work in a class or a project. Each class or a project can have several teams.
                        While each team can work on its own problem, the work of all teams in a class or project is synchronized by the work plan.</p>

                        <p>Check out currently available workplans below. When you create a class or a project, you have to select one of these workplans.
                        After you select a workplan, you can select 'modules' that are available in this particular workplan and enter duedates for
                            deliverables and dates at which certain things should be done.</p>

                        <p>It is also possible to create your own work plans and modules and make them available for others to use.</p>
                    </div>

                    <WorkplansTableForLandingPageWithData  active={this.props.renderWorkPlans}/>
                </Col>


                {/*<Col md={2} >*/}
                    {/*<h3>Information for Instructors</h3>*/}
                    {/*<p>Wicked Problems. Click below for details</p>*/}
                {/*</Col>*/}
            </Row>

        </Row>;
    }


    renderHome() {
        window.location.href = "/";
    }


    render() {

        let login = "";
        let register = "";
        if (this.state.showLogin) {
            //const loginForm = (showLoginModal, submitLoginFunction, closeFunc, onCloseFunctionFromCaller, message) => {
            login =  loginForm(this.state.showLogin, this.props.logInSubmit, this.closeModals, this.updateModal, this.state.errorMesg);
        }

        if (this.state.showForgotPassword) {
            login =  forgotForm(this.state.showForgotPassword, this.props.forgotPasswordSubmit, this.closeModals, this.updateModal, this.state.errorMesg);
        }

        if (this.state.showRegistrationForm) {
            register = registerForm(this.state.showRegistrationForm, this.props.logInSubmit, this.closeModals);
        }


        return (

            <div>
                {!this.state.showLogin ? this.displayWorkplanDetails() : ''}
                {login}
                {register}
            </div>
        );

    }

}

LandingPageIntermed.propTypes = LandingPageProptypes;

const LandingPage = withRouter(LandingPageIntermed);

export default LandingPage;

