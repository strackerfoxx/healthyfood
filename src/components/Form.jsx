import React from 'react'

export default function Form({consulta, setPlatillo}) {
  
  return (
    <form className='form'>
        <h2><label htmlFor="platillo">Find your Recipe</label></h2>
        <input className='text' type="text" placeholder='write what you want to cook' onChange={e => setPlatillo(e.target.value)}/>
        <input type="submit" value="see recipe" className='boton' onClick={consulta}/>
    </form>
  )
}
