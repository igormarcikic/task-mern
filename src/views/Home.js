import React, { useEffect, useContext, useState } from 'react';
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
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


const Home = () => {
  const classes = useStyles();
  const [ tasks, setTasks ] = useState([]);
  const { state: {userData:{token}} } = useContext(AuthContext);
  
    
    const deleteTask = async (id) => {
        await axios({
            method: 'delete',
            url: `/tasks/${id}`,
            headers: {'Authorization' : `Bearer ${token}`}, 
            data: {}
        });
        let newTasks = [...tasks];
        newTasks = newTasks.filter(task=> task._id !== id);
        setTasks(newTasks);
        
    };
    
    useEffect(()=>{
        const getTasks = async (url) => {
            const tasks = await axios({
                method: 'get',
                url: url,
                headers: {'Authorization' : `Bearer ${token}`}, 
                data: {}
            });
            setTasks(tasks.data);
        }
        getTasks('/tasks');
    },[token])

   
  return (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ scale: 0, opacity: 0 }}
    >
      <Container align="center">
        <Typography variant="h3" gutterBottom>
            All Tasks:
        </Typography>
        <hr />
        <List className={classes.root}>
            {tasks.length > 0 ? tasks.map(task=> (
                <ListItem key={task._id}>
                    <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={task.title} secondary={task.description} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
)) : <Box>
            <Typography variant="h4" gutterBottom >
                No tasks.
            </Typography>
        </Box>}
        </List>
      </Container>
    </motion.div>
  );
}

export default Home;