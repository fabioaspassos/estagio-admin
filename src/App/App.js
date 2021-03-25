import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import Route from "../components/RouteWrapper";

import './App.css';
import SideMenu from '../components/SideMenu'
import Header from '../components/Header';
import Employees from '../pages/Employees/Employees';
import Estagio from '../pages/Estagio/Estagio';

export default function App() {
  const styles = useStyles();
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={styles.appMain}>
        <Header />
        
        <Switch>
          <Route path="/employees" component={Employees} isPrivate />
          <Route path="/estagio" component={Estagio} />
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