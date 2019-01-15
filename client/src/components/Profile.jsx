import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { profile, allUsers, deleteAccount } from "./UserFunction";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.OnUpdate = this.OnUpdate.bind(this);
    this.OnDeleteAcc = this.OnDeleteAcc.bind(this);
  }
  componentWillMount() {
    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        _id: decoded._id,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email
      });
      console.log(decoded);
    }
    console.log(this.state);

    allUsers().then(res => {
      const listUsers = res.data.map(d => (
        <li key={d._id} className="list-group-item">
          <div className="row">
            <div>{d.first_name} &nbsp;</div>
            <div>{d.last_name}&nbsp; </div> &nbsp; | &nbsp;
            <div>{d.email}&nbsp; </div> &nbsp; | &nbsp;
            <input
              type="submit"
              value="Follow"
              className="btn btn-outline-primary btn-sm"
            />
          </div>
        </li>
      ));
      this.setState({
        userList: listUsers
      });
    });
  }
  onChange(e) {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  OnUpdate() {
    let dataform = {
      _id: this.state._id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email
    };
    // console.log(this.state.first_name);
    // console.log(dataform);
    profile(this.state._id, dataform).then(res => {
      console.log(res);
      console.log(this.state._id);
      console.log(this.state);
      this.componentWillMount();
    });
  }

  OnDeleteAcc = userId => e => {
    // console.log(this.state.first_name);
    // console.log(dataform);
    e.preventDefault();
    console.log(userId);
    window.confirm("Are you sure you want to delete this Account ?");
    deleteAccount(userId);
    localStorage.removeItem("usertoken");
    console.log("delete here");
    this.props.history.push("/login");
  };

  render() {
    if (!localStorage.usertoken) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Profile</h1>
          </div>
          <label>Firstname</label>
          <input
            className="form-control"
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
          />
          <br />
          <label>Lastname</label>
          <input
            className="form-control"
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={this.onChange}
          />
          <br />
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <br />
          <input
            className="btn btn-dark"
            type="submit"
            value="Update"
            onClick={this.OnUpdate}
          />
          <br />
          <br />

          <input
            className="btn btn-danger btn-lg float-right"
            type="submit"
            value="Delete account"
            onClick={this.OnDeleteAcc(this.state._id)}
          />
        </div>
        <div>
          <h2 className="text-center">Follow your favorites BatTwittos</h2>
          <ul>{this.state.userList}</ul>
        </div>
      </div>
    );
  }
}

export default Profile;
