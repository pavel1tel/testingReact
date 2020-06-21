import React, { useState } from 'react';
import Auth from "./Auth";
import './App.css';
import { UserHome } from "./UserHome/UserHome";
import { Footer } from './UI/Footer';
import { Navbar } from './UI/Navbar';
import { VariantText } from './UI/VariantText';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Error403} from "./Errors/Error403";


export const AppComponent = (props) => {
    const [authToken, setAuthToken] = useState('');
    return (
      <div className="AppComponent">
          <Router>
              <Navbar />

              <Switch>
                  <Route exact path='/' component={VariantText} />
                  <Route exact path='/error' component={Error403} />
                  <Route 
                      path='/accounts' 
                      render={(props) => <Auth {...props} setAuthToken={setAuthToken} />}
                  />
                  <Route 
                      path='/home/user' 
                      render={(props) => <UserHome {...props} authToken={authToken} />}
                  />
                  {/*<Route path='/home/inspector' component={InspectorHome}*/}
              </Switch>

              <Footer /> 
          </Router>
      </div>
    );
}