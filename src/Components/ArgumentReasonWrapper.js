import React, { Component } from "react";
import Reason from "../DataComponents/ArgumentReasonWithData";
import _ from "lodash";
import LineTo from "react-lineto";

const rowStyle = {
    display: "flex",
    justifyContent: "start",
    alignSelf: "auto",
    float: "center",
};

const rowStyleCenter = {
    
    justifyContent: "center",
    float: "center",
    marginLeft:"2rem",
    marginRight:"2rem"
};

const reasonBarStyle = {
    height: "30px",
    background: "dodgerblue",
};

const columnStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
};

const test = {
    textAlign: "center",
};

class ReasonWrapper extends Component {
    constructor(props) {
        super(props);
        this.deleteReason = this.deleteReason.bind(this);
        this.state = {
            reasons: [],
            wrapper: [],
            index: [],
            wrapperId: [],
            reasonId: [],
            id: this.props.id,
            first: Date.now().toString(),
            second: Date.now().toString(),
        };
    }

    deleteReason() {
        if (!this.props.loading && _.size(this.props.reasons) === 1) {
            this.props.deleteReasonWrapper(this.props.id);
        }
    }

    render() {
        return (
            <div className={`wrapper-${this.props.id}`}  id={`wrapper-${this.props.id}`} style={{display: "flex", flexDirection:"column"}}>
                <div style={reasonBarStyle}>
                    <button
                        title="Add Co-Dependent Reason"
                        type="button"
                        onClick={this.props.addCodependentReason}
                    >
                        Add Co-Dependent Reason
                    </button>
                </div>
                <div style={rowStyle}>
                    {!this.props.loading &&
                        _.size(this.props.reasons) !== 0 &&
                        this.props.reasons.map((reason, index) => {
                            if (reason !== null && reason !== undefined) {
                                return (
                                    <div style={rowStyleCenter} key={index}>
                                        <Reason
                                            wrapperId={this.props.id}
                                            id={reason.id}
                                            deleteReason={this.deleteReason}
                                        ></Reason>
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
        );
    }
}

export default ReasonWrapper;
