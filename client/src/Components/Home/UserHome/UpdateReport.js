import React, {useEffect, useState} from "react";
import {useParams, Redirect} from  "react-router-dom";
import axios from 'axios';
import {homeUpdateReportConfig, homeGetUpdatedReportConfig} from '../Config';


export const UpdateReport = ({token}) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [update, setUpdate] = useState(false);

    const handleSubmit = () => {
        const config = homeUpdateReportConfig(name, description, id, token);

        axios(config)
            .then((res) => {
                console.log(JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        const config = homeGetUpdatedReportConfig(id, token);

        axios(config)
            .then((res) => {
                console.log(JSON.stringify(res.data));
                setName(res.data.name);
                setDescription(res.data.description);
            })
            .catch((err) => {
                console.log(err);
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
        return <Redirect to='/home/user'/>;
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
                            value={name}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input name="description" id="description" type="text" required className="form-control"
                           aria-describedby="description" placeholder="description" onChange={handleChange("description")}
                           value={description}>
                        </input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}