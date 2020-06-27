import qs from 'qs';


export const loginAuthorizationConfig = (email, password) => {
    const data = qs.stringify({
        'grant_type': 'password',
        'username': email,
        password,
    });

    const config = {
        method: 'post',
        url: 'http://localhost:4321/auth/oauth/token',
        headers: {
            'Authorization': 'Basic c2VydmVyOnNlY3JldA==',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data,
    };

    return config;
}

export const loginGetUsernameConfig = (token) => {
    const data = '';

    const config = {
        method: 'get',
        url: 'http://localhost:4321/accounts/current',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        data,
    };

    return config;
}

export const registrationSubmitConfig = (username, email, password, confirmPassword) => {
    const data = JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
    });

    const config = {
        method: 'post',
        url: 'http://localhost:4321/accounts/create',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=101892E703543C95CC78FA5362024957'
        },
        data,
    };

    return config;
}