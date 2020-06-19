import React, { useState } from 'react';
import moreIcon from '../../assets/more-vertical.svg';
import axios from 'axios';
import TaskMenu from './TaskMenu';

const Task = props => {
    let [editProgress, setEditProgress] = useState(false),
        [menuView, setMenuView] = useState(false);

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
            <img className='more-icon' src={moreIcon} alt='Menu' onClick={() => setMenuView(true)}/>
            {editProgress
                ? (
                    <div className='modal-backdrop'>
                        <ul className='progress-modal'>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'Not Started')}>Not Started</li>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'In Progress')}>In Progress</li>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'Delayed')}>Delayed</li>
                            <li onClick={() => updateTaskProgress(props.task.task_id, 'Blocked')}>Blocked</li>
                        </ul>
                    </div>
                )
                : null}
            {menuView
                ? <TaskMenu task={props.task} menuFn={setMenuView}/>
                : null}
        </div>
    )
}

export default Task;