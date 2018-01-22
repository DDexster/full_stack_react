import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter} from 'react-router-dom';

import FIELDS from './formFields';

const SurveyFormReview = ({ onBack, formValues, submitSurvey, history }) => {
    const renderFields = _.map(FIELDS, ({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    })

    return (
        <div className='container'>
            <h5>Please confirm your entries:</h5>
            <div>
                {renderFields}
            </div>
            <div style={{marginTop: '20px'}}>
                <button
                className="yellow darken-3 btn white-text"
                style={{marginRight: '20px'}}
                onClick={onBack}>
                Cancel
                </button>
                <button
                    className="green btn white-text"
                    onClick={() => submitSurvey(formValues, history)}>
                    Send Survey
                    <i className='material-icons right'>email</i>
                </button>
            </div>
        </div>
    )
};

const mapStateToProps = ({ form: { surveyForm: { values } } }) => {
    return {
        formValues: values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));