import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      name: decoded.name,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-sm-8 mx-auto">
          <h3 className="m-4 text-center">Welcome {this.state.name}</h3>
          <Link to={{ pathname: "/profile/changepassword" }}>
            <button type="button" className="btn btn-danger">
              Change Password
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
