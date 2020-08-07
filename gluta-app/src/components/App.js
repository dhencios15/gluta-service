import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from './Signin';
import Home from './Home';
import Navbar from '../layouts/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
