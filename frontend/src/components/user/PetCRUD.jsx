import React, { Component } from 'react';
import Main from '../template/Main';

const headerProps = {
   icon: 'heart',
   title: 'Meus Pets',
   subtitle: 'Cadastro de Pets'
}

export default class UsersCrud extends Component {
   render() {
      return (
         <Main {...headerProps} >
            Cadastro de Pets
         </Main>
      )
   }
}