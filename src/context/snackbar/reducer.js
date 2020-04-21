import { SNACK_MESSAGE, CLOSE_SNACK } from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case SNACK_MESSAGE:
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