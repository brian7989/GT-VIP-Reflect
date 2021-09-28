import React, { Component } from "react";

const OpenStyle = {
    boxSizing: 'border-box',
	border: 'none',
	borderRadius: '3px',
	resize: 'none',
	fontSize: '12px',
	lineHeight: '20px',
	overflow: 'hidden',
    height: 'auto',
    width: '17em',
	padding: '4px',
	boxShadow: '0px' //'4px', '10px', '-8px', 'black'
}

class TextArea extends Component {
    constructor(props) {
        super(props);
		this.state = {
			value: '',
			rows: 5,
			minRows: 5,
			maxRows: 15
		};
    }

    handleChange = (event) => {
		const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
  	this.setState({
    	value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
}



    render() {
        return (
            <div>
                <form>
                    <label>
                        <textarea style={OpenStyle} value={this.state.value} onChange={this.handleChange}/>
                    </label>
                </form>
            </div>
        )
    }
}

export default TextArea