import React from 'react';
import "./login.css";
import "bootstrap/dist/css/bootstrap.css"

export default class LoginForm extends React.Component {

    state = {
        email: "",
        password: ""
    };

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {
        console.log(this.state);
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic c2VydmVyOnNlY3JldA==");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("username", this.state.email);
        urlencoded.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("localhost:4321/auth/oauth/token", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render() {
        return  (
            <div id="app" className="login-form">
                <form action={this.handleSubmit} method="post">
                    <h2 className="text-center">Login</h2>
                    <div className="form-group">
                        <input name="email" id="email" type="email" className="form-control"
                               placeholder="email"
                               required="required"
                                value={this.state.email}
                                onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="password" className="form-control"
                               placeholder="password"
                               required="required"
                                value={this.state.password}
                                onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Sing In</button>
                    </div>
                    <div className="clearfix">
                        <label className="pull-left checkbox-inline">
                            <input type="checkbox" name="remember-me" value={"remember me"}></input>
                        </label>
                        <a href="#" className="pull-right">forgot password</a>
                    </div>
                    {/*<div style="display: flex; align-items: center; justify-content: center">*/}
                    {/*    <p className="error" th:if="${param.error}"*/}
                    {/*       th:text="#{string.login.invalid.username.password}"></p>*/}
                    {/*    <p id="logout" className="FadeIn fifth" th:if="${param.logout}"*/}
                    {/*       th:text="#{string.login.user.been.logged.out}"></p>*/}
                    {/*</div>*/}
                </form>
                <p className="text-center"><a href="#">create an account</a></p>
                {/*<ul style="display: flex; align-items: center; justify-content: center" id="lang">*/}
                {/*    <li><a className="underlineHover" href="?lang=en"></a></li>*/}
                {/*    <li><a className="underlineHover" href="?lang=ua" th:text="UA"></a></li>*/}
                {/*</ul>*/}
            </div>
        );
    }
}