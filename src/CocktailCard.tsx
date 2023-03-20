import { useNavigate } from "react-router-dom";
import { Cocktail } from './Cocktail.model'
interface Props {
    cocktail: Partial<Cocktail>
    children?: React.ReactNode
}

const CocktailCard = ({ cocktail, children }: Props) => {
    const navigate = useNavigate();

    return (
        <div
            className={`bg-white rounded-xl grid grid-cols-[40%,auto] gap-4 pr-8 h-60 w-full lg:w-2/5`}
        >
            <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className='h-full object-cover rounded-l-xl overflow-hidden w-full'
            />
            <div className='flex flex-col gap-4 justify-around'>
                <p className="font-['Nova_Mono'] font-bold text-xl underline">
                    {cocktail.strDrink}
                </p>
                {children}
                <button onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}>Try it!</button>
            </div>
        </div>
    )
}

export { CocktailCard }
