import React, { useContext } from 'react';
import { SnackContext } from '../../context/snackbar/SnackContext';
import { closeSnackbar } from '../../context/snackbar/actions';
import {
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const SnackMessage = () => {
    const { state: { message, display, severity }, dispatchSnack } = useContext(SnackContext);

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        dispatchSnack(closeSnackbar());
    };

    return (
        <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackMessage;