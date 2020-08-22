import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => selectCurrentUser(state));

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
