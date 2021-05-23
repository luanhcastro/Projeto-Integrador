import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import ProfileCuidador from '../layout/cuidador/ProfileCuidador'


export default props =>
   <Switch>
      <Route exact path='/cuidadorprofile' component={ProfileCuidador} />
      <Redirect from='*' to='/cuidador' />
   </Switch>
