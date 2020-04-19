export const SNACK_MESSAGE = 'LOGIN_MESSAGE';
export const CLOSE_SNACK = 'CLOSE_SNACK';

export const setSnackMessage = (data) => {
    return {
        type: SNACK_MESSAGE,
        payload: data
    }
}

export const closeSnackbar = () => {
    return {
        type: CLOSE_SNACK,
    }
}
