import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useDispatch, useSelector } from 'react-redux'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const adminInfo = useSelector(state => state.auth)
    console.log(adminInfo, 'sad')

    useEffect(() => {

    }, [])

    return (
        <Route
            {...rest}
                render={ props =>
                adminInfo.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
};

