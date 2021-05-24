import React from 'react'
import { Switch, Route, Redirect } from 'react-router'


import HomeUsuario from '../layout/user/LayoutUserHome'
import ProfileUser from '../layout/user/ProfileUsuario'
import PetPage from '../layout/pet/PetPage'
import BuscaCuidador from '../layout/user/BuscaCuidador'

export default props =>
   <Switch>
      <Route exact path={props.match.path} component={HomeUsuario} />
      <Route path={`${props.match.path}/profile`} component={ProfileUser} />
      <Route path={`${props.match.path}/pets`} component={PetPage} />
      <Route path={`${props.match.path}/buscaCuidador`} component={BuscaCuidador} />
      {/* OUTRAS ROTAS DE CUIDADOR feitas da forma acima*/}
      <Redirect from='*' to='/homeCuidador' />
   </Switch>
