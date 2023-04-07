import React from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Cabecalho = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#">
            <img
              alt=""
              src="https://www.desterrodomelo.mg.leg.br/imagens/brasao-republica.png/image_preview"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            Câmara dos Deputados do Brasil
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Início</Nav.Link>
            <Nav.Link href="#features">Sobre</Nav.Link>
            <Nav.Link href="#pricing">Projetos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Cabecalho