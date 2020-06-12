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
            <p>Tasks</p>
            {tasks.length
            ? tasks.map((task, i) => (
                <div key={i} className='task-grid'>
                    <div className='task-checkbox'>
                    <input type='checkbox' id={`checkbox_${task.task_id}`}/>
                        <label for={`checkbox_${task.task_id}`}></label>
                    </div>
                    <p>{task.task_name}</p>
                    <div className={`progress-display ${task.task_progress}`}>{task.task_progress}</div>
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