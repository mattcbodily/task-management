import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from '../TaskModal/TaskModal';
import './TaskDisplay.scss';

const TaskDisplay = props => {
    let [tasks, setTasks] = useState([]),
        [taskModal, setTaskModal] = useState(false),
        [progressModal, setProgressModal] = useState(false);

    const getTasks = () => {
        axios.get(`/api/tasks/${props.match.params.id}`)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getTasks();
    }, [props.match.params])

    const updateTaskProgress = (id, val) => {
        axios.put(`/api/task-progress/${id}`, { taskProgress: val })
            .then(() => getTasks())
            .catch(err => console.log(err));
    }

    const completeTask = (id) => {
        axios.put(`/api/task/${id}`)
            .then(() => getTasks())
            .catch(err => console.log(err));
    }

    return (
        <div className='task-display'>
            <p>Tasks</p>
            {tasks.length
                ? tasks.map((task, i) => (
                    <div key={i} className='task-grid'>
                        <div className='task-checkbox'>
                            <input type='checkbox' id={`checkbox_${task.task_id}`} onChange={() => completeTask(task.task_id)} />
                            <label htmlFor={`checkbox_${task.task_id}`}></label>
                        </div>
                        <p>{task.task_name}</p>
                        <div className={`progress-display ${task.task_progress.replace(/ /, '-').toLowerCase()}`} onClick={() => setProgressModal(!progressModal)}>
                            {task.task_progress}
                        </div>
                        {progressModal
                        ? (
                            <div className='modal-backdrop'>
                                <ul className='progress-modal'>
                                    <li>Not Started</li>
                                    <li>In Progress</li>
                                    <li>Delayed</li>
                                    <li>Blocked</li>
                                </ul>
                            </div>
                        )
                        : null}
                    </div>
                ))
                : (
                    <>
                        <p>This project has no tasks</p>
                        <button onClick={() => setTaskModal(true)}>Add a Task</button>
                    </>
                )}
            {taskModal
                ? <TaskModal taskFn={getTasks} modalFn={setTaskModal} projectId={+props.match.params.id} />
                : null}
            {tasks.length
                ? <button className='create-button task-create-button' onClick={() => setTaskModal(true)}>+</button>
                : null}
        </div>
    )
}

export default TaskDisplay;