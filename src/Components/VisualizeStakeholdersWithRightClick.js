import * as d3 from "d3";
import PropTypes from "prop-types";
import React, { Component } from "react";
import "../styles/contextMenu.css";
import D3ContextMenu from "./ContextMenus";
import nodeHelperFunctions from "./D3TreeNodesHelperFunctions";
import ES6D3Tree from "./Es6D3Tree";
import StakeholderAnalysisInstructions from "./StakeholderAnalysisInstructions";


const VisualizeStakeholdersProps = {
    stakeholders: PropTypes.array,
}






class VisualizeStakeholdersWithRightClick extends Component {

    constructor(props) {
        super(props);
        //this.state = {visible: false, stakeholderAnalysis: [] };
        this.stakeholderAnalysis = [];
        this.previousStakeHoldersAnalysis = [];
        this.margin = {top: 25, right: 250, bottom: 25, left: 250}
        this.link_width = window.innerWidth/4 - (this.margin.left/4 + this.margin.right/4);
        this.forceTreeRerender = true;

        this.style = {
            header_style: {
                width: this.link_width + 'px',
                display: 'inline-block',

            },
            header_wrapper_style: {
                width: window.innerWidth,
                paddingRight: 250,
                paddingLeft: 250,
                font: '15px sans-serif',

            },
            stakeholder_style: {
                transform: 'translateX(-' + this.link_width + 'px)',
                textAlign: 'right',
                width: this.link_width + 'px',
                display: 'inline-block',

            }
        }

    }


    componentDidMount() {
        console.log("Calling from component did mount");
        //add a scroll listener to the window
        window.addEventListener('scroll', () => {
           // console.log("This scroll event was trigerd")
            this._handleScrollOrClicks();
        }, false);


        this.treeContainer.addEventListener('click', (event) => {
            this._handleScrollOrClicks();
        });

        //alert(this.props.loading);
        this.d3StakeholderAnalysisVisualizationFunction();
     //   this.d3StakeholderAnalysisVisualizationFunctionWithRectangle();
    }

    componentWillUnmount() {
        //console.log("componentWillUnmount: !!!!!!!!!!!!!!!!!");
        this.treeContainer.removeEventListener('click', ()  => {/*do  nothing ; */});
        window.removeEventListener('scroll', () => {  /* do nothing */});
    }

    shouldComponentUpdate(nextProps, nextState) {
        //only update if the stakeholdersList is empty or if it changed
        console.log("length of old stakeholders =" + this.previousStakeHoldersAnalysis.length + " length of new stakeholders= " + this.stakeholderAnalysis.length);
        //only render the entire div when there's data or when information changes
        //alert(nextProps.stakeholders != this.props.stakeholders);
        return this.stakeholderAnalysis.length > 0 || nextProps.stakeholders != this.props.stakeholders;
        //return true;
    }


    componentDidUpdate() {
        console.log("Calling from component did update");
        this.d3StakeholderAnalysisVisualizationFunction();
        this.previousStakeHoldersAnalysis = this.stakeholderAnalysis;
    }

    displayText() {
        this.displayTextComponent.show()
    }


    d3StakeholderAnalysisVisualizationFunction() {

        this.stakeholderAnalysis = [];
        let data = nodeHelperFunctions.getDataAndNodeHeights(this.props);

        let availableColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            stakeholderColor = d3.scaleOrdinal(d3.schemeCategory20);

        return data.map((val, index)  => {
            let colorIndex = (index * 2) % 20;

            let stakeholderRow = <ES6D3Tree key={index} id={this.props.d3TreeId + index}
                                            //id={this.props.d3TreeId}
                                            margin={this.margin}
                                            link_width={this.link_width}
                                            treeData={data[index].stakeholderObj}
                                            color={stakeholderColor(colorIndex)}
                                            fillColor={stakeholderColor(colorIndex + 1)}
                                            offsetHeight={data[index].offsetHeight}
                                            stakeholderHeight={data[index].height}
                                            contextMenuDiv={this.contextMenu}
                                            forceRerender={this.forceTreeRerender}
                                            readOnlyMode={this.props.readOnlyMode}
                                            displayText={ () => this.displayText()}

            />

            this.stakeholderAnalysis.push(stakeholderRow);
           // this.d3_component( );
            return stakeholderRow;

        });
        this.forceTreeRerender = false;

    }


    _handleScrollOrClicks = () => {
        if (this.contextMenu == null) return;
        const visible = this.contextMenu.getVisible();

        if (visible) {
            this.contextMenu.setVisibleContextMenuToFalse();
            //this.props.refetch();
        }
    };


    render() {

        let d3StakeholderAnalysisVisualization = this.d3StakeholderAnalysisVisualizationFunction();
        let contextMenu = null;
        let visualizationHeader =
            <div  style={this.style.header_wrapper_style}>
                <h5  style={this.style.stakeholder_style} >Stakeholder</h5>
                <h5  style={this.style.stakeholder_style}>Proposal</h5>
                <h5  style={this.style.stakeholder_style}>Reason</h5>
                <h5  style={this.style.stakeholder_style}>Interest</h5>
            </div>;

        if (!this.props.readOnlyMode) {
           contextMenu =  <D3ContextMenu userId={this.props.userId}
                           teamId={this.props.teamId}
                           renderContextMenu={true}
                           ref={tc => (this.contextMenu = tc)} visible={false}
                           problemId={this.props.problemId}
                           teamQuery={this.props.teamQuery}
                           step={this.props.step}
                           onSuccess={
                              //This is a brute force way to get viz updated
                              () => {this.props.refetch();}
                           }

            />

            visualizationHeader =   <StakeholderAnalysisInstructions
                    style={this.style}
                    instructions={this.props.instructions}
                    problemId={this.props.problemId}
                    teamQuery={this.props.teamQuery}
                    teamId={this.props.teamId}
                    step={this.props.step}
                    userId={this.props.userId}
                    showClarificationsTab={this.props.showClarificationsTab}
                    showCreateButton={this.stakeholderAnalysis.length == 0}
                    onSuccess={
                        //This is a brute force way to get viz updated
                        () => {this.props.refetch();}
                     }
                    />

        }

        return (
            <div>
                {contextMenu}
                <div>
                    {visualizationHeader}
                    {
                        (this.props.readOnlyMode) ?
                            <div  ref={tc => (this.treeContainer = tc)}>
                                {d3StakeholderAnalysisVisualization}
                            </div>
                        :
                            <div  style={{paddingTop: "15%"}} ref={tc => (this.treeContainer = tc)}>
                                {d3StakeholderAnalysisVisualization}
                            </div>
                    }

                </div>

            </div>
        );

    }


}

VisualizeStakeholdersWithRightClick.propTypes = VisualizeStakeholdersProps;

export default  VisualizeStakeholdersWithRightClick;
