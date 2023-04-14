import React, { useEffect, useState } from 'react';
import apiDeputados from '../../services/apiDeputados';


const hooks = () => {

    const [deputados, setDeputados] = useState([])
  
    useEffect(()=>{
  
        apiDeputados.get('/deputados').then(resultado=>{
            setDeputados(resultado.data.dados)
        })
            
    }, [])
  
    return (
        <>
            <h1>Nome dos Deputados</h1>
            <br></br>
            {deputados.map(item => (
                <img title={item.nome} key={item.id} src={item.urlFoto} width='150px' />
            ))}
        </>
    )
}

export default hooks