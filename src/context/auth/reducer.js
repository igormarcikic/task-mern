import { LOGIN, LOGIN_ERROR, LOGOUT, DELETE, SIGNUP_ERROR, TASK_ERROR, UPDATE_USER } from './actions';

const reducer = (state, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                userData: action.payload
            }
        case DELETE:
        case LOGOUT: 
            return {
                ...state,
                userData: {
                    user: null,
                    token: null
                }
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: 'Failed to login, please try again.'
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                error: 'Failed to signup, please try again.'
            }
        case TASK_ERROR:
            return {
                ...state,
                error: 'Failed to create a task, please try again'
            }
        case UPDATE_USER:
            return {
                ...state,
                userData: action.payload
            }
        default: {
            return state;
        }
    }
}

export default reducer;