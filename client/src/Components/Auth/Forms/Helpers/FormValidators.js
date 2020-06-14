const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validateEmail = (email) => {
    let errMsg = '';

    if (! emailRegexp.test(email.toLowerCase())) {
        errMsg = "invalid email";
    } else {
        errMsg = '';
    }

    return errMsg;
}

const isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const validatePassword = (password) => {
    let errMsg = '';
    
    if (isNumeric(password)) {
        errMsg = "password must contain letters";
    } else if (password.length < 8) {
        errMsg = "password must contain at least 8 character's";
    } else {
        errMsg = '';
    }

    return errMsg;
}

const validateUsername = (username) => {
    let errMsg = '';

    if (!username) {
        errMsg = 'provide username';
    } else {
        errMsg = '';
    }

    return errMsg;
}   

const validateConfirmedPassword = (password, confirmedPassword) => {
    let errMsg = '';
    
    if (password !== confirmedPassword) {
        errMsg = "password dont match";
    } else {
        errMsg = '';
    }

    return errMsg;
}

export const validateRegistrationForm = (
    password, username, email, confirmedPassword
) => {
    const passwordErrMsg = validatePassword(password);
    const usernameErrMsg = validateUsername(username);
    const emailErrMsg = validateEmail(email);
    const confirmedPasswordErrMsg = validateConfirmedPassword(password, confirmedPassword);
    
    return {
       passwordErrMsg,
       usernameErrMsg,
       emailErrMsg,
       confirmedPasswordErrMsg,
    }
}

export const validateLoginForm = (email) => {
    const emailErrMsg = validateEmail(email);

    return {
        emailErrMsg,
    }
}