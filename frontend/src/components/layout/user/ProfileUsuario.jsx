import React, { useState, useEffect } from 'react'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, notification, Button, Row, Col, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../../assets/imgs/LOGO.png'
import "../../template/Header.css";
import 'antd/dist/antd.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content, Footer, Header } = Layout;


const ProfileUser = () => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const idDono = localStorage.getItem('id')
   const getUrl = `http://localhost:3001/dono/${idDono}`
   const patchUrl = 'http://localhost:3001/dono/'


   const formataData = data => {
      var date = new Date()
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      return year + '-' + (month++) + '-' + day;
   }

   const request = () => {
      axios.get(getUrl)
         .then((response) => {
            console.log(response)
            form.setFieldsValue({
               id: response.data.id,
               nome: response.data.nome,
               dataNasc: formataData(response.data.dataNascimento),
               cpf: response.data.cpf,
               email: response.data.email,
               senha: response.data.senha,
               endereco: response.data.endereco,
               qtdPetsdono: response.data.pet.length,
               telefone: response.data.telefone,
            });
         })
         .catch((err) => {
            console.log(err);
         })
         .finally(() => setLoading(false))
   };
   const onFinish = async (values) => {
      await axios.patch(patchUrl,
         {
            id: idDono,
            nome: values.nome,
            dataNascimento: values.dataNasc,
            cpf: values.cpf,
            email: values.email,
            senha: values.senha,
            endereco: values.endereco,
            qtdPetsdono: values.qtdPetsdono,
            telefone: values.telefone,
         })
         .then(() => {
            notification['success']({
               message: 'Atualizado com sucesso',
               description:
                  'Seus dados foram atualizados',
            });
         })
         .catch((err) => {
            notification['error']({
               message: 'Não foi possivel atualizar',
               description:
                  'Verifique se seus dados estão corretos.',
            });
            console.log(err);
         })
   };

   useEffect(() => {
      setLoading(true);
      request();
   }, []);




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
                  <Card style={{ textAlign: 'center', minHeight: '800px' }} loading={loading} title={<Title type="warning">PERFIL</Title>}>
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
export default ProfileUser;
