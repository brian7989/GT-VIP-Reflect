import React, { Component } from "react";
import TextArea from "./TextArea";
import  LineTo  from "react-lineto";

import ReasonWrapper from "../DataComponents/ArgumentReasonWrapperWithData";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

const OpenStyle = {
    display: "flex",
    flexDirection: "column",
    borderStyle: "solid",
    height: "fit-content",
    backgroundColor: "#d4e8ff",
    width: "14em",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    marginBottom: "5em",
    borderColor: "dodgerblue",
    resize: "both",
};
const ArgumentStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5em",
};
const columnStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
};

const buttonStyle = {
    backgroundColor: "whitesmoke",
};

const titleStyle = {
    fontSize: "1.3rem"
}

const textStyle = {
    fontSize: "1.5rem"
}

class Reason extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            text: "Add Reason Here",
        };
        this.addChildReason = this.addChildReason.bind(this);
        this.deleteReason = this.deleteReason.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addChildReason() {
        this.props.add(this.props.index);
    }

    deleteReason() {
        if (this.props.reason.nodeId !== undefined) {
            this.props.delete(this.props.reason.nodeId);
            this.props.deleteReason();
        }
    }
    handleChange(event) {
        this.setState({
            text: event.target.value,
        });
    }
    handleButtonClick(event) {
        event.preventDefault();
        if (this.state.edit) {
            this.props.updateReasoning(this.state.text);
        }
        this.setState({
            edit: !this.state.edit,
        });
    }

    render() {
        return (
            <div style= {{margin:"auto"}}>
                <div className={`reason-${this.props.id}`} style={OpenStyle}>
                    
                    <div>
                        <h4 style={titleStyle}>Reason</h4>
                    </div>
                    <div>
                        <form onSubmit={this.handleButtonClick}>
                            {this.state.edit ? (
                                <textarea
                                    id="textarea"
                                    rows="5"
                                    cols="25"
                                    onChange={this.handleChange}
                                >
                                    {this.props.reason.description}
                                </textarea>
                            ) : (
                                <p style={textStyle}>{this.props.reason.description}</p>
                            )}
                            <button
                                type="submit"
                                className="btn"
                                onClick={this.handleButtonClick}
                            >
                                {this.state.edit ? "Save" : "Edit "}
                                <i className="glyphicon glyphicon-pencil"></i>
                            </button>
                        </form>
                    </div>
                    <button
                        title="Delete Reason"
                        style={buttonStyle}
                        type="button"
                        onClick={this.deleteReason}
                    >
                        Delete Reason
                    </button>
                    <button
                        title="Justify by Reason"
                        style={buttonStyle}
                        type="button"
                        onClick={this.props.addChildReason}
                    >
                        Justify by Reason
                    </button>
                </div>
                <div style={ArgumentStyle}>
                        {this.props.reasonWrappersOnReason !== undefined &&
                            this.props.reasonWrappersOnReason.map(
                                (wrapper, index) => {
                                    return (
                                        <div key={`wrapper-${wrapper.wrapperId}`}style={{marginLeft:"2rem", marginRight:"2rem"}}>
                                            <ReasonWrapper
                                                id={wrapper.wrapperId}
                                            ></ReasonWrapper>
                                            <LineTo
                                                borderColor='black' 
                                                borderWidth={2} 
                                                from={`wrapper-${wrapper.wrapperId}`}
                                                to={`reason-${this.props.id}`} 
                                                toAnchor='bottom center' 
                                                fromAnchor='top center'
                                                orientation='v'
                                                delay={50}
                                                key={index}/>
                                        </div>
                                    );
                                }
                            )
                        } 
                        
                </div>
            </div>
        );
    }
}

export default Reason;
