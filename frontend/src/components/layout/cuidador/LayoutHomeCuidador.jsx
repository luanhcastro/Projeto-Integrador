import React, {useState} from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, notification, Button, Row, Col, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Title } = Typography;
const { Content, Footer } = Layout;
    
    const Cuidador = () => {
      
   return(
   <div>
      <Header/>      
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)'}}>
         <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
         <div className="site-layout-background" style={{ padding: 10 , minHeight: 380 }}>
         <Card style={{ textAlign: 'center', minHeight: '800px' }}title={<Title type="warning">CADASTRO DE CUIDADORES</Title>}>
         
         </Card>
      </div>
         </Content>
      </Card>
      <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
   </div>
   )
}
export default Cuidador;
