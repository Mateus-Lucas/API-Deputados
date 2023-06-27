import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';

const Cabecalho = () => {
  // Obtendo a instância do roteador do Next.js
  const router = useRouter();

  // Referência para o campo de seleção
  const selectedOptionRef = useRef(null);

  // Estados para armazenar os partidos e deputados
  const [partidos, setPartidos] = useState([]);
  const [deputados, setDeputados] = useState([]);

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    // Obtendo o valor selecionado no campo de seleção
    const selectedOption = selectedOptionRef.current.value;

    // Verificando se o valor selecionado corresponde a um partido
    const partidoSelected = partidos.find(partido => selectedOption === `${partido.sigla} (Partido)`);

    // Verificando se o valor selecionado corresponde a um deputado
    const deputadoSelected = deputados.find(deputado => selectedOption === `${deputado.nome} (${deputado.siglaPartido})`);

    // Redirecionando com base no valor selecionado
    if (deputadoSelected) {
      // Encontrando o ID correspondente ao deputado selecionado
      const idSelected = deputadoSelected.id;

      // Navegando para a página de deputados com base no ID do deputado
      router.push('/deputados/' + idSelected);
    } else if (partidoSelected) {
      // Encontrando o ID correspondente ao partido selecionado
      const idSelected = partidoSelected.id;

      // Navegando para a página de partido com base no ID do partido
      router.push('/partidos/' + idSelected);
    } 
  };
  
  // Buscando os partidos e deputados ao carregar o componente
  useEffect(() => {
    const fetchPartidosDeputados = async () => {
      try {
        // Buscando os partidos da API
        const resultadoPartidos = await apiDeputados.get('/partidos');
        const partidos = resultadoPartidos.data.dados;
        setPartidos(partidos);

        // Buscando os deputados da API
        const resultadoDeputados = await apiDeputados.get('/deputados?itens=600');
        const deputados = resultadoDeputados.data.dados;
        setDeputados(deputados);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    // Executando a função de busca ao montar o componente
    fetchPartidosDeputados();
  }, []);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        {/* Logo da Câmara dos Deputados */}
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
        {/* Navegação */}
        <Nav className="me-auto">
          <Nav.Link href="/">Início</Nav.Link>
          <Nav.Link href="/deputados">Deputados</Nav.Link>
          <Nav.Link href="/partidos">Partidos</Nav.Link>
          <Nav.Link href="/proposicoes">Proposições</Nav.Link>
        </Nav>
        {/* Formulário de pesquisa */}
        <Form className="d-flex ms-auto">
          {/* Ícone de pesquisa */}
          <span className="input-group-text" onClick={handleSearch} style={{ cursor: 'pointer' }}>
            <BiSearchAlt />
          </span>
          {/* Campo de pesquisa */}
          <Form.Control
            type="search"
            placeholder="Digite uma palavra"
            className="me-2"
            aria-label="Pesquisar"
            list="siglasPartidos"
            ref={selectedOptionRef}
          />
          {/* Opções de partidos e deputados para autocompletar a pesquisa */}
          <datalist id="siglasPartidos">
            {/* Opções de partidos */}
            {partidos.map((partido, index) => (
              <option key={index} value={partido.sigla + ' (Partido)'} />
            ))}
            {/* Opções de deputados */}
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
