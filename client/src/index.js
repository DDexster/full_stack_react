import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';


import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

//Dev temp thing to check SendGrid
// const survey = {title: 'App survey', body: 'Do you like our app', subject: 'SurveyVe survey', recipients: 'd.bondrnko@gmail.com'}
import axios from 'axios';
window.axios = axios;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // dev thing for REDUX dev tools

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);