import React from 'react';
import { Link } from "react-router-dom";
import { Dropdown } from './Dropdown';

export const Navbar = (props) => {
    const authorized = false;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <Link to="/" style={{color: 'black'}}>Testing</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {
                        // <span th:if="${url != null}">
                        //     <li className="nav-item active">
                        //         <a className="nav-link" th:href="${url}" th:text="#{string.home}"></a>
                        //     </li>
                        // </span>
                        }
                    </ul>
                <div className="form-inline my-2 my-lg-0">
                    {authorized ? (
                        <div>
                            <span className="nav-text"><a href="#">Username</a></span>
                            <span>|</span>
                            <span className="nav-text"><Link to="/logout">Log Out</Link></span>
                        </div>
                        ) : (
                        <div>
                            <span className="nav-text"><Link to="/accounts/login">Log In</Link></span>
                            <span>&nbsp;|&nbsp;</span>
                            <span className="nav-text"><Link to="/accounts/registration">Registration</Link></span>
                        </div>
                        )
                    }
                    <Dropdown />
                </div>
            </div>
        </nav>
    );
}