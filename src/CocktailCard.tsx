import { Cocktail } from './Cocktail.model'

interface Props {
    cocktail: Partial<Cocktail>
    children?: React.ReactNode
}

const CocktailCard = ({ cocktail, children }: Props) => {
    return (
        <div
            className={`bg-white rounded-xl grid grid-cols-[40%,auto] gap-4 pr-8 h-60`}
        >
            <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className='h-full object-cover rounded-l-xl'
            />
            <div>
                <p className="font-['Nova_Mono'] font-bold text-xl underline">
                    {cocktail.strDrink}
                </p>
                {children}
            </div>
        </div>
    )
}

export { CocktailCard }
