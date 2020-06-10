import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';
import ProjectModal from '../ProjectModal/ProjectModal';
import TaskDisplay from '../TaskDisplay/TaskDisplay';

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
                {projects.length
                ? projects.map((project, i) => (
                    <Link to={`/dashboard/${project.project_id}/tasks`} key={i}>P</Link>
                ))
                : (
                    <>
                        <p>You don't have any projects!</p>
                        <button onClick={() => setModalView(true)}>Create a project</button>
                    </>
                )}
                {modalView
                ? <ProjectModal id={props.user.user_id} modalFn={setModalView} projectsFn={getProjects}/>
                : null}                
            </section>
            <section>
                <Switch>
                    <Route exact path='/dashboard/:id/tasks' component={TaskDisplay}/>
                </Switch>
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);