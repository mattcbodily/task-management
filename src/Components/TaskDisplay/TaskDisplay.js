import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from '../TaskModal/TaskModal';
import Task from './Task';
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
    }, [props.match.params])

    return (
        <div className='task-display'>
            <p>Tasks</p>
            {tasks.length
                ? tasks.sort((a, b) => a.task_id - b.task_id).map((task, i) => (
                    <Task key={i} task={task} taskFn={getTasks} />
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