import React from 'react'

const hooks = () => {
    let nome = ''
    function alterarNome() {
        nome = ''
    }
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