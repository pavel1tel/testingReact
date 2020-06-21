import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./userHome.css";
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import BootstrapButton from 'react-bootstrap-table-next';
import {StatusSwitch, CorrectButton, ChangeButton, Date} from '../UI/HomeElements';

export const UserHome = () => {

    useEffect(() => {
        var data = '';
        console.log("fetching")
        var config = {
            method: 'get',
            url: 'http://localhost:4321/report/user/reports',
            headers: {
                'Authorization': 'Bearer '
            },
            data
        };

        axios(config)
            .then(res => {
                console.log(JSON.stringify(res.data));
            })
            .catch(err => console.log(err));
    });

    //tak reporti budut prihodit s backenda
    const report = [
        {
            "id": "1",
            "name": "name",
            "description": "desc",
            "status": "NOT_ACCEPTED",
            "created": [
                2020,
                6,
                10
            ],
            "updated": [
                2020,
                6,
                10
            ],
            "declineReason": "ne pravilna"
        },
        {
            "id": "2",
            "name": "name2",
            "description": "desc2",
            "status": "ACCEPTED",
            "created": [
                2020,
                6,
                10
            ],
            "updated": [
                2020,
                6,
                10
            ],
            "declineReason": "ne pravilna2"
        }
    ]

    const expandRow = {
        renderer: (row, rowIndex) => {
            if (row.declineReason !== "null" && row.status === "NOT_ACCEPTED") {
                return (
                    <span>
                        <div style={{background: "#F5F5F5", margin: 0, padding: 5}}>
                            {`Description ${row.description}`}
                        </div>
                        <div id="reason">
                            {"Reason: " + row.declineReason}
                        </div>
                    </span>
                )
            } else {
                return (
                    <span>
                        <div style={{background: "#F5F5F5", margin: 0, padding: 5}}>
                            {`Description ${row.description}`}
                        </div>
                    </span>
                )
            }
        }
    };

    const columns = [{
        dataField: 'id',
        text: 'ID'
    }, {
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'status',
        text: 'Status',
        formatter: (cell, row) => StatusSwitch(row.status)
    }, {
        dataField: 'created',
        text: 'Created',
        formatter: (cell, row) => Date(row.created)
    }, {
        dataField: 'updated',
        text: 'Updated',
        formatter: (cell, row) => Date(row.updated)
    }, {
        dataField: 'changeInspector',
        formatter: (cell, row) => ChangeButton(row.status)
    }, {
        dataField: 'correct',
        formatter: (cell, row) => CorrectButton(row.status)
    }];


    return (
        <div className="content" style={{width: '100%'}}>
            <div className='contentTable'>
                <BootstrapTable
                    columns={columns}
                    data={report}
                    keyField='id'
                    hover
                    bordered={false}
                    bootstrap4
                    expandRow={expandRow}
                />

                <a href="/userHome/add">
                    <button type="button" className="btn btn-outline-success btn-lg">
                        Add new Report
                    </button>
                </a>
            </div>
        </div>

    )
}