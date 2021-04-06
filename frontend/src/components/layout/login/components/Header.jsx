import './Header.css'
import logo from '../../../../assets/imgs/LOGO.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
   <header className="header d-none d-sm-flex">
     {/*  <h1 className="left mt-3">
         <i className={`fa`}></i>Seja bem vindo!
      </h1> */}
      <h2 className="logo">
         <Link to="/" className="logo">
            <img src={logo} alt='logo' />
         </Link>
      </h2>
     {/*  <h1 className="right mt-3">
         <i className={`fa`}></i>Realize seu login!
      </h1> */}
   </header>