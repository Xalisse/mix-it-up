import { useState } from 'react'
import { Cocktail, transformCocktail } from './Cocktail.model'
import { CocktailCard } from './CocktailCard'
import RandomCocktail from './RandomCocktail'

function App() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([])
    const [cocktailsByIngredient, setCocktailsByIngredient] = useState<
        Partial<Cocktail>[]
    >([])

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

    return (
        <div className='bg-neutral-50'>
            <h1>
                M<span className='italic'>i</span>x It Up
                <span className='italic'>!</span>
            </h1>

            <div className='flex flex-col px-4'>
                <form
                    onSubmit={handleSearch}
                    className='flex justify-center mt-10'
                >
                    <input
                        type='text'
                        name='search'
                        placeholder='Search a cocktail'
                        className='w-4/5 bg-white rounded-l-lg p-2'
                    />
                    <button
                        type='submit'
                        className='bg-amber-400 w-1/5 rounded-r-lg'
                    >
                        🔍
                    </button>
                </form>
                <a href='#ingredient-search' className='text-center'>
                    You don&apos;t know the name ? Try the search by ingredient
                    👁️
                </a>

                <div className='flex flex-wrap gap-4 mt-8'>
                    {cocktails.length === 0 && (
                        <p className='text-center'>
                            No cocktail found with this name
                        </p>
                    )}
                    {cocktails.map((cocktail) => (
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
                <div className='flex flex-wrap gap-4 mt-4'>
                    <RandomCocktail />
                    <RandomCocktail />
                </div>
            </div>

            <div id='ingredient-search' className='pb-8 px-4'>
                <h2>Search by the ingredient you have 🍊</h2>
                <form
                    onSubmit={handleSearchIngredient}
                    className='flex justify-center py-8'
                >
                    <input
                        type='text'
                        name='searchingredients'
                        placeholder='Search by ingredient'
                        className='w-4/5 bg-white rounded-l-lg p-2'
                    />
                    <button
                        type='submit'
                        className='bg-amber-400 w-1/5 rounded-r-lg'
                    >
                        🔍
                    </button>
                </form>
                <div className='flex flex-wrap gap-4'>
                    {cocktailsByIngredient.length === 0 && (
                        <p className='text-center'>
                            No cocktail found with this ingredient
                        </p>
                    )}
                    {cocktailsByIngredient.map((cocktail) => (
                        // <PartialCocktailCard key={cocktail.id} cocktail={cocktail} />
                        <CocktailCard
                            key={`${cocktail.idDrink}-ingredients`}
                            cocktail={cocktail}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
