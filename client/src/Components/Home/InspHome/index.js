import {connect} from 'react-redux';
import {InspHome} from "./InspHome";
import {setAuthTokenAction, onLogInAction} from '../../Redux/Actions/auth';


const mapStateToProps = (state) => ({
    token: state.auth.token,
});

export const RouteInspHome = connect(mapStateToProps, null)(InspHome);