import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TaskModal from '../TaskModal/TaskModal';
import './TaskDisplay.scss';

const TaskDisplay = props => {
    let [tasks, setTasks] = useState([]),
        [taskModal, setTaskModal] = useState(false);

    const getTasks = () => {
        axios.get(`/api/tasks/${props.match.params.id}`)
        .then(res => setTasks(res.data))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div className='task-display'>
            {tasks.length
            ? tasks.map((task, i) => (
                <div key={i}>
                    <p>{task.task_name}</p>
                </div>
            ))
            : (
                <>
                    <p>This project has no tasks</p>
                    <button onClick={() => setTaskModal(true)}>Add a Task</button>
                </>
            )}
            {taskModal
            ? <TaskModal taskFn={getTasks} modalFn={setTaskModal}/>
            : null}
        </div>
    )
}

export default TaskDisplay;