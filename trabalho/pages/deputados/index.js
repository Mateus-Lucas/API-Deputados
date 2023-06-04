import Pagina from '@/components/Pagina'
import React from 'react'
import {Container} from 'react-bootstrap'
import Carrossel from '../../components/Carrossel'

const Deputados = () => {
    return (
        <>
            <Pagina titulo='Deputados'>
                <Container className='justify-content-end'>
                <Carrossel />
                </Container>
            </Pagina>
        </>
    )
}

export default Deputados

