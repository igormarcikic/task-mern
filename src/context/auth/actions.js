export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const DELETE = 'DELETE'
export const UPDATE_USER = 'UPDATE_USER'

export const storeNewUser = (data) => {
    return {
        type: SIGNUP,
        payload: data
    }
}

export const storeLoggedUser = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
};

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