export const LOGIN_MESSAGE = 'LOGIN_MESSAGE';
export const CLOSE_SNACK = 'CLOSE_SNACK';
export const TASK_MESSAGE = 'TASK_MESSAGE'; 
export const UPDATED_USER = 'UPDATED_USER';

export const setLoginMessage = (data) => {
    return {
        type: LOGIN_MESSAGE,
        payload: data
    }
}

export const setTaskMessage = (data) => {
    return {
        type: TASK_MESSAGE,
        payload: data
    }
}

export const setUpdatedUserMessage = (data) => {
    return {
        type: UPDATED_USER,
        payload: data
    }
}

export const closeSnackbar = () => {
    return {
        type: CLOSE_SNACK,
    }
}
