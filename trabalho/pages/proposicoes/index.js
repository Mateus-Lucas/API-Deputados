import React, { useEffect, useState } from 'react';
import Pagina from '../../components/Pagina';
import apiDeputados from '../../services/apiDeputados';
import { Card, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

const Index = ({ deputados }) => {
  const [proposicoesDeputado, setProposicoesDeputados] = useState([]);
  const [nomeDeputado, setNomeDeputado] = useState('');
  const [img_dep, setImgDeputado] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const randomDeputado = deputados[Math.floor(Math.random() * deputados.length)];
    setSearchTerm(randomDeputado.nome);
  }, [deputados]);

  useEffect(() => {
    const fetchProposicoes = async () => {
      if (searchTerm) {
        const selectedDeputado = deputados.find(
          (deputado) => deputado.nome.toLowerCase() === searchTerm.toLowerCase()
        );
        if (selectedDeputado) {
          try {
            const response = await apiDeputados.get(`/proposicoes?idDeputadoAutor=${selectedDeputado.id}&ano=2023&itens=15`);
            const response2 = await apiDeputados.get(`/deputados/${selectedDeputado.id}`);
            setNomeDeputado(response2.data.dados.ultimoStatus.nome);
            setImgDeputado(response2.data.dados.ultimoStatus.urlFoto);
            setProposicoesDeputados(response.data.dados);
          } catch (error) {
            console.error('Erro ao obter proposições:', error);
          }
        }
      }
    };

    fetchProposicoes();
  }, [searchTerm, deputados]);

  const filterDeputados = (value) => {
    const filtered = deputados.filter((deputado) =>
      deputado.nome.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    filterDeputados(searchTerm);
  };

  return (
    <Pagina titulo="Proposições">
      <Row>
        <Col className='bg-primary p-2 input-group-text'>
          <input className='input-group-text'
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Digite o nome do deputado"
            list="deputadosList"
          />
          <datalist id="deputadosList">
            {deputados.map((deputado) => (
              <option key={deputado.id} value={deputado.nome} />
            ))}
          </datalist>
        </Col>
      </Row>
      <br></br>
      <Row md={5}>
        <Col>
          <Card className="p-2 w-100">
            <Card.Img src={img_dep} className="mb-2" />
            <Card.Title className="text-center">{nomeDeputado}</Card.Title>
          </Card>
        </Col>
        {proposicoesDeputado.map((proposicao) => (
          <Col key={proposicao.id}>
            <Card className="mb-4" style={{ height: '18rem' }}>
              <Card.Img variant="top" src={proposicao.urlImagem} />
              <Card.Body>
                <Link href={`/proposicoes/${proposicao.id}`} style={{ textDecoration: 'none' }}>
                  <Card.Title style={{ textDecoration: 'none' }}>{proposicao.id}</Card.Title>
                </Link>
                <Card.Text style={{ textDecoration: 'none', color: 'black' }}>
                  {proposicao.ementa.substring(0, 100)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina >
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