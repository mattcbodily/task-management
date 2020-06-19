import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskMenu = props => {
    let [taskNotes, setTaskNotes] = useState({}),
        [noteInput, setNoteInput] = useState('');

    useEffect(() => {
        axios.get(`/api/task-notes/${props.task.task_id}`)
            .then(res => setTaskNotes(res.data))
            .catch(err => console.log(err))
    }, [])

    const addTaskNote = () => {
        axios.post(`/api/task-note/${props.task.task_id}`, {noteInput})
        .then(res => setTaskNotes(res.data))
        .catch(err => console.log(err))
    }

    console.log(taskNotes)

    return (
        <div className='task-menu-backdrop'>
            <div className='task-menu'>
                <p>{props.task.task_name}</p>
                <p>{props.task.complete_by}</p>
                {taskNotes.length
                    ? taskNotes.map((note, i) => (
                        <p key={i}>{note.note}</p>
                    ))
                    : (
                        <>
                            <label>Add a note</label>
                            <textarea value={noteInput} onChange={e => setNoteInput(e.target.value)}/>
                            <button onClick={addTaskNote}>Add</button>
                        </>
                    )}
                <button onClick={() => props.menuFn(false)}>Close</button>
            </div>
        </div>
    )
}

export default TaskMenu;