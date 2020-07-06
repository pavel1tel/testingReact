import React, {useState} from "react";

export const Search = (props) => {
    let [search, setSearch] = useState("");
    const initialReports = props.reports;

    const handleChange = (event) => {
        event.preventDefault();
        const targetValue = event.target.value;
        setSearch(targetValue);
        props.setReport(initialReports.filter((report) => {
            return report.name.includes(targetValue);
        }));
    }

    return (
        <div id="searchForm" className="input-group form-inline mr-auto mb-4 d-flex justify-content-end">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Name</span>
            </div>
            <input value={search} onChange={handleChange} name="searchString" id="searchString" aria-describedby="basic-addon1" className="form-control mr-sm-2" type="text"
                   placeholder="search" aria-label="search"></input>
        </div>
    )
}