import Pagina from '@/components/Pagina'
import React from 'react'
import {Container} from 'react-bootstrap'
import Carrossel from '../../components/Carrossel'

const Deputados = () => {
    return (
        <>
            <Pagina titulo='Deputados'>
                
                <Carrossel />
                
            </Pagina>
        </>
    )
}

export default Deputados

/*import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import apiDeputados from '../../services/apiDeputados';
import Pagina from '../../components/Pagina';
import Link from 'next/link';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const Detalhes = ({ votacoes, id, orientacoes, votos }) => {
  const [somaOrientacoes, setSomaOrientacoes] = useState(0);
  const [eventosOrientacoes, setEventosOrientacoes] = useState([]);
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);

  const calcularSomaOrientacoes = () => {
    const soma = Orientacoes.reduce((acumulador, item) => acumulador + item.valorDocumento, 0);
    setSomaOrientacoes(soma);
  };

  const resetSomaOrientacoes = () => {
    setSomaOrientacoes(0);
  };

  useEffect(() => {
    const eventos = Orientacoes.map((item) => ({
      title: item.tipoDespesa,
      date: item.dataDocumento
    }));

    setEventosOrientacoes(eventos);
  }, [Orientacoes]);

  const toggleCalendario = () => {
    setCalendarioVisivel(!calendarioVisivel);
  };

  return (
    <Pagina titulo={votacoes.ultimoStatus.nome}>
      <Row>
        <Col md={3}>
          <Card className='mb-4'>
            <Card.Img variant="top" key={votacoes.id} src={votacoes.ultimoStatus.urlFoto} />
            <Card.Body>
              <Card.Title>{votacoes.ultimoStatus.nome}</Card.Title>
              <Card.Text>Partido: {votacoes.ultimoStatus.siglaPartido}</Card.Text>
              <Card.Text>UF Partido: {votacoes.ultimoStatus.siglaUf}</Card.Text>
            </Card.Body>
          </Card>
          <Link href='/votacoes/'>
            <Button variant='danger'>Voltar</Button>
          </Link>
        </Col>
        <Col md={7}>
          <h1>Orientacoes</h1>
          <Button variant='secondary' onClick={toggleCalendario}>
            {calendarioVisivel ? 'Ocultar Calendário' : 'Exibir Calendário'}
          </Button>
          {calendarioVisivel && (
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={eventosOrientacoes} />
          )}
          <Button variant='primary' onClick={calcularSomaOrientacoes}>Somar Orientacoes</Button>
          <Button variant='danger' onClick={resetSomaOrientacoes}>Reset</Button>
          <p>Total das Orientacoes: R${somaOrientacoes}</p>
        </Col>
        <Col>
          {votos.map((item) =>(
            <ul><li>{item.titulo}</li></ul>
          ))}
        </Col>
      </Row>
    </Pagina>
  );
};

export default Detalhes;


export async function getServerSideProps(context) {
  const id = context.params.id;

  const dep = await apiDeputados.get('/votacoes/' + id);
  const deputado = dep.data.dados;

  const desp = await apiDeputados.get('/votacoes/' + id + '/orientacoes');
  const Orientacoes = desp.data.dados;

  const prof = await apiDeputados.get('/votacoes/' + id + '/votos');
  const votos = prof.data.dados;

  return {
    props: { votacoes, id, orientacoes, votos }
  };
}*/