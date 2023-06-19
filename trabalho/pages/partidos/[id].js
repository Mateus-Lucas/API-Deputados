import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import apiDeputados from '@/services/apiDeputados';
import Pagina from '@/components/Pagina';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import Deputados from '../deputados';


const Detalhes = ({ partido, lideres }) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Pagina titulo={partido.sigla}>
      <h2 className='text-center text-white bg-primary p-2' style={{ borderRadius: '5px' }}>Líderes partidários</h2>
      <Row className="justify-content-center">
        <Col>
          <Carousel>
            {lideres && Array.isArray(lideres) && lideres.map((lider) => (
              <Carousel.Item key={lider.id}>
                <Card className="m-3">
                  <Card.Img variant="top" alt="" src={lider.urlFoto} width="100" height="300" />
                  <Card.Body>
                    <Card.Title>{lider.nome}</Card.Title>
                    <Card.Text>{lider.cargo}</Card.Text>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={9}>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Ordem</th>
                <th>Nome</th>
                <th>Email</th>
                <th>UF</th>
                <th>Data Início</th>
                <th>Cargo</th>
              </tr>
            </thead>
            <tbody>
              {lideres.map((lider, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{lider.nome}</td>
                  <td>{lider.email}</td>
                  <td>{lider.siglaUf}</td>
                  <td>{lider.dataInicio}</td>
                  <td>{lider.titulo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {scrollTop > 0 && (
            <Button variant="primary" className="scroll-to-top-btn" onClick={handleScrollToTop}>
              Voltar ao topo
            </Button>
          )}
        </Col>
      </Row>
    </Pagina>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const parti = await apiDeputados.get('/partidos/' + id);
  const partido = parti.data.dados;

  const partilider = await apiDeputados.get('/partidos/' + id + '/lideres');
  const lideres = partilider.data.dados;

  return {
    props: { partido, lideres },
  };
}
