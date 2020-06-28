import React from "react";

import {Route, Switch, useRouteMatch} from "react-router-dom";
import {InspHome} from "./InspHome";

export const RouteInspHome = () => {
    const { path, url } = useRouteMatch();
    return (
        <div className='Auth-root'>
            <Switch>
                <Route exact path={`${path}/`} component={InspHome}/>
            </Switch>
        </div>
    );
}