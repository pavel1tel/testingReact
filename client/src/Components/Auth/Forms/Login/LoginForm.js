import React, { useState } from 'react';
import "../Forms.css";
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios';


export const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

        const headers = new Headers();
        headers.append("Authorization", "Basic c2VydmVyOnNlY3JldA==");
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        const urlEncoded = new URLSearchParams();
        urlEncoded.append("grant_type", "password");
        urlEncoded.append("username", email);
        urlEncoded.append("password", password);

        const data = {
            body: urlEncoded,
        };

        axios
          .post("localhost:4321/auth/oauth/token", data, headers)
          .then(res => res.data)
          .then(data => console.log(data))
          .catch(err => console.log(err));
    }


    return (
        <div id="LoginForm" className="LoginForm">
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
                {/*<div style="display: flex; align-items: center; justify-content: center">*/}
                {/*    <p className="error" th:if="${param.error}"*/}
                {/*       th:text="#{string.login.invalid.username.password}"></p>*/}
                {/*    <p id="logout" className="FadeIn fifth" th:if="${param.logout}"*/}
                {/*       th:text="#{string.login.user.been.logged.out}"></p>*/}
                {/*</div>*/}
            </form>
            <p className="text-center">
                <a href="#"> 
                    create an account 
                </a>
            </p>
            {/*<ul style="display: flex; align-items: center; justify-content: center" id="lang">*/}
            {/*    <li><a className="underlineHover" href="?lang=en"></a></li>*/}
            {/*    <li><a className="underlineHover" href="?lang=ua" th:text="UA"></a></li>*/}
            {/*</ul>*/}
        </div>
    );
}