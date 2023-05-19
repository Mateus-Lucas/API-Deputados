import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Detalhes = ({ partido }) => {
  console.log(partido);

  return (
    <Pagina titulo={partido.sigla}>
      <img
        alt=""
        src={partido.urlLogo}
        width="100"
        height="80"
        className="d-inline-block align-top"
      />
    </Pagina>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const parti = await apiDeputados.get('/partidos/' + id);
  const partido = parti.data.dados;

  return {
    props: { partido },
  };
}
