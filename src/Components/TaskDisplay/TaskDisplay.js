import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from '../TaskModal/TaskModal';
import Task from './Task';
import './TaskDisplay.scss';

const TaskDisplay = props => {
    let [tasks, setTasks] = useState([]),
        [todayTasks, setTodayTasks] = useState([]),
        [taskModal, setTaskModal] = useState(false);

    const getTasks = () => {
        axios.get(`/api/tasks/${props.match.params.id}`)
            .then(res => {
                let today = new Date();
                let day = today.getDate();
                let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
                let year = today.getFullYear();
                today = `${year}-${month}-${day}`;

                let currentTasks = res.data.filter(e => e.complete_by === today),
                    upcomingTasks = res.data.filter(e => e.complete_by !== today);

                setTasks(upcomingTasks);
                setTodayTasks(currentTasks);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getTasks();
    }, [props.match.params])

    console.log(tasks)
    console.log(todayTasks)

    return (
        <div className='task-display'>
            <p>Today</p>
            {todayTasks.length
                ? todayTasks.sort((a, b) => a.task_id - b.task_id).map((task, i) => (
                    <Task key={i} task={task} taskFn={getTasks} />
                ))
                : <p>No tasks due today</p>}
            <p>Upcoming</p>
            {tasks.length
                ? tasks.sort((a, b) => a.task_id - b.task_id).map((task, i) => (
                    <Task key={i} task={task} taskFn={getTasks} />
                ))
                : <p>No upcoming tasks</p>}
            {taskModal
                ? <TaskModal taskFn={getTasks} modalFn={setTaskModal} projectId={+props.match.params.id} />
                : null}
            <button className='create-button task-create-button' onClick={() => setTaskModal(true)}>+</button>
        </div>
    )
}

export default TaskDisplay;