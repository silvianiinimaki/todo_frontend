import React from "react";
import { Button } from "semantic-ui-react";

const CreateTask = (props) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  const submitValue = () => {
    const taskDetails = {
      title: title,
      description: description,
      deadline: deadline,
      rating: rating,
      checked: checked,
    };
    if (
      title !== "" &&
      deadline !== "" &&
      description !== "" &&
      rating !== ""
    ) {
      props.handleChange(taskDetails);
      props.newTask(false);
    } else {
      alert("Jotkin kentät ovat täyttämättä!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const backHome = () => {
    props.newTask(false);
  };

  const getTaskInfo = () => {
    return (
      <form
        className="ui form"
        style={{ textAlign: "center", marginTop: "1%" }}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            style={{ width: "20%" }}
            type="text"
            name="title"
            placeholder="Otsikko"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          Check Me!
        </label>
        <div className="field">
          <input
            style={{ width: "20%" }}
            type="text"
            name="description"
            placeholder="Kuvaus"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            style={{ width: "20%" }}
            type="text"
            name="taskDeadline"
            placeholder="Deadline"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            style={{ width: "20%" }}
            type="text"
            name="taskRating"
            placeholder="Tärkeys"
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="field">
          <Button onClick={submitValue}>Lisää listaan</Button>
          <Button onClick={backHome}>Peruuta</Button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "2%" }}>Luo uusi tehtävä</h1>
      {getTaskInfo()}
    </div>
  );
};

export default CreateTask;
