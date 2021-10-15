import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Home from './pages/Home';

import {Login, Register, Home, ForgotPassword} from './pages';

 
class App extends Component {
  render() { 
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
      </div>
    );
  }
}
 
export default App;

