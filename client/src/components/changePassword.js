import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class ChangePassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      currPassword: "",
      newPassword: "",
      msg: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      email: decoded.email,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users/changePassword", {
        email: this.state.email,
        currPassword: this.state.currPassword,
        newPassword: this.state.newPassword,
      })
      .then((res) => {
        this.setState({
          msg: res.data.msg,
        });
        alert(this.state.msg);
        if (this.state.msg === "Password Changed Successfully") {
          window.location = "/profile";
        } else {
          this.setState({
            currPassword: "",
            newPassword: "",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Change Your Password
              </h1>

              <div className="form-group">
                <label htmlFor="password">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="currPassword"
                  placeholder="Current Password"
                  value={this.state.currPassword}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  placeholder="New Password"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
