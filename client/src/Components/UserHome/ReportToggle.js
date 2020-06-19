import React from "react";
import "./userHome.css"

export function ReportToggle(props) {
    return (
        <tr>
            <td colSpan="7" className="hiddenRow">
                <div className="accordian-body collapse" id={props.report.id}>
                    <div>props.report.description</div>
                    <div id="reason">{"Reason: " + props.report.declineReason}</div>
                </div>
            </td>
        </tr>
    )
}