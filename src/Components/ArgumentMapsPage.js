import React, { Component } from "react";
import ArgumentMap from "../DataComponents/ArgumentMapWithData";
import {
    BootstrapTable,
    TableHeaderColumn,
    DeleteButton,
} from "react-bootstrap-table";
import { 
    Panel,
    Checkbox
} from "react-bootstrap";

function customConfirm(next, dropRowKeys) {
    //TODO confirmation modal

    //right now, deletes immediately work

    next();
}

class ActiveEditor extends React.Component {
    focus() {
        this.updateData();
    }
    updateData() {
        let val = !this.props.defaultValue;
        this.props.onUpdate(val);
    }
    render() {
        return (<div></div>);
    }
}

const createActiveEditor = (onUpdate, props) => (<ActiveEditor onUpdate={ onUpdate } {...props}/>);

class ArgumentMapsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        };
        this.onRowSelect = this.onRowSelect.bind(this);
    }
    deleteMap() {
        if (this.state.selected.length > 0) {
            this.props.deleteMap(this.state.selected[0]);
            this.setState({ selected: [] });
        }
    }
    addMap(row) {
        this.props.addMap(row.title);
    }

    onRowSelect({ id }, isSelected) {
        if (isSelected) {
            this.setState({
                selected: [id],
            });
        } else {
            this.setState({ selected: [] });
        }
        return false;
    }
    updateIsActive(row, fieldName, newValue) {
        console.log("Update is active");
        let patch = {
            isActive: newValue
        };
        this.props.updateArgumentMap(row.id, patch);
    }
    activeFormatter(cell, row) {
        return <form><Checkbox readOnly checked={row.isActive}></Checkbox></form>;
    };
    refetch() {
        if (this.props.refetch) return this.props.refetch();
    }

    render() {
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
        };
        const selectRowProp = {
            mode: "radio",
            bgColor: "pink",
            onSelect: this.onRowSelect,
            selected: this.state.selected,
        };

        return (
            <div>
                <h4>Argument Maps</h4>
                <Panel>
                    <BootstrapTable
                        data={this.props.argumentMaps}
                        cellEdit={cellEditProp}
                        selectRow={selectRowProp}
                        options={{
                            ignoreEditable: true,
                            onDeleteRow: () => {
                                this.deleteMap();
                            },
                            onAddRow: (row) => {
                                this.addMap(row);
                            },
                            onCellEdit: (row, fieldName, newValue) => {
                                this.updateIsActive(row, fieldName, newValue)
                            },
                            defaultSortName: 'isActive',  // default sort column name
                            defaultSortOrder: 'desc'  // default sort order
                        }}
                        insertRow={!this.props.readonly}
                        deleteRow={!this.props.readonly}
                        striped
                        hover
                    >
                        <TableHeaderColumn
                            dataField="id"
                            isKey
                            hiddenOnInsert
                            hidden
                        >
                            Id
                        </TableHeaderColumn>
                        <TableHeaderColumn 
                            dataField="title" 
                            dataSort={true}
                            width="40%"
                            editable={false}
                        >
                            Claim
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="user"
                            hiddenOnInsert
                            dataSort={true}
                            width="20%"
                            editable={false}
                        >
                            Created By
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="isActive"
                            hiddenOnInsert
                            dataSort={true}
                            width="10%"
                            dataFormat={(cell,row) => {return this.activeFormatter(cell, row);}}
                            customEditor={{
                                getElement: createActiveEditor,
                                customEditorParameters: {
                                },
                            }}
                        >
                            Active
                        </TableHeaderColumn>
                    </BootstrapTable>
                </Panel>
                {this.state.selected.length !== 0 &&
                    
                        <ArgumentMap
                            mapId={parseInt(this.state.selected[0])}
                            currentTeamId={this.props.currentTeamId}
                        ></ArgumentMap>
                   
                }
                
            </div>
        );
    }
}
export default ArgumentMapsPage;
