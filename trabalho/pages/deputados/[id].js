import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import apiDeputados from '../../services/apiDeputados';
import Pagina from '../../components/Pagina';
import Link from 'next/link';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const Detalhes = ({ deputado, profissoes, discursos }) => {
  const [somaDespesas, setSomaDespesas] = useState(0);
  const [eventosDespesas, setEventosDespesas] = useState([]);
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);
  const [mes, setMes] = useState(''); // Valor inicial vazio
  const [ano, setAno] = useState(''); // Valor inicial vazio

  const calcularSomaDespesas = async () => {
    try {
      const response = await apiDeputados.get(`/deputados/${deputado.id}/despesas?itens=50&mes=${mes}&ano=${ano}`);
      const despesas = response.data.dados;

      const soma = despesas.reduce((acumulador, item) => acumulador + item.valorDocumento, 0);
      setSomaDespesas(soma);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSomaDespesas = () => {
    setSomaDespesas(0);
  };

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await apiDeputados.get(`/deputados/${deputado.id}/despesas?itens=50&mes=${mes}&ano=${ano}`);
        const despesas = response.data.dados;

        const eventos = despesas.map((item) => ({
          title: item.tipoDespesa,
          date: item.dataDocumento
        }));

        setEventosDespesas(eventos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDespesas();
  }, [deputado.id, mes, ano]);

  const toggleCalendario = () => {
    setCalendarioVisivel(!calendarioVisivel);
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR');
  };

  return (
    <Pagina titulo={deputado.ultimoStatus.nome}>
      <Row>
        <Col md={3}>
          <Card className='mb-4'>
            <Card.Img variant="top" key={deputado.id} src={deputado.ultimoStatus.urlFoto} />
            <Card.Body>
              <Card.Title><strong>{deputado.ultimoStatus.nome}</strong></Card.Title>
              <Card.Text><strong>Partido:</strong> {deputado.ultimoStatus.siglaPartido}</Card.Text>
              <Card.Text><strong>UF Partido:</strong> {deputado.ultimoStatus.siglaUf}</Card.Text>
            </Card.Body>
          </Card>
          <Link href='/deputados/'>
            <Button variant='danger' size='sm'>Voltar</Button>
          </Link>
        </Col>
        <Col className='text-justify' md={6}>
          <h4>Discurso</h4>
          {discursos.length > 0 ? (
            <p className='text-justify' dangerouslySetInnerHTML={{ __html: discursos[0].transcricao }}></p>
          ) : (
            <p>Nenhum discurso encontrado</p>
          )}
        </Col>
        <Col md={3}>
          <h4>Profissões</h4>
          <ul>
            {profissoes.map((item, index) => (
              <li key={`profissao_${index}_${item.id}`}>{item.titulo}</li>
            ))}
          </ul>

          <h4>Escolaridade</h4>
          <ul>
            <li key="escolaridade">{deputado.escolaridade}</li>
          </ul>
          <h4>Condição Eleitoral</h4>
          <ul>
            <li key="condicaoEleitoral">{deputado.ultimoStatus.condicaoEleitoral}</li>
          </ul>
          <h4>Situação Atual</h4>
          <ul>
            <li key="situacaoAtual">{deputado.ultimoStatus.situacao}</li>
          </ul>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <Row>
        <Col>
          <h1>Despesas</h1>
          <Button variant='secondary' size='sm' onClick={toggleCalendario}>
            {calendarioVisivel ? 'Ocultar Calendário' : 'Exibir Calendário'}
          </Button>
          {calendarioVisivel && (
            <>
              <div className="mb-3 mt-3">
                <h3>Informe o mês para calcular as despesas:</h3>

                <div className="input-group mb-3 mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Mês:</span>
                  </div>
                  <input type="number" className="form-control" value={mes} onChange={(e) => setMes(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Ano:</span>
                  </div>
                  <input type="number" className="form-control" value={ano} onChange={(e) => setAno(e.target.value)} />
                </div>
              </div>

              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={eventosDespesas}
                locale="pt-br"
              />

              <Button variant='primary' onClick={calcularSomaDespesas}>Somar Despesas</Button>
              <Button variant='danger' onClick={resetSomaDespesas}>Reset</Button>
              <p>Total das despesas: R$ {formatarValor(somaDespesas)}</p>
            </>
          )}
        </Col>
      </Row>
    </Pagina>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const depResp = await apiDeputados.get(`/deputados/${id}`);
  const deputado = depResp.data.dados;

  const profResp = await apiDeputados.get(`/deputados/${id}/profissoes`);
  const profissoes = profResp.data.dados;

  const discResp = await apiDeputados.get(`/deputados/${id}/discursos`);
  const discursos = discResp.data.dados;

  return {
    props: {
      deputado,
      profissoes,
      discursos,
    },
  };
}
