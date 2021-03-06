import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import HomePage from '../components/navigation/Homepage'
import UserRoute from '../components/navigation/RoutesUser'
import CuidadorRoute from '../components/navigation/RoutesCuidador'
import LoginRoute from '../components/navigation/RoutesLogin'
import SignRoute from '../components/navigation/RoutesSign'
import HomeCuidador from '../components/navigation/RoutesCuidadorHome'
import HomeUsuario from '../components/navigation/RoutesUsuarioHome'


export default props =>
   <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/usuario' component={UserRoute} />
      <Route path='/cuidador' component={CuidadorRoute} />
      <Route path='/sign' component={SignRoute} />
      <Route path='/login' component={LoginRoute} /> 
      <Route path='/homeCuidador' component={HomeCuidador} /> 
      <Route path='/homeUsuario' component={HomeUsuario} /> 
      
      <Redirect from='*' to='/' />
   </Switch>
