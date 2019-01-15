const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const mongoURL = "mongodb://localhost:27017/twitter";

mongoose
  .connect(
    mongoURL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

var Users = require("./routes/Users");
var Messages = require("./routes/Messages");

app.use("/users", Users);
app.use("/messages", Messages);

/*-------------------------LISTEN ON PORT SERVER-------------------------------*/
app.listen(port, () => {
  console.log(`Listening on port ${port} ... `);
});
