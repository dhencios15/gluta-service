import React, { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectCurrentUser } from './store/user/user.selector';
import { checkUserSession } from './store/user/user.action';

import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import PrivateRoute from './routes/PrivateRoute';
import { getProductStart } from './store/products/products.action';
import { getAllClientStart } from './store/clients/clients.action';
const Login = lazy(() => import('./pages/Login'));
const Layout = lazy(() => import('./containers/Layout'));

const App = ({
  checkUserSession,
  currentUser,
  getProductStart,
  getAllClientStart,
}) => {
  useEffect(() => {
    checkUserSession();
    getProductStart();
  }, [checkUserSession, getProductStart]);

  // useEffect(() => {
  //   getAllClientStart();
  // }, [getAllClientStart]);

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        {currentUser ? (
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={Layout} />
          </Switch>
        ) : (
          <Login />
        )}
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  getProductStart: () => dispatch(getProductStart()),
  getAllClientStart: () => dispatch(getAllClientStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
