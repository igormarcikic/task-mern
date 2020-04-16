import { LOGIN, LOGIN_ERROR, LOGOUT, DELETE, SIGNUP_ERROR, TASK_ERROR } from './actions';

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
                    user: null
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
        default: {
            return state;
        }
    }
}

export default reducer;