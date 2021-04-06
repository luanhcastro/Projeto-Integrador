import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import HomePage from '../layout/Homepage'


export default props =>
   <Switch>
      <Route exact path='/' component={HomePage} />
      <Redirect from='*' to='/' />
   </Switch>
