import axios from "axios";

export const register = newUser => {
  return axios
    .post("http://127.0.0.1:5000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log("Registered !");
    });
};

export const login = user => {
  return axios
    .post("http://127.0.0.1:5000/users/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      //console.log(res.data);
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const profile = (_id, user) => {
  console.log(user);
  console.log(_id);

  return axios
    .put("http://127.0.0.1:5000/users/" + _id, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      console.log(res.data);
      return res.data;
    });
};

export const allUsers = () => {
  return axios.get("http://127.0.0.1:5000/users");
};

export const deleteAccount = _id => {
  return axios.delete("http://127.0.0.1:5000/users/" + _id);
};
