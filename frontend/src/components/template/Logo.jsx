import './Logo.css';
import logo from '../../assets/imgs/LOGO.png'
import React from 'react';

export default props =>
   <aside className="logo">
      <h2 href="/" className="logo">
         <img src={logo} alt='logo' />
      </h2>
   </aside>