import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Grafico2 from '@/components/Grafico2';

const Index = ({ partidos}) => {
  return (
    <Pagina titulo='Partidos'>
      <Row md={4}>
        {partidos.map(item => (
          <Col>
            <Card style={{ width: '18rem', marginBottom: '1rem', marginTop: '30px'}}>
              <Card.Img variant="top" key={item.id} />
              <Card.Body>
                <Card.Title>{item.sigla}</Card.Title>
                <Card.Text>{item.nome}</Card.Text>
                <Button variant="primary">Sobre</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
          <Grafico2/>
    </Pagina>
  );
}

export default Index;

export async function getServerSideProps(context) {

  //const id = context.params.id

  //const parti = await apiDeputados.get('/partidos/' + {id})
  //const partido = parti.data.dados

  const part = await apiDeputados.get('/partidos');
  const partidos = part.data.dados;

  return {
    props: { partidos },
  };
}
