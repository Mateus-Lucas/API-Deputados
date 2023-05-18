import Link from 'next/link'
import React from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'

const Cabecalho = () => {
  return (
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
      <Nav.Link href="/">Início</Nav.Link>
      <NavDropdown title="Deputados" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">
          Something else here
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="partidos">Partidos</Nav.Link>
      <Nav.Link href="#pricing">Votações</Nav.Link>
    </Nav>
    <Form className="d-flex ms-auto">
      <Form.Control
        type="search"
        placeholder="Pesquisar"
        className="me-2"
        aria-label="Pesquisar"
      />
    </Form>
  </Container>
</Navbar>

  )
}

export default Cabecalho