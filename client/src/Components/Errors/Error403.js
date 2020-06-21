import React from "react";
import "./error.css";

export function Error403() {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="centered">
                    <h1>Ooops!</h1>
                    <h2>Access denied</h2>
                    <p>Sorry, an error has occured, you are not allowed to be here!</p>
                </div>
            </div>
        </div>
    )
}