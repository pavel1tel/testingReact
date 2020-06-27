import {SET_AUTH_TOKEN, LOG_IN, LOG_OUT} from '../../Actions/auth';


const initialState = {
    authToken: '',
    loggedIn: false,
    username: 'anonym',
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN: {
            return {
                ...state,
                authToken: action.authToken,
            }
        }
        case LOG_IN: {
            return {
                ...state,
                loggedIn: true,
                username: action.username,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                loggedIn: false,
                username: initialState.username,
                authToken: initialState.authToken,
            }
        }
        default: 
            return state;
    }
}