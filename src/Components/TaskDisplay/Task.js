import React, { useState } from 'react';
import axios from 'axios';

const Task = props => {
    let [editProgress, setEditProgress] = useState(false);

    const updateTaskProgress = (id, val) => {
        axios.put(`/api/task-progress/${id}`, { taskProgress: val })
            .then(() => {
                props.taskFn();
                setEditProgress(false);
            })
            .catch(err => console.log(err));
    }

    const completeTask = (id) => {
        axios.put(`/api/task/${id}`)
            .then(() => props.taskFn())
            .catch(err => console.log(err));
    }

    return (
        <div className='task-grid'>
            <div className='task-checkbox'>
                <input type='checkbox' id={`checkbox_${props.task.task_id}`} onChange={() => completeTask(props.task.task_id)} />
                <label htmlFor={`checkbox_${props.task.task_id}`}></label>
            </div>
            <p>{props.task.task_name}</p>
            <div className={`progress-display ${props.task.task_progress.replace(/ /, '-').toLowerCase()}`} onClick={() => setEditProgress(true)}>
                {props.task.task_progress}
            </div>
            {editProgress
                ? (
                    <div className='modal-backdrop'>
                        <ul className='progress-modal'>
                            <li>{props.task.task_id}</li>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'Not Started')}>Not Started</li>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'In Progress')}>In Progress</li>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'Delayed')}>Delayed</li>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'Blocked')}>Blocked</li>
                        </ul>
                    </div>
                )
                : null}
        </div>
    )
}

export default Task;