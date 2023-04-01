import {useState} from 'react'
import Form from './components/Form'
import Descripcion from './components/Descripcion'
import Spinner from './components/Spinner'

export default function App() {
  const [platillo, setPlatillo] = useState("")
  const [recetas, setRecetas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const arreglo = []
  async function consulta(e){
    e.preventDefault()
    setIsLoading(true)
    const data = await fetch("https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=" + platillo, {
      headers: {
        'X-RapidAPI-Key': '24a32d45e0msh43ddd6efd389b52p18c800jsnccfa0703dc54',
      }
    })
    const result = await data.json()
    // console.log(result)
    for (let i = 0; i < 6; i++) {
      arreglo.push(result[i])
    }
    setRecetas(arreglo)
    setIsLoading(false)
  }

  return (
    <div>
        <div className='primary'>
            <div className='cuerpo'>
                <h1 className='logo'><span className='health'>HEALTHY</span> Recipes</h1>
                <div className='container'>
                  {isLoading ? <Spinner/> : <Descripcion recetas={recetas}/>}
                  <Form consulta={consulta} setPlatillo={setPlatillo} />
                </div>
            </div>
        </div>
    </div>
  )
}