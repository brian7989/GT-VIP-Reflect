import React, { Component } from 'react';
import {BrowserRouter, Route, NavLink, Switch} from "react-router-dom";

import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import {Bootstrap} from 'react-bootstrap';
import {  withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const HiddenRouteReporterProps = {

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onRouteChange: PropTypes.func.isRequired,

}

/**
 * A component that's triggered when a route-change event occurs
 */
class HiddenRouteReporterIntermed extends Component {


    constructor(props) {

        super(props);

        if(this.props.onRouteChange && this.props.location)
            this.props.onRouteChange(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            if(this.props.onRouteChange && this.props.location)
                this.props.onRouteChange(nextProps.location.pathname);
        }
    }

    render() {

        return (
            <div></div>
        );

    }

}


HiddenRouteReporterIntermed.propTypes = HiddenRouteReporterProps;

const HiddenRouteReporter = withRouter(HiddenRouteReporterIntermed);


//returns false  if the function passed isn't executed
// const hiddenRouterDefinition = (functionToExecute) => {
//     return <HiddenRouteReporter onRouteChange={ () => {
//         console.log(functionToExecute);
//        // alert("Route changed occured!!");
//         if (functionToExecute != undefined) {
//             return functionToExecute(); //execute this function using additional the event change and additional parameters
//
//         } else {
//             return false;
//         }

//     }} />
// }


// we need this object to track states acrosss all the different components.
//this enables us to only fetch data for one component at a time.
//State should never be modifiable elsewhere besides in the component below.
const global_active_state_tracker = {state: null}


const ComposedRouteChangeManagerIntermed = (ComponentToRender, routesData) => {

    class ReflectAppHiddenRouter extends React.Component {

        constructor(props) {

            super(props);
            this.state = {};
        }

        static getDerivedStateFromProps(nextProps, prevState) {

            if (nextProps.location == prevState.location) {
                return null
            }
            return {pathname: nextProps.location.pathname};

        }

        shouldComponentUpdate(nextProps, nextState){
            return nextState.pathname != this.state.pathname
        }


        componentDidUpdate(prevProps, prevState){
            console.log("previous location = " + JSON.stringify(prevProps.location));
            console.log("current location = " + JSON.stringify(this.state.pathname));
            console.log("current location = " + JSON.stringify(this.props.location));
            this.setStatesOnRouteChange(this.props.location);
        }



        setStatesOnRouteChange(location) {
            //find the index in the routesData that matches the current location route
            let currentRoute = location.pathname;

            if (currentRoute in routesData) {
                let stateKeys  = routesData[currentRoute];
                global_active_state_tracker.state = stateKeys;
                this.setState({activeComponentState: global_active_state_tracker.state });
            }
        }

        render() {

            // here you can pass down whatever you want 'inherited' by the component
            console.log("About to render component: ");
            console.log(Component);
            console.log(this.state);
            console.log(global_active_state_tracker);
            return (<ComponentToRender {...this.props} {...this.state}/>)
        }

    }


    ReflectAppHiddenRouter.displayName = `ReflectAppHiddenRouter(${getDisplayName(ReflectAppHiddenRouter)})`;
    return ReflectAppHiddenRouter;
}

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


//const  ComposedRouteChangeManager  = withRouter(ComposedRouteChangeManagerIntermed);
const  ComposedRouteChangeManager  = ComposedRouteChangeManagerIntermed;


export {HiddenRouteReporter, ComposedRouteChangeManager, getDisplayName } ;

