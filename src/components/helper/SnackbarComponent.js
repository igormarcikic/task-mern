import React, { useState } from 'react';
import {
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const SnackbarComponent = (props) => {
    const [snackbar, setSnackbar] = useState({
      message: null,
      display: false,
      severity: null
    });

    const handleClick = (message) => {
        console.log(message)
        if(message === 'success') {
          setSnackbar({
            message: 'Note created sucessfully.',
            display: true,
            severity: 'success'
          })
        } 
    
        if(message === 'error') {
          setSnackbar({
            message: 'There was an error.',
            display: true,
            severity: 'error'
          })
        }
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbar({
          ...snackbar,
          display: false
        });
      };

      const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    return (
        <Snackbar open={snackbar.display} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.severity}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent;