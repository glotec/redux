import { comineReducers } from 'redux';
import auth from './auth';
import message from './message';

export default comineReducers({
    auth,
    message,
});