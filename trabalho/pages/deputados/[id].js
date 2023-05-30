import React, { useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import apiDeputados from '../../services/apiDeputados'
import Pagina from '../../components/Pagina'
import Link from 'next/link'

const Detalhes = ({ deputado, despesas, profissoes }) => {

  const [somaDespesas, setSomaDespesas] = useState(0); // Estado para armazenar a soma das despesas

  // Função para calcular a soma das despesas
  const calcularSomaDespesas = () => {
    const soma = despesas.reduce((acumulador, item) => acumulador + item.valorDocumento, 0);
    setSomaDespesas(soma);
  };

  // Função para redefinir o valor da soma das despesas para zero
  const resetSomaDespesas = () => {
    setSomaDespesas(0);
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
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((item) => (
                <tr key={item.id}>
                  <td>{item.dataDocumento}</td>
                  <td>{item.tipoDespesa}</td>
                  <td>{item.valorDocumento}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant='primary' onClick={calcularSomaDespesas}>Somar Despesas</Button> {/* Botão para calcular a soma das despesas */}
          <Button variant='danger' onClick={resetSomaDespesas}>Reset</Button> {/* Botão para redefinir a soma das despesas */}
          <p>Total das despesas: R${somaDespesas}</p> {/* Exibe a soma das despesas */}

        </Col>
        <Col md={2}>
          <h1>Profissões</h1>
          <ul>
            {profissoes.map((item, index) => (
              <li key={index}>{item.titulo}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Pagina>
  )
}

export default Detalhes

export async function getServerSideProps(context) {
  const id = context.params.id

  const dep = await apiDeputados.get('/deputados/' + id)
  const deputado = dep.data.dados

  const desp = await apiDeputados.get('/deputados/' + id + '/despesas')
  const despesas = desp.data.dados

  const prof = await apiDeputados.get('/deputados/' + id + '/profissoes')
  const profissoes = prof.data.dados

  return {
    props: { despesas, deputado, profissoes },
  }
}
