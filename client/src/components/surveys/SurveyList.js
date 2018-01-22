import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

import Survey from './Survey';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.map(survey => {
            return <Survey key={survey._id} survey={survey} />
        })
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
};

const mapStateToProps = ({ surveys }) => {
    return { surveys }
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);