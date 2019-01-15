import axios from "axios";

export const create = newMessage => {
  console.log(newMessage);
  return axios.post("http://127.0.0.1:5000/messages/create", newMessage);
};

export const showMessages = () => {
  return axios.get("http://127.0.0.1:5000/messages/");
};

export const modifyMessage = (_id, message) => {
  return axios
    .put("http://127.0.0.1:5000/messages/" + _id, {
      content: message
    })
    .then(res => console.log(res))
    .catch(error => console.log(error));
  // .then(res => {
  //   localStorage.setItem("usertoken", res.data);
  // });
};

export const deleteMessage = _id => {
  return axios.delete("http://127.0.0.1:5000/messages/" + _id);
};
