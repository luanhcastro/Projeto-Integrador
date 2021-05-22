import React, {useState} from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, Button, Row, Col, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Title } = Typography;
const { Content, Footer } = Layout;
    
    const User = () => {
      const [form] = Form.useForm();
      const url = 'http://localhost:3001/dono'
      const onFinish = async (values) => {
         await axios.post(url, 
         {
            nome: values.nome,
            dataNascimento:values.dataNasc,
            cpf: values.cpf,
            email: values.email,
            senha: values.senha,
            endereco: values.endereco,
            qtdPetsdono: values.qtdPetsdono,
            telefone: values.telefone,
          })
         .then(() => {
          notification['success']({
            message: 'Cadastrado com sucesso',
            description:
              'Parabéns, agora é só logar na nossa plataforma com seu email e senha!',
          });
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
   return(
   <div>
      <Header/>      
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)'}}>
         <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
         <div className="site-layout-background" style={{ padding: 10 , minHeight: 380 }}>
         <Card style={{ textAlign: 'center', minHeight: '800px' }}title={<Title type="warning">CADASTRO DE CLIENTES</Title>}>
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
            <Col span={24}>
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
            </Col>
            <Col span={12}>
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
              <Form.Item
                name="qtdPetsdono"
                label="Quantidade de Pets"
                rules={[
                  {
                    required: true,
                    message: 'Preencha o campo!',
                  },
                ]}
              >
                <Input
                maxLength={11}
                placeholder="Insira quantos pets você possui" />
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
               <Col span={24} style={{ textAlign: 'right'}}>
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
export default User;
