export const homeGetReportsConfig = (inspOrUser) => (token) => {
    const data = '';

    const config = {
        method: 'get',
        url: `http://localhost:4321/report/${inspOrUser === 'insp' ? 'insp' : 'user'}/reports`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data
    };

    return config;
}

export const homeUpdateReportConfig = (name, description, id, token) => {
    const data = JSON.stringify({
        name,
        description,
    });
    
    const config = {
        method: 'post',
        url: 'http://localhost:4321/report/user/update/' + id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=E8ACC8A1B9305FFA04A28F58DB751167'
        },
        data,
    };

    return config;
}

export const homeGetUpdatedReportConfig = (id, token) => {
    const data = '';

    const config = {
        method: 'get',
        url: 'http://localhost:4321/report/user/update/' + id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Cookie': 'JSESSIONID=E8ACC8A1B9305FFA04A28F58DB751167'
        },
        data,
    };

    return config;
}

export const homeAddReportConfig = (name, description, token) => {
    const data = JSON.stringify({
        name,
        description
    });

    const config = {
        method: 'post',
        url: 'http://localhost:4321/report/user/add',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=A15BA114CD379304461B4AF738691CC0'
        },
        data,
    };

    return config;
}

export const declineConfig = (reason, id, token) => {
    const data = JSON.stringify({
        "declineReason": reason
    });

    const config = {
        method: 'post',
        url: 'http://localhost:4321/report/insp/decline/' + id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data,
    };

    return config;
}

export const acceptConfig = (id, token) => {
    const data = "";

    const config = {
        method: 'post',
        url: 'http://localhost:4321/report/insp/accept/' + id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data,
    };


    return config;
}

export const changeInspectorConfig = (id, token) => {
    const data = "";

    const config = {
        method: 'post',
        url: 'http://localhost:4321/report/user/change/' + id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=0F79A812E5B03983E77357B97909D8F6'
        },
        data,
    };

    return config;
}

