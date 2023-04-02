import {useState, useEffect} from 'react'
import ReactModal from 'react-modal'
import randomId from '../helper'
import Spinner from './Spinner'

export default function Descripcion({recetas}) {
    const [modal, setModal] = useState(false)
    const [recipe, setRecipe] = useState({})
    const [nutritional, setNutritional] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const handleModal = async (receta) => {
        setModal(!modal)
        setRecipe(receta || {})
        setIsLoading(true)
        const data = await fetch("https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=" + receta.title, {
            headers: {
                'X-RapidAPI-Key': '24a32d45e0msh43ddd6efd389b52p18c800jsnccfa0703dc54',
            }
        })
        const result = await data.json()
        setNutritional(result[0])
        setIsLoading(false)
    }
    useEffect(() => {
        if(!modal){
            setRecipe({})
            setNutritional({})
        }
    }, [modal])
    
    const customStyles = {
        overlay: {
            backgroundColor: '#0000000',
        },
        content : {
          backgroundColor: '#2c2c2cc3',
          border: "none"
        }
      };
  return (
    <>
        {!recetas.length ? (
        <div className='descripcion'>
            <h1 className='titulo'>HealthyRecipes</h1>
            <p><span className='health'> Do you want healthy recipes? </span> This is your page
            <br />
            write the meal you want <span className='health'> we tell you </span>
            <br />
            what you need and its <span className='health'>nutritional content</span>
            <br />
            the steps to follow, and the portions
            </p>
        </div>
        ): (
            <div className='recetas'>
                {recetas.map(recipe => (
                    <div className='recepe' key={randomId(8)}>
                        <h3>{recipe?.title}</h3>
                        <button className='boton' onClick={() => handleModal(recipe)}>Ver receta</button>
                    </div>
                ))}
            </div>
        )}
            {modal && (
                <ReactModal isOpen={handleModal} onRequestClose={handleModal} style={customStyles}>
                    <div className='modal'>
                    <div className="modal-header">
                        <h2 className='health'>{recipe?.title}</h2>
                        <button className='x' onClick={handleModal}>X</button>
                    </div>
                    <h2 className='health'>Ingredientes</h2>
                    <h3>{recipe?.ingredients}</h3>
                    <h2>{recipe?.servings}</h2>
                    <h2 className='health'>Instrucciones</h2>
                    <h3>{recipe?.instructions}</h3>

                    {isLoading ? <Spinner/> : (
                        <div className='nutrimental'>
                            <h3 className='health'>Informacion Nutrimental</h3>
                            <h4>{nutritional.name}</h4>
                            <p>calorias: {nutritional.calories}</p>
                            <p>proteina: {nutritional.protein_g}gm</p>
                            <p>carbohidratos: {nutritional.carbohydrates_total_g}gm</p>
                            <p>colesterol: {nutritional.cholesterol_mg}mg</p>
                        </div>
                    )}

                    </div>
                </ReactModal>
            )}
        
    </>
  )
}
