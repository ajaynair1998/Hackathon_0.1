import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { StylesProvider } from '@material-ui/styles';
import './App.css';

// importing pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { Container, createTheme } from '@material-ui/core';
import AddProduct from './pages/AddProduct/AddProduct';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// import google map
import Map from './components/googleMap/index'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#6200EE',
      },
    },
  });
  return (
    <Container maxWidth="xs">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login/" />
              </Route>
              <Route path="/login/">
                <Login />
              </Route>
              <Route path="/signup/">
                <Signup />
              </Route>
              
              {/* Debug */}
              <Route path="/maps/">
                <Map />
              </Route>

              <PrivateRoute path="/products/add/">
                <AddProduct />
              </PrivateRoute>
            </Switch>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </Container>
  );
}

export default App;
