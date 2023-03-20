import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Cocktail, transformCocktail } from './Cocktail.model';

const CocktailDetails = () => {
    const navigate = useNavigate();
    const [cocktail, setCocktail] = useState<Cocktail>()
    const id = useParams<{ id: string }>().id
    useEffect(() => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCocktail(transformCocktail(data.drinks[0]))
            })
    }, [id])

    return <div className='flex flex-col md:grid md:grid-cols-[40%,1fr]'>
        <a onClick={() => navigate('/')} className='self-center col-span-2 justify-self-center'>↩ Back to all cocktails</a>

        <h2 className="font-['Nova_Mono'] font-bold underline mt-8 text-2xl md:col-start-2 md:justify-self-start md:pl-2">{cocktail?.strDrink}</h2>
        <img src={cocktail?.strDrinkThumb} alt={cocktail?.strDrink} className='md:col-start-1 lg:row-span-2'/>
        <div className='p-4 bg-amber-100'>
            <h3>Ingredients 🍸</h3>
            <ul>
                {cocktail?.ingredients.map((ingredient, index) => (
                    <li key={`igr-${index}`}>
                        {ingredient.name} {ingredient.quantity}
                    </li>
                ))}
            </ul>
        </div>
        
        <div className='m-4 md:col-span-2 lg:col-span-1'>
            <h3>Instructions ✨</h3>
            <div>{cocktail?.strInstructions}</div>
        </div>
    </div>
}

export default CocktailDetails
