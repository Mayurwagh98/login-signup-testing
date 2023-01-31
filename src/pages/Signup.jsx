import React, { useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  let navigate = useNavigate();
  let signupData = () => {
    return axios.post("https://new-m4-backend.onrender.com/users", {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      tasks: [],
    });
  };

  let handleSignup = (event) => {
    let { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  let formSubmit = (e) => {
    e.preventDefault();
    if (userData.confirmpass == userData.password) {
      signupData()
        .then((res) => {
          alert("Registered");
          navigate("/login")
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("confirm password doesn't match with the password");
    }
    setUserData({
      email: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <>
      <div className="main_signup_div">
        <h3>Welcome!</h3>
        <h1>Sign up to</h1>
        <form onSubmit={formSubmit}>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            // value={userData.email}
            onChange={handleSignup}
          />
          <br />
          <label>User Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your user name"
            name="username"
            // value={userData.username}
            onChange={handleSignup}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            // value={userData.password}
            onChange={handleSignup}
          />
          <br />
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirmpass"
            // value={userData.confirmpass}
            onChange={handleSignup}
          />
          <br />
          <input
            type="submit"
            value="Register"
            className="register_btn"
          ></input>
          <p>
            Already have an account?{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>Register</span>
          </p>
        </form>
      </div>
    </>
  );
};

export { Signup };
