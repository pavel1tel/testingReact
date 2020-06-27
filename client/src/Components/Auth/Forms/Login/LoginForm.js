import React, { useState, useEffect } from 'react';
import { validateLoginForm } from '../Helpers/FormValidators';
import "../Forms.css";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';
import {loginAuthorizationConfig, loginGetUsernameConfig} from '../Config';


export const LoginFormComponent = ({loggedIn, setToken, onLogIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');

    const handleChange = (emailOrPassword) => (event) => {
        event.preventDefault();
        const targetValue = event.target.value;

        if (emailOrPassword === 'email') {
            setEmail(targetValue);
        } else {
            setPassword(targetValue);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const config = loginAuthorizationConfig(email, password);

        axios(config)
            .then(res => {
                const token = res.data.access_token;
                setToken(token);
                // localStorage.setItem("token", token);

                const config = loginGetUsernameConfig(token);

                axios(config)
                    .then((res) => {
                        const username = res.data;
                        onLogIn(username);
                        // localStorage.setItem('user', JSON.stringify(response.data))
                    })
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (email) {
            const errMsgs = validateLoginForm(email);

            setEmailError(errMsgs.emailErrMsg);
        }
    }, [email])

    if (loggedIn) {
        return (
            <Redirect to='/' />
        );
    } else {
        return (
            <div id="LoginForm" className="Form">
                <form onSubmit={handleSubmit} method="post">
                    <h2 className="text-center">
                        Login
                    </h2>
                    <div className="form-group">
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="email"
                            required="required"
                            value={email}
                            onChange={handleChange('email')}
                        />
                        {email && (
                            <div className="error">
                                <span>{emailError}</span>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="password"
                            required="required"
                            value={password}
                            onChange={handleChange('password')}
                        />
                    </div>
                    <div className="form-group">
                        <ReactIsCapsLockActive>
                            {active => (password || email) && active &&
                                <span className="capslock">note: Capslock is active </span>}
                        </ReactIsCapsLockActive>
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Sing In
                        </button>
                    </div>
                    <div className="clearfix">
                        <label className="pull-left checkbox-inline">
                            <input
                                type="checkbox"
                                name="remember-me"
                                value={"remember me"}
                            />
                        </label>
                        <a href="#" className="pull-right">
                            forgot password
                        </a>
                    </div>
                </form>
                <p className="text-center">
                    <a href="/accounts/registration">
                        create an account
                    </a>
                </p>
            </div>
        );
    }
}