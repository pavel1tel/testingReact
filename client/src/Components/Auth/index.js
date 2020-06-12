import React from 'react';
import { LoginForm } from './Forms';
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
                {
                // <Route {`${path}/registration`} component={Registration}/>
                }
            </Switch>
        </div>
    );
}


export default Auth;