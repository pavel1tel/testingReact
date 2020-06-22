import React, { useState } from 'react';
import Auth from "./Auth";
import './App.css';
import { Footer } from './UI/Footer';
import { Navbar } from './UI/Navbar';
import { VariantText } from './UI/VariantText';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Error403} from "./Errors/Error403";
import {Home} from "./Home";


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
                  <Route path='/home' component={Home}/>
              </Switch>

              <Footer /> 
          </Router>
      </div>
    );
}