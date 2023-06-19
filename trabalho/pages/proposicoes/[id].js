import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import apiDeputados from '../../services/apiDeputados';
import Pagina from '../../components/Pagina';
import Link from 'next/link';

const Detalhes = ({ proposicao, proposicaoAutor }) => {

  console.log(proposicaoAutor)


  return (
    <Pagina>
      <Row>
        <Col md={3}>

          <Link href='/proposicoes/'>
            <Button variant='danger'>Voltar</Button>
          </Link>
        </Col>
        <Col md={7}>
          <h1>PROPOSIÇÃO</h1>
          <p>{proposicao.ementa}</p>

          {proposicaoAutor.map((item) => (
            <Col key = {item.id}>
              <p>{item.codTipo}</p>
              <p>{item.nome}</p>
              <p>{item.ordemAssinatura}</p>
              <p>{item.proponente}</p>
              <p>{item.tipo}</p>
            </Col>
        ))}

        </Col>
      </Row>
    </Pagina>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;


  try {

    const proposicoes = await apiDeputados.get(`/proposicoes/${id}`);
    const proposicao = proposicoes.data.dados;

    const proposicoesAutores = await apiDeputados.get(`/proposicoes/${id}/autores`);
    const proposicaoAutor = proposicoesAutores.data.dados;


    return {
      props: { proposicao, proposicaoAutor }
    };
  } catch (error) {
    // Trate o erro aqui, por exemplo, redirecionando para uma página de erro
    console.error(error);
    return {
      redirect: {
        destination: '/erro',
        permanent: false
      }
    };
  }
}
