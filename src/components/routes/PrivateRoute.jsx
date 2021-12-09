import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { token } = useAuth();
    return (
        <Route 
            {...rest}
            render={props => {
                return token ? <Component {...props} /> : <Redirect to='/welcome' />
            }}
        ></Route>
    )
}