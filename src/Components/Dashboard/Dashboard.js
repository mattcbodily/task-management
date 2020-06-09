import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const Dashboard = props => {
    let [projects, setProjects] = useState([]);

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
                        <button>Create a project</button>
                    </>
                )}                
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);