import React from 'react';
import { LoginForm } from './Forms/Login';
import { RegistrationForm } from './Forms/Registration';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";


const Auth = (state) => {
    const { path, url } = useRouteMatch();

    return (
        <div className='Auth-root'>
            <Switch>
                <Route path={`${path}/login`} component={LoginForm}/>
                <Route path={`${path}/registration`} component={RegistrationForm}/>
            </Switch>
        </div>
    );
}


export default Auth;