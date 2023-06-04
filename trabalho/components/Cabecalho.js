import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';

const Cabecalho = () => {
  const router = useRouter();
  const selectedOptionRef = useRef(null);

  const [partidosDeputados, setPartidosDeputados] = useState([]);

  const handleSearch = () => {
    const selectedOption = selectedOptionRef.current.value;

    const partidoDeputadoSelected = partidosDeputados.find(
      ({ nome, siglaPartido }) => selectedOption === `${nome} (${siglaPartido})`
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
          Câmara dos Deputados do Brasil
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Início</Nav.Link>
          <NavDropdown title="Deputados" id="navbarScrollingDropdown">
            <NavDropdown.Item href='/deputados'>Lista de Deputados</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/partidos">Partidos</Nav.Link>
          <Nav.Link href="#">Votações</Nav.Link>
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
            ref={selectedOptionRef}
          />
          <datalist id="siglasPartidos">
            {partidosDeputados.map((item, index) => (
              <option key={index} value={`${item.nome} (${item.siglaPartido})`} />
            ))}
          </datalist>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Cabecalho;
