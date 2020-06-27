import React from 'react';
import './UI.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import {declineConfig, acceptConfig, changeInspectorConfig} from '../Home/Config';


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
        default:
            return (
                <span></span>
            )
    }
}


export const CorrectButton = (row) => {
    if (row.status === "NOT_ACCEPTED") {
        return (
            <button className="btn btn-warning">
                <Link to={"/home/user/update/" + row.id}>Correct</Link>
            </button>
        )
    }
}

export const ChangeButton = (row, token) => {
    if (row.status === "NOT_ACCEPTED") {
        return (
            <button 
                className="btn btn-danger"
                onClick={() => changeInspector(row, token)}
            >
                Change Inspector
            </button>
        )
    }
}

const changeInspector = (row, token) => { 
    const confirm = window.confirm(`Are you sure?`);

    if (confirm) {
        const config = changeInspectorConfig(row.id, token);

        axios(config)
            .then((res) => {
                if(res.data === "no insp") {
                    alert("No inspectors available");
                }
            })
            .catch((err) => {
                console.log(err);
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
    return ( 
        <span>{date[1] + "-" + date[2] + "-" + date[0]}</span> 
    );
}

export const AcceptBtn = (row, token) => {
    return (
        <form onSubmit={(event) => accept(event, row, token)}>
            <button type="submit" className="btn btn-success">Accept</button>
        </form>
    )
}

const accept = (event, row, token) => {
    const config = acceptConfig(row.id, token);

    axios(config)
        .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
}

export const DeclineBtn = (row, token) => {
    return (
        <form onSubmit={(event => decline(event, row, token))}>
            <button type="submit" className="btn btn-danger">Decline</button>
        </form>
    )
}

const decline = (event, row, token) => {
    const reason = window.prompt("Enter a reason");

    const config = declineConfig(reason, row.id, token);

    axios(config)
        .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
}