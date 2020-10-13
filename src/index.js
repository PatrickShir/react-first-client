import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';
try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token')).jwt;
} catch (e) {
    console.log("No JWT found in LocalStorage!")
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
    