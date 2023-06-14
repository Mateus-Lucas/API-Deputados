import React from 'react';
import Pagina from '../../components/Pagina';
import apiDeputados from '../../services/apiDeputados';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Card, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

const Index = ({ proposicoes }) => {
  return (
    <Pagina titulo="Proposições">
      <Row md={6}>
        {proposicoes.map((proposicao) => (
          <Col key={proposicao.id}>
            <Card className="mb-4">
              <Link href={`/proposicoes/${proposicao.id}`}>
                <Card.Img variant="top" src={proposicao.urlImagem} />
                <Card.Body>
                <Card.Text>{proposicao.id}</Card.Text>
                  <Card.Text>{proposicao.ementa}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
};

export default Index;

export async function getServerSideProps(context) {
  try {
    const resultado = await apiDeputados.get('/proposicoes?ano=2023&itens=50');
    const proposicoes = resultado.data.dados;

    return {
      props: { proposicoes },
    };
  } catch (error) {
    console.error('Erro ao obter votações:', error);
    return {
      props: { proposicoes: [] },
    };
  }
}