import React, {useState} from 'react';
import axios from 'axios';

const TaskDisplay = props => {
    let [tasks, setTasks] = useState([]);

    const getTasks = () => {
        axios.get(`/api/tasks/${props.match.params.id}`)
        .then(res => setTasks(res.data))
        .catch(err => console.log(err));
    }

    return (
        <div>
            {tasks.length
            ? tasks.map((task, i) => (
                <div key={i}>{task}</div>
            ))
            : (
                <>
                    <p>This project has no tasks</p>
                    <button>Add a Task</button>
                </>
            )}
        </div>
    )
}

export default TaskDisplay;