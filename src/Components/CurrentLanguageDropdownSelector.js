import React, { Component } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import PropTypes from 'prop-types';



import {Bootstrap, Navbar, Well, Panel, ListGroup, ListGroupItem, Grid, Row, Col, Nav, ButtonToolbar, Button, ButtonGroup, DropdownButton, Tab, NavItem, MenuItem, NavDropdown, Table, Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox} from 'react-bootstrap';


import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import _ from "underscore";

import { withTranslation } from 'react-i18next';


import Configuration from "../DataComponents/Configuration";


const LanguageDropdownSelectorPropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,

    updateCurrentLanguage: PropTypes.func.isRequired,

    //currentTeamId: PropTypes.number.isRequired,
    formId: PropTypes.string,
    //userId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,


    //TODO someday the following should work in React
    //see: https://github.com/facebook/react/issues/3163

    //selected: PropTypes.oneOfType([null, PropTypes.number]).isRequired,


}





class LanguageDropdownSelectorIntermed extends Component {


    constructor(props) {
        super(props);


        this.state = {


        };

    }

    onChange(e) {

        //let i18nlang = _.has(this, "props.i18n.services.resourceStore.data") ? Object.keys(this.props.i18n.services.resourceStore.data) : null;
        let i18nlang = Configuration.languages;
        let languages = i18nlang ? i18nlang.slice() : null;


        if(!languages)
            languages = [];

        //myTeams.unshift({id: -1, name: "Unselected"});

        if(e && e.target && e.target.value)
        {

            this.props.updateCurrentLanguage(e.target.value);

            this.props.i18n.changeLanguage(e.target.value, (err, t) => {
                if (err) return console.log('something went wrong loading new language', err);
            });

            // let foundLanguage = null;
            //
            //
            // let currentLanguage =  this.props.user.language;
            //
            // if(languages)
            // {
            //     foundLanguage = _.find(languages, (d) => {
            //         return d === e.target.value;
            //     });
            // }
            //
            //
            // if(!foundLanguage) {
            //
            //     this.props.updateCurrentLanguage(e.target.value);
            //
            // }
            //
        }

    }







    render() {


        //Note the use of ref below (ref='table')
        //info here: https://facebook.github.io/react/docs/refs-and-the-dom.html
        console.log("From the currentLanguageDropdwonSelector!!!!!!!!!!!!!");
        console.log(this.props);

        //let myTeams = this.props.teams ? this.props.teams.slice(0) : null;
        //let languages = this.props.i18n.languages ? this.props.i18n.languages.slice() : null;


        //let i18nlang = _.has(this, "props.i18n.services.resourceStore.data") ? Object.keys(this.props.i18n.services.resourceStore.data) : null;
        let i18nlang = Configuration.languages;
        let languages = i18nlang ? i18nlang.slice() : null;


        //let languages = null;

        if(!languages)
            languages = [];

        console.log(typeof languages);
        console.log(languages);


        let foundLanguage = null;

        //let currTeamId = this.props.currentTeamId;

        let currentLanguage =  this.props.user.language;

        if(languages)
        {
            foundLanguage = _.find(languages, (d) => {
                return d === this.props.user.language ;
            });
        }

        if(!foundLanguage) {

            languages.unshift( "Default");

            currentLanguage = "Default";

        }
        //myTeams.unshift({id: -1, name: "Team"});

        return (

            <form id = "currentLanguageDropdownSelector" style={{width: 200}}>
            <FormGroup >


                <FormControl
                    componentClass="select"
                    //value={this.props.selected ? this.props.selected : undefined}
                    value={currentLanguage}
                    placeholder="select"
                    onChange={this.onChange.bind(this)}
                >
                    {

                            languages ?
                                languages.map((s) => {

                                //let isSelected = s === currentLanguage;

                                return (
                                    <option value={s}
                                            key={s}
                                            //selected={isSelected}
                                    >
                                        {s}
                                    </option>

                                );
                            }) : ""



                    }
                </FormControl>

            </FormGroup>
            </form>


        );


    }

}
const LanguageDropdownSelector = withTranslation()(LanguageDropdownSelectorIntermed)


LanguageDropdownSelector.propTypes = LanguageDropdownSelectorPropTypes;


export default LanguageDropdownSelector;


