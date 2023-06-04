import { useState, useEffect } from 'react';
import apiDeputados from '@/services/apiDeputados';
import Link from 'next/link';
import { Card, Carousel } from 'react-bootstrap';

function DarkVariantExample() {
  const [deputados, setDeputados] = useState([]);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const deputadosResult = await apiDeputados.get('/deputados');
        const deputadosData = deputadosResult.data.dados;
        setDeputados(deputadosData);

        const partidosResult = await apiDeputados.get('/partidos');
        const partidosData = partidosResult.data.dados;
        setPartidos(partidosData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const groupDeputados = (deputados) => {
    const grouped = [];
    for (let i = 0; i < deputados.length; i += 4) {
      grouped.push(deputados.slice(i, i + 4));
    }
    return grouped;
  };

  return (
    <>
      {deputados.length > 0 &&
        partidos.map((partido) => {
          const deputadosPartido = deputados.filter((deputado) => deputado.siglaPartido === partido.sigla);
          const deputadosGrouped = groupDeputados(deputadosPartido);

          return (
            <div key={partido.sigla} style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h1 className='text-center bg-secondary text-white'>Partido {partido.sigla}</h1>
              <Carousel variant="dark" indicators={true}>
                {deputadosGrouped.map((grupo, index) => (
                  <Carousel.Item key={index}>
                    <div className="row justify-content-start">
                      {grupo.map((deputado) => (
                        <div className="col-md-3" key={deputado.id} style={{ width: '25%' }}>
                          <Card className="mb-3" style={{ width: '100%' }}>
                            <Card.Img
                              variant="top"
                              src={deputado.urlFoto}
                              style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <Card.Body className="text-left"> {/* Alterado para "text-left" */}
                              <Card.Title>{deputado.nome}</Card.Title>
                              <p>
                                Estado: <strong>{deputado.siglaUf}</strong>
                              </p>
                              <p>
                                Partido: <strong>{deputado.siglaPartido}</strong>
                              </p>
                              <Link className="btn bg-primary text-white w-100" href={`/deputados/${deputado.id}`}>
                                Sobre
                              </Link>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          );
        })}
    </>
  );
}

export default DarkVariantExample;
