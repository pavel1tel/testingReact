import React, {useEffect, useState} from "react";
import {useParams, Redirect} from  "react-router-dom";
import axios from 'axios';

export const UpdateReport = () => {

    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [update, setUpdate] = useState(false);

    const handleSubmit = () => {
        let data = JSON.stringify({"name": name,"description": description});
        const authToken = localStorage.getItem("token");

        let config = {
            method: 'post',
            url: 'http://localhost:4321/report/user/update/' + id,
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=E8ACC8A1B9305FFA04A28F58DB751167'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setUpdate(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    useEffect(() => {
        let axios = require('axios');
        let data = '';
        const authToken = localStorage.getItem("token");
        let config = {
            method: 'get',
            url: 'http://localhost:4321/report/user/update/' + id,
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Cookie': 'JSESSIONID=E8ACC8A1B9305FFA04A28F58DB751167'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setName(response.data.name);
                setDescription(response.data.description);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    const handleChange = (nameOrDescription) => (event) => {
        event.preventDefault();
        const targetValue = event.target.value;

        if (nameOrDescription === 'name') {
            setName(targetValue);
        } else {
            setDescription(targetValue);
        }
    }
    if (update) {
        return (<Redirect to='/home/user'/>);
    } else {
        return (
            <div className="content">
                <h3>Reason: reason</h3>
                <hr/>
                <h1>Update</h1>
                <form method="post" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" required className="form-control" id="name"
                               aria-describedby="username" onChange={handleChange("name")} placeholder="name"
                               value={name}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input name="description" id="description" type="text" required className="form-control"
                               aria-describedby="description"
                               placeholder="description" onChange={handleChange("description")}
                               value={description}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}