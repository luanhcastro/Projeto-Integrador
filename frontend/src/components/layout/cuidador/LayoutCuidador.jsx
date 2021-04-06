import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../template/Header'

export default props =>
   <div className="cuidador">
      <Header
         link1={
            <Link to="/">
               <navbutton className="fa fa-home">
                  VOLTAR PARA HOME
               </navbutton>
            </Link>
         }
      />
      <text>CUIDADOR</text>
   </div>
