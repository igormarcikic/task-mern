import React,{ useState, useEffect } from 'react';
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
import TitleIcon from '@material-ui/icons/Title';
import TextFieldsIcon from '@material-ui/icons/TextFields';

//validation schema
const TaskSchema = Yup.object().shape({
    title: Yup.string()
      .required('Required')
      .max(100, 'Title too long'),
    description: Yup.string()
      .required('Required')
      .min(15, 'Description too short')
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

const DialogBox = ({tasks, display, id, closeDialog, updateTask}) => {
    const classes = useStyles();
    const [task, setTask] = useState({});

    useEffect(()=>{
        const task = tasks.docs.filter(task=> task._id === id);
        setTask(task[0]);
    },[id, tasks])

    const onSubmit = (values) => {
        const updatedTask = {...task};
        updatedTask.title = values.title;
        updatedTask.description = values.description;
        updateTask(updatedTask);
        closeDialog();
      }

    return (
        <Dialog
        open={display}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update task:"}</DialogTitle>
        <DialogContent>
          <Formik
              initialValues={{ title: task.title, description: task.description }}
              validationSchema={TaskSchema}
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
                              <Grid item className={classes.input} >
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
                          <Box
                              display='flex' 
                              justifyContent="center"  
                              alignItems="center"
                              mt={3}
                          >
                              <Box mr={1}>
                                  <Button 
                                      color="primary"
                                      type="submit"
                                  >
                                      Update Task
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

export default DialogBox;