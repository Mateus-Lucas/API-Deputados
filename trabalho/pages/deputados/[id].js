import React from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import apiDeputados from '../../services/apiDeputados'
import Pagina from '../../components/Pagina'
import Link from 'next/link'


const Detalhes = ({ deputado, despesas, profissoes }) => {
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
              {despesas.map((item, lista) => (
                <tr key={lista}>
                  <td>{item.dataDocumento}</td>
                  <td>{item.tipoDespesa}</td>
                  <td>{item.valorDocumento}</td>
                </tr>
              ))}
            </tbody>

          </Table>
        </Col>
        <Col md={2}>
          <h1>Profissões</h1>
          <ul>
            {profissoes.map(item => (
              <li>{item.titulo}</li>
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