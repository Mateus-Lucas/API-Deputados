import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';

const Cabecalho = () => {
  const router = useRouter();
  const selectedOptionRef = useRef(null);

  const [partidosDeputados, setPartidosDeputados] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    const partidoDeputadoSelected = partidosDeputados.find(
      ({ id, nome, siglaPartido }) => {
        const partidoDeputadoSelected = partidosDeputados.find(
          ({ tipo, id, nome, siglaPartido }) => {
            const itemValue = tipo === 'partido' ? nome : siglaPartido;
            return itemValue.toLowerCase().includes(searchValue.toLowerCase());
          }
        );
        
      }
    );

    if (partidoDeputadoSelected) {
      const { tipo, id } = partidoDeputadoSelected;
      const route = tipo === 'partido' ? '/partidos/' : '/deputados/';
      router.push(route + id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultado = await apiDeputados.get('/partidos');
        const partidos = resultado.data.dados;
        setPartidos(partidos);

        const resultadoDeputados = await apiDeputados.get('/deputados');
        const deputados = resultadoDeputados.data.dados;

        const partidosDeputados = [
          ...partidos.map((partido) => ({ ...partido, tipo: 'partido' })),
          ...deputados.map((deputado) => ({ ...deputado, tipo: 'deputado' })),
        ];

        setPartidosDeputados(partidosDeputados);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="https://www.desterrodomelo.mg.leg.br/imagens/brasao-republica.png/image_preview"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          {' '}
          Câmara dos Deputados do Brasil
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Início</Nav.Link>
          <NavDropdown title="Deputados">
            <NavDropdown.Item eventKey="todos">TODOS</NavDropdown.Item>
            {partidos.map((item, index) => (
              <NavDropdown.Item key={index} eventKey={index}>
                {item.sigla}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <Nav.Link href="/partidos">Partidos</Nav.Link>
          <Nav.Link href="/proposicoes">Proposições</Nav.Link>
        </Nav>
        <Form className="d-flex ms-auto">
          <span className="input-group-text" onClick={handleSearch} style={{ cursor: 'pointer' }}>
            <BiSearchAlt />
          </span>
          <Form.Control
            type="search"
            placeholder="Digite uma palavra"
            className="me-2"


            aria-label="Pesquisar"
            list="siglasPartidos"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={selectedOptionRef}
          />
          <datalist id="siglasPartidos">
            {partidosDeputados.map((item, index) => (
              <option key={index} value={`${item.nome} (${item.tipo === 'partido' ? item.sigla : item.siglaPartido})`} />
            ))}
          </datalist>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Cabecalho;