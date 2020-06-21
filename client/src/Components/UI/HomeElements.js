import React from 'react';
import './UI.css';


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
                <span className="font-weight-bold">Queue</span>
            )
    }
}


export const CorrectButton = (status) => {
    if (status === "NOT_ACCEPTED") {
        return (
            <form>
                <button type="submit" className="btn btn-warning"
                        onClick={() => alert('You sure?')}>Correct
                </button>
            </form>
        )
    }
}

export const ChangeButton = (status) => {
    if (status === "NOT_ACCEPTED") {
        return (
            <form>
                <button type="submit" className="btn btn-danger"
                        onClick={() => alert('You sure?')}>Change Inspector
                </button>
            </form>
        )
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
