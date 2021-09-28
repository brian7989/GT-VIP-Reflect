import React, { Component } from "react";
import { OverlayTrigger, Panel, Popover } from "react-bootstrap";
import Button from "react-bootstrap/es/Button";
import ReactHtmlParser from 'react-html-parser';
import { LinkContainer } from "react-router-bootstrap";
import arrowIm from "../images/arrow.png";
import "../styles/Workplan.css";
import WorkplanDate from "./WorkplanDate";

const popover = (title, content, moduleScaleDescription, dueDate, dueDateType, updateUser) => {

    // if(dueDate) {
    //     console.log("ERMAGOD popwer got a dueDate");
    //     console.log(dueDate);
    // }

    //let dateStr = dueDate ? dueDate.toString() : "was_null"

    let dateobj = dueDate ? <WorkplanDate date={dueDate} dueDateType={dueDateType}/> : '';

    let titleobj = <div><div>{title}</div><div>{dateobj}</div></div>;

    //let cont = '<div><h5>' + moduleScaleDescription + '</h5><div>' + content + '</div></div>';

    const parserOptions = {
        transform: (domNode) => {

            if (domNode.attribs && domNode.attribs.id === 'replace') {

                return (

                    <LinkContainer to={domNode.attribs.href} onClick={() => {updateUser(domNode.attribs.href)}}><a href="#">{domNode.children[0].data}</a></LinkContainer>
                );
            }
            else {
                return;
            }
        }
    };


    return   <Popover class={"WorkplanPopover"} id="popover-positioned-left" title={titleobj} style={{maxWidth: '500px', overflow: 'scroll'}}>

        {/*<div> {ReactHtmlParser(cont, parserOptions)}</div>*/}
        <div>
            <h5>{moduleScaleDescription}</h5>
            <div>
                {ReactHtmlParser(content, parserOptions)}
            </div>
        </div>
    </Popover>
};


const  overlayPopupTrigger = (title, content, moduleScaleDescription, dueDate, dueDateType, updateUser) => {

    let dateobj = dueDate ? <WorkplanDate date={dueDate} dueDateType={dueDateType}/> : '';


    return <OverlayTrigger className="workplanOverlayTrigger" trigger="focus"
                           placement="right" overlay={popover(title, content, moduleScaleDescription, dueDate, dueDateType, updateUser)}>
        <div>
            <Button style={{width: '100%', height:'100%', overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right'}}>{title}</Button>
            <div>{dateobj}</div>
        </div>
    </OverlayTrigger>
}


const parseDate = (dateObject) => {
    // assumes date object is of this format.
    if (dateObject == null) return {month: "No Month", year: "No Year", day: "No day"}
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Augu", "Sep", "Oct", "Nov", "Dec"]

    return {month: months[dateObject.getMonth()], year: dateObject.getYear() + 1900, day: dateObject.getDay()}
}



class WorkplanPanelComponents extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.title;
        this.content = this.props.content;

        this.dueDateType = this.props.dueDateType ? this.props.dueDateType : "Due";
        this.dueDate = (this.props.dueDate) ? this.props.dueDate: null;

        this.moduleScaleName = this.props.moduleScale ? this.props.moduleScale.scale : '';
        this.moduleScaleDescription = this.props.moduleScale ? this.props.moduleScale.description : '';

        // if(this.dueDate) {
        //     console.log("ERMAGAD: WorkplanPanelComponents has a duedate!");
        //     console.log(this.dueDate);
        // }

    }

    render() {

        let example = overlayPopupTrigger(this.title, this.content, this.moduleScaleDescription, this.dueDate, this.dueDateType, this.props.updateUser);
        return (
            <div >
                {example}
            </div>
        );
    }

}


class ModulePanelComponents extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.title;
        this.content = this.props.content;

        this.dueDateType = this.props.dueDateType ? this.props.dueDateType : "Due";
        this.dueDate = (this.props.dueDate) ? this.props.dueDate: null;

        this.moduleScaleName = this.props.moduleScale ? this.props.moduleScale.scale : '';
        this.moduleScaleDescription = this.props.moduleScale ? this.props.moduleScale.description : '';

        // if(this.dueDate) {
        //     console.log("ERMAGAD: WorkplanPanelComponents has a duedate!");
        //     console.log(this.dueDate);
        // }

    }

    render() {


        let workplanDueDate = "";
        workplanDueDate = this.props.dueDate ? <WorkplanDate date={this.props.dueDate} dueDateType={this.props.dueDateType} /> : '';


        return <Panel className="modulePanel" >
            <Panel.Heading >
                <Panel.Title toggle  >

                    <div  style={{float:'left', width: '70%'}}>{this.title}</div>
                    {workplanDueDate}
                </Panel.Title>

            </Panel.Heading>
            <Panel.Collapse>
                <Panel.Body>
                    <React.Fragment>
                        {this.content}
                    </React.Fragment>
                </Panel.Body>
            </Panel.Collapse>
        </Panel>
    }

}


class WorkplanPanel extends Component {


    constructor(props) {
        super(props);
        this.date = this.props.date;
        this.modules = this.props.modules;
    }

    render() {
        let modules = <div></div>;
        if (this.modules.length > 0) {
            modules =  this.modules.map( (moduleData, index) => {

                // console.log(moduleData);

                let moduleSteps = moduleData.moduleSteps.map((steps, index2) => {
                    //key={index + index2}
                    return <WorkplanPanelComponents key={index2} title={steps.title} content={steps.content}
                                                    moduleScale={steps.moduleScale}
                                                    dueDate={steps.dueDate} dueDateType={steps.dueDateType} updateUser={this.props.updateUser}/>
                });


                if(moduleData.hide)
                    return <div>{moduleSteps}</div>;
                else
                    return <ModulePanelComponents key={index} title={moduleData.title} content={moduleSteps}
                                                moduleScale={moduleData.moduleScale}
                                                dueDate={moduleData.dueDate} dueDateType={moduleData.dueDateType} updateUser={this.props.updateUser}/>;

            });
        }

        let arrowImage =  <div className='arrowImage'><img src={arrowIm} width={40} height={50}/></div>;
        if (this.props.isLastPanel) {
            arrowImage = "";
        }

        let workplanDueDate = "";
        if (this.props.displayDueDate) {
            workplanDueDate = this.props.dueDate ? <WorkplanDate date={this.props.dueDate} dueDateType={this.props.dueDateType} /> : '';
        }

        return (
                <Panel className="workplanPanel" >
                    <Panel.Heading >
                        <Panel.Title toggle  >

                            <div  style={{float:'left', width: '70%'}}>{this.props.title}</div>
                            {workplanDueDate}
                        </Panel.Title>

                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <React.Fragment>
                                {modules}
                            </React.Fragment>
                        </Panel.Body>
                    </Panel.Collapse>
                    {arrowImage}
                </Panel>
        );
    }
}



export default WorkplanPanel;
