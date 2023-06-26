import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import apiDeputados from '@/services/apiDeputados';
import Pagina from '@/components/Pagina';
import { Carousel } from 'react-bootstrap';

const Detalhes = ({ partido, lideres }) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(partido)

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Pagina titulo={partido.sigla}>
      <Card>
        <Card.Body>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px" }}>
            </div>
            <div>
              {partido.urlLogo ? (
                <Card.Img
                  className='mb-2'
                  src={partido.urlLogo}
                  alt=""
                  style={{ width: "100px", height: "50px" }}
                  onError={(e) => {
                    e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAAB3CAMAAABMiJ5qAAAAY1BMVEVXV1ny8vNNTU+bm51bW11UVFb///9iYmTY2NlDQ0X29vdAQELU1NXv7/B1dXZwcHLh4eJqamzAwMGDg4W4uLmPj5DMzM3n5+hISEqhoaKxsbKqqqx9fX6IiImUlJY4ODsxMTQKMr6DAAADsElEQVR4nO3ci3KjIBQGYAWOEBRUVBBv3fd/yoWYtMlut0123Jk9Gf5pM4mxxW+Qg5VMM0qyFwuhWUKhSEJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUJhSUI9HPZUDm/+X6CAi+qJCA4HH8C/QRXyiRRYUHmuHkye40EJXj8ULvCgpCjhoZQCz+knxenrXU6EnKLl9DooohspxUpeCQWrlHku5UDQosLI+WUH5oIpqFwLSFGQVez+qEEX+TlywIoig+zvWyDrFbVhRYGVch7v3m8vqLxDioLahS5Z7lV2H1MV1upHfBFLQn174NCKeNHnggYnqmxir0iR3alGb4yPVREl6jp+pCnv2w1Be0Ux9vJS6eZPm8GIAt5cUfn6WTsYUWS7mKLqevBwMxljRF2K964SO4YsVfvOwIhiH6ZYLMJsBaVX0rw3iRA1+uIGlRczIdzEectfJ2OEqLK57al4XVTvW+R12sKHIp26N0mV70pp8aL6Xzrqhuf3VtGhPiapT1Bqp6BDkaH4kyleop9rBTpUaf/YUVG1xXaxoYB9ZQonoEZ4lT7OX6LCCVjiQzHx3dIARXeLDJbmu4ga3T0KVrffhSHrqRLIA0G1QJCLVj+UFtFSTrxT/lgQLbq94vKoE0/EoUCFv26fytGm9OEQNEmor3Nebc+AxGfxm8QXJP7y+PJuQ5x2Id53jj9wXmmMb/224vi3OQ4F9dBSTTRlpFsBuJ816aj3oRhujG0Zo1MHG6WeAw+ba+anhXQL6LXdwi7Z5ulRZfA4FKFNV5g3W7SkcTyzVa9YeDBBW3immBGTWn2lTE1qaUxtw+vamJMXa9FpxZURzfh9M48dypEoJZhUfBWGapfxrbZmGAjUKteuVvxtFj82MULYsOpFQTmZHaXcorgD4oajDuVIVGNM1bTGGrs48A211TQHlPDOacdPtHmjIp6o0k6bO42zNX3pxWCn0LcuK932H6LWZigGpwNN1s5r5W2vOwbagSh4M9XNXNImrs47RkD51m2zaENvVpmTXHWzZMcMqgMLRdfrnlvSdz0Zp0VXVR+GUCUYtH2mLYRB1I/QTXEhzvCM6KrxEEaabZeZrJaZyi4H1eEj56n3T1HFCh1K97ls7yU9FPrwdan25xofn8Ud4sO5npN93yOSJl8sSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgsSSgseVkUPPcvWf7/AP0JbYRReKY/Nc0AAAAASUVORK5CYII=';
                  }}
                />
              ) : (
                <img
                  src={partido.urlLogo}
                  alt=""
                  style={{ width: "100px", height: "50px" }}
                />
              )}

              <Card.Text>Nome: {partido.nome}</Card.Text>
              <Card.Text>Número Eleitoral: {partido.numeroEleitoral? partido.numeroEleitoral: 'Não informado'}</Card.Text>
              <Card.Text>Website: {partido.urlWebSite? partido.urlWebSite : 'Não informado'}</Card.Text>
              <Card.Text>Situação: {partido.status.situacao}</Card.Text>
              <Card.Text>Total de Membros: {partido.status.totalMembros}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>


      <br></br>
      <h2 className='text-center text-white bg-primary p-2' style={{ borderRadius: '5px' }}>Líderes partidários</h2>
      <Row className="justify-content-center">
        <Col>
          <Carousel>
            {lideres && Array.isArray(lideres) && lideres.map((lider) => (
              <Carousel.Item key={lider.id}>
                <Card className="m-3">
                  <Card.Img variant="top" alt="" src={lider.urlFoto} width="100" height="300" />
                  <Card.Body>
                    <Card.Title>{lider.nome}</Card.Title>
                    <Card.Text>{lider.cargo}</Card.Text>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={9}>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Ordem</th>
                <th>Nome</th>
                <th>Email</th>
                <th>UF</th>
                <th>Data Início</th>
                <th>Cargo</th>
              </tr>
            </thead>
            <tbody>
              {lideres.map((lider, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{lider.nome}</td>
                  <td>{lider.email}</td>
                  <td>{lider.siglaUf}</td>
                  <td>{lider.dataInicio}</td>
                  <td>{lider.titulo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {scrollTop > 0 && (
            <Button variant="primary" className="scroll-to-top-btn" onClick={handleScrollToTop}>
              Voltar ao topo
            </Button>
          )}
        </Col>
      </Row>
    </Pagina>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const parti = await apiDeputados.get('/partidos/' + id);
  const partido = parti.data.dados;

  const partilider = await apiDeputados.get('/partidos/' + id + '/lideres');
  const lideres = partilider.data.dados;

  return {
    props: { partido, lideres },
  };
}
