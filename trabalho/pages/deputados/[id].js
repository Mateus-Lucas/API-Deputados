import Pagina from '../../components/Pagina'
import apiDeputados from '../../services/apiDeputados'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const Deputados = ({ infdep }) => {
    return (
        <>
            <Pagina titulo={infdep.nome}>
                
            </Pagina>
        </>
    )
}

export default Deputados

export async function getServerSideProps(context) {
    const id = context.params.id

    const resultdep = await apiDeputados.get('/deputados/' + { id })

    const infdep = resultdep.data.dados

    return {
        props: {
            infdep
        },
    }
}