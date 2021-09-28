import React, { Component } from "react";


class WorkplanDate extends Component {


    constructor(props) {
        super(props);

        this.date = this.props.date;

        // console.log(this.date);
        // console.log(typeof this.date);

        this.dueDateType = this.props.dueDateType ? this.props.dueDateType : "DUE";

        this.dueDateType = this.dueDateType.toLowerCase();
        this.dueDateType = this.dueDateType.charAt(0).toUpperCase() + this.dueDateType.slice(1);

        this.propsSeconds = (this.date) ? this.date.getTime() : 0;

        let month_oneBased = this.date.getMonth() + 1;
        let date_oneBased = this.date.getDate();

        this.dateString = (this.date) ? month_oneBased + "/" + date_oneBased + "/"
            + this.date.getFullYear() : 'None';


        //this.dateString = this.date ? this.date.toString() : "null";

        this.state = {
            activeColor: '#999999'
        };
    }

    componentDidMount(){
        this.setCurrentState();
    }

    setCurrentState(){
        while(true) {
            let current_date = new Date();
            let seconds = current_date.getTime();
            if (this.propsSeconds >= seconds) {
                //this.setState({activeColor: '#999999'});
                this.setState({activeColor: '#f56942'});
                break;
            } else if (this.propsSeconds < seconds) {
                //this.setState({activeColor: '#4295f5'});
                this.setState({activeColor: 'inherit'});
                break;
            }
            //sleep for 3 seconds, do nothing,  and try again
            setTimeout(() => {}, 3000);
        }
    }

    render() {
        //console.log(this.date);
        return  <div   style={ { background: this.state.activeColor, float:'right',
            width: '30%'}}>
            {this.dueDateType}: {this.dateString}
        </div>;// : <div></div>;
    }
}


export default WorkplanDate;
