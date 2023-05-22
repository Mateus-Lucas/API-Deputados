import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Grafico2 from '@/components/Grafico2';
import Grafico1 from '@/components/Grafico1';
import Link from 'next/link';

const Index = ({ partidos }) => {

  return (
    <Pagina titulo='Partidos'>
      <Row md={4}>
        {partidos.map(item => (
          <Col>
            <Card style={{ width: '18rem', marginBottom: '1rem', marginTop: '30px' }}>
              <Card.Img variant="top" key={item.id} />
              <Card.Body>
                <Card.Title>{item.sigla}</Card.Title>
                <Card.Text>{item.nome}</Card.Text>
                <Link href={'/partidos/' + item.id}><Button variant="primary">Sobre</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Grafico1/>
    </Pagina>
  );
}

export default Index;

export async function getServerSideProps(context) {

  const part = await apiDeputados.get('/partidos');
  const partidos = part.data.dados;

  return {
    props: { partidos },
  };
}
