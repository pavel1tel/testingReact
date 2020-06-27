import React, {useState} from "react";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {homeAddReportConfig} from '../Config';


export const  AddReport = ({token}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmit] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = homeAddReportConfig(name, description, token);

        axios(config)
            .then((res) => {
                console.log(JSON.stringify(res.data));
                setSubmit(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleChange = (nameOrDescription) => (event) => {
        event.preventDefault();
        const targetValue = event.target.value;

        if (nameOrDescription === 'name') {
            setName(targetValue);
        } else {
            setDescription(targetValue);
        }
    }
    if(submitted) {
        return <Redirect to='/home/user'/>
    } else {
        return (
            <div className="content">
                <form method="post" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange("name")} value={name} name="name" type="text" required
                               className="form-control" id="name"
                               aria-describedby="username" placeholder="Name">
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input onChange={handleChange("description")} value={description} name="description" type="text"
                               required className="form-control"
                               aria-describedby="description"
                               placeholder="Description" id="description">
                        </input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}