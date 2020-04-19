import React from 'react';
import {
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const SnackMessage = ({ message, display, severity, handleClose }) => {

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    return (
        <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackMessage;