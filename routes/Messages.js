const express = require("express");
const messages = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Message = require("../models/Messages");
messages.use(cors());

process.env.SECRET_KEY = "secret";

messages.post("/create", (req, res) => {
  const today = new Date();
  const messageData = {
    user_id: req.body.user_id,
    content: req.body.content,
    created: today,
    first_name_user: req.body.first_name_user
  };

  Message.create(messageData)
    .then(message => {
      res.json({ status: message.content + " message created!" });
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

messages.get("/", (req, res) => {
  Message.find().then(message => {
    res.json(message);
  });
});

messages.put("/:id", (req, res) => {
  console.log(req.body.content);
  console.log(req.params.id);
  Message.update(
    {
      _id: req.params.id
    },
    {
      content: req.body.content
    }
  )
    .exec()
    .then(result => {
      console.log(req.body.content);
      console.log(req.params.id);
      res.json({ status: " message updated!" });
    });
});

messages.delete("/:id", (req, res) => {
  Message.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.json({ status: " message deleted!" });
      console.log(req.params.id);
    });
});
module.exports = messages;
