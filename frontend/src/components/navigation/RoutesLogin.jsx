import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Login from '../layout/login/Login'


export default props =>
   <Switch>
      <Route exact path='/login' component={Login} />
      <Redirect from='*' to='/' />
   </Switch>
