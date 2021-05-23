import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import LayoutCuidador from '../layout/cuidador/LayoutCuidador'
import LayoutHomeCuidador from '../layout/cuidador/LayoutHomeCuidador'


export default props =>
   <Switch>
      <Route exact path='/cuidador' component={LayoutCuidador} />
      <Route path='/cuidador/home' component={LayoutHomeCuidador} />
      <Redirect from='*' to='/cuidador' />
   </Switch>
