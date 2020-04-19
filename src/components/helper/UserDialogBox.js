import React,{ useState, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Box,
    TextField
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import DialpadIcon from '@material-ui/icons/Dialpad';

const UpdateSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required')
        .max(100, 'Name too long'),
    age: Yup.number()
        .min(18, 'You must be over 18'),
    email: Yup.string()
        .email()
        .min(6, 'Email too short!')
        .max(100, 'Email too long!')
        .required('Required')
});

  const useStyles = makeStyles((theme) => ({
    root: {
    },
    margin: {
        width: 500
    },
    input: {
        flex: 1
    }
  }));

const UserDialogBox = ({updateMe, showDialog, closeDialog, dialog}) => {
    const classes = useStyles();
    const { state: {userData:{user}} } = useContext(AuthContext);

    const onSubmit = (values) => {
        const updatedUser = {...user};
        updatedUser.name = values.name;
        updatedUser.age = values.age;
        updatedUser.email = values.email;
        updateMe(updatedUser);
        closeDialog();
      }

    return (
        <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update user:"}</DialogTitle>
        <DialogContent>
        <Formik
                        initialValues={{ name: user.name , age: user.age, email: user.email }}
                        validationSchema={UpdateSchema}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <AccountCircle color="primary" />
                                        </Grid>
                                        <Grid item className={classes.input}>
                                            <TextField 
                                                label="Name:" 
                                                fullWidth
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                helperText={errors.name && touched.name && errors.name}
                                                error={(errors.name && touched.name && errors.name) ? true : false}
                                            />
                                        </Grid>
                                        </Grid>
                                    </div>

                                    <div className={classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <DialpadIcon color="primary" />
                                        </Grid>
                                        <Grid item className={classes.input}>
                                            <TextField 
                                                label="Age:" 
                                                fullWidth
                                                type="number"
                                                name="age"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.age}
                                                helperText={errors.age && touched.age && errors.age}
                                                error={(errors.age && touched.age && errors.age) ? true : false}
                                            />
                                        </Grid>
                                        </Grid>
                                    </div>

                                    <div className={classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <EmailIcon color="primary" />
                                        </Grid>
                                        <Grid item className={classes.input}>
                                            <TextField 
                                                label="Email:" 
                                                fullWidth
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                helperText={errors.email && touched.email && errors.email}
                                                error={(errors.email && touched.email && errors.email) ? true : false}
                                            />
                                        </Grid>
                                        </Grid>
                                    </div>
                          <Box
                              display='flex' 
                              justifyContent="center"  
                              alignItems="center"
                              mt={3}
                          >
                              <Box mr={1}>
                                  <Button 
                                    onClick={showDialog}
                                      color="primary"
                                      type="submit"
                                  >
                                      Update User
                                  </Button>
                                    <Button 
                                        onClick={closeDialog} 
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                              </Box>
                          </Box>
                      </form>
                  )}
            </Formik>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    )
}

export default UserDialogBox;