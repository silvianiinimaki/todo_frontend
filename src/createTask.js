import React from 'react';
import { Button } from 'semantic-ui-react'

const CreateTask = (props) => {
    const [taskTitle, setTaskTitle] = React.useState('');
    const [taskDescription, setTaskDescription] = React.useState('');
    const [taskDeadline, setTaskDeadline] = React.useState('');
    const [taskRating, setTaskRating] = React.useState('');

    const submitValue = () => {
        const taskDetails = {
            'taskTitle' : taskTitle,
            'taskDescription' : taskDescription,
            'taskDeadline' : taskDeadline,
            'taskRating' : taskRating
        }
        if (taskTitle !== "" && taskDeadline !== "" && taskDescription !== "" && taskRating !== "") {
            props.handleChange(taskDetails);
            props.newTask(false)
        } else {
            alert("Jotkin kentät ovat täyttämättä!")
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const backHome = () => {
        props.newTask(false)
    }

    const getTaskInfo = () => {
        return (
            <form className="ui form" style={{textAlign: "center", marginTop: "1%"}} onSubmit={handleSubmit}>
                <div className="field">
                <input style={{width:"20%"}} type="text" name="taskTitle" placeholder="Otsikko"  onChange={e => setTaskTitle(e.target.value)} />
                </div>
                <div className="field">
                <input style={{width:"20%"}} type="text" name="taskDescription" placeholder="Kuvaus"  onChange={e => setTaskDescription(e.target.value)} />
                </div>
                <div className="field">
                <input style={{width:"20%"}} type="text" name="taskDeadline" placeholder="Deadline"   onChange={e => setTaskDeadline(e.target.value)} />
                </div>
                <div className="field">
                <input style={{width:"20%"}} type="text" name="taskRating" placeholder="Tärkeys"   onChange={e => setTaskRating(e.target.value)} />
                </div>
                <div className="field">
                <Button onClick={submitValue}>Lisää listaan</Button>
                <Button onClick={backHome}>Peruuta</Button>
                </div>
            </form>
        )
    }

    return (
        <div>
            <h1 style={{textAlign:"center", marginTop:"2%"}}>Luo uusi tehtävä</h1>
            {getTaskInfo()}
        </div>
    );
};

export default CreateTask;