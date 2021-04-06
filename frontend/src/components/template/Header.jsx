import './Header.css';

import React from 'react'
import logo from '../../assets/imgs/LOGO.png'


export default props =>
   <header className="header d-none d-sm-flex">
      <h1 className="logo">
         <img src={logo} alt='logo' />
      </h1>
      <h2 className="mid">
         <mid className={`fa`}>
         </mid>
      </h2>
      <h3 className="end">
         <end className={`fa`}>
            {props.link1}
            {props.link2}
            {props.link3}
         </end>
      </h3>
   </header>