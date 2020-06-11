import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/userReducer';
import './Landing.scss';

const Landing = props => {
    let [loginView, setLoginView] = useState(true),
        [firstName, setFirstName] = useState(''),
        [lastName, setLastName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [verPassword, setVerPassword] = useState(''),
        [viewPassword, setViewPassword] = useState('password');

    const login = () => {
        axios.post('/api/login', { email, password })
            .then(res => {
                props.getUser(res.data)
                props.history.push('/dashboard')
            })
            .catch(err => console.log(err));
    }

    const register = () => {
        if (password !== '' && password === verPassword) {
            axios.post('/api/register', { firstName, lastName, email, password })
                .then(res => {
                    props.getUser(res.data)
                    props.history.push('/dashboard')
                })
                .catch(err => console.log(err));
        } else {
            alert("Passwords don't match")
        }
    }

    return (
        <div className='landing'>
            <h1>Welcome to Task Manager</h1>
            {loginView
                ? (
                    <>
                        <h3>Log in below</h3>
                        <div className='landing-flex'>
                            <input
                                value={email}
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)} />
                            <input
                                value={password}
                                type={viewPassword}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={login}>Log in</button>
                            <p>Don't have an account? <span onClick={() => setLoginView(false)}>Register Here</span></p>
                        </div>
                    </>
                )
                : (
                    <>
                        <h3>Create an account</h3>
                        <div className='landing-flex'>
                            <input
                                value={firstName}
                                placeholder='First Name'
                                onChange={(e) => setFirstName(e.target.value)} />
                            <input
                                value={lastName}
                                placeholder='Last Name'
                                onChange={(e) => setLastName(e.target.value)} />
                            <input
                                value={email}
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)} />
                            <input
                                value={password}
                                type={viewPassword}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)} />
                            <input
                                value={verPassword}
                                type={viewPassword}
                                placeholder='Verify Password'
                                onChange={(e) => setVerPassword(e.target.value)} />
                            <button onClick={register}>Register</button>
                            <p>Have an account? <span onClick={() => setLoginView(true)}>Log in here</span></p>
                        </div>
                    </>
                )}

        </div>
    )
}

export default connect(null, { getUser })(Landing);