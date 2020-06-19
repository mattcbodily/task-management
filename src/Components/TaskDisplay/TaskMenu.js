import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskMenu = props => {
    let [taskNote, setTaskNote] = useState({});

    useEffect(() => {
        axios.get(`/api/task-notes/${props.task.task_id}`)
            .then(res => setTaskNote(res.data))
            .catch(err => console.log(err))
    }, [])

    console.log(taskNote)

    return (
        <div className='task-menu-backdrop'>
            <div className='task-menu'>
                <p>{props.task.task_name}</p>
                <p>{props.task.complete_by}</p>
                {taskNote.note
                    ? <p>{taskNote}</p>
                    : (
                        <>
                            <label>Add a note</label>
                            <textarea />
                        </>
                    )}

                <button onClick={() => props.menuFn(false)}>Close</button>
            </div>
        </div>
    )
}

export default TaskMenu;