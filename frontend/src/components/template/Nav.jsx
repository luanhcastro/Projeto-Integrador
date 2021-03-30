import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
   <aside className="menu-area">
      <nav className="menu">
         {/*Criar componente NavItem pra ficar menos complexo e mais agil*/}
         <Link to="/">
            <i className="fa fa-home"></i> Início
         </Link>
         <Link to="/users">
            <i className="fa fa-users"></i> Usuários
         </Link>
         <Link to="/pets">
            <i className="fa fa-heart"></i> Meus Pets
         </Link>
      </nav>
   </aside>