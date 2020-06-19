import React from "react";
import "./userHome.css"

export function Report(props) {

    function StatusSwitch() {
        switch (props.report.status) {
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


    function CorrectButton() {
        if (props.report.status === "NOT_ACCEPTED") {
            return (
                <td>
                    <form>
                        <button type="submit" className="btn btn-warning"
                                onClick="return confirm('You sure?')">Correct
                        </button>
                    </form>
                </td>
            )
        } else {
            return (
                <td></td>
            )
        }
    }

    function ChangeButton() {
        if (props.report.status === "NOT_ACCEPTED") {
            return (
                <td>
                    <form>
                        <button type="submit" className="btn btn-danger"
                                onClick="return confirm('You sure?')">Change Inspector
                        </button>
                    </form>
                </td>
            )
        } else {
            return (
                <td></td>
            )
        }
    }


    function Reason() {
        if (props.report.declineReason !== "null" && props.report.status === "NOT_ACCEPTED") {
            return (
                <div id="reason">
                    {"Reason: " + props.report.declineReason}
                </div>
            )
        } else {
            return (<span></span>);
        }
    }

    return (
        <tr className="accordion-toggle" data-toggle="collapse" data-target={"#" + props.report.id}>
            <th scope="row">{props.report.id}</th>
            <td>{props.report.name}</td>
            <td><StatusSwitch/></td>
            <td>{props.report.created}</td>
            <td>{props.report.updated}</td>
            <ChangeButton/>
            <CorrectButton/>
        </tr>
    )
}