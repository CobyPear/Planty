import React, { useState } from 'react';
import GoogleSignup from './btn_google_signin_light_normal_web.png'
import API from '../../utils/API';
import './signup.css';

export default props => {

    const [state, setState] = useState();

    const handleInputChange = ({ target: { name, value } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        const userData = {
            email: state.email,
            password: state.password
        };

        console.log('userData ', userData)
        API.registerLogin(userData)
            .then(res => {
                console.log(res)
                window.location = '/planty'
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })

    }

    return (
        <div>
            <form>
                <label htmlFor='email'>Email</label>
                <input
                    name='email'
                    type='email'
                    onChange={handleInputChange}
                />
                <label htmlFor='password'>Password</label>
                <input
                    name='password'
                    type='password'
                    onChange={handleInputChange}
                />
                <div className='btnWrapper'>
                    <button
                        className='signUpBtn'
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                    <img
                        src={GoogleSignup}
                        alt='Sign in with Google'
                        onClick={e => {
                            e.preventDefault()
                            console.log('clicked')
                        }} />
                </div>
            </form>
        </div>
    )

}