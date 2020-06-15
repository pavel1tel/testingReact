import React from 'react';
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


export const AppComponent = (props) => {
  return (
    <div className="AppComponent">
        <Router>
            <Navbar />

            <Switch>
                <Route exact path='/' component={VariantText} />
                <Route path='/accounts' component={Auth} />
                { 
                // <Route path='/home/user' component={UserHome}/>
                // <Route path='/home/inspector' component={InspectorHome}/>
                }
            </Switch>
            <Footer /> 
        </Router>
    </div>
  );
}