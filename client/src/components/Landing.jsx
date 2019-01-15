import React, { Component } from "react";
import logo from "../batman-twitter-logo.jpg";
import { Link } from "react-router-dom";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      user_id: "",
      content: "",
      first_name_user: "",
      errors: {}
    };
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5 text-center">
          <div className=" " />
          <h1> Welcome</h1>
        </div>
        <img
          src={logo}
          style={{ width: 200, height: 200 }}
          className="frounded mx-auto d-block"
          alt="batman twitter"
        />
        <h1 className="text-center">
          <br />
          {localStorage.usertoken ? (
            <Link to="/tweets" className="nav-link badge badge-secondary">
              Send dark tweets here
            </Link>
          ) : (
            <Link to="/login" className="nav-link badge badge-secondary">
              Login to send dark tweets
            </Link>
          )}
        </h1>
      </div>
    );
  }
}

export default Landing;
