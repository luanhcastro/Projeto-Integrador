import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCRUD'
import PetCrud from '../components/user/PetCRUD'


export default props =>
   <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/dono' component={UserCrud} />
      <Route path='/pet' component={PetCrud} />
      <Redirect from='*' to='/' />
   </Switch>
