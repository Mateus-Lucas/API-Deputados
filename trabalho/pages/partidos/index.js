import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import Grafico2 from '@/components/Grafico2';
import Grafico1 from '@/components/Grafico1';
import Link from 'next/link';

const Index = ({ partidos }) => {

  return (
    <Pagina titulo='Partidos'>
      <br></br>
      <h1 className='text-center '>Definição de partidos</h1>
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

          <p>
            Uma das principais funções dos partidos políticos é a representação política. Eles atuam como canais pelos
            quais os cidadãos podem expressar suas opiniões e demandas, e são responsáveis por articular e promover os
            interesses de seus eleitores. Os partidos políticos também desempenham um papel crucial na formação de governos,
            seja por meio de coalizões ou por assumirem sozinhos o poder.
          </p>

        </div>
      </div>
      <p>
        Além disso, os partidos políticos desempenham um papel na formulação de políticas públicas. Eles desenvolvem
        propostas, debatem ideias e participam do processo legislativo, contribuindo para a criação de leis e
        regulamentos. Por meio de seus membros eleitos, os partidos podem influenciar a agenda política e direcionar
        as políticas do governo de acordo com sua visão e programa.
      </p>
      <br></br>
      <Grafico1/>
      <br></br>
      <h1 className='text-center '>Buscar por partidos</h1>
      <Row md={4}>
        {partidos.map(item => (
          <Col>
            <Card style={{ width: '18rem', marginBottom: '1rem', marginTop: '30px' }}>
              <Card.Img style={{ width: '15rem', margin: 'auto auto', display: 'block'}} variant="top" src='https://cdn-icons-png.flaticon.com/512/1215/1215644.png' />
              <Card.Body>
                <Card.Title>{item.sigla}</Card.Title>
                <Card.Text>{item.nome}</Card.Text>
                <Link href={'/partidos/' + item.id}><Button variant="primary">Sobre</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}

export default Index;

export async function getServerSideProps(context) {

  const part = await apiDeputados.get('/partidos');
  const partidos = part.data.dados;

  return {
    props: { partidos },
  };
}
