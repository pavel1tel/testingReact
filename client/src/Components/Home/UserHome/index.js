import {LoginForm} from "../../Auth/Forms/Login";
import {RegistrationForm} from "../../Auth/Forms/Registration";
import React from "react";
import {UserHome} from "./UserHome";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {AddReport} from "./addReport";

export const RouteUserHome = () => {
    const { path, url } = useRouteMatch();
    return (
        <div className='Auth-root'>
            <Switch>
                <Route exact path={`${path}/add`} component={AddReport}/>
                <Route exact path={`${path}/`} component={UserHome}/>
            </Switch>
        </div>
    );
}