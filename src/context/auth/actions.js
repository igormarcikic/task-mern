export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const TASK_ERROR = 'TASK_ERROR';
export const LOGOUT = 'LOGOUT';
export const DELETE = 'DELETE'
export const UPDATE_USER = 'UPDATE_USER'

export const storeLoggedUser = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
};

// export const loginError = () => {
//     return {
//         type: LOGIN_ERROR
//     }
// }

// export const signupError = () => {
//     return {
//         type: SIGNUP_ERROR
//     }
// }

// export const taskError = () => {
//     return {
//         type: TASK_ERROR
//     }
// }

export const logoutUser = () => {
    return {
        type: LOGOUT
    }
}

export const deleteUser = () => {
    return {
        type: DELETE
    }
}

export const storeUpdatedUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data
    }
}