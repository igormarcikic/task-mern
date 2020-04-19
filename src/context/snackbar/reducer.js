import { LOGIN_MESSAGE, CLOSE_SNACK, TASK_MESSAGE, UPDATED_USER } from './actions';

const reducer = (state, action) => {
    switch(action.type) {
        case LOGIN_MESSAGE:
            return {
                message: action.payload.message,
                display: action.payload.display,
                severity: action.payload.severity
            }
        case TASK_MESSAGE:
            return {
                message: action.payload.message,
                display: action.payload.display,
                severity: action.payload.severity
            }
        case UPDATED_USER:
            return {
                message: action.payload.message,
                display: action.payload.display,
                severity: action.payload.severity
            }
        case CLOSE_SNACK:
            return {
                ...state,
                display: false
            }
        default: {
            return state
        }
    }
}

export default reducer;