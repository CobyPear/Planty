import React, { useState } from 'react';
import GoogleSignup from './btn_google_signin_light_normal_web.png'
import './signup.css'

export default () => {

    const [state, setState] = useState();

    const handleInputChange = ({target: {name, value}}) => {
        console.log(value)
        console.log(name)
        setState(state=>({
            ...state,
            [name]: value
        }))
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
                <div>
                    <button
                        className='signUpBtn'
                        onClick={e => {
                            e.preventDefault()

                        }}>
                        Sign Up
                    </button>
                    <button className='googleSignin'
                        onClick={e => {
                            e.preventDefault()
                            console.log(e.target)
                        }}>
                        <img src={GoogleSignup} alt='Sign in with Google' />
                    </button>

                </div>
            </form>
        </div>
    )

}