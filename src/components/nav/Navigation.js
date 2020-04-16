import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../context/auth/actions';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
    Drawer,
    AppBar,
    Toolbar,
    MenuList,
    MenuItem,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    Box,
    Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from 'axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appTitle: {
      flex: 1,
      '& a': {
        textDecoration: 'none',
        color: 'black'
      }
  }
}));

const LoggedInLinks = [{
    name: 'Home',
    path: '/'
},{
    name: 'Profile',
    path:'/profile'
}]

const LoggedOutLinks = [{
    name: 'Login',
    path: '/login'
},{
    name: 'Signup',
    path: '/signup'
}]

const Navigation = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { state: {userData:{user, token}}, dispatch } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const getIconHandler = icon => {
    switch(icon){
        case 'Home':
            return (<DashboardIcon color="primary" />)
        case 'Profile':
          return(<AccountBoxIcon color="primary" />)
        case 'Login':
            return (<PersonIcon color="primary" />)
        case 'Signup':
            return (<AccountBoxIcon color="primary" />)
        default: 
          return (<AccountBoxIcon color="primary" />)
    }
}

const logoutHandler = async () => {
  await axios({
    method: 'post',
    url: '/users/logout',
    headers: {'Authorization' : `Bearer ${token}`}, 
    data: {}
  });
  dispatch(logoutUser())
};


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.appTitle}>
            <Link to='/'>ToDo App</Link>
          </Typography>
          {user ? (
            <Button 
                color="primary"
                variant="contained"
                startIcon={<PersonOutlineIcon />}
                onClick={logoutHandler}
                >
                Logout
            </Button>) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {user ? 
            (<MenuList>
                {LoggedInLinks.map(link => (
                    <MenuItem button component={Link} to={link.path} key={link.name}>
                        {getIconHandler(link.name)} 
                        <Box fontSize={16} ml={4}>{link.name}</Box>
                    </MenuItem>
                ))}
                <Divider />
                <MenuItem button component={Link} to='/tasks'>
                    <AssignmentIcon color="primary" />
                        <Box fontSize={16} ml={4}>New Task</Box>
                </MenuItem>
            </MenuList>) :
            (<MenuList>
                {LoggedOutLinks.map(link => (
                    <MenuItem button component={Link} to={link.path} key={link.name}>
                        {getIconHandler(link.name)} 
                        <Box fontSize={16} ml={4}>{link.name}</Box>{}
                    </MenuItem>
                ))}
            </MenuList>)}
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {props.children}
      </main>
    </div>
  );
}

export default Navigation;