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
                <p>{item.nome}</p>
                ))}
        </>
    )
}

export default hooks