import {connect} from 'react-redux';
import {LoginFormComponent} from './LoginForm';
import {setAuthTokenAction, onLogInAction} from '../../../Redux/Actions/auth';


const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
});

const mapDisparchToProps = (dispatch) => ({
    setToken: token => {
        dispatch(setAuthTokenAction(token));
    },
    onLogIn: username => {
        dispatch(onLogInAction(username));
    },
});

export const LoginForm = connect(mapStateToProps, mapDisparchToProps)(LoginFormComponent);