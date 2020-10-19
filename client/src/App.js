import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Home from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ChangePassword from "./components/changePassword";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/changepassword" component={ChangePassword}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
