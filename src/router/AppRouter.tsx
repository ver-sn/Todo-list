import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import Main from '../pages/Main';
import Task from '../pages/Task';

const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <BaseLayout>
        <Route exact path='/task/:id' component={Task} />
        <Route exact path='/' component={Main} />
      </BaseLayout>
    </Switch>
  </Router>
);

export default AppRouter;
