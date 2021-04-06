import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import LayoutCuidador from '../layout/cuidador/LayoutCuidador'


export default props =>
   <Switch>
      <Route exact path='/cuidador' component={LayoutCuidador} />
      <Redirect from='*' to='/cuidador' />
   </Switch>
