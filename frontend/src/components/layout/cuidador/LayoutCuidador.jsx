import React, {useState} from 'react'
import Header from '../../template/UserHeader'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, InputNumber, Button, Row, Col, Alert } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Title } = Typography;
const { Content, Footer } = Layout;
    
    const AdvancedSearchForm = () => {
      const [form] = Form.useForm();
      const [showAlert, setShowAlert] = useState(false);
      const [showErrorAlert, setShowErrorAlert] = useState(false);
      const url = 'http://localhost:3001/cuidador'
      const onFinish = async (values) => {
         console.log('Received values of form: ', values);
         try{
         await axios.post(url, 
         {
            nome: values.nome,
            dataNascimento:values.dataNasc,
            cpf: values.cpf,
            endereco: values.endereco,
            numServicos: 0,
            telefone: values.telefone,
          })
         .then(({ response }) => {
            setShowAlert(true);
            form.resetFields();
            console.log(response.mensagem);
         })
        }catch(err) {
            setShowErrorAlert(true);
            console.log(err);
        }
      };
   return(
   <div>
      <Header/>      
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)'}}>
         <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
         <div className="site-layout-background" style={{ padding: 10 , minHeight: 380 }}>
         <Card style={{ textAlign: 'center', minHeight: '800px' }}title={<Title type="warning">CADASTRO DE CUIDADORES</Title>}>
         {showAlert && ( <Alert message='Cadastro salvo com sucesso!' type='success' showIcon closable/>)}
         {showErrorAlert && ( <Alert message='Não foi possível efetuar o cadastro' type='error' showIcon closable/>)}
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
export default AdvancedSearchForm;
