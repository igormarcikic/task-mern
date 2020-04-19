import React, { useEffect, useContext, useState } from 'react';
import DialogBox from '../components/helper/TaskDialogBox';
import { AuthContext } from '../context/auth/AuthContext';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Snackbar,
  ListItemIcon
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
  },
}));


const Home = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [dialog, setDialog] = useState({
    display: false,
    id: null
  })
  const [snackbar, setSnackbar] = useState({
    message: null,
    display: false,
    severity: null
  });
  const { state: { token } } = useContext(AuthContext);

  const handleClick = (message) => {
    if (message === 'success') {
      setSnackbar({
        message: 'Note deleted sucessfully.',
        display: true,
        severity: 'success'
      })
    }

    if (message === 'error') {
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

  const deleteTask = async (id) => {
    await axios({
      method: 'delete',
      url: `/tasks/${id}`,
      headers: { 'Authorization': `Bearer ${token}` },
      data: {}
    });
    let newTasks = [...tasks];
    newTasks = newTasks.filter(task => task._id !== id);
    setTasks(newTasks);
    handleClick('success');
  };

  const showDialog = (id) => {
    setDialog({
      display: true,
      id: id
    })
  }

  const closeDialog = () => {
    setDialog({
      ...dialog,
      display: false
    })
  };

  useEffect(() => {
    const getTasks = async (url) => {
      const tasks = await axios({
        method: 'get',
        url: url,
        headers: { 'Authorization': `Bearer ${token}` },
        data: {}
      });
      setTasks(tasks.data);
    }
    getTasks('/tasks');
  }, [token])

  const updateTask = async (task) => {
    const newTasks = tasks.filter(t => t._id !== task._id);
    newTasks.push(task);
    setTasks(newTasks);
    try {
      await axios({
        method: 'patch',
        url: `/tasks/${task._id}`,
        headers: { 'Authorization': `Bearer ${token}` },
        data: {
          title: task.title,
          description: task.description
        }
      })
      handleClick('success');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <Container align="center">
        <Typography variant="h4" gutterBottom>
          All Tasks:
        </Typography>
        <hr />
        <List className={classes.root}>
          {tasks.length > 0 ? tasks.map(task => (
            <ListItem key={task._id}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={task.title} secondary={task.description} />
              <ListItemIcon>
                <IconButton edge="end" aria-label="delete" onClick={() => showDialog(task._id)}>
                  <EditIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )) : <Box>
              <Typography variant="h4" gutterBottom >
                No tasks.
            </Typography>
            </Box>}
        </List>

        <Snackbar open={snackbar.display} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        {dialog.display ? <DialogBox display={dialog.display} id={dialog.id} closeDialog={closeDialog} tasks={tasks} updateTask={updateTask} /> : null}
      </Container>
    </motion.div>
  );
}

export default Home;