import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Dropdown} from './Dropdown';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {onLogOutAction} from '../Redux/Actions/auth';


const HomeLink = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return (
            <span>
                <li className="nav-item active">
                    <Link
                        to={`/home/${user.role === "ROLE_USER" ? 'user' : 'insp'}`}
                        className="nav-link"
                    >
                        Home
                    </Link>
                </li>
            </span>
        )
    } else {
        return (
            <span></span>
        )
    }
}

const NavbarComponent = ({token, loggedIn, username, onLogOut}) => {
    const [logOut, setLogOut] = useState(false);

    const handleLogOut = () => {
        setLogOut(true);
        onLogOut();
    }

    if (logOut) {
        return (
            <Redirect to='/accounts/login'/>
        );
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/" style={{color: 'black'}}>Testing</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {token && <HomeLink /> }
                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        {loggedIn ? (
                            <div>
                                <span className="nav-text"><a href="#">{username}</a></span>
                                <span>&nbsp;|&nbsp;</span>
                                <span className="nav-text"><Link onClick={handleLogOut}>Log Out</Link></span>
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
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    loggedIn: state.auth.loggedIn,
});

const mapDisparchToProps = (dispatch) => ({
    onLogOut: username => {
        dispatch(onLogOutAction());
    },
});

export const Navbar = connect(mapStateToProps, mapDisparchToProps)(NavbarComponent);