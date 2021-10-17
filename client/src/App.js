import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Home from './pages/Home';

import {Login, Register, Home, ForgotPassword, ProtectRoute} from './pages';
import store from './store';
import {isAuth} from './actions/authAction'

store.dispatch(isAuth());

class App extends Component {
  render() { 
    return (
      <div className="App">
        <Router>
          <Switch>
            <ProtectRoute exact path="/" component={Home} />
          </Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
        </Router>
      </div>
    );
  }
}
 
export default App;

