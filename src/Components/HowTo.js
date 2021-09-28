import React, {Component} from 'react';

class HowTo extends Component {
    constructor(props) {
        super(props);


        this.state = {};


    }
    render() {
        return(
            <ul>
                <li>
                <a href="https://reflect.gatech.edu/how-to-formulate-a-problem/" rel="noopener noreferer"
                   target="_blank">How to formulate a problem</a>
                </li>

                <li>
                    <a href="https://reflect.gatech.edu/how-to-develop-a-stakeholder-analysis/" rel="noopener noreferer"
                       target="_blank">How to develop a stakeholder analysis</a>
                </li>

                <li>
                <a href="https://reflect.gatech.edu/how-to-listen/" rel="noopener noreferer"
                   target="_blank">How to listen</a>
                </li>

                <li>
                <a href="https://reflect.gatech.edu/how-to-develop-a-symphysis-proposal/" rel="noopener noreferer"
                   target="_blank">How to develop a symphysis proposal</a>
                </li>

                <li>
                <a href="https://reflect.gatech.edu/how-to-construct-an-argument/" rel="noopener noreferer"
                   target="_blank">How to construct an argument</a>
                </li>

            </ul>
        );
    }
}


export default HowTo;
