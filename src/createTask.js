import React from "react";
import { Button } from "semantic-ui-react";
import ReactStars from "react-rating-stars-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTask = (props) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [deadline, setDeadline] = React.useState(new Date());
  const [rating, setRating] = React.useState("");
  const submitValue = () => {
    const taskDetails = {
      title: title,
      description: description,
      deadline: deadline,
      rating: rating,
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
        style={{
          textAlign: "center",
          marginTop: "1%",
        }}
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
        <div className="field">
          <input
            style={{ width: "20%" }}
            type="text"
            name="description"
            placeholder="Kuvaus"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <DatePicker
            selected={deadline}
            onChange={(deadline) => setDeadline(deadline)}
            placeholderText="Select deadline"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mmaa"
          />
        </div>

        <div className="field">
          <ReactStars
            count={5}
            size={24}
            edit={true}
            isHalf={false}
            emptyIcon={<i className="far fa-star"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
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
