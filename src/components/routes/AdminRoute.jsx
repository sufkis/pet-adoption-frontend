import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useAuth();
    if (!user) {
        return (
            <Route 
                {...rest}
                render={() => {
                    return <Redirect to='/' />
                }}
            ></Route>
        )
    }
    return (
        <Route 
            {...rest}
            render={props => {
                return user.role === 'admin' ? <Component {...props} /> : <Redirect to='/' />
            }}
        ></Route>
    )
}