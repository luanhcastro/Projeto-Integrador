import React from 'react'
import "./Home.css"
import Main from '../template/Main'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
   { url: "https://www.cesarsway.com/wp-content/uploads/2015/06/6-tips-for-mastering-the-dog-walk.jpg" },
   { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3n0L_EggfHhD9MDxNUJ4L7cgh-k6bPlEA7e0q4SxidltjtFSrhPQ9DBQi-7LIf9OYm0&usqp=CAU" },
   { url: "https://images.tcdn.com.br/img/img_prod/752354/1605896720_banners_site_01.png" },
   { url: "https://www.petworktravel.com.br/images/vitrine/vitrine-uma-agencia-de-viagem-para-seu-animal.jpg" },
   { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwH0R6xmE_0NUqshCD0LMvJkSql6r06zlQ6yNO5FnZgY1OqpOaBDw2Mq63UhklMvG8A&usqp=CAU" },
   { url: "https://www.encrenquinhas.com.br/images/ap-smart-layerslider/homepage/slide-14.jpg" },
];

export default props =>
   <Main icon="home" title="Início" subtitle="Seja bem vindo ao Nanny Pet!">
      <div className={"displayslide"} >
            <SimpleImageSlider
               width={'90%'}
               height={400}
               images={images}
               slideDuration={0.5}
               showBullets
               showNavs
               useGPUrender
            />
      </div>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
      <div className="display-4">Bem Vindo !</div>
      <hr />
      <p className="mb-0">Bla  bla</p>
   </Main>