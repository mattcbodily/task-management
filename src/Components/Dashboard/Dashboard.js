import React, {useState} from 'react';
import {connect} from 'react-redux';

const Dashboard = props => {
    let [projects, setProjects] = useState([]);

    console.log(props)

    return (
        <div>
            Dashboard
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);