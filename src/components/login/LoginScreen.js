import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const LoginScreen = ( { history }) => {

    const { dispatch } = useContext( AuthContext );

    const handleLogin = () => {
        // history.push('/')
        // history.replace('/')

        // Extraer del context

        dispatch({
            type: types.login,
            payload: {
                name: 'JapcDev'
            }
        });

        history.replace('/');
    }

    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr/>

            <button
                className="btn btn-primary"
                onClick= { handleLogin }
            >
                login
            </button>
        </div>
    )
}
