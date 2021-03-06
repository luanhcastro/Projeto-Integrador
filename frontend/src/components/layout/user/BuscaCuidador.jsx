import React, { useState, useEffect } from 'react'
import "../Home.css"
import { Layout, Card, Typography, Form, Input, notification, Button, Row, Col, Alert, Space, Table } from 'antd';
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


const AdvancedSearchForm = () => {
   const [form] = Form.useForm();
   const [showAlert, setShowAlert] = useState(false);
   const [showErrorAlert, setShowErrorAlert] = useState(false);

   const [loading, setLoading] = useState(false);
   const [tableData, setTableData] = useState([]);

   const getUrl = `http://localhost:3001/cuidador`
   const request = () => {
      axios.get(getUrl)
         .then(response => {
            console.log(response.data.pet)

            setTableData(response.data.pet.map((cuidador, index) => ({
               nome: cuidador.data.nome,
               dataNasc: cuidador.data.idade,
               cpf: cuidador.data.cpf,
               endereco: cuidador.data.endereco,
               numServicos: cuidador.data.numServicos,
               telefone: cuidador.data.telefone
            }))
            )
         })
         .then(() => {
            setLoading(false);
         })
         .catch((err) => {
            notification['error']({
               message: 'Não foi possivel realizar o login',
               description:
                  'Verifique se seus dados estão corretos.',
            });
            console.log(err);
         })
   }
   const redirectServico = id => {
      localStorage.setItem('currentCuidadorId', id);
      window.location = '/pet#/homeUsuario/buscaCuidador';
   }

   useEffect(() => {
      setLoading(true);
      request();
   }, []);

   useEffect(() => {

      console.log(222, tableData)
   }, [tableData]);

   const columns = [
      {
         title: 'Nome',
         dataIndex: 'nome',
         key: 'nome',
         render: text => <a>{text}</a>,
      },
      {
         title: 'Número de serviços',
         dataIndex: 'numServicos',
         key: 'numServicos',
      },
      {
         title: 'Endereco',
         key: 'endereco',
         dataIndex: 'endereco',
      },
      {
         title: 'Action',
         key: 'action',
         render: (text, record) => (
            <Space size="middle">
               {/* <Button type="ghost" onClick={() => redirectEdit(record.key)}>Editar</Button>
            <Button type="danger" onClick={() => deletePet(record.key)}>Deletar</Button> */}
            </Space>
         ),
      },
   ];

   const url = 'http://localhost:3001/profileuser'

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
         })
         .then(() => console.log('alert', showAlert))
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
                  <Card style={{ textAlign: 'center', minHeight: '800px' }} title={<Title type="warning">BUSCA CUIDADOR</Title>}>
                     <Button onClick={redirectServico} >NOVO SERVICO</Button>

                     <Table style={{ marginTop: 30 }} columns={columns} loading={loading} dataSource={tableData} />



                  </Card>
               </div>
            </Content>
         </Card>
         <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
      </div>
   )
}
export default AdvancedSearchForm;
