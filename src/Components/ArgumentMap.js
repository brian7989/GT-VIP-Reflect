import React, { Component } from "react";
import Argument from "../DataComponents/ArgumentWithData";
import ReasonWrapper from "../DataComponents/ArgumentReasonWrapperWithData";
import LineTo from "react-lineto";
import { Panel, Checkbox } from "react-bootstrap";

const ArgumentStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5em",
};

class ArgumentMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: [],
            wrappers: [],
            lineArray: [],
            wrapperId: [],
            scrollCount: 0,
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    handleScroll() {
        this.setState({ scrollCount: this.scrollCount++ });
    }
    render() {
        return (
            <Panel
                className="ArgumentMapPanel"
                style={{ padding: "10px", overflow: "scroll", display: "flex"}}
                onScroll={this.handleScroll}
            >
                <div style={{margin:"auto"}}>
                    <div style={ArgumentStyle}>
                        <Argument
                            getSize={this.getSize}
                            argumentClaim={this.props.argumentClaim}
                            currentTeamId={this.props.currentTeamId}
                            mapId={this.props.mapId}
                        ></Argument>
                    </div>
                    <div style={ArgumentStyle}>
                        {this.props.reasonWrappersOnClaim !== undefined &&
                            this.props.reasonWrappersOnClaim.map(
                                (wrapper, index) => {
                                    return (
                                        <div
                                            style={{marginLeft:"2rem", marginRight:"2rem"}}
                                            key={index}
                                        >
                                            <ReasonWrapper
                                                id={wrapper.wrapperId}
                                                key={index}
                                            ></ReasonWrapper>
                                            {!this.props.loading &&
                                                this.props.reasonWrappersOnClaim.map(
                                                    (wrapper, index) => {
                                                        return (
                                                            <div key={`${wrapper.wrapperId}`}>
                                                                <LineTo
                                                                    borderColor="black"
                                                                    borderWidth={2}
                                                                    from="argument-claim"
                                                                    to={`wrapper-${wrapper.wrapperId}`}
                                                                    fromAnchor="bottom center"
                                                                    toAnchor="top center"
                                                                    key={index}
                                                                    delay={50}
                                                            />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    );
                                }
                            )}
                    </div>
                </div>
            </Panel>
        );
    }
}

export default ArgumentMap;
