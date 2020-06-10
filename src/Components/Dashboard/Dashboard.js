import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import ProjectModal from '../ProjectModal/ProjectModal';

const Dashboard = props => {
    let [projects, setProjects] = useState([]),
        [modalView, setModalView] = useState(false);

    useEffect(() => {
        axios.get(`/api/projects/${props.user.user_id}`)
        .then(res => setProjects(res.data))
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <section>
                {projects.length
                ? projects.map((project, i) => (
                    <div>
                        P
                    </div>
                ))
                : (
                    <>
                        <p>You don't have any projects!</p>
                        <button onClick={() => setModalView(true)}>Create a project</button>
                    </>
                )}
                {modalView
                ? <ProjectModal id={props.user.user_id} modalFn={setModalView}/>
                : null}                
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);