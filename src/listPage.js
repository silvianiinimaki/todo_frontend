import React, { useEffect } from "react";
import CreateTask from "./createTask";
import { Button } from "semantic-ui-react";
const axios = require("axios");

const ListPage = () => {
  const [value, setValue] = React.useState("");
  const [newTask, setNewTask] = React.useState(false);
  const [list, setList] = React.useState([]);
  const createTaskButton = () => {
    return <Button onClick={createTask}>Luo uusi tehtävä</Button>;
  };
  useEffect(() => {
    axios
      .get("https://tamk-4a00ez62-3002-group20.herokuapp.com/api")
      .then(function (response) {
        setList(response.data);
      })
      .catch((err) => console.log(err));
  });

  const lista = () => {
    const i = Object.values(list);
    return i.map((item) => (
      <div
        style={{ textAlign: "center", marginTop: "3%", color: "lightgray" }}
        className="item"
      >
        <div className="content">
          <a className="header">{item.title}</a>
          <div className="description">
            <p>{item.description}</p>
          </div>
          <div className="extra">
            Deadline: {item.deadline} <br /> Tärkeys: {item.rating}
          </div>
        </div>
      </div>
    ));
  };

  function handleChange(newValue) {
    setValue(newValue);
    // Try adding new value to database
    axios
      .post("https://tamk-4a00ez62-3002-group20.herokuapp.com/user/1", {
        value,
      })
      .then((response) => console.log(response));
    // setList(list.concat(newValue));
  }

  function changeNewTask(newValue) {
    setNewTask(newValue);
  }

  const createTask = () => {
    setNewTask(true);
  };

  return (
    <div>
      <div className="ui items">{lista()}</div>

      <div style={{ textAlign: "center", marginTop: "5%" }}>
        {newTask ? (
          <CreateTask
            value={value}
            newTask={changeNewTask}
            handleChange={handleChange}
          />
        ) : (
          createTaskButton()
        )}
      </div>
    </div>
  );
};

export default ListPage;
