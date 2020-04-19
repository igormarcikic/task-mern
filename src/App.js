import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/nav/Navigation';
import Home from './views/Home';
import Profile from './views/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Tasks from './views/Tasks';
import ProtectedRoute from './ProtectedRoute';
import { AnimatePresence } from 'framer-motion';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange, amber, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: red,
  },
  status: {
    danger: orange
  },
  root: {
  }
})


function App() {
  return (
    <div className="App">
        <MuiThemeProvider theme={theme}>
          <Router>
          <Navigation>
            <AnimatePresence>
                <Switch>
                  <ProtectedRoute exact path="/" component={Home} />
                  <ProtectedRoute exact path="/profile" component={Profile} />
                  <ProtectedRoute exact path="/tasks" component={Tasks} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                </Switch>
            </AnimatePresence>
          </Navigation>
          </Router>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
