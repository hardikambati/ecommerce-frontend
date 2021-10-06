import { loggedReducer } from './isLogged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    logged : loggedReducer,
});
export default allReducers;