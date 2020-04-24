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
    Divider,
    CardMedia,
    TextField
} from '@material-ui/core';
import { axiosConfig } from '../config/axiosConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      margin: 'auto'
    },
    media: {
        height: 250
    },
    button: {
        color: 'white'
    }
  });

const About = () => {
    const { state: { user, token } , dispatchAuth } = useContext(AuthContext);
    const { dispatchSnack } = useContext(SnackContext);
    const classes = useStyles();
    const [ avatarImage, setAvatarImage ] = useState('');
    const [ dialog, setDialog ] = useState(false);
    axiosConfig(axios, token)

    const deleteMe = async () => {
        await axios({
            method: 'delete',
            url: '/users/me',
            headers: {}, 
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
                headers: {}, 
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

      const avatarUploadHandler = async (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('avatar', avatarImage);

        const user = await axios({
            method: 'post',
            url: '/users/me/avatar/',
            headers: {'Content-Type': 'multipart/form-data'},
            data: fd
        })
        dispatchAuth(storeUpdatedUser(user.data));
        dispatchSnack(setSnackMessage({
            message: 'Avatar updated sucessfully.',
            display: true,
            severity: 'success'
        }));
      }

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
                        
                        <CardMedia
                            className={classes.media}
                            image={`/users/${user._id}/avatar`}
                            title={user.name}
                        />
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
                    <CardActions >
                        <Button 
                            className={classes.button}
                            variant="contained"
                            color="primary" 
                            onClick={showDialog}
                            size="small"
                            startIcon={<EditIcon />}
                        >
                            Update User
                        </Button>
                        <Button 
                            variant="contained"
                            color="secondary" 
                            onClick={deleteMe}
                            size="small"
                            startIcon={<DeleteIcon />}
                        >
                            Delete User
                        </Button>
                    </CardActions>
                </Card>

                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Use the form below to update your avatar:
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <form onSubmit={avatarUploadHandler}>
                            <TextField
                                type="file"
                                name="file"
                                onChange={(event) => setAvatarImage(event.target.files[0])}
                            />
                            <Button 
                                variant="contained"
                                color="primary" 
                                type="submit"
                                size="small"
                            >
                                Update
                            </Button>
                        </form>
                    </CardActions>
                </Card>

                { dialog ? <UserDialogBox updateMe={updateMe} showDialog={showDialog} closeDialog={closeDialog} dialog={dialog} /> : null }
            </Container>
        </motion.div>
    )
};

export default About;