import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Dropdown} from './Dropdown';
import {Redirect} from "react-router-dom";

export const Navbar = (props) => {
    //todo: add to state
    const [authorized, setAuthorized] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [username, setUsername] = useState("Anon");
    const [isLogout, setLogout] = useState(false);
    const [key, setKey] = useState(false);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(() => {
        console.log("eu")
        setAuthorized(!!localStorage.getItem("token"));
        setAuthToken(localStorage.getItem("token"));
        setKey(true)
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setUsername(user.username)
            }
        } catch (e) {
            localStorage.clear();
            setLogout(true);
        }
    });

    const HomeLink = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if(user.role === "ROLE_USER") {
                return (
                    <span>
                        <li className="nav-item active">
                            <Link to="/home/user" className="nav-link">Home</Link>
                        </li>
                    </span>
                )
            } else {
                return (
                    <span>
                        <li className="nav-item active">
                            <Link to="home/insp" className="nav-link">Home</Link>
                        </li>
                    </span>
                )
            }
        } else {
            return (
                <span></span>
            )
        }
    }


    const handleLogout = () => {
        localStorage.clear();
        setLogout(true);
    }

    if (isLogout) {
        setLogout(false);
        return (<Redirect to='/accounts/login'/>);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/" style={{color: 'black'}}>Testing</Link>
            <span key={key}></span>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {authToken && <HomeLink /> }
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    {authorized ? (
                        <div>
                            <span className="nav-text"><a href="#">{username}</a></span>
                            <span>&nbsp;|&nbsp;</span>
                            <span className="nav-text"><Link onClick={handleLogout}>Log Out</Link></span>
                        </div>
                    ) : (
                        <div>
                            <span className="nav-text"><Link to="/accounts/login">Log In</Link></span>
                            <span>&nbsp;|&nbsp;</span>
                            <span className="nav-text"><Link to="/accounts/registration">Registration</Link></span>
                        </div>
                    )
                    }
                    <Dropdown/>
                </div>
            </div>
        </nav>
    );
}