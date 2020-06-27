import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./userHome.css";
import {Link} from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import {Redirect} from "react-router-dom";
import {StatusSwitch, CorrectButton, ChangeButton, Date} from '../../UI/HomeElements';
import {homeGetReportsConfig} from '../Config';


export const UserHome = ({token}) => {
    const [report, setReport] = useState([]);
    const [cantFetch, setCantFetch] = useState(false);

    useEffect(() => {
        const authorize = () => {
            const config = homeGetReportsConfig('user')(token);

            axios(config)
                .then((res) => {
                    console.log(JSON.stringify(res.data));
                    setReport(res.data);
                })
                .catch((err) => {
                    console.log(err);
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
        if (token) {
            authorize();
        }
    }, []);

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
        formatter: (cell, row) => ChangeButton(row, token)
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