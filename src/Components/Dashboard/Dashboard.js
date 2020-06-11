import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ProjectModal from '../ProjectModal/ProjectModal';
import TaskDisplay from '../TaskDisplay/TaskDisplay';
import './Dashboard.scss';

const Dashboard = props => {
    let [projects, setProjects] = useState([]),
        [modalView, setModalView] = useState(false);

    const getProjects = () => {
        axios.get(`/api/projects/${props.user.user_id}`)
            .then(res => setProjects(res.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <div>
            <section>
                <h1>Hi {props.user.first_name}</h1>
                <p>Welcome back to your workspace!</p>
                <h3>Projects</h3>
                {projects.length
                    ? projects.map((project, i) => (
                        <section className='project-flex'>
                            <Link className='project-links' to={`/dashboard/${project.project_id}/tasks`} key={i}>{project.project_name.charAt(0)}</Link>
                        </section>
                    ))
                    : (
                        <>
                            <p>You don't have any projects!</p>
                            <button className='create-button' onClick={() => setModalView(true)}>+</button>
                        </>
                    )}
                {modalView
                    ? <ProjectModal id={props.user.user_id} modalFn={setModalView} projectsFn={getProjects} />
                    : null}
            </section>
            <section>
                <Switch>
                    <Route exact path='/dashboard/:id/tasks' component={TaskDisplay} />
                </Switch>
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);