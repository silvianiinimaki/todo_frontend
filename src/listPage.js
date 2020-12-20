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
      <Button className="button" onClick={createTask}>
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
  }, []);

  const lista = () => {
    const i = Object.values(list);
    return i.map((item) => (
      <div
        style={{
          textAlign: "center",
          marginTop: "3%",
          color: "black",
        }}
        className="item"
      >
        <div className="content">
          <div className="title">{item.title}</div>
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

    // Try adding new value to database
    axios
      .post("https://tamk-4a00ez62-3002-group20.herokuapp.com/user/1", value)
      .then((response) => console.log(response));

    setList(list.concat(newValue));
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
