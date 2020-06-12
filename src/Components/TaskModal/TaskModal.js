import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const TaskModal = props => {
    let [taskName, setTaskName] = useState(''),
        [taskProgress, setTaskProgress] = useState('Not Started');

    const createTask = () => {
        const {projectId} = props;

        axios.post(`/api/task/${props.user.user_id}`, {taskName, taskProgress, projectId})
        .then(() => {
            props.taskFn();
            props.modalFn();
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <input 
                value={taskName}
                placeholder='Task Name'
                onChange={(e) => setTaskName(e.target.value)}/>
            <label>Task Progress</label>
            <select value={taskProgress} onChange={(e) => setTaskProgress(e.target.value)}>
                <option value='Not Started'>Not Started</option>
                <option value='In Progress'>In Progress</option>
            </select>
            <button onClick={createTask}>Create</button>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(TaskModal);