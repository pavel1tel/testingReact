import React from 'react';
import './UI.css';
import axios from 'axios';
import {Link} from "react-router-dom";


export const StatusSwitch = (status) => {
    switch (status) {
        case "ACCEPTED":
            return (
                <span id="accepted" className="font-weight-bold">Accepted</span>
            )
        case "NOT_ACCEPTED":
            return (
                <span id="notAccepted" className="font-weight-bold">Not accepted</span>
            )
        case "QUEUE":
            return (
                <span id="queue" className="font-weight-bold">Queue</span>
            )
    }
}


export const CorrectButton = (row) => {
    if (row.status === "NOT_ACCEPTED") {
        return (
                <button className="btn btn-warning">
                    <Link id="correct"  to={"/home/user/update/" + row.id}>Correct</Link>
                </button>
        )
    }
}

export const ChangeButton = (row) => {
    if (row.status === "NOT_ACCEPTED") {
        return (
                <button className="btn btn-danger"
                        onClick={() => changeInspector(row)}>
                    Change Inspector
                </button>
        )
    }
}

const changeInspector = (row) => {
    const authToken = localStorage.getItem("token");
    if (window.confirm(`Are you sure?`)){
        let data = "";

        let config = {
            method: 'post',
            url: 'http://localhost:4321/report/user/change/' + row.id,
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=0F79A812E5B03983E77357B97909D8F6'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                if(response.data === "no insp"){
                    alert("No inspectors available");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

export const Reason = (status, declineReason) => {
    if (declineReason !== "null" && status === "NOT_ACCEPTED") {
        return (
            <div id="reason">
                {"Reason: " + declineReason}
            </div>
        )
    } else {
        return (<span></span>);
    }
}

export const Date = (date) => {
    return ( <span>{date[1] + "-" + date[2] + "-" + date[0]}</span> )
}

export const AcceptBtn = (row) => {
    return (
        <form onSubmit={(event) => accept(event, row)}>
            <button type="submit" className="btn btn-success">Accept</button>
        </form>
    )
}

const accept = (event, row) => {
    const authToken = localStorage.getItem("token");
    let data = "";

    let config = {
        method: 'post',
        url: 'http://localhost:4321/report/insp/accept/' + row.id,
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
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

}

export const DeclineBtn =(row) => {
    return (
        <form onSubmit={(event => decline(event, row))}>
            <button type="submit" className="btn btn-danger">Decline</button>
        </form>
    )
}

const decline = (event, row) => {
    const authToken = localStorage.getItem("token");
    const reason = window.prompt("Enter a reason")
    let data = JSON.stringify({"declineReason": reason});

    let config = {
        method: 'post',
        url: 'http://localhost:4321/report/insp/decline/' + row.id,
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
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
}