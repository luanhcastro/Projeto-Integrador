import React from 'react'
import "./Home.css"
import SimpleImageSlider from "react-simple-image-slider";
import { Layout, Card, Typography } from 'antd';
import Header from '../template/HomeHeader'
import 'antd/dist/antd.css';
const { Title } = Typography;
const { Content, Footer } = Layout;


const images = [
   { url: "https://www.cesarsway.com/wp-content/uploads/2015/06/6-tips-for-mastering-the-dog-walk.jpg" },
   { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3n0L_EggfHhD9MDxNUJ4L7cgh-k6bPlEA7e0q4SxidltjtFSrhPQ9DBQi-7LIf9OYm0&usqp=CAU" },
   { url: "https://images.tcdn.com.br/img/img_prod/752354/1605896720_banners_site_01.png" },
   { url: "https://www.petworktravel.com.br/images/vitrine/vitrine-uma-agencia-de-viagem-para-seu-animal.jpg" },
   { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwH0R6xmE_0NUqshCD0LMvJkSql6r06zlQ6yNO5FnZgY1OqpOaBDw2Mq63UhklMvG8A&usqp=CAU" },
   { url: "https://www.encrenquinhas.com.br/images/ap-smart-layerslider/homepage/slide-14.jpg" },
];

export default () => {
   localStorage.clear();
   return(
   <div>
      <Header/>
      <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.105)'}}>
         <Content className="site-layout" style={{ padding: '0 200px', marginTop: 110 }}>
         <div className="site-layout-background" style={{ padding: 10 , minHeight: 380, display: 'flex', justifyContent: 'center'}}>
            <div className="slider">
                  <SimpleImageSlider
                     width="100%"
                     height="580px"
                     images={images}
                     slideDuration={0.5}
                     showBullets
                     showNavs
                     useGPUrender
                     />
               </div>
            </div>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor: 'white'}}>
               <Card class="defaultCard" style={{ marginTop: 10, textAlign: 'center'}}>
                  <Title type="warning" >VIAJE COM TRANQUILIDADE E DEIXE SEU ANIMALZINHO CONOSCO!</Title>
               </Card>
               <Card style={{ marginTop: 10, textAlign: 'center'}}>
                  <Title type="secondary" >VENHA CONHECER A NANNY PET!</Title>
               </Card>
               <Card style={{ marginTop: 10, textAlign: 'center'}}>
                  <Title type="warning" >SEJA UM NANNY!</Title>
               </Card>
            </div>
         </Content>
      </Card>
      <Footer style={{ textAlign: 'center' }}>Nanny Pet ©2021 Criado por Vinícius, Bianca, Guilherme e Luan</Footer>
   </div>
   )
}
