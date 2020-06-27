export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthTokenAction = (authToken) => ({
    type: SET_AUTH_TOKEN,
    authToken,
});

export const LOG_IN = 'LOG_IN';
export const onLogInAction = (username) => ({
    type: LOG_IN,
    username,
})

export const LOG_OUT = 'LOG_OUT';
export const onLogOutAction = () => ({
    type: LOG_OUT,
})