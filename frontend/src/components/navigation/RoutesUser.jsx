import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import LayoutUser from '../layout/user/LayoutUser'


export default props =>
   <Switch>
      <Route exact path='/usuario' component={LayoutUser} />
      <Redirect from='*' to='/usuario' />
   </Switch>
