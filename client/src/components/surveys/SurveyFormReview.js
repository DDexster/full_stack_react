import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import FIELDS from './formFields';

const SurveyFormReview = ({ onBack, formValues }) => {
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
                className="yellow darken-3 btn-flat"
                style={{marginRight: '20px'}}
                onClick={onBack}>
                Cancel
                </button>
                <button
                    className="green btn-flat white-text"
                    onClick={onBack}>
                    Submit
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

export default connect(mapStateToProps)(SurveyFormReview);