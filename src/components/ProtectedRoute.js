import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { state: { user, token } } = useContext(AuthContext);

    // Check user's token
    const isLoggedIn = () => user.tokens.includes(token);


    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (isLoggedIn && user) {
                        return <Component {...props} />
                    } else {
                        return <Redirect to={'/login'} />
                    }
                }
            }
        />
    )
};

export default ProtectedRoute;