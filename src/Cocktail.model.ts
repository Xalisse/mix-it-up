interface Cocktail {
    idDrink: string
    strDrink: string
    strAlcoholic: boolean
    strDrinkThumb: string
    strInstructions: string
    ingredients: { quantity: string; name: string }[]
}

interface RawCocktail {
    dateModified: string
    idDrink: string
    strAlcoholic: string
    strCategory: string
    strCreativeCommonsConfirmed: string
    strDrink: string
    strDrinkAlternate: string | null
    strDrinkThumb: string
    strGlass: string
    strIBA: string | null
    strImageAttribution: string | null
    strImageSource: string | null
    strIngredient1: string | null
    strIngredient2: string | null
    strIngredient3: string | null
    strIngredient4: string | null
    strIngredient5: string | null
    strIngredient6: string | null
    strIngredient7: string | null
    strIngredient8: string | null
    strIngredient9: string | null
    strIngredient10: string | null
    strIngredient11: string | null
    strIngredient12: string | null
    strIngredient13: string | null
    strIngredient14: string | null
    strIngredient15: string | null
    strInstructions: string
    strInstructionsDE: string
    strInstructionsES: string
    strInstructionsFR: string | null
    strInstructionsIT: string
    strInstructionsZH_HANS: string | null
    strInstructionsZH_HANT: string | null
    strMeasure1: string | null
    strMeasure2: string | null
    strMeasure3: string | null
    strMeasure4: string | null
    strMeasure5: string | null
    strMeasure6: string | null
    strMeasure7: string | null
    strMeasure8: string | null
    strMeasure9: string | null
    strMeasure10: string | null
    strMeasure11: string | null
    strMeasure12: string | null
    strMeasure13: string | null
    strMeasure14: string | null
    strMeasure15: string | null
    strTags: string | null
    strVideo: string | null
}

const transformCocktail = (rawCocktail: RawCocktail): Cocktail => {
    const ingredients: { quantity: string; name: string }[] = []
    for (let i = 1; i <= 15; i++) {
        const ingredient = rawCocktail[`strIngredient${i}` as keyof RawCocktail]
        const measure = rawCocktail[`strMeasure${i}` as keyof RawCocktail]
        if (ingredient && measure) {
            ingredients.push({
                quantity: measure.trim(),
                name: ingredient.trim(),
            })
        }
    }
    return {
        idDrink: rawCocktail.idDrink,
        strDrink: rawCocktail.strDrink,
        strAlcoholic: rawCocktail.strAlcoholic === 'Alcoholic',
        strDrinkThumb: rawCocktail.strDrinkThumb,
        strInstructions: rawCocktail.strInstructions,
        ingredients: ingredients,
    }
}

export type { Cocktail }
export { transformCocktail }
