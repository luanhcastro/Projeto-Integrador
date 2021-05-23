import React from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Link } from 'react-router-dom'
import { Layout, Card, Typography, Form, Input, Button, Row, Col, notification, Select } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Title } = Typography;
const { Content, Footer } = Layout;
const { Option } = Select;
const Login = () => {

    return (
        <div>
            <Header />
            <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
                <Content className="site-layout" style={{ display: 'flex', justifyContent: 'center', minHeight: '600px', marginTop: 110 }}>
                    <div className="site-layout-background" style={{ maxWidth: '600px', padding: 10, minHeight: 380 }}>
                        <Link to="/cuidador">
                            <Button type="primary" size="large" style={{ margin: 10 }}
                                icon={(<HeartOutlined style={{ fontSize: 20 }} />)}>CUIDADOR</Button>
                        </Link>
                        <Link to="/usuario">
                            <Button type="primary" size="large" style={{ margin: 10 }}
                                icon={(<UserOutlined style={{ fontSize: 20 }} />)}>USUÁRIO</Button>
                        </Link>
                    </div>
                </Content>
            </Card>
            <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
        </div>
    )
}
export default Login;
