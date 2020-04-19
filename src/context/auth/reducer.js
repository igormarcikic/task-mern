import { LOGIN, LOGOUT, DELETE, UPDATE_USER } from './actions';

const reducer = (state, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                user: action.payload.user,
                token: action.payload.token
            }
        case DELETE:
        case LOGOUT: 
            return {
                user: null,
                token: null
            }
        case UPDATE_USER:
            return {
                user: action.payload.user,
                token: action.payload.token
            }
        default: {
            return state;
        }
    }
}

export default reducer;