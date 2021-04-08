import React, {useState} from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, InputNumber, Button, Row, Col, Alert } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Title } = Typography;
const { Content, Footer } = Layout;
    
    const AdvancedSearchForm = () => {
      const [form] = Form.useForm();
      const [showAlert, setShowAlert] = useState(false);
    
      const onFinish = async (values) => {
         console.log('Received values of form: ', values);
         await axios.post('/cuidador', 
         {
            nome: values.nome,
            idade: values.idade,
            cpf: values.cpf,
            endereco: values.endereco,
            numServicos: 0,
            telefone: values.telefone,
         })
         .then(({ response }) => {
            console.log(response.mensagem);
            setShowAlert(true);
         })
         .catch(err => {
         console.log(err);
     });
      };
   return(
   <div>
      <Header/>      
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)'}}>
         <Content className="site-layout" style={{ padding: '0 200px', marginTop: 110 }}>
         <div className="site-layout-background" style={{ padding: 10 , minHeight: 380 }}>
         <Card style={{ textAlign: 'center '}}title={<Title type="warning">CADASTRO DE CUIDADORES</Title>}>
         {showAlert && ( <Alert message="Cadastrado com sucesso!" type="success" showIcon closeable/> )}
         <Form
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
                <Input placeholder="Insira seu nome" />
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
                <Input placeholder="Insira sua data de Nascimento" />
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
                <Input placeholder="Insira seu CPF" />
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
                <Input placeholder="Insira seu telefone ou celular" />
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
                <Input placeholder="Insira seu endereço" />
              </Form.Item>
            </Col>
            </Row>
            <Row>
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
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
   </div>
   )
}
export default AdvancedSearchForm;
