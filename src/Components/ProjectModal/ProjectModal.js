import React, { useState } from 'react';
import axios from 'axios';
import './ProjectModal.scss';

const ProjectModal = props => {
    let [projectName, setProjectName] = useState(''),
        [projectDescription, setProjectDescription] = useState('');

    const createProject = () => {
        axios.post(`/api/project/${props.id}`, { projectName, projectDescription })
            .then(() => {
                props.projectsFn();
                props.modalFn(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='project-modal-backdrop'>
            <section className='project-modal'>
                <input
                    value={projectName}
                    placeholder='Project Name'
                    onChange={(e) => setProjectName(e.target.value)} />
                <input
                    value={projectDescription}
                    placeholder='Project Description'
                    onChange={(e) => setProjectDescription(e.target.value)} />
                <button onClick={createProject}>Create Project</button>
                <button onClick={() => props.modalFn(false)}>Cancel</button>
            </section>
        </div>
    )
}

export default ProjectModal;