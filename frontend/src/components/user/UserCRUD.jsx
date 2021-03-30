import React, { Component } from 'react';
import axios from 'axios'
import Main from '../template/Main';

const headerProps = {
   icon: 'users',
   title: 'Usuários',
   subtitle: 'Cadastro de Usuários'
}



export default class UsersCrud extends Component {
   render() {
      return (
         <Main {...headerProps} >
            Cadastro de Usuário
         </Main>
      )
   }
}