import React, { useState, useEffect } from 'react'
import "../Home.css"
import { Layout, Card, Typography, Button, Row, notification, Tag, Space, Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../../assets/imgs/LOGO.png'
import "../../template/Header.css";
import 'antd/dist/antd.css';
import { LogoutOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content, Footer, Header } = Layout;


const User = () => {

  const userId = localStorage.getItem('id');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const getUrl = `http://localhost:3001/dono/${userId}`
  const getUrlString = getUrl.toString()
  const deleteUrl = 'http://localhost:3001/pet'
  const request = () => {
    axios.get(getUrlString)
      .then(response => {

        setTableData(response.data.pet.map((pet, index) => ({
          key: pet.id,
          nome: pet.nomePet,
          raca: pet.raca,
          porte: pet.porte,
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

  const deletePet = async record => {
    console.log(record.key);
    await axios.delete(deleteUrl,
      {
        idPet: record.key,
      })
      .then(response => {
        console.log('deletado', response);
        localStorage.removeItem(record.key)
      })
      .catch((err) => {
        notification['error']({
          message: 'Erro!',
          description:
            'Não foi possível deletar seu pet.',
        });
        console.log(err);
      })
  }
  const redirectEdit = id => {
    localStorage.setItem('currentPetId', id);
    window.location = 'pet#/homeUsuario/pets';
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
      title: 'Raça',
      dataIndex: 'raca',
      key: 'raca',
    },
    {
      title: 'Porte',
      key: 'porte',
      dataIndex: 'porte',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="ghost" onClick={() => redirectEdit(record.key)}>Editar</Button>
          <Button type="danger" onClick={() => deletePet(record)}>Deletar</Button>
        </Space>
      ),
    },
  ];


  return (
    <div>
      <Header class="defaultHeader">
        <Link to="/homeUsuario">
          <img src={logo} alt='logo' class="logo" />
        </Link>
        <div theme="light" mode="horizontal" class="buttons" >
          <Link to="/">
            <Button type="danger" size="large" style={{ margin: 10 }}
              icon={(<LogoutOutlined style={{ fontSize: 20 }}
              />)}>LOGOUT</Button>
          </Link>
        </div>
      </Header>
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)' }}>
        <Content className="site-layout" style={{ padding: '0 200px', minHeight: '800px', marginTop: 110 }}>
          <div className="site-layout-background" style={{ padding: 10, minHeight: 380 }}>
            <Card style={{ textAlign: 'center', minHeight: '800px' }} title={<Title type="warning">MEUS PETS</Title>}>

              <Row style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
                <Link to='/homeUsuario/profile'>
                  <Button style={{minWidth: 180}} >
                    PERFIL
                        </Button>
                </Link>
                <Link to='/homeUsuario/pets'>
                  <Button style={{minWidth: 180}} >
                    CADASTRAR NOVO PET
                        </Button>
                </Link>
                <Link to='/homeUsuario/buscaCuidador'>
                  <Button style={{minWidth: 180}} >
                    BUSCAR CUIDADOR
                        </Button>
                </Link>
              </Row>
              <Table style={{marginTop: 30}}columns={columns} loading={loading} dataSource={tableData} />

            </Card>
          </div>
        </Content>
      </Card>
      <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
    </div>
  )
}
export default User;
