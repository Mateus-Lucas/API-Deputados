import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';

const Cabecalho = () => {
  const router = useRouter();
  const selectedOptionRef = useRef(null);

  const [partidos, setPartidos] = useState([]);
  const [deputados, setDeputados] = useState([]);

  const handleSearch = () => {
    const selectedOption = selectedOptionRef.current.value;
  
    const partidoSelected = partidos.find(partido => selectedOption === `${partido.sigla} (Partido)`);
    const deputadoSelected = deputados.find(deputado => selectedOption === `${deputado.nome} (${deputado.siglaPartido})`);
    
    if (deputadoSelected) {
      // Encontrar o ID correspondente ao deputado selecionado
      const idSelected = deputadoSelected.id;
  
      // Navegar para a página de deputados com base no ID do deputado
      router.push('/deputados/' + idSelected);

    } else if (partidoSelected) {
      // Encontrar o ID correspondente ao partido selecionado
      const idSelected = partidoSelected.id;
      
      // Navegar para a página de partido com base no ID do partido
      router.push('/partidos/' + idSelected);
    } 
  };
  
  useEffect(() => {
    const fetchPartidosDeputados = async () => {
      try {
        const resultadoPartidos = await apiDeputados.get('/partidos');
        const partidos = resultadoPartidos.data.dados;
        setPartidos(partidos);

        const resultadoDeputados = await apiDeputados.get('/deputados');
        const deputados = resultadoDeputados.data.dados;
        setDeputados(deputados);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchPartidosDeputados();
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
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="partidos">Partidos</Nav.Link>
          <Nav.Link href="#pricing">Votações</Nav.Link>
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
            {partidos.map((partido, index) => (
              <option key={index} value={partido.sigla + ' (Partido)'} />
            ))}
            {deputados.map((deputado, index) => (
              <option key={index} value={`${deputado.nome} (${deputado.siglaPartido})`} />
            ))}
          </datalist>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Cabecalho;
