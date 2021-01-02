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
          background: "#239AA9",
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
    if (i.length < 1) {
      return (
        <p style={{ fontSize: "24px", textAlign: "left" }}>
          Tehtävälistasi on tyhjä
        </p>
      );
    }
    return i.map((item) => (
      <div className="item" key={item.id}>
        <div className="content">
          <span className="title">
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                // ei toimi vielä
                onChange={(item) => (item.checked = !item.checked)}
              />
              <h2>
                {item.title} <span style={{ marginLeft: "20px" }}></span>
              </h2>
            </label>
          </span>
          <div className="dropdownContent">
            <div className="extra">
              Deadline: {showDate(item.deadline_date)}
              <br></br>
              Tärkeys:
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
              <p> Kuvaus: {item.description}</p>
            </div>
            <div className="tag">
              <p> Aihe: {item.tag}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const reformattedDate = (date) => {
    const resultDate = moment(date).format("YYYY-MM-DD");
    return resultDate;
  };
  const showDate = (date) => {
    const resultDate = moment(date).format("DD.MM.YYYY");
    return resultDate;
  };
  function handleChange(newValue) {
    setValue(newValue);

    const deadline = reformattedDate(newValue.deadline_date);

    axios
      .post("https://tamk-4a00ez62-3002-group20.herokuapp.com/user/1", {
        title: newValue.title,
        description: newValue.description,
        deadline_date: deadline,
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
        <h1 style={{ fontSize: "3em" }}>ToDo-app</h1>
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
