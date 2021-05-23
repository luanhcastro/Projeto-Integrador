import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import HomePage from '../components/navigation/Homepage'
import UserRoute from '../components/navigation/RoutesUser'
import CuidadorRoute from '../components/navigation/RoutesCuidador'
import LoginRoute from '../components/navigation/RoutesLogin'
import PetRoute from '../components/navigation/RoutesDonoNavegacao'


export default props =>
   <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/usuario' component={UserRoute} />
      <Route path='/cuidador' component={CuidadorRoute} />
      <Route path='/login' component={LoginRoute} />
      <Route path='/pet' component={PetRoute} />:
      <Redirect from='*' to='/' />
   </Switch>
