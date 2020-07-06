import React, {useEffect, useState} from "react";
import {AcceptBtn, ChangeButton, CorrectButton, DeclineBtn, StatusSwitch} from "../../UI/HomeElements";
import BootstrapTable from 'react-bootstrap-table-next';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {Search} from "../../UI/Search";
import paginationFactory from "react-bootstrap-table2-paginator";

export const InspHome = () => {

    const [report, setReport] = useState([]);
    const [initialReport, setInitialReport] = useState([]);
    const [cantFetch, setCantFetch] = useState(false);
    const authToken = useState(localStorage.getItem("token"));
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const authorize = () => {
            const data = '';

            const config = {
                method: 'get',
                url: 'http://localhost:4321/report/insp/reports',
                headers: {
                    'Authorization': 'Bearer ' + authToken
                },
                data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setReport(response.data);
                    setInitialReport(response.data);
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
                            "created": "2020-02-02",
                            "updated": "2020-02-02",
                        }
                    ])
                    setInitialReport(
                        [
                            {
                                "id": "1",
                                "name": "name",
                                "description": "desc",
                                "created": "2020-02-02",
                                "updated": "2020-02-02",
                            }
                        ]
                    )
                });
        }
        if (authToken || true) {
            authorize();
        }
    }, [update]);


    const columns = [{
        dataField: 'id',
        text: 'ID'
    }, {
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'created',
        text: 'Created',
    }, {
        dataField: 'updated',
        text: 'Updated',
    }, {
        dataField: 'accept',
        formatter: (cell, row) => AcceptBtn(row,)
    }, {
        dataField: 'decline',
        formatter: (cell, row) => DeclineBtn(row)
    }];

    const expandRow = {
        renderer: (row, rowIndex) => {
            return (
                <span>
                        <div style={{background: "#F5F5F5", margin: 0, padding: 5}}>
                            {`Description ${row.description}`}
                        </div>
                    </span>
            )
        }
    }

    if (cantFetch) {
        return <Redirect to='/error'/>
    } else {
        return (
            <div className="content" style={{width: '100%'}}>
                <Search reports={initialReport} setReport={setReport}/>
                <div className='contentTable'>
                    <BootstrapTable
                        columns={columns}
                        data={report}
                        keyField='id'
                        hover
                        bordered={false}
                        bootstrap4
                        expandRow={expandRow}
                        pagination={paginationFactory()}
                    />
                </div>
            </div>
        )
    }
}