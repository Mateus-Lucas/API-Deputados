import React, { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { Card, Button } from 'react-bootstrap';
import Pagina from '@/components/Pagina';
import Link from 'next/link';

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (cardIndex) => {
    setHoveredCard(cardIndex);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardStyle = (cardIndex) => {
    const baseStyle = {
      width: '18rem',
      marginTop: '50px',
      transition: 'transform 0.3s',
    };

    if (hoveredCard === cardIndex) {
      return {
        ...baseStyle,
        transform: 'scale(1.1)',
      };
    }

    return baseStyle;
  };

  return (
    <>
      <Pagina>
        <div className="d-flex justify-content-center align-items-center mt-5">
          <img
            src="https://o.remove.bg/downloads/b7c94dfb-45ae-4287-a171-7dfb52764f0b/deputados-removebg-preview.png"
            alt="Logo"
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h1>Bem-vindo à API de Deputados!</h1>
        </div>
        <div className="d-flex justify-content-between">
          <Card style={getCardStyle(0)} className="card" onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
            <Card.Img variant='top' src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/camara-deputados.jpg"></Card.Img>
            <Card.Body>
              <Card.Title>Deputados</Card.Title>
              <Card.Text>Página referente aos deputados</Card.Text>
              <Button variant="primary">Saiba <TiPlus /></Button>
            </Card.Body>
          </Card>
          <Card style={getCardStyle(1)} className="card" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
          <Card.Img variant='top' src='https://www.camara.leg.br/midias/image/2023/01/img20220331154441356.jpg'></Card.Img>
            <Card.Body>
              <Card.Title>Partidos</Card.Title>
              <Card.Text>Página referente aos partidos</Card.Text>
               <Link href='/partidos/'><Button variant="primary">Saiba <TiPlus /></Button></Link>
            </Card.Body>
          </Card>
          <Card style={getCardStyle(2)} className="card" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave} >
            <Card.Img variant='top' src='https://www.camara.leg.br/midias/image/2022/12/img20221220192318053-768x512.jpg'></Card.Img>
            <Card.Body>
              <Card.Title>Votações</Card.Title>
              <Card.Text>Página referente às votações</Card.Text>
               <Button variant="primary">Saiba <TiPlus /></Button>
            </Card.Body>
          </Card>
        </div>
      </Pagina>
    </>
  );
};

export default Index;
