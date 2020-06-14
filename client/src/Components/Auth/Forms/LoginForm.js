import React, { useState } from 'react';
import "./loginForm.css";
import "bootstrap/dist/css/bootstrap.css"
import $ from 'jquery';


export const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (emailOrPassword) => (event) => {
        const targetName = event.target.name;

        if (emailOrPassword === 'email') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var settings = {
            "url": "http://localhost:4321/auth/oauth/token",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Basic c2VydmVyOnNlY3JldA==",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "JSESSIONID=251AF6D548DF73B8CEBE77D3A3D268CF"
            },
            "data": {
                "grant_type": "password",
                "username": "pawloiwanov2@gmail.com",
                "password": "grib1111"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }


    return (
        <div id="" className="LoginForm">
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