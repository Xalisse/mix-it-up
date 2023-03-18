import { useEffect, useState } from 'react'
import { Cocktail, transformCocktail } from './Cocktail.model'
import { CocktailCard } from './CocktailCard'

const RandomCocktail = () => {
    const [cocktail, setCocktail] = useState<Cocktail>()
    useEffect(() => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCocktail(transformCocktail(data.drinks[0]))
                console.log(data.drinks[0])
            })
    }, [])

    if (!cocktail) {
        return <div>Loading...</div>
    }
    return (
        <CocktailCard cocktail={cocktail}>
            <ul>
                {cocktail.ingredients.map((ingredient) => (
                    <li key={`${cocktail.idDrink}-${ingredient.name}-random`}>
                        {ingredient.name} {ingredient.quantity}
                    </li>
                ))}
            </ul>
        </CocktailCard>
    )
}

export default RandomCocktail
