import React, { useEffect, useState } from 'react';
import Pagina from '../../components/Pagina';
import apiDeputados from '../../services/apiDeputados';
import { Card, Col, DropdownButton, Row, Dropdown } from 'react-bootstrap';
import Link from 'next/link';

const Index = ({ deputados }) => {


  const [proposicoesDeputado, setProposicoesDeputados] = useState([])
  const [nomeDeputado, setNomeDeputado] = useState()


  async function filtrarProposicao(id) {
    const response = await apiDeputados.get(`/proposicoes?idDeputadoAutor=${id}&ano=2023&itens=15`);
    const response2 = await apiDeputados.get(`/deputados/${id}`);
    setNomeDeputado(response2.data.dados.ultimoStatus.nome)
    setProposicoesDeputados(response.data.dados)

  }




  return (
    <Pagina titulo="Proposições" >
      <Row md={6}>
        <DropdownButton
          variant="primary"
          title="Escolha o deputado"
          onSelect={filtrarProposicao}
          style={{ overflowY: 'scroll', height: '200px' }}
        >
          {deputados.map(item => (
            <Dropdown.Item eventKey={item.id} key={item.id}> {item.nome} </Dropdown.Item>
          ))}
        </DropdownButton>
        <Col>
          <h3>Deputado: {nomeDeputado}</h3>
        </Col>
        {proposicoesDeputado.map((proposicao) => (
          <Col key={proposicao.id}>
            <Card className="mb-4" style={{ height: '18rem' }}>
              <Link href={`/proposicoes/${proposicao.id}`}>
                <Card.Img variant="top" src={proposicao.urlImagem} />
                <Card.Body>
                  <Card.Text>{proposicao.id}</Card.Text>
                  <Card.Text>{proposicao.ementa.substring(0, 100)}</Card.Text>
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
    const response = await apiDeputados.get('/deputados');
    const deputados = response.data.dados;

    return {
      props: { deputados },
    };

  } catch (error) {

    console.error('Erro ao obter votações:', error);

    return {
      props: { proposicoes: [] },
    };

  }

}