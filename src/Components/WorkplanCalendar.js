import _ from "lodash";
import PropTypes from 'prop-types';
import React, { Component } from "react";
import "../styles/Workplan.css";
import WorkplanPanel from "./WorkplanPanels";



const WorkplanCalendarPropTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func.isRequired,
   // updateTeam: PropTypes.func.isRequired,
}



const parseDate = (dateObject) => {
    // assumes date object is of this format.
    if (dateObject == null) return {month: "No Month", year: "No Year", day: "No day"}
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return {month: months[dateObject.getMonth()], year: dateObject.getYear() + 1900, day: dateObject.getDay()}
}


const getTimeOrZero = (date) => {
    return (date) ? date.getTime() : 0 ;
}


const sortByDueDate = (array) => {
    return array.sort( (date1, date2) => {
        return getTimeOrZero(date1.dueDate) - getTimeOrZero(date2.dueDate);
    });
}


const parseData = (data) => {
    let dataObject =  [];
    let hasWorkplanPhases = _.has(data, "phasesByWorkplanId.nodes")
    let phases =  [];
    if (hasWorkplanPhases) {
        phases = data.phasesByWorkplanId.nodes;
    }

    phases.map( (workplanPhases) => {
        let phasesDueDate = (workplanPhases.dueDate) ? new Date(workplanPhases.dueDate): null;
        let phasesDueDateType = workplanPhases.dueDateType;
        let object = {dueDate: phasesDueDate, dueDateType: phasesDueDateType, title: workplanPhases.name, modules: []};
        let hasworkplanModules = _.has(workplanPhases, "modulesByPhaseId.nodes");
        let workplanModules = [];
        if (hasworkplanModules) {
            workplanModules = workplanPhases.modulesByPhaseId.nodes;
        }

        workplanModules.map( (modules) => {

            console.log("MODULE");
            console.log(modules);

            let moduleDueDate = (modules.dueDate) ? new Date(modules.dueDate): null;
            let moduleDueDateType = modules.dueDateType;
            let hasModuleSteps = _.has(modules, "moduleStepsByModuleId.nodes");
            let moduleName = modules.name;
            let hide = modules.hide;
            let steps = [];
            let stepsData = [];
            if (hasModuleSteps) {
                stepsData = modules.moduleStepsByModuleId.nodes;
                stepsData.map((eachStep) => {

                    // if(eachStep.dueDate) {
                    //     console.log("ERMAGAD: step has a duedate!");
                    //     console.log(eachStep);
                    // }

                    let stepsDueDate = (eachStep.dueDate) ? new Date(eachStep.dueDate): null;

                    // if(eachStep.dueDate) {
                    //     console.log("this should be a good date");
                    //     console.log(stepsDueDate);
                    // }

                    let stepsDueDateType = eachStep.dueDateType;
                    let stepDescription = eachStep.description;

                    let moduleScale = eachStep.moduleScale;

                    steps.push({dueDate: stepsDueDate, dueDateType: stepsDueDateType, title: eachStep.name, content: stepDescription, moduleScale: moduleScale});
                });
            }
            object.modules.push({title: moduleName, dueDate: moduleDueDate, dueDateType: moduleDueDateType, moduleSteps: steps, hide: hide});

        });

        dataObject.push(object);

    });

    return dataObject;
    // let sortedObject = sortByDueDate(dataObject);
    // return sortedObject;
}


class WorkplanCalendar extends Component {

    constructor(props) {
        super(props);
        this.date = this.props.date;
    }

    render() {
        let phases = <div>Workplan not rendered</div>;
        let workplanPhases = parseData(this.props.workplan);
        let trackSortedObject = [];

        let userid = this.props.user ? this.props.user.id : -1;
        let currentTeam = this.props.user && this.props.user.currentTeam ? this.props.user.currentTeam.name : "undefined_team";
        let currentProblem = this.props.user  && this.props.user.currentTeam && this.props.user.currentTeam.currentProblem ? this.props.user.currentTeam.currentProblem.title : "undefined_problem";
        let userStatus = this.props.user && this.props.user.status ? _.cloneDeep( this.props.user.status) : {};


        // console.log("userid: " + userid);
        // console.log("currentTeam: " + currentTeam);
        // console.log("currentProblem: " + currentProblem);
        // console.log("userStatus: " + JSON.stringify(userStatus));

        let customUpdateUser = (key) => {
            if(!(currentTeam in userStatus))
                userStatus[currentTeam] = {};

            if(!(currentProblem in userStatus[currentTeam]))
                userStatus[currentTeam][currentProblem] = {}

            userStatus[currentTeam][currentProblem][key] = true;

            return this.props.updateUser(userid, {status: userStatus});
        };

        let length = workplanPhases.length;
        if ( length > 0) {
            phases =  workplanPhases.map( (moduleData, index) => {
                let dateInfo = parseDate(moduleData.dueDate)
                if (trackSortedObject.includes(dateInfo.month))
                    return <WorkplanPanel key={(index + 1)*10} title={moduleData.title} dueDate={moduleData.dueDate} dueDateType={moduleData.dueDateType} modules={moduleData.modules}

                                          displayDueDate={this.props.displayDueDate} isLastPanel={length == index + 1 } updateUser={customUpdateUser}/>
                else
                    trackSortedObject.push(dateInfo.month)
                    return  <WorkplanPanel key={index + 3} title={moduleData.title} displayDueDate={this.props.displayDueDate}
                                           dueDate={moduleData.dueDate} dueDateType={moduleData.dueDateType} modules={moduleData.modules} isLastPanel={length == index + 1 } updateUser={customUpdateUser}/>

            });
        }

        let title = "";
        if (this.props.showWorkplanTitle) {
            title = <h4>{this.props.workplan.name}</h4>;
        }


        return (
            <div>
                {title}
                {phases}
            </div>
        );
    }
}


WorkplanCalendar.propTypes = WorkplanCalendarPropTypes;

export default WorkplanCalendar;
