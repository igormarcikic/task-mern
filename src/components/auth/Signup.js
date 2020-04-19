import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { storeLoggedUser, signupError } from '../../context/auth/actions';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline,
    Container,
    Grid,
    TextField,
    Box,
    Button,
    Typography
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DialpadIcon from '@material-ui/icons/Dialpad';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    input: {
        flex:1
    },
    alert: {
        maxWidth: 300,
        margin: '30px auto 0'
    }
  }));

//validation schema
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required')
        .max(100, 'Name too long'),
    age: Yup.number()
        .min(18, 'You must be over 18'),
    email: Yup.string()
        .email()
        .min(6, 'Email too short!')
        .max(100, 'Email too long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password too short!')
        .max(100, 'Password too long!')
        .required('Required'),
})


const Signup = (props) => {
    const { state, dispatch } = useContext(AuthContext);
    const [alertState, setAlertState] = useState({
        success: false,
        error: false
    })
    const history = useHistory();
    const classes = useStyles();

    useEffect(()=>{
        setAlertState({
            error: false,
            success: false
        });

        return function() {
            setAlertState({
                error: false,
                success: false
            });
          };
    },[]);

    const onSubmit = async (values) => {
        try {
            const user = await axios({
                method: 'post',
                url: '/users',
                headers: {}, 
                data: {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    age: values.age
                }
            });
            dispatch(storeLoggedUser(user));
            setAlertState({
                error: false,
                success: true
            });
            history.push("/");
        }catch(error) {
            console.log(error.message)
            dispatch(signupError());
            setAlertState({
                success: false,
                error: true
            });
        }

    }

      const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
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
                        Sign Up:
                    </Typography>
                </Box>
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{ name: '' , age: 0, email: '', password: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }) => {
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
                            isSubmitting,
                            /* and other goodies */
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
                                    {alertState.error ? <Alert severity="error" className={classes.alert}>{state.error}</Alert> : null }
                                    {alertState.success ? <Alert severity="success" className={classes.alert}> You've logged in successfully. </Alert> : null }
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
                                                Sign up
                                            </Button>
                                        </Box>
                                        <Box ml={1}>
                                            <Button 
                                                variant="contained" 
                                                color="default" 
                                                component={Link} to='/login'
                                            >
                                                Log In
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}
                    </Formik>
                </Container>
            </CssBaseline>
        </motion.div>
    )
};

export default Signup;