import React, { useState, useEffect } from 'react'
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
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(false);
    const [form] = Form.useForm();

    const request = () => {
        axios.get(`http://localhost:3001/pet/${editingId}`)
            .then((response) => {
                console.log(response)
                form.setFieldsValue({
                    nome: response.data.nomePet,
                    idade: response.data.idade,
                    raca: response.data.raca,
                    porte: response.data.porte,
                });
            })
            .catch((err) => {
                notification['error']({
                    message: 'Não foi possivel cadastrar',
                    description:
                        'Verifique se seus dados estão corretos.',
                });
                console.log(err);
            })
            .finally(() => setLoading(false))


    }


    const url = 'http://localhost:3001/pet'
    const onFinish = async (values) => {
        if (!editingId) {
            await axios.post(url,
                {
                    nomePet: values.nome,
                    idade: values.idade,
                    raca: values.raca,
                    porte: values.porte,
                    idDono: localStorage.getItem('id')
                })
                .then(() => window.location = '/pet#/homeUsuario')
                .catch((err) => {
                    notification['error']({
                        message: 'Não foi possivel cadastrar',
                        description:
                            'Verifique se seus dados estão corretos.',
                    });
                    console.log(err);
                })
        } else {
            await axios.patch(url,
                {
                    idPet: editingId,
                    nomePet: values.nome,
                    idade: values.idade,
                    raca: values.raca,
                    porte: values.porte,
                    idDono: localStorage.getItem('id')
                })
                .then(() => localStorage.removeItem('currentPetId'))
                .then(() => window.location = '/pet#/homeUsuario')
                .catch((err) => {
                    notification['error']({
                        message: 'Não foi possivel cadastrar',
                        description:
                            'Verifique se seus dados estão corretos.',
                    });
                    console.log(err);
                })
        }

    };
    useEffect(() => {
        setEditingId(localStorage.getItem('currentPetId'))
    }, []);
    useEffect(() => {
        if (editingId) {
            setLoading(true);
            request(editingId);
        }
    }, [editingId]);
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
                        <Card style={{ textAlign: 'center', minHeight: '800px' }} loading={loading} title={<Title type="warning">CADASTRO DE PETS</Title>}>
                            <Form
                                style={{ marginTop: 50 }}
                                form={form}
                                name="advanced_search"
                                layout="vertical"
                                loading={loading}
                                className="ant-advanced-search-form"
                                onFinish={onFinish}
                                size="large"
                            >
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            loading={loading}
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
                                                loading={loading}

                                                placeholder="Nome do pet" />
                                        </Form.Item>
                                        <Form.Item
                                            name="idade"
                                            label="Idade"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Preencha o campo!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                maxLength={10}
                                                placeholder="Idade do pet" />
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
                                            <Select defaultValue="medio" style={{ minwidth: 200 }}>
                                                <Option value="pequeno">Pequeno</Option>
                                                <Option value="medio">Médio</Option>
                                                <Option value="grande">Grande</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row style={{ marginTop: '320px' }}>
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
