import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  let [signupData, setSignupData] = useState([]);
  let [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

  let getLoginData = () => {
    return axios
      .get("https://new-m4-backend.onrender.com/users")
      .then((res) => {
        // setSignupData(res.data);
        // console.log(signupData)
        // console.log(res.data);
        let tempusername = res.data.filter((el, index) => {
          return el.username == username;
        });
        let tempPassword = res.data.filter((el, index) => {
          return el.password == password;
        });
        console.log(tempPassword);
        if (tempusername.length > 0 && tempPassword.length > 0) {
          localStorage.setItem("user", JSON.stringify(tempPassword[0]));
          navigate("/");
        } else {
          alert("user not found");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let handleLogin = (event) => {
    let { name, value } = event.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const { username, password } = loginData;
  let handleLoginSubmit = (event) => {
    event.preventDefault();
    getLoginData();

    // console.log(loginData)

    // let flag = false;
    // for (let x of signupData) {
    //   if (
    //     x.username == loginData.username &&
    //     x.password == loginData.password
    //   ) {
    //     flag = true;
    //   }
    // }
    // if (flag) {
    //   navigate("/");
    //   localStorage.setItem("user", JSON.stringify(loginData));
    // } else {
    //   alert("You need to register first");
    //   // console.log("user not exists");
    // }
  };

  return (
    <div className="main_login_div">
      <h3>Welcome!</h3>
      <h1>Sign in to</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>User name</label>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={loginData.username}
          onChange={handleLogin}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={loginData.password}
          onChange={handleLogin}
        />
        <input type="submit" value="Login" className="loginBtn" />
        <div className="remember_me">
          <input type="checkbox" />
          <label>Remember me</label>
          <p>Forgot Password?</p>
        </div>
      </form>
    </div>
  );
};

export { Login };
