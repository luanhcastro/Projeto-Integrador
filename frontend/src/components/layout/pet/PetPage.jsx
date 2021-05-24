import React from 'react'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, Button, Row, Col, Select, notification } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../../assets/imgs/LOGO.png'
import "../../template/Header.css";
import 'antd/dist/antd.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content, Footer, Header } = Layout;


const { Option } = Select;

const Pet = () => {
    const [form] = Form.useForm();
    const url = 'http://localhost:3001/pet'
    const onFinish = async (values) => {
        await axios.post(url,
            {
                nomePet: values.nome,
                idade: values.dataNasc,
                raca: values.raca,
                porte: values.porte.value,
                idDono: localStorage.getItem('id')
            })
            .then((response) => {
                console.log(response)
                form.resetFields();
            })
            .catch((err) => {
                notification['error']({
                    message: 'Não foi possivel cadastrar',
                    description:
                        'Verifique se seus dados estão corretos.',
                });
                console.log(err);
            })
    };
    return (
        <div>
            <Header class="defaultHeader">
                <Link to="/homeUsuario">
                    <img src={logo} alt='logo' class="logo" />
                </Link>
                <div theme="light" mode="horizontal" class="buttons">
                    <Link to='/homeUsuario' >
                        <Button type="primary" size="large" style={{ margin: 10 }}
                            icon={(<ArrowLeftOutlined style={{ fontSize: 20 }} />)}
                        >VOLTAR</Button>
                    </Link>
                </div>
            </Header>
            <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
                <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
                    <div className="site-layout-background" style={{ padding: 10, minHeight: 380 }}>
                        <Card style={{ textAlign: 'center', minHeight: '800px' }} title={<Title type="warning">CADASTRO DE PETS</Title>}>
                            <Form
                                style={{ marginTop: 50 }}
                                form={form}
                                name="advanced_search"
                                layout="vertical"
                                className="ant-advanced-search-form"
                                onFinish={onFinish}
                                size="large"
                            >
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="nome"
                                            label="Nome"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Preencha o campo!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Nome do pet" />
                                        </Form.Item>
                                        <Form.Item
                                            name="dataNasc"
                                            label="Data de Nascimento"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Preencha o campo!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                maxLength={10}
                                                placeholder="Data de Nascimento do pet" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="raca"
                                            label="Raça"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Preencha o campo!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                maxLength={20}
                                                placeholder="Raça do seu pet"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="porte"
                                            label="Porte"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Preencha o campo!',
                                                },
                                            ]}
                                        >
                                            <Select defaultValue="medio" style={{ minwidth: 200 }} labelInValue>
                                                <Option value="pequeno">Pequeno</Option>
                                                <Option value="medio">Médio</Option>
                                                <Option value="grande">Grande</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row style={{ marginTop: '200px' }}>
                                    <Col span={24} style={{ textAlign: 'right' }}>
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
export default Pet;
