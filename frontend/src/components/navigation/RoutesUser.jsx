import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import LayoutUser from '../layout/user/LayoutUser'
import UserHome from '../layout/user/LayoutUserHome'


export default props =>
   <Switch>
      <Route exact path='/usuario' component={LayoutUser} />
      <Route path='/usuario/home' component={UserHome} />
      <Redirect from='*' to='/usuario' />
   </Switch>
