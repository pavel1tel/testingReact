import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./userHome.css";
import {Link} from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import {Redirect} from "react-router-dom";
import {StatusSwitch, CorrectButton, ChangeButton, Date} from '../../UI/HomeElements';


export const UserHome = (props) => {
    const [report, setReport] = useState([]);
    const [cantFetch, setCantFetch] = useState(false);
    const authToken = useState(localStorage.getItem("token"));
    useEffect(() => {
        const authorize = () => {
            const data = '';

            const config = {
                method: 'get',
                url: 'http://localhost:4321/report/user/reports',
                headers: {
                    'Authorization': 'Bearer ' + authToken
                },
                data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setReport(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    setCantFetch(true);
                    //todo: only for testing
                    setReport([
                        {
                            "id": "1",
                            "name": "name",
                            "description": "desc",
                            "status": "NOT_ACCEPTED",
                            "created": "2020-02-02",
                            "updated": "2020-02-02",
                            "declineReason": "ne pravilna"
                        }
                    ])
                });
        }
        if (authToken) {
            authorize();
        }
    });
    console.log("render")

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
    }, {
        dataField: 'updated',
        text: 'Updated',
    }, {
        dataField: 'changeInspector',
        formatter: (cell, row) => ChangeButton(row)
    }, {
        dataField: 'correct',
        formatter: (cell, row) => CorrectButton(row)
    }];

    if (cantFetch) {
        return <Redirect to='/error'/>
    } else {
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

                    <Link to="/home/user/add">
                        <button type="button" className="btn btn-outline-success btn-lg">
                            Add new Report
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}