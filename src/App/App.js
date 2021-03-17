import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';

import './App.css';
import SideMenu from '../components/SideMenu'
import Header from '../components/Header';
import Employees from '../pages/Employees/Employees';
import Groups from '../pages/Groups/Groups';

const theme = createMuiTheme({
  palette:{
    primary:{
      main: '#333996',
      light: '#3c44b126'
    },
    secondary:{
      main: '#f83245',
      light: '#f8324526'
    },
    background:{
      default: '#f4f5fd'
    },
  },
  overrides:{
    MuiAppBar:{
      root: {
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple: true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '200px',
    width: '100%'
  }
});

function App() {
  const classes = useStyles();
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        
        <Switch>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/">
            <div></div>
          </Route>
        </Switch>

      </div>
      <CssBaseline />
    </ThemeProvider>
    </Router>
  );
}

export default App;
