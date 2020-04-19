import React, { useContext, useState } from 'react';
import UserDialogBox from '../components/helper/UserDialogBox';
import { storeUpdatedUser } from '../context/auth/actions';
import { AuthContext } from '../context/auth/AuthContext';
import { SnackContext } from '../context/snackbar/SnackContext';
import { setSnackMessage } from '../context/snackbar/actions';
import { deleteUser } from '../context/auth/actions';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
    Container,
    Typography,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button, 
    Divider
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      margin: 'auto'
    },
    cardAct: {
        justifyContent: 'space-around'
    }
  });

const About = () => {
    const { state: { user, token } , dispatchAuth } = useContext(AuthContext);
    const { dispatchSnack } = useContext(SnackContext);
    const classes = useStyles();
    const [ dialog, setDialog ] = useState(false);

    const deleteMe = async () => {
        await axios({
            method: 'delete',
            url: '/users/me',
            headers: {"Authorization" : `Bearer ${token}`}, 
            data: {}
        })
        dispatchAuth(deleteUser());
        dispatchSnack(setSnackMessage({
            message: 'User deleted sucessfully.',
            display: true,
            severity: 'success'
        }))
    }

    const updateMe = async (user) => {
        try {
            const updatedUser = await axios({
                method: 'patch',
                url: '/users/me',
                headers: {'Authorization' : `Bearer ${token}`}, 
                data: {
                    email: user.email,
                    name: user.name,
                    age: user.age
                }
            });
            dispatchAuth(storeUpdatedUser(updatedUser.data, token));
            dispatchSnack(setSnackMessage({
                message: 'User updated sucessfully.',
                display: true,
                severity: 'success'
            }));
        }catch(error) {
            console.log(error.message)
        }
    }

    const showDialog = () => {
        setDialog(true)
      }
  
      const closeDialog = () => {
        setDialog(false)
      };

    return (
        <motion.div
			initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
			exit={{ scale: 0, opacity: 0 }}
		>

            <Container >
                <Typography variant="h4" gutterBottom align="center">
                    Profile page:
                </Typography>
                <hr />
                <Card className={classes.root}>
                    <CardActionArea>
                        {/* <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                        /> */}
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Name: <strong>{user.name}</strong>
                        </Typography>
                        <Divider />
                        <Typography variant="body2" component="p">
                            Email: <strong>{user.email}</strong>
                        </Typography>
                        <Typography variant="body2" component="p">
                            Age: <strong>{user.age}</strong>
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Divider />
                    <CardActions className={classes.cardAct}>
                        <Button 
                            color="primary" 
                            variant="contained"
                            onClick={showDialog}
                        >
                            Update
                        </Button>
                        <Button 
                            color="secondary" 
                            variant="contained"
                            onClick={deleteMe}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
                { dialog ? <UserDialogBox updateMe={updateMe} showDialog={showDialog} closeDialog={closeDialog} dialog={dialog} /> : null }
            </Container>
        </motion.div>
    )
};

export default About;