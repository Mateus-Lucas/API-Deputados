import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import apiDeputados from '../../services/apiDeputados';
import Pagina from '../../components/Pagina';
import Link from 'next/link';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const Detalhes = ({ deputado, despesas, profissoes }) => {
  const [somaDespesas, setSomaDespesas] = useState(0);
  const [eventosDespesas, setEventosDespesas] = useState([]);
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);

  const calcularSomaDespesas = () => {
    const soma = despesas.reduce((acumulador, item) => acumulador + item.valorDocumento, 0);
    setSomaDespesas(soma);
  };

  const resetSomaDespesas = () => {
    setSomaDespesas(0);
  };

  useEffect(() => {
    const eventos = despesas.map((item) => ({
      title: item.tipoDespesa,
      date: item.dataDocumento
    }));

    setEventosDespesas(eventos);
  }, [despesas]);

  const toggleCalendario = () => {
    setCalendarioVisivel(!calendarioVisivel);
  };

  return (
    <Pagina titulo={deputado.ultimoStatus.nome}>
      <Row>
        <Col md={3}>
          <Card className='mb-4'>
            <Card.Img variant="top" key={deputado.id} src={deputado.ultimoStatus.urlFoto} />
            <Card.Body>
              <Card.Title>{deputado.ultimoStatus.nome}</Card.Title>
              <Card.Text>Partido: {deputado.ultimoStatus.siglaPartido}</Card.Text>
              <Card.Text>UF Partido: {deputado.ultimoStatus.siglaUf}</Card.Text>
            </Card.Body>
          </Card>
          <Link href='/deputados/'>
            <Button variant='danger'>Voltar</Button>
          </Link>
        </Col>
        <Col md={7}>
          <h1>Despesas</h1>
          <Button variant='secondary' onClick={toggleCalendario}>
            {calendarioVisivel ? 'Ocultar Calendário' : 'Exibir Calendário'}
          </Button>
          {calendarioVisivel && (
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={eventosDespesas} />
          )}
          <Button variant='primary' onClick={calcularSomaDespesas}>Somar Despesas</Button>
          <Button variant='danger' onClick={resetSomaDespesas}>Reset</Button>
          <p>Total das despesas: R${somaDespesas}</p>
        </Col>
        <Col>
          {profissoes.map((item) =>(
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

  const dep = await apiDeputados.get('/deputados/' + id);
  const deputado = dep.data.dados;

  const desp = await apiDeputados.get('/deputados/' + id + '/despesas');
  const despesas = desp.data.dados;

  const prof = await apiDeputados.get('/deputados/' + id + '/profissoes');
  const profissoes = prof.data.dados;

  return {
    props: { despesas, deputado, profissoes }
  };
}