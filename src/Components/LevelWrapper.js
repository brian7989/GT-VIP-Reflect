import React, { Component } from "react";
import ReasonWrapper from './ArgumentReasonWrapper';
import ReactDOM from 'react-dom';


const container = {
    display: 'flex'
}

const OpenStyle = {
    borderStyle: 'solid',
    borderColor: 'coral',
    height: '15em',
    width: '15em',
    margin: '2em',

    overflow: 'scroll',
}


class LevelWrapper extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.active)
        this.state = {
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }
    componentDidMount() {

    }


    render() {
        return (
            <div style={container}>
                {this.state.active.map((state, index) => {
                    if (state === 1) {
                        return this.state.wrappers[index]
                    } else {
                        return <div style={OpenStyle}></div>
                    }
                })}
            </div>
        )
    }
}

export default LevelWrapper