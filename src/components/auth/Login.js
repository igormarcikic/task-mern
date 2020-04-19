import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { SnackContext } from '../../context/snackbar/SnackContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { storeLoggedUser } from '../../context/auth/actions';
import { setSnackMessage } from '../../context/snackbar/actions';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline,
    Container,
    Grid,
    TextField,
    Box,
    Button,
    Typography,
    CircularProgress
} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    input: {
        flex: 1
    },
    alert: {
        maxWidth: 300,
        margin: '30px auto 0'
    }
}));

//validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email()
        .min(6, 'Email too short!')
        .max(100, 'Email too long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password too short!')
        .max(100, 'Password too long!')
        .required('Required')
});

const Login = (props) => {
    const { dispatchAuth } = useContext(AuthContext);
    const { dispatchSnack } = useContext(SnackContext);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const user = await axios({
                method: 'post',
                url: '/users/login',
                headers: {},
                data: {
                    email: values.email,
                    password: values.password
                }
            });
            dispatchAuth(storeLoggedUser(user.data));
            setLoading(false);
            dispatchSnack(setSnackMessage({
                message: 'Logged in sucessfully.',
                display: true,
                severity: 'success'
            }))
            history.push("/");
        } catch (error) {
            setLoading(false);
            dispatchSnack(setSnackMessage({
                message: 'Login failed, try again.',
                display: true,
                severity: 'error'
            }));
        }

    }


    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
        >

            <CssBaseline>
                <Box>
                    <Typography variant="h4" gutterBottom align="center">
                        Log In:
                </Typography>
                </Box>
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            onSubmit(values);
                        }}
                        isSubmitting
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                                <form onSubmit={handleSubmit}>
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

                                    <div className={classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <VisibilityOffIcon color="primary" />
                                            </Grid>
                                            <Grid item className={classes.input}>
                                                <TextField
                                                    autoComplete="on"
                                                    label="Password:"
                                                    fullWidth
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    helperText={errors.password && touched.password && errors.password}
                                                    error={(errors.password && touched.password && errors.password) ? true : false}
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
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                {loading ? <CircularProgress color="secondary" /> : 'Log In'}
                                            </Button>
                                        </Box>
                                        <Box ml={1}>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                component={Link} to='/signup'
                                            >
                                                Sign Up
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}
                    </Formik>

                    {/* <Snackbar open={snackbar.display} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={snackbar.severity}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar> */}
                </Container>
            </CssBaseline>

        </motion.div>
    )
};

export default Login;