import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import React from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';

const Detalhes = ({ partido, lideres,  }) => {
  console.log(partido);

  return (
    <Pagina titulo={partido.sigla}>
      <Row className="justify-content-center">
        <Col md={4} className="text-center">
          <img
            src={partido.urlLogo}
            alt=""
            width="100"
            height="80"
          />
        </Col>
      </Row>

      <Row md={4} className="justify-content-center">
        {lideres.map(lider => (
          <Card key={lider.id}>
            <Card.Img
              variant="top"
              alt=""
              src={lider.urlFoto}
              width="100"
              height="300"
            />
            <Card.Body>
              <Card.Title>{lider.nome}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Row>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {lideres.map((lider, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{lider.nome}</td>
              <td>{lider.sobrenome}</td>
              <td>{lider.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    props: { partido, lideres, },
  };
}