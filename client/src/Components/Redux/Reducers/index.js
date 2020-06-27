import { combineReducers } from 'redux';
import { auth } from './Auth/AuthReducer';

const appRedux = combineReducers({
    auth,
})

const reducer = (state, action) => {
    return appRedux(state, action);
}

export default reducer;