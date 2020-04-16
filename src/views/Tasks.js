import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { motion } from 'framer-motion';
import { taskError } from '../context/auth/actions';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Button,
    Grid,
    Typography,
    Box,
    TextField
} from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


//validation schema
const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(100, 'Title too long'),
  description: Yup.string()
    .required('Required')
    .min(15, 'Description too short')
});

const Tasks = () => {
  const classes = useStyles();
  const [ tasks, setTasks ] = useState([]);
  const [alertState, setAlertState] = useState({
      success: false,
      error: false
  });
  const { state: {userData:{token}, error}, dispatch } = useContext(AuthContext);

    const onSubmit = async (values, resetForm) => {
      try {
        const task = await axios({
            method: 'post',
            url: '/tasks',
            headers: {'Authorization' : `Bearer ${token}`}, 
            data: {
                title: values.title,
                description: values.description
            }
        });
        const allTasks = [...tasks];
        allTasks.push(task.data);
        setTasks(allTasks);
        resetForm({});
        setAlertState({
          error: false,
          success: true
      });
    }catch(error) {
        dispatch(taskError());
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
      <Container>
        <Typography variant="h2" gutterBottom align="center">
            Add new task:
        </Typography>
        <hr />
        <Box
          display='flex' 
          justifyContent="center"  
          alignItems="center"
        >
          <Formik
              initialValues={{ title: '', description: '' }}
              validationSchema={TaskSchema}
              onSubmit={(values, { resetForm }) => {
                  onSubmit(values, resetForm);
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
                  resetForm
                  /* and other goodies */
              }) => (
                      <form onSubmit={handleSubmit}>
                          <div className={classes.margin}>
                              <Grid container spacing={1} alignItems="flex-end">
                              <Grid item>
                                  <TitleIcon color="primary" />
                              </Grid>
                              <Grid item className={classes.input}>
                                  <TextField 
                                      label="Title:" 
                                      fullWidth
                                      type="text"
                                      name="title"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.title}
                                      helperText={errors.title && touched.title && errors.title}
                                      error={(errors.title && touched.title && errors.title) ? true : false}
                                  />
                              </Grid>
                              </Grid>
                          </div>

                          <div className={classes.margin}>
                              <Grid container spacing={1} alignItems="flex-end">
                              <Grid item>
                                  <TextFieldsIcon color="primary" />
                              </Grid>
                              <Grid item className={classes.input}>
                                  <TextField 
                                      label="Description:" 
                                      fullWidth
                                      multiline
                                      rows={6}
                                      type="text"
                                      name="description"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.description}
                                      helperText={errors.description && touched.description && errors.description}
                                      error={(errors.description && touched.description && errors.description) ? true : false}
                                  />
                              </Grid>
                              </Grid>
                          </div>
                          {alertState.error ? <Alert severity="error" className={classes.alert}>{error}</Alert> : null }
                          {alertState.success ? <Alert severity="success" className={classes.alert}> Added new task successfully. </Alert> : null }
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
                                      Add Task
                                  </Button>
                              </Box>
                          </Box>
                      </form>
                  )}
            </Formik>
        </Box>
      </Container>
    </motion.div>
  );
}

export default Tasks;