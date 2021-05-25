import React, { useState } from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, notification, Button, Row, Col, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Content, Footer } = Layout;

const Cuidador = () => {
  const [form] = Form.useForm();
  const url = 'http://localhost:3001/cuidador'
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post(url,
      {
        nome: values.nome,
        dataNascimento: values.dataNasc,
        cpf: values.cpf,
        endereco: values.endereco,
        numServicos: 0,
        email: values.email,
        senha: values.senha,
        telefone: values.telefone,
      })
      .then((response) => {
        notification['success']({
          message: 'Cadastrado com sucesso',
          description:
            'Parabéns, agora é só logar na nossa plataforma com seu email e senha!',
        });
        console.log('122232312');
        form.resetFields();
        console.log(response);
        window.location.href = "http://localhost:3000/#/login";
      })
      .catch((err) => {
        notification['error']({
          message: 'Não foi possivel cadastrar',
          description:
            'Verifique se seus dados estão corretos.',
        });
        console.log(err);
      })
  }
  return (
    <div>
      <Header />
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
        <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
          <div className="site-layout-background" style={{ padding: 10, minHeight: 380 }}>
            <Card style={{ textAlign: 'center', minHeight: '800px' }} title={<Title type="warning">CADASTRO DE CUIDADORES</Title>}>
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
                        maxLength={50}
                        placeholder="Insira seu nome" />
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
                        maxLength={11}
                        placeholder="Insira sua data de Nascimento" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="cpf"
                      label="CPF"
                      rules={[
                        {
                          required: true,
                          message: 'Preencha o campo!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={11}
                        placeholder="Insira seu CPF"
                      />
                    </Form.Item>
                    <Form.Item
                      name="telefone"
                      label="Telefone/Celular"
                      rules={[
                        {
                          required: true,
                          message: 'Preencha o campo!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={12}
                        placeholder="Insira seu telefone ou celular"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="endereco"
                      label="Endereço"
                      rules={[
                        {
                          required: true,
                          message: 'Preencha o campo!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={50}
                        placeholder="Insira seu endereço"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
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
                  <Col span={12}>
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
                        placeholder="Insira uma senha"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
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
                    {/* <Link to='/login' >  */}
                      <Button type="primary" htmlType="submit">Enviar</Button>
                    {/* </Link> */}
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
export default Cuidador;
