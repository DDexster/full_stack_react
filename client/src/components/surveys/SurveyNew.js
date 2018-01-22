import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = {
        showReview: false
    }

    render() {
        return (
            <div>
                {!this.state.showReview ?
                    <SurveyForm onSurveySubmit={() => this.setState({ showReview: true })}/>
                    :
                    <SurveyFormReview onBack={() => this.setState({ showReview: false })}/>
                }
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);