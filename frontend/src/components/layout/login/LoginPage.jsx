import React from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, Button, Row, Col, notification, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Title } = Typography;
const { Content, Footer } = Layout;
const { Option } = Select;
const Login = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log(values);
    };
    return (
        <div>
            <Header />
            <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
                <Content className="site-layout" style={{ display: 'flex', justifyContent: 'center', minHeight: '600px', marginTop: 110 }}>
                    <div className="site-layout-background" style={{ maxWidth: '600px', padding: 10, minHeight: 380 }}>
                        <Card style={{ textAlign: 'center', minHeight: '800px'}} title={<Title type="warning">LOGIN</Title>}>
                            <Form
                                style={{ marginTop: 50 }}
                                form={form}
                                name="advanced_search"
                                layout="vertical"
                                className="ant-advanced-search-form"
                                onFinish={onFinish}
                                size="large"
                            >
                                <Row gutter={24} style={{justifyContent: 'center'}}>
                                    <Col spam={24} >
                                        <Select defaultValue="Cliente" style={{ minwidth: 200 }} label="Sou um:" onChange="">
                                            <Option value="jack">Cliente</Option>
                                            <Option value="lucy">Cuidador</Option>
                                        </Select>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Preencha o campo!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Insira seu email"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name="senha"
                                            label="Senha"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Preencha o campo!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Insira uma senha"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '300px' }}>
                                    <Col span={24} style={{ textAlign: 'center' }}>
                                        <Button
                                            style={{ margin: '0 8px' }}
                                            onClick={() => {
                                                form.resetFields();
                                            }}
                                        >
                                            Limpar campos
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                            Enviar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </div>
                </Content>
            </Card>
            <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
        </div>
    )
}
export default Login;
