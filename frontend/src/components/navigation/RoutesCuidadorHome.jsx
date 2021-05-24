import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import HomeCuidador from '../layout/cuidador/LayoutHomeCuidador'
import ProfileCuidador from '../layout/cuidador/ProfileCuidador'

export default props =>
   <Switch>
      <Route exact path={props.match.path} component={HomeCuidador} />
      <Route path={`${props.match.path}/profile`} component={ProfileCuidador} />
      {/* OUTRAS ROTAS DE CUIDADOR FEITAS DA FORMA ACIMA*/}
      <Redirect from='*' to='/homeCuidador' />
   </Switch>
