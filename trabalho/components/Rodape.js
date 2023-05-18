import React from 'react'

const style = {
  rodape: {
    width: '100%'
  }
}

const Rodape = () => {
  return (

    <div style={style.rodape}className='bg-primary text-white text-center position-fixed bottom-0 mt-5'>
      <p>© 2023 Câmara dos Deputados do Brasil. Todos os direitos reservados.</p>
    </div>

  )
}

export default Rodape