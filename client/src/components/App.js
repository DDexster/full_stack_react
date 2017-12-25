import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';


const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/surveys' component={Dashboard}/>
                    <Route path='/surveys/new' component={SurveyNew}/>
                </div>
            </Router>
        )
    }
}


export default connect(null, actions)(App);