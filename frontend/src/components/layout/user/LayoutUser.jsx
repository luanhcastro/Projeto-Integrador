import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../template/Header'
import Footer from '../../template/Footer'


export default props =>
   <div className="usuario">

      <Header link1={
         <Link to="/">
            <navbutton className="fa fa-home">
               VOLTAR PARA HOME
            </navbutton>
         </Link>
      }
      />
      <text>USUÁRIO</text>

   </div>
