import React from 'react';
import Auth from "./Components/Auth";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const AppComponent = (props) => {
  return (
    <div className="AppComponent">
        <Router>
            <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                    </ul>
                </nav>
            </header>

            <Switch>
                <Route exact path='/'>
                    Main page
                </Route>
                <Route exact path='/accounts' component={Auth}/>
                { 
                // <Route path='/home/user' component={UserHome}/>
                // <Route path='/home/inspector' component={InspectorHome}/>
                }
            </Switch>
        </Router>
    </div>
  );
}

export default AppComponent;
