import React, { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { Card, Button, Image } from 'react-bootstrap';
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
      <Pagina titulo="Bem-vindo à API de Deputados!">
        <div className="d-flex justify-content-center align-items-center mt-5 ">
          <Image src="data:image/png;base64,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" />
        </div>
        <div className='mt-4'>
          <p>Bem-vindo à nossa página de busca de Deputados e Partidos! Aqui, você encontrará uma ferramenta abrangente e fácil de usar para explorar informações relacionadas aos políticos e partidos atuantes em nosso país.</p>

          <p>Nossa página de busca foi projetada para fornecer a você acesso rápido e conveniente a dados relevantes sobre deputados e partidos políticos. Você poderá encontrar informações detalhadas sobre os representantes eleitos, seus partidos afiliados, mandatos anteriores, comissões nas quais estão envolvidos e muito mais.</p>

          <p>Ao utilizar nossa barra de pesquisa intuitiva, você poderá buscar deputados por nome, partido, estado ou outros critérios relevantes. Os resultados da pesquisa serão exibidos de forma clara e organizada, permitindo que você obtenha rapidamente as informações desejadas.</p>

          <p>Além disso, nossa página de busca oferece recursos adicionais, como filtros avançados, para refinar ainda mais seus resultados. Você poderá personalizar sua pesquisa com base em critérios específicos, como região geográfica, tempo de mandato, comissões parlamentares e outros detalhes importantes.</p>

          <p>Estamos empenhados em fornecer dados atualizados e confiáveis, para que você possa tomar decisões informadas e se manter atualizado sobre a dinâmica política do país. Nossa equipe trabalha diligentemente para garantir que todas as informações estejam precisas e atualizadas regularmente.</p>

          <p>Aproveite nossa página de busca de Deputados e Partidos para explorar o cenário político e conhecer melhor as personalidades e organizações que moldam o nosso país. Estamos aqui para ajudá-lo a obter os dados necessários e facilitar sua busca por informações relevantes.</p>

        </div>
        
        <div className="d-flex justify-content-between">
          <Card style={getCardStyle(0)} className="card" onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
            <Card.Img variant='top' src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/camara-deputados.jpg"></Card.Img>
            <Card.Body>
              <Card.Title>Deputados</Card.Title>
              <Card.Text>Página referente aos deputados</Card.Text>
              <Link href='/deputados/'><Button variant="primary">Saiba <TiPlus /></Button></Link>
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
              <Card.Title>Proposições</Card.Title>
              <Card.Text>Página referente às proposições</Card.Text>
              <Link href='/proposicoes/'><Button variant="primary">Saiba <TiPlus /></Button></Link>
            </Card.Body>
          </Card>
        </div>
      </Pagina>
    </>
  );
};

export default Index;
