import React from 'react'
import Pagina from '../../components/Pagina'
import apiDeputados from '../../services/apiDeputados'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const index = ({ votacoes }) => {

  return (
    <Pagina titulo="Votações">
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: 'event 1', date: '2019-04-01' },
          { title: 'event 2', date: '2019-04-02' }
        ]}/>
    </Pagina>
  )
}

export default index

export async function getServerSideProps(context) {

  const resultado = await apiDeputados.get('/votacoes')
  const votacoes = resultado.data.dados

  return {
      props: { votacoes },
  }
}