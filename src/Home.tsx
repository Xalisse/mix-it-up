import { useState } from 'react'
import RandomCocktail from './RandomCocktail'
import { Cocktail, transformCocktail } from './Cocktail.model'
import { CocktailCard } from './CocktailCard'


const Home = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>()
    const [cocktailsByIngredient, setCocktailsByIngredient] =
        useState<Partial<Cocktail>[]>()

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const searchText = (event.target as HTMLFormElement).search.value
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCocktails(data.drinks.map(transformCocktail))
            })
            .catch((error) => {
                console.log(error)
                setCocktails([])
            })
    }

    const handleSearchIngredient = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        const searchText = (event.target as HTMLFormElement).searchingredients
            .value
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCocktailsByIngredient(data.drinks)
            })
            .catch((error) => {
                console.log(error)
                setCocktailsByIngredient([])
            })
    }
    return <>
        <div className='flex flex-col px-4 lg:mx-[5%]'>
            <form
                onSubmit={handleSearch}
                className='flex justify-center mt-10'
            >
                <input
                    type='text'
                    name='search'
                    placeholder='Search a cocktail'
                    className='w-4/5 lg:w-3/5 bg-white rounded-r-none p-2 lg:py-4'
                />
                <button
                    type='submit'
                    className='w-1/5 lg:w-1/6 rounded-none rounded-r-lg'
                >
                    🔍
                </button>
            </form>

            <p className='text-center'>
                You don&apos;t know the name ?
                <a href='#ingredient-search'>
                    {' '}
                    Try the search by ingredient 👁️{' '}
                </a>
            </p>

            <div className='flex flex-wrap gap-4 mt-8 lg:justify-center'>
                {cocktails && cocktails.length === 0 && (
                    <p className='text-center'>
                        No cocktail found with this name
                    </p>
                )}
                {cocktails &&
                    cocktails.map((cocktail) => (
                        <CocktailCard
                            key={cocktail.idDrink}
                            cocktail={cocktail}
                        >
                            <ul>
                                {cocktail.ingredients.map(
                                    (ingredient, index) => (
                                        <li
                                            key={`${cocktail.idDrink}-${ingredient.name}-full-cocktail-${index}`}
                                        >
                                            {ingredient.name}{' '}
                                            {ingredient.quantity}
                                        </li>
                                    )
                                )}
                            </ul>
                        </CocktailCard>
                    ))}
            </div>
        </div>

        <div className='bg-amber-100 p-4 pb-10 my-8'>
            <h2>No inspiration ?</h2>
            <h2>Some random cocktails for you 🍹</h2>
            <div className='flex flex-wrap gap-4 mt-4 lg:justify-center lg:mx-[10%]'>
                <RandomCocktail />
                <RandomCocktail />
            </div>
        </div>

        <div id='ingredient-search' className='flex flex-col pb-8 px-4 lg:mx-[5%]'>
            <h2>Search by the ingredient you have 🍊</h2>
            <form
                onSubmit={handleSearchIngredient}
                className='flex justify-center py-8'
            >
                <input
                    type='text'
                    name='searchingredients'
                    placeholder='Search by ingredient'
                    className='w-4/5 lg:w-3/5 bg-white rounded-r-none p-2 lg:py-4'
                />
                <button
                    type='submit'
                    className='w-1/5 lg:w-1/6 rounded-none rounded-r-lg'
                >
                    🔍
                </button>
            </form>
            <div className='flex flex-wrap gap-4 lg:justify-center'>
                {cocktailsByIngredient &&
                    cocktailsByIngredient.length === 0 && (
                        <p className='text-center'>
                            No cocktail found with this ingredient
                        </p>
                    )}
                {cocktailsByIngredient &&
                    cocktailsByIngredient.map((cocktail) => (
                        <CocktailCard
                            key={`${cocktail.idDrink}-ingredients`}
                            cocktail={cocktail}
                        />
                    ))}
            </div>
        </div>
    </>
}

export default Home
