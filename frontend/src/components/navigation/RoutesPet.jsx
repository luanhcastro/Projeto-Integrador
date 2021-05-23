import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import PetPage from '../layout/pet/PetPage'


export default props =>
   <Switch>
      <Route exact path='/pet' component={PetPage} />
      <Redirect from='*' to='/' />
   </Switch>
