import Pagina from '@/components/Pagina'
import React from 'react'
import Carrossel from '../../components/Carrossel'
import ListaDeputados from '@/components/ListaDespesas'
const Deputados = () => {
    return (
        <>
            <Pagina titulo='Deputados'>
                <Carrossel />
            </Pagina> 
        </>
    )
}
export default Deputados