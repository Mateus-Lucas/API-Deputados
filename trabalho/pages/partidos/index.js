import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grafico1 from '@/components/Grafico1';
import { BsBoxArrowUpRight } from 'react-icons/bs';

const Index = () => {
  const [partidos, setPartidos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const resultado = await apiDeputados.get('/partidos', {
          params: {
            pagina,
            itens: 4, // quantidade de partidos por página
          },
        });
        const { dados: partidosData, links } = resultado.data;
  
        const promises = partidosData.map(async (partido) => {
          const partidoData = await apiDeputados.get(`/partidos/${partido.id}`);
          const logo = partidoData.data.dados.urlLogo;
          return { ...partido, logo };
        });
  
        const partidosComLogo = await Promise.all(promises);
        setPartidos(partidosComLogo);
  
        // Calcular o número total de páginas
        const lastPageUrl = links.find((link) => link.rel === 'last')?.href;
        const totalPaginas = extractPageNumberFromURL(lastPageUrl);
  
        setTotalPaginas(totalPaginas);
      } catch (error) {
        console.error('Erro ao obter dados dos partidos:', error);
      }
    };
  
    fetchPartidos();
  }, [pagina]);


  const handleImageError = (event) => {
    event.target.src = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
  };

  const handleNextPage = () => {
    if (pagina < totalPaginas) {
      setPagina(pagina + 1);
    }
  };  

  const handlePreviousPage = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const extractPageNumberFromURL = (url) => {
    if (url) {
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);
      const pageParam = searchParams.get('pagina');
      return parseInt(pageParam, 10);
    }
    return 0;
  };

  return (
    <Pagina titulo='Partidos'>
      <br></br>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="https://www.camara.leg.br/midias/image/2023/01/img20220331154441356.jpg" />
        <div style={{ marginLeft: '20px' }}>
          <br />
          <p>
            Partidos políticos são organizações que representam grupos de indivíduos com interesses políticos,
            ideológicos e sociais semelhantes. Eles desempenham um papel fundamental na democracia, pois servem como
            intermediários entre os cidadãos e o governo. Os partidos políticos buscam conquistar o poder político
            através de eleições, a fim de implementar suas propostas e políticas.
          </p>

          <p>
            Os partidos políticos geralmente têm uma ideologia ou plataforma política que define seus princípios
            e objetivos. Essas ideologias podem variar desde o conservadorismo ao liberalismo, passando pelo socialismo,
            ecologismo, nacionalismo e muitas outras. As ideologias orientam as políticas e as estratégias adotadas pelos
            partidos, e também atraem diferentes grupos de eleitores.
          </p>
        </div>
      </div>
      <p>
        Uma das principais funções dos partidos políticos é a representação política. Eles atuam como canais pelos
        quais os cidadãos podem expressar suas opiniões e demandas, e são responsáveis por articular e promover os
        interesses de seus eleitores. Os partidos políticos também desempenham um papel crucial na formação de governos,
        seja por meio de coalizões ou por assumirem sozinhos o poder.
      </p>
      <p>''
        Além disso, os partidos políticos desempenham um papel na formulação de políticas públicas. Eles desenvolvem
        propostas, debatem ideias e participam do processo legislativo, contribuindo para a criação de leis e
        regulamentos. Por meio de seus membros eleitos, os partidos podem influenciar a agenda política e direcionar
        as políticas do governo de acordo com sua visão e programa.
      </p>
      <br></br>
      <Grafico1 />
      <br></br>
      <h2 className='text-center bg-primary text-white p-2' style={{ borderRadius: '5px' }}>Buscar por partidos</h2>
      <Row md={4}>
        {partidos.map((partido) => (
          <Col key={partido.id}>
            <Card style={{ width: '13rem', marginBottom: '1rem', marginTop: '30px' }}>
            <Card.Img 
            style={{ width: '10rem', margin: 'auto', display: 'block' }} 
            variant="top" 
            src={partido.logo} 
            onError={handleImageError}/>
              <Card.Body>
                <Card.Title className='text-center'>{partido.sigla}</Card.Title>
                <Link href={`/partidos/${partido.id}`}>
                  <Button className='w-100' variant="primary">Sobre <BsBoxArrowUpRight/></Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="pagination-wrapper d-flex justify-content-center mt-4">
      <div className="pagination">
        <Button className="mr-3" onClick={handlePreviousPage} disabled={pagina === 1}>
          Anterior
        </Button>
        <span className="mx-3">Página {pagina} de {totalPaginas}</span>
        <Button className="ml-3" onClick={handleNextPage} disabled={pagina === totalPaginas}>
          Próxima
        </Button>
      </div>
    </div>
    </Pagina>
  );
};

export default Index;
