import React from 'react';
import { LoginForm } from './Forms/Login';
import { RegistrationForm } from './Forms/Registration';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";


const Auth = (props, state) => {
    const { path, url } = useRouteMatch();
    const setAuthToken = props.setAuthToken;
    const setUpdateNavbar = props.setUpdateNavbar;
    const updateNavbar = props.updateNavbar
    return (
        <div className='Auth-root'>
            <Switch>
                <Route path={`${path}/login`} render={(props) => <LoginForm {...props}  setAuthToken={setAuthToken}
                setUpdateNavbar = {setUpdateNavbar} updateNavbar = {updateNavbar} />}/>
                <Route path={`${path}/registration`} component={RegistrationForm}/>
            </Switch>
        </div>
    );
}


export default Auth;