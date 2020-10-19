import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:5000/users/register", {
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5000/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      if (
        response.data !== "Password don't match" ||
        response.data !== "User does not exist"
      ) {
        localStorage.setItem("usertoken", response.data);
        return response.data;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
