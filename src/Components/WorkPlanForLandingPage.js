import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';












const WorkplansTablePropTypes = {

    //TODO custom validator could check args
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    workplans: PropTypes.array,

}


class WorkplansTableForLandingPage extends Component {


    constructor(props) {
        super(props);

        this.state = {};

    }


    refetch() {

        if(this.props.refetch)
            return this.props.refetch();
    }


    generateLinks = (cell, row) => {
        return <a href={"/workplans/" + cell} rel="noopener noreferer" >{cell}</a>
    }


    render() {
        console.log(this.props);
        return (

            <Panel>
                <BootstrapTable
                    ref='table'
                    remote={this.remote}
                    data={this.props.workplans}
                    striped
                    hover
                >
                    <TableHeaderColumn
                        dataField='id'
                        isKey={true}
                        dataFormat={this.generateLinks}
                        hiddenOnInsert>ID</TableHeaderColumn>

                    <TableHeaderColumn dataField='name'
                                       editable={false}
                                       tdStyle={{whiteSpace: 'normal'}}
                                       editColumnClassName='editing-user-class'
                                       invalidEditColumnClassName='invalid-user-class'>Name</TableHeaderColumn>

                    <TableHeaderColumn dataField='description'
                                       editable={ false}
                                       tdStyle={{whiteSpace: 'normal'}}
                                       editColumnClassName='editing-user-class'
                                       invalidEditColumnClassName='invalid-user-class'>Description</TableHeaderColumn>

                    <TableHeaderColumn dataField='tag'
                                       editable={false}
                                       tdStyle={{whiteSpace: 'normal'}}
                                       editColumnClassName='editing-user-class'
                                       invalidEditColumnClassName='invalid-user-class'>Tag</TableHeaderColumn>

                </BootstrapTable>
            </Panel>

        );


    }

}



WorkplansTableForLandingPage.propTypes = WorkplansTablePropTypes;


export default WorkplansTableForLandingPage;


