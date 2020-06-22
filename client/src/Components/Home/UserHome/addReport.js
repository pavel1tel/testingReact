import React from "react";

export const  AddReport = () => {

    const authToken = localStorage.getItem('token')

    const handleSubmit = () => {

    }

    return(
        <div className="content">
            <form method="post" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" required className="form-control" id="name"
                           aria-describedby="username" placeholder="Name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" required className="form-control"
                           aria-describedby="description"
                           placeholder="Description" id="description"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}