import React from 'react'
import logo from '../../assets/imgs/LOGO.png'
import "./Header.css"
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Header } = Layout;

export default props =>
<Header class="defaultHeader">
<Link to="/">
<img src={logo} alt='logo' class="logo"/>
      </Link>  
  <div theme="light" mode="horizontal" class="buttons">
      <Link to="/">
         <Button type="primary" style={{margin: 10}} shape="round" icon={(<ArrowLeftOutlined style={{fontSize:20}}/>)}>VOLTAR</Button>
      </Link>
  </div>
</Header>

