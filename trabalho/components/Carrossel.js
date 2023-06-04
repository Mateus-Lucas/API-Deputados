import { useState, useEffect } from 'react';
import apiDeputados from '@/services/apiDeputados';
import Link from 'next/link';
import { Card, Carousel } from 'react-bootstrap';

function DarkVariantExample() {
  const [deputados, setDeputados] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await apiDeputados.get('/deputados');
        const deputadosData = result.data.dados;
        setDeputados(deputadosData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  // Grupo de deputados 3 em 3
  const groupDeputados = (deputados) => {
    const grouped = [];
    for (let i = 0; i < deputados.length; i += 6) {
      grouped.push(deputados.slice(i, i + 6));
    }
    return grouped;
  };

  const deputadosGrouped = groupDeputados(deputados);

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}> {/* Ajuste de tamanho do Carrossel */}
      <Carousel variant="dark">
        {deputadosGrouped.map((grupo, index) => (
          <Carousel.Item key={index}>
            <div className="row justify-content-end">
              {grupo.map((deputado) => (
                <div className="col-md-4" key={deputado.id}>
                  <Card className="mb-3">
                    <Card.Img variant="top" src={deputado.urlFoto} />
                    <Card.Body className="text-right">
                      <Card.Title>{deputado.nome}</Card.Title>
                      <p>Estado: <strong>{deputado.siglaUf}</strong></p>
                      <p>Partido: <strong>{deputado.siglaPartido}</strong></p>
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
}

export default DarkVariantExample;
