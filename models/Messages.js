const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user_id: {
    type: String
  },
  first_name_user: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
