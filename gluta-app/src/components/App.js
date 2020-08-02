import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from './Signin';
import Home from './Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
