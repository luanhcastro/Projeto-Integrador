import React, { useState } from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, Button, Row, Col, notification, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Title } = Typography;
const { Content, Footer } = Layout;
const { Option } = Select;
const Login = props => {

    const [tipo, setTipo] = useState('dono/loginDono');
    console.log(tipo);
    const [form] = Form.useForm();
    const url = `http://localhost:3001/${tipo}`
    const urlString = url.toString()
    // console.log("URL: " + urlString)
    const onFinish = async (values) => {
        await axios.post(urlString,
            {
                email: values.email,
                senha: values.senha,
            })
            .then(response => {
                console.log(response.data.cuidador);
                if (response.data.cuidador) localStorage.setItem("id", JSON.stringify(response.data.cuidador.id));
                else localStorage.setItem("id", JSON.stringify(response.data.dono.id));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                window.location = tipo === 'cuidador/loginCuidador' ? '/pet#/homeCuidador' : '/pet#/homeUsuario';
            })
            .catch((err) => {
                notification['error']({
                    message: 'Não foi possivel realizar o login',
                    description:
                        'Verifique se seus dados estão corretos.',
                });
                console.log(err);
            })
    };
    function handleChange(value) {
        console.log("VALUE:" + value);
        value === 'dono' ? setTipo(`dono/loginDono`) : setTipo(`cuidador/loginCuidador`)
    };
    return (
        <div>
            <Header />
            <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
                <Content className="site-layout" style={{ display: 'flex', justifyContent: 'center', minHeight: '600px', marginTop: 110 }}>
                    <div className="site-layout-background" style={{ maxWidth: '600px', padding: 10, minHeight: 380 }}>
                        <Card style={{ textAlign: 'center', minHeight: '800px' }} title={<Title type="warning">LOGIN</Title>}>
                            <Form
                                style={{ marginTop: 50 }}
                                form={form}
                                name="advanced_search"
                                layout="vertical"
                                className="ant-advanced-search-form"
                                onFinish={onFinish}
                                size="large"
                            >
                                <Row gutter={24} style={{ justifyContent: 'center' }}>
                                    <Col spam={24} >
                                        <Form.Item
                                            name="tipo"
                                            label="Sou um:"
                                            placeholder="Selecione o usuário"
                                        >
                                            <Select defaultValue="dono" style={{ width: 200 }} onChange={e => handleChange(e)}>
                                                <Option value="dono" >Cliente</Option>
                                                <Option value="cuidador" >Cuidador</Option>
                                            </Select>
                                        </Form.Item>
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
                                            <Input.Password
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
