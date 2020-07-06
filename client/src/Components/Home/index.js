import React from "react";
import {Route, Switch, useRouteMatch, Redirect} from "react-router-dom";
import {RouteUserHome} from "./UserHome";
import {RouteInspHome} from "./InspHome";

export const Home = () => {
    const { path, url } = useRouteMatch();
    const authToken = localStorage.getItem("token");
    if(!authToken && false) {
        return <Redirect to='/accounts/login'/>
    } else {
        return (
            <div className='Auth-root'>
                <Switch>
                    <Route path={`${path}/user`} component={RouteUserHome} />
                    <Route path={`${path}/insp`} component={RouteInspHome}/>
                </Switch>
            </div>
        );
    }
}