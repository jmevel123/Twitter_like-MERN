import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  create,
  showMessages,
  modifyMessage,
  deleteMessage
} from "./MessageFunction"; // penser a importer la fonction du Xfunction

class Tweets extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      user_id: "",
      content: "",
      first_name_user: "",
      hihihi: false,

      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.OnCreate = this.OnCreate.bind(this);
    this.OnUpdateMessages = this.OnUpdateMessages.bind(this);
    this.OnDeleteMessages = this.OnDeleteMessages.bind(this);
    this.OnEdit = this.OnEdit.bind(this);
  }
  componentWillMount() {
    // seule fonction qui se lance automatiquement
    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        _id: decoded._id,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        user_id: decoded._id,
        first_name_user: decoded.first_name
      });
    }

    showMessages().then(res => {
      const list = res.data.map(d => (
        <li className="list-group-item" key={d._id}>
          <div className="row float">
            <div className="float-left small">
              Posted by {d.first_name_user} : &nbsp;{d.date} &nbsp; &nbsp;
            </div>
            {this.state._id === d.user_id ? (
              <div>
                <div className="float-left small">
                  <input
                    className="btn btn-outline-primary btn-sm"
                    type="submit"
                    value="Update"
                    onClick={() => this.OnEdit(d._id)}
                  />
                  &nbsp;
                  <input
                    className="btn btn-danger btn-sm"
                    type="submit"
                    value="Delete"
                    onClick={this.OnDeleteMessages(d._id)}
                  />
                </div>
              </div>
            ) : (
              <p />
            )}
          </div>
          <div className="">
            <h2>{d.content}</h2>
          </div>
          {this.state.hihihi === d._id ? (
            <input type="text" onChange={this.onChange} name="content" />
          ) : null}
          {this.state.hihihi === d._id ? (
            <input
              type="submit"
              value="Validate"
              className="btn btn-success btn-sm"
              onClick={this.OnUpdateMessages(d._id, this.state.content)}
            />
          ) : null}
        </li>
      ));
      this.setState({
        messageList: list.reverse()
      });
      console.log(this.state.messageList);
      console.log(this.state);
    });
  }

  onChange(e) {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  OnCreate() {
    let dataform = {
      user_id: this.state.user_id,
      content: this.state.content,
      first_name_user: this.state.first_name_user
    };
    // console.log(this.state.first_name);
    // console.log(dataform);
    create(dataform).then(res => {
      console.log(res);
      console.log("Message posted !");
      console.log(this.state);
      this.componentWillMount();
    });
  }

  OnUpdateMessages = (msg_id, content_given) => e => {
    // console.log(this.state.first_name);
    // console.log(dataform);
    console.log(this.state.content);
    modifyMessage(msg_id, this.state.content).then(res => {
      this.setState({ hihihi: false });
      this.componentWillMount();
    });
  };

  OnEdit(id_tweet) {
    this.setState({ hihihi: id_tweet });
    console.log(this.state.hihihi);
    console.log(id_tweet);
    this.componentWillMount();
  }

  OnDeleteMessages = message_id => e => {
    e.preventDefault();
    window.confirm("Are you sure you wanna delete your awesome dark post ?");
    deleteMessage(message_id).then(res => {
      this.componentWillMount();
    });
  };

  render() {
    if (!localStorage.usertoken) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto text-center" />
          <textarea
            className="form-control"
            type="textarea"
            name="content"
            placeholder="What's new ?"
            onChange={this.onChange}
          />
          <br />

          <input
            type="button"
            className="btn btn-dark btn-lg"
            value="Tweet It"
            onClick={this.OnCreate}
          />
        </div>

        <ul className="list-group">{this.state.messageList}</ul>
      </div>
    );
  }
}

export default Tweets;
