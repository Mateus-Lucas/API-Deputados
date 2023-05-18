import Link from 'next/link'
import React from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'

const Cabecalho = () => {
  return (
    <Navbar bg='success' variant='dark' >
      <Container>
        <Navbar.Brand href='/'>Inicio</Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title='Deputados'>
            <Link className='dropdown-item' href='/deputados'>Deputados</Link>
            <Link className='dropdown-item' href='#'>Deputados Líderes</Link>
            <Link className='dropdown-item' href='#'>Deputados Frente Parlamentar</Link>
          </NavDropdown>
          <NavDropdown title='Partidos'>
            <Link className='dropdown-item' href='#'>Lista de Partidos</Link>
          </NavDropdown>
          <NavDropdown title='Votações'>
            <Link className='dropdown-item' href='#'>Lista das votações da Câmara</Link>
            <Link className='dropdown-item' href='#'>Voto de cada Parlamentar (Votação nominal e aberta)</Link>
          </NavDropdown>
          <NavDropdown title='Órgãos'>
            <Link className='dropdown-item' href='#'>Lista das comissões e outros órgãos legislativos da Câmara</Link>
            <Link className='dropdown-item' href='#'>Situações em que órgãos podem se encontrar</Link>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
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