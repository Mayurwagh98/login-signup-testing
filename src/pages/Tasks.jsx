import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./Tasks.css";

const Tasks = () => {
  let userAuth = JSON.parse(localStorage.getItem("user"));
  let [text, setText] = useState("");
  let [oldTasks, setOldTasks] = useState([]);

  // ---------------- Get Tasks ----------------------------------

  let getUserData = () => {
    axios
      .get(`https://new-m4-backend.onrender.com/users`)
      .then((res) => {
        // console.log(res.data)
        let user = res.data.filter((el, index) => {
          return (
            el.username == userAuth.username && el.password == userAuth.password
          );
        });
        console.log(user);
        if (user.length > 0) {
          localStorage.setItem("user", JSON.stringify(user[0]));
          setOldTasks([...user[0].tasks]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  // ------------------ Add Task -------------------------

  let handleSubmit = () => {
    setOldTasks([...oldTasks, text]);
    if (userAuth.tasks.length < 5) {
      axios
        .patch(`https://new-m4-backend.onrender.com/users/${userAuth.id}`, {
          tasks: [...oldTasks, text],
        })
        .then((res) => {
          window.location.reload()

          console.log(res.data);
        })
        .catch((e) => {
          // alert("error ");
          console.log(e);
        });
    } else {
      alert("You have reached the daily limit");
      window.location.reload();
    }
  };

  // ------------------ Delete-------------------

  let handleDelete = (item) => {
    let arr = oldTasks.filter((el) => {
      return el != item;
    });

    setOldTasks([...arr]);

    axios
      .patch(`https://new-m4-backend.onrender.com/users/${userAuth.id}`, {
        tasks: [...arr],
      })
      .then((res) => {
        // window.location.reload();
        console.log(res.data);
      })
      .catch((e) => {
        alert("error");
      });
  };

  // -------------------- Logout------------------------
  let handleLogout = () => {
    localStorage.setItem("user", JSON.stringify(null));
    // localStorage.clear()
    window.location.reload();
  };

  return (
    <>
      <div className="main_task_div">
        <div className="hello_logout_div">
          <h3>Hello</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <h1>{userAuth.username}</h1>
        <p>Good to see you here</p>
        <p>
          Your Total Task for the Day:- {userAuth ? userAuth.tasks.length : 0}
        </p>
        <h4>Task for 24th Dec, 2023</h4>
        <div>
          {oldTasks.map((item, index) => {
            return (
              <div key={index}>
                <ul>
                  <div className="item_delete">
                    <li>{item}</li>
                    <button onClick={() => handleDelete(item)}>❌</button>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Enter your task"
          onChange={(e) => setText(e.target.value)}
          className="task_input"
        />
        <br />
        <button onClick={handleSubmit} className="add_btn">
          Add New Task
        </button>
      </div>
    </>
  );
};

export { Tasks };
