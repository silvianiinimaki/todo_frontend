import React, { useEffect } from "react";
import CreateTask from "./createTask";
import { Button, Item } from "semantic-ui-react";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
const axios = require("axios");

const ListPage = () => {
  const [value, setValue] = React.useState("");
  const [newTask, setNewTask] = React.useState(false);
  const [list, setList] = React.useState([]);
  const createTaskButton = () => {
    return (
      <Button
        className="button"
        onClick={createTask}
        style={{
          color: "white",
          background: "#2AB7CA",
          padding: "14px 40px",
          fontSize: "24px",
        }}
      >
        Luo uusi tehtävä
      </Button>
    );
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
      <div className="item">
        <div className="content">
          <div className="title">
            <h2>{item.title}</h2>
          </div>
          <div className="checked">
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                // ei toimi vielä
                onChange={(item) => (item.checked = !item.checked)}
              />
            </label>
          </div>
          <div className="extra">
            Deadline: {reformattedDate(item.deadline_date)}
            <br></br>
            Tärkeys:{" "}
            <ReactStars
              count={5}
              value={item.rating}
              size={24}
              edit={false}
              isHalf={false}
              emptyIcon={<i className="far fa-star"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </div>

          <div className="description">
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  const reformattedDate = (date) => {
    const resultDate = moment(date).format("DD/MM/YYYY");
    return resultDate;
  };

  function handleChange(newValue) {
    setValue(newValue);
    console.log(newValue);

    axios
      .post("https://tamk-4a00ez62-3002-group20.herokuapp.com/user/15", {
        title: newValue.title,
        description: newValue.description,
        deadline_date: newValue.deadline_date,
        rating: newValue.rating,
      })
      .then((response) => console.log(response));
  }

  function changeNewTask(newValue) {
    setNewTask(newValue);
  }

  const createTask = () => {
    setNewTask(true);
  };

  return (
    <div>
      <div className="header">
        <h1>ToDo-app</h1>
      </div>
      <div className="taskButton">
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
      <div className="uiItems">{lista()}</div>
    </div>
  );
};

export default ListPage;
