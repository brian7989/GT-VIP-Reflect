import React, {Component} from 'react';
//import logo from '../logo.svg';
//import '../App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import ClassDropDownSelectorWithData from "../DataComponents/ClassDropdownSelectorWithData";




import PropTypes from 'prop-types';


import {
    Bootstrap,
    OverlayTrigger,
    Tooltip,
    Navbar,
    Panel,
    ListGroup,
    ListGroupItem,
    Grid,
    Row,
    Col,
    Nav,
    ButtonToolbar,
    Button,
    ButtonGroup,
    Tab,
    NavItem,
    MenuItem,
    NavDropdown,
    Table,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Checkbox
} from 'react-bootstrap';

import Configuration from "../DataComponents/Configuration";
import Parser from "html-react-parser";




const BatchUploadPropTypes = {

    // //TODO custom validator could check args
    // loading: PropTypes.bool,
    //
    // refetch: PropTypes.func,
    // addClass: PropTypes.func,
    // deleteClass: PropTypes.func,
    // updateClass: PropTypes.func,
    // classes: PropTypes.array,
    // readonly: PropTypes.bool,

    userId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,


}




class BatchUpload extends Component {


    constructor(props) {
        super(props);


        this.state = {

            //classId: 0,
            myFile: "",
            message: "",
            selectedClass: null,
        };


        //this.handleClassIdChange = this.handleClassIdChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }


    // handleClassIdChange(event) {
    //     this.setState({classId: parseInt(event.target.value)});
    // }
    //


    handleFileChange(event) {
        this.setState({myFile: event.target.files[0]});
    }



    selectClass(info) {

        this.setState({selectedClass: info});
    }



    handleSubmit(event) {


        if(!this.state.selectedClass || ! this.state.selectedClass.id)
        {
            this.setState({message: "No class selected!"});
            return;
        }

        const url = !process.env.NODE_ENV || process.env.NODE_ENV === "production" ? Configuration.prodUrl : Configuration.devUrl;


        var formData  = new FormData();

        formData.append("newusers", this.state.myFile);


        fetch(url + "api/classes/" + this.state.selectedClass.id + "/users/bulkcreate"  , {
            method: 'post',

            body: formData,
        }).then(res=>res.json())
            .then(
                (result) => {
                    console.log("(bulk create) FETCH RESULT: ")
                    console.log(result);
                    //this.setState({isLoaded: true, items: result.items});

                    //TODO if registration successful, go to user view and force user to log in

                    if(result.success) {

                        this.setState({message: "SUCCESS!"});
                    }
                    else {

                        if(result.error && result.error.message)
                            this.setState({message: result.error.message});
                        else
                            this.setState({message: "unknown error"});

                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log("FETCH ERROR: " + error);
                    //this.setState({isLoaded: true, error});

                    this.setState({registrationErrorMesg: "unknown error"});
                }
            );





        event.preventDefault();
    }



    render() {

        const badgeClasses = `badge badge-light`;

        let classId = this.state.selectedClass ? this.state.selectedClass.id : -1;

        if (classId > 0)
            console.log("About to render the batch upload button!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + classId );
        console.log(this.props)
        return (

            <Panel  style={ {width: "80%" } }>


                <div>

                    <Panel id='batch-upload-panel'>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                <span
                                    className={badgeClasses}>{this.props.instructions.title}</span>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                {this.props.instructions.body}
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </div>

                <ClassDropDownSelectorWithData
                    formId="batchClassDrop"
                    userId={this.props.userId}
                    onSelect={(e) => {this.selectClass(e);}}
                    selected={classId}
                    isAdmin={this.props.isAdmin }
                    isEditor={this.props.isEditor}
                    active={this.props.active}
                />

                <Form    onSubmit= {(event) => {this.handleSubmit(event)}} >

                    {/*<FormGroup>*/}
                    {/*<ControlLabel>Class ID</ControlLabel>*/}
                    {/*<FormControl type="text" placeholder="???" value={this.state.classId} onChange={this.handleClassIdChange} />*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                        <ControlLabel>File</ControlLabel>
                        <FormControl type="file"  onChange={this.handleFileChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Button type="submit">Upload</Button>
                    </FormGroup>


                    {this.state.message ? this.state.message : ""}
                </Form>

            </Panel>

        );


    }


}

BatchUpload.propTypes = BatchUploadPropTypes;


export default BatchUpload;


