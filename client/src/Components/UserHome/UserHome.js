import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import BootstrapButton from 'react-bootstrap-table-next';
import {StatusSwitch, CorrectButton, ChangeButton, Reason} from '../UI/HomeElements';

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

    const report = {
        "id" : 1,
        "name" : "testName",
        "description" : "testDescription",
        "updated" : "2020-05-25",
        "created" : "2020-05-25",
        "status" : "NOT_ACCEPTED",
        "declineReason" : "reason"
    }

    const expandRow = {
      renderer: (row, rowIndex) => (
        <div>
          <p>{ `Description ${row.description}` }</p>
        </div>
      )
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
      text: 'Created'
    }, {
      dataField: 'updated',
      text: 'Updated'
    }, {
      dataField: 'changeInspector',
      formatter: (cell, row) => ChangeButton(row.status)
    }, {
      dataField: 'correct',
      formatter: (cell, row) => CorrectButton(row.status)
    }];


    return(
        <div className="content" style={{ width: '100%' }}>
            <div className='contentTable' style={{  margin: '2%' }}>
                <BootstrapTable 
                    columns={columns}
                    data={ [report] } 
                    keyField='id'
                    striped
                    hover
                    bordered={ false }
                    bootstrap4
                    expandRow={ expandRow }
                />

                <a href="/userHome/add">
                    <button type="button" className="btn btn-outline-success btn-lg">
                        Add
                    </button>
                </a>
            </div>
        </div>

    )
}