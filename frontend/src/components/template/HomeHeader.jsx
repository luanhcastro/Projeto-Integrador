import React from 'react'
import logo from '../../assets/imgs/LOGO.png'
import "./Header.css"
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Button, List, Avatar } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

export default props =>
<Header class="defaultHeader">
<Link to="/">
<img src={logo} alt='logo' class="logo"/>
      </Link>  
  <div theme="light" mode="horizontal" class="buttons" style={{  }}defaultSelectedKeys={['2']}>
      <Link to="/usuario">
         <Button type="primary" size="large" style={{margin: 10}} icon={(<UserOutlined style={{fontSize:20}}/>)}>USUÁRIO</Button>
      </Link>
      <Link to="/cuidador">
         <Button type="primary" size="large" style={{margin: 10}} icon={(<HeartOutlined style={{fontSize:20}}/>)}>CUIDADOR</Button>
      </Link>
      
  </div>
</Header>

