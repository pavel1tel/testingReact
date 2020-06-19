import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Report} from "./Report";
import {ReportToggle} from "./ReportToggle";

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
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    });



    const report = {
        "id" : 1,
        "name" : "testName",
        "description" : "testDescroption",
        "updated" : "2020-05-25",
        "created" : "2020-05-25",
        "status" : "NOT_ACCEPTED",
        "declineReason" : "reason"
     }


    return(
        <div className="content">
            {/*<div th:replace="~{fragments/search :: search}"></div>*/}
            <table className="table-condensed table table-hover">
                <caption>Reports List</caption>
                <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Status</td>
                    <td>Created</td>
                    <td>Updated</td>
                    <td></td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                    <Report report = {report} />
                    <ReportToggle report = {report} />
                </tbody>
            </table>
            <a href="/userHome/add">
                <button type="button" className="btn btn-outline-success btn-lg">
                    Add
                </button>
            </a>
        </div>
    )
}