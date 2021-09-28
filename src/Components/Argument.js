import React, { Component } from "react";

const OpenStyle = {
    display: "flex",
    flexDirection: "column",
    borderStyle: "solid",
    height: "fit-content",
    backgroundColor: "#d4e8ff",
    width: "18em",
    padding: "2em",
    marginLeft: "1em",
    marginRight: "1em",
    marginBottom: "2em",
    borderColor: "dodgerblue",
    resize: "both",
};

const buttonStyle = {
    backgroundColor: "whitesmoke",
};

class Argument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value,
        });
    }

    handleButtonClick(event) {
        event.preventDefault();
        if (this.state.edit) {
            this.props.updateClaim(this.state.text);
        }
        this.setState({
            edit: !this.state.edit,
        });
    }

    render() {
        return (
            <div className="argument-claim" id="argument-claim" style={OpenStyle}>
                <h4>Claim</h4>
                <form
                    onSubmit={this.handleButtonClick}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    {this.state.edit ? (
                        <textarea
                            id="textarea"
                            rows="5"
                            cols="25"
                            resize="none"
                            onChange={this.handleChange}
                        >{this.props.argumentClaim.description}</textarea>
                    ) : (
                        <p>{this.props.argumentClaim.description}</p>
                    )}
                    <button
                        type="submit"
                        className="btn"
                        onClick={this.handleButtonClick}
                    >
                        {this.state.edit ? "Save " : "Edit "}
                        <i className="glyphicon glyphicon-pencil"></i>
                    </button>
                    
                </form>
                <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => this.props.addClaim()}
                >
                    Justify By Reason
                </button>
            </div>
        );
    }
}

export default Argument;
