import React from 'react'

export default function Form({consulta, setPlatillo}) {
  
  return (
    <form className='form'>
        <h2><label htmlFor="platillo">Escribe tu platillo</label></h2>
        <input className='text' type="text" placeholder='Escribe tu platillo' onChange={e => setPlatillo(e.target.value)}/>
        <input type="submit" value="consultar" className='boton' onClick={consulta}/>
    </form>
  )
}
