import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './TaskModal.scss';

const TaskModal = props => {
    let [taskName, setTaskName] = useState(''),
        [taskProgress, setTaskProgress] = useState('Not Started'),
        [completeBy, setCompleteBy] = useState('');

    const createTask = () => {
        const { projectId } = props;
        axios.post(`/api/task/${props.user.user_id}`, {taskName, taskProgress, projectId, completeBy})
            .then(() => {
                props.taskFn();
                props.modalFn(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='task-modal-backdrop'>
            <section className='task-modal'>
                <input
                    value={taskName}
                    placeholder='Task Name'
                    onChange={(e) => setTaskName(e.target.value)} />
                <label>Task Progress</label>
                <select value={taskProgress} onChange={(e) => setTaskProgress(e.target.value)}>
                    <option value='Not Started'>Not Started</option>
                    <option value='In Progress'>In Progress</option>
                </select>
                <label>Complete By:</label>
                <input type='date' value={completeBy} onChange={(e) => setCompleteBy(e.target.value)}/>
                <button onClick={createTask}>Create</button>
                <button onClick={() => props.modalFn(false)}>Cancel</button>
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(TaskModal);