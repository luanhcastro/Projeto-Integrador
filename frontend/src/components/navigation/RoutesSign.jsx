import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import SignPage from '../layout/sign/SignPage'


export default props =>
   <Switch>
      <Route exact path='/sign' component={SignPage} />
      <Redirect from='*' to='/' />
   </Switch>
