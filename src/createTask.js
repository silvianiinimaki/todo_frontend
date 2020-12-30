import React from "react";
import { Button } from "semantic-ui-react";
import ReactStars from "react-rating-stars-component";
import DatePicker from "react-datepicker";
import moment from "moment";
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
      deadline: reformattedDate(deadline),
      rating: rating,
    };
    if (title !== "" && deadline !== "" && rating !== "") {
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
  const reformattedDate = (date) => {
    const resultDate = moment(date).format("yyyy-MM-DD");
    return resultDate;
  };

  const getTaskInfo = () => {
    return (
      <form className="uiform" onSubmit={handleSubmit}>
        <h1>Luo uusi tehtävä</h1>
        <div className="field">
          <input
            type="text"
            name="title"
            placeholder="Otsikko"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            name="description"
            placeholder="Kuvaus"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <DatePicker
            placeholderText="Select deadline"
            selected={deadline}
            isClearable
            onChange={(deadline) => setDeadline(deadline)}
            closeOnScroll={(e) => e.target === document}
            dateFormat="yyyy-MM-dd"
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
            onChange={(value) => setRating(value)}
          />
        </div>
        <div className="field">
          <Button
            onClick={submitValue}
            style={{ color: "white", background: "#2AB7CA" }}
          >
            Lisää listaan
          </Button>
          <Button
            onClick={backHome}
            style={{ color: "white", background: "#2AB7CA" }}
          >
            Peruuta
          </Button>
        </div>
      </form>
    );
  };

  return <div>{getTaskInfo()}</div>;
};

export default CreateTask;
