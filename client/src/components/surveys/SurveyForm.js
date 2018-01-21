import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import validateEmails from '../../utils/validateEmails';

import SurveyField from './SurveyField';

import FIELDS from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, (field, index) => {
            return <Field key={index}
                          component={SurveyField}
                          type={'text'}
                          label={field.label}
                          placeholder={field.label}
                          name={field.name}/>
        });
    };

    render() {
        return (
            <div className='container'>
                <h5>Create New Survey Form</h5>
                <form style={{ marginTop: '40px' }}
                      onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to='/surveys' className='red btn-flat left white-text'>
                        Cancel
                    </Link>
                    <button type='submit' className='blue btn-flat right white-text'>
                        Next
                        <i className='material-icons right'>done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(FIELDS, ({ name, label }) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${label.toLowerCase()}`
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);