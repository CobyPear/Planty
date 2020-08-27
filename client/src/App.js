import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/' component={Signup} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
