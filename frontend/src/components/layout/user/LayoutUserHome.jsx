import React from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, Button, Row, Col, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { Title } = Typography;
const { Content, Footer } = Layout;

const User = () => {
  const [form] = Form.useForm();
  const url = 'http://localhost:3001/dono'
  const onFinish = async (values) => {
    await axios.post(url,
      {
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
  return (
    <div>
      <Header />
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
        <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
          <div className="site-layout-background" style={{ padding: 10, minHeight: 380 }}>
            <Card style={{ textAlign: 'center', minHeight: '800px' }} title={<Title type="warning">CADASTRO DE CLIENTES</Title>}>
              
              
            </Card>
          </div>
        </Content>
      </Card>
      <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
    </div>
  )
}
export default User;
