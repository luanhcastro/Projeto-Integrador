import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCRUD'
import PetCrud from '../components/user/PetCRUD'


export default props =>
   <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/users' component={UserCrud} />
      <Route path='/pets' component={PetCrud} />
      <Redirect from='*' to='/' />
   </Switch>
