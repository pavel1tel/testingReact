import React from "react";
import {UserHome} from "./UserHome";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {AddReport} from "./AddReport";
import {UpdateReport} from "./UpdateReport";
import {connect} from 'react-redux';


const RouteUserHomeComponent = ({token}) => {
    const { path, url } = useRouteMatch();

    return (
        <div className='UserHome'>
            <Switch>
                <Route exact path={`${path}/add`}>
                    <AddReport token={token} />
                </Route>
                <Route exact path={`${path}/`}>
                    <UserHome token={token} />
                </Route>
                <Route path={`${path}/update/:id`} children={<UpdateReport token={token} />} />
            </Switch>
        </div>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
});


export const RouteUserHome = connect(mapStateToProps, null)(RouteUserHomeComponent);