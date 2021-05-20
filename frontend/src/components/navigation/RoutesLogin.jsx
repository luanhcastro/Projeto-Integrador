import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import LoginPage from '../layout/login/LoginPage'


export default props =>
   <Switch>
      <Route exact path='/login' component={LoginPage} />
      <Redirect from='*' to='/' />
   </Switch>
