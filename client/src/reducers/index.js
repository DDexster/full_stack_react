import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveysReducer';

export default combineReducers({
    auth: authReducer,
    surveys: surveyReducer,
    form: reduxForm
})
