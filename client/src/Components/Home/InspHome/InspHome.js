import React, {useEffect, useState} from "react";
import {AcceptBtn, ChangeButton, CorrectButton, DeclineBtn, StatusSwitch} from "../../UI/HomeElements";
import BootstrapTable from 'react-bootstrap-table-next';
import {Link} from "react-router-dom";
import axios from "axios";
import {homeGetReportsConfig} from '../Config';


export const InspHome = ({token}) => {
    const [report, setReport] = useState([]);
    const [cantFetch, setCantFetch] = useState(false);

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const authorize = () => {
            const config = homeGetReportsConfig('insp')(token);

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
                            "created": "2020-02-02",
                            "updated": "2020-02-02",
                        }
                    ])
                });
        }
        if (token || true) {
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
        formatter: (cell, row) => AcceptBtn(row, token)
    }, {
        dataField: 'decline',
        formatter: (cell, row) => DeclineBtn(row, token)
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
        return (
            <div><h3>Can't fetch reports!</h3></div>
        )
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
                </div>
            </div>
        )
    }
}