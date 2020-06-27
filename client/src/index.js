import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppComponent as App } from './Components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { create } from './Components/Redux';
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const store = create()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
