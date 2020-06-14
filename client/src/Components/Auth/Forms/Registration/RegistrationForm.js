import React, { useState } from 'react';
import "../Forms.css";
import "bootstrap/dist/css/bootstrap.css";


export const RegistrationForm = (props) => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [usernameError, setUserameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmedPasswordError, setConfirmedPasswordError] = useState('');
    const [hasErrors, setHasErrors] = useState(true);

    const isNumeric = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // TODO: username err handling
    const validateRegistrationForm = () => {
        const re = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        if (isNumeric(password)) {
            setPasswordError("password must contain letters");
        } else if (password.length < 8) {
            setPasswordError("password must contain at least 8 character's");
        } else {
            setPasswordError('');
        }
        
        if (! re.test(email.toLowerCase())) {
            setEmailError("invalid email");
        } else {
            setEmailError("");
        }
        
        if (password !== confirmedPassword){
            setConfirmedPasswordError("password dont match");
        } else {
            setConfirmedPasswordError('');
        }

        if (passwordError || emailError || confirmedPasswordError || usernameError) {
            setHasErrors(true);
        } else {
            setHasErrors(false);
        }
    }

    const handleChange = (handleType) => (event) => {
        event.preventDeafault();
        const targetValue = event.target.value;

        switch(handleType) {
            case 'username':
                setUsername(targetValue);
                break;
            case 'email':
                setEmail(targetValue);
                break;
            case 'password':
                setPassword(targetValue);
                break;
            case 'confirmedPassword':
                setConfirmedPassword(targetValue);
                break;
            default:
                console.log('missed handle type');
        }

        validateRegistrationForm();
    }

    return (
        <div id="RegistrationForm" className="RegistrationForm">
            <form action="/accounts/registration" method="post">
                <h2 className="text-center">
                    Registration
                </h2>
                <div className="form-group">
                    <input name="username" id="username" type="text"
                           className={'form-control ' 
                                      + ((username === "") ? "" : ((usernameError) ? "is-invalid" : "is-valid"))}
                           placeholder="username"
                           required="required"
                           value={username}
                            onChange={handleChange('username')}>
                    </input>
                    <span className="error">{usernameError}</span>
                </div>
                <div className="form-group">
                    <input name="email" id="email" type="email"
                           className={'form-control ' 
                                      + ((email === "") ? "" : ((emailError) ? "is-invalid" : "is-valid"))}
                           placeholder="email"
                           required="required"
                           value={email}
                           onChange={handleChange('email')}>
                    </input>
                    <span className="error">{emailError}</span>
                </div>
                <div className="form-group">
                    <input type="password" name="password" id="password"
                           className={'form-control ' 
                                      + ((password === "") ? "" : ((passwordError) ? "is-invalid" : "is-valid"))}
                           placeholder="password"
                           value={password}
                           onChange={handleChange('password')}
                           required="required">
                    </input>
                    <span className="error">{passwordError}</span>
                </div>
                <div className="form-group">
                    <input type="password" name="confirmedPassword" id="confirmedPassword"
                           className={'form-control ' 
                                      + ((confirmedPassword === "") ? "" : ((confirmedPasswordError) ? "is-invalid" : "is-valid"))}
                           placeholder="confirmedPassword"
                           value={confirmedPassword}
                           onChange={handleChange('confirmedPassword')}
                           required="required">
                    </input>
                    <span className="error">{confirmedPasswordError}</span>
                </div>
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block" 
                        disabled={hasErrors}
                    >
                        Sing up
                    </button>
                </div>
            </form>
            <p className="text-center">
                <a href="/accounts/auth/login"> 
                    i already have an account
                </a>
            </p>
            <ul id="lang">
                <li><a className="underlineHover" href="?lang=en">EN</a></li>
                <li><a className="underlineHover" href="?lang=ua">UA</a></li>
            </ul>
        </div>
    );
}