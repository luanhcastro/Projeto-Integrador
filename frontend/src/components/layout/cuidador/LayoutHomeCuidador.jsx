import React, { useState } from 'react'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, notification, Button, Row, Col, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../../assets/imgs/LOGO.png'
import "../../template/Header.css";
import 'antd/dist/antd.css';
import { LogoutOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content, Footer, Header } = Layout;



const Cuidador = () => {

   function handleLogout() {
      console.log("logout")
   };

   return (
      <div>
         <Header class="defaultHeader">
            <Link to="/homeUsuario">
               <img src={logo} alt='logo' class="logo" />
            </Link>
            <div theme="light" mode="horizontal" class="buttons" >
               <Button onClick={handleLogout} type="primary" size="large" style={{ margin: 10, backgroundColor: 'red' }}
                  icon={(<LogoutOutlined style={{ fontSize: 20 }}

                  />)}>LOGOUT</Button>
            </div>
         </Header>
         <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
            <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
               <div className="site-layout-background" style={{ padding: 10, minHeight: 380 }}>
                  <Card style={{ textAlign: 'center', minHeight: '800px', }} title={<Title type="warning">Seja bem vindo ao Nanny Pet!</Title>}>
                     <Card  >
                        <a style={{ fontSize: 20, color: 'grey'}} >O que deseja realizar conosco hoje ?</a>
                     </Card>
                     <Link to='/homeCuidador/profile'>
                        <Button style={{ textAlign: 'center', minHeight: '20px', margin: 10 }}>
                           VISUALIZAR PERFIL
                        </Button>
                     </Link>
                  </Card>
               </div>
            </Content>
         </Card>
         <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
      </div>
   )
}
export default Cuidador;
