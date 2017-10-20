import React, { Component } from 'react';
import Payments from './Payments';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                );
            default:
                return [
                    <li key={1}><a><Payments/></a></li>,
                    <li key={2} style={{margin: '0 10px'}}><strong>Credits: {this.props.auth.credits}</strong></li>,
                    <li key={3}><a href="/api/logout">Logout</a></li>,
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper blue-grey darken-1">
                    <Link to={this.props.auth ? '/surveys' : '/'}
                          className="left brand-logo ">
                        SurveyVe
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps)(Header);