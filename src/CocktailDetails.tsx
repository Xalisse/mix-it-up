import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Cocktail, transformCocktail } from './Cocktail.model'

interface Comment {
    comment: string
    user: string
    date: Date
    note: number | string
}

const CocktailDetails = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>()
    const [cocktail, setCocktail] = useState<Cocktail>()
    const [comments, setComments] = useState<Comment[]>([
        {
            comment: 'What an amazing cocktail! Love it',
            user: 'John Doe',
            date: new Date(),
            note: 5,
        },
        {
            comment: "I don't like it, to much sugar",
            user: 'Jane Doe',
            date: new Date(),
            note: 1,
        },
    ])
    const id = useParams<{ id: string }>().id

    const { handleSubmit, handleChange, values } = useFormik<Comment>({
        initialValues: {
            comment: '',
            user: '',
            date: new Date(),
            note: '',
        },
        onSubmit: (values, { resetForm }) => {
            if (values.note < 1 || values.note > 5) {
                setError('Note must be between 1 and 5')
                return
            }

            if (!values.user || !values.comment || !values.note) {
                setError('Please fill all fields')
                return
            }

            setError(undefined)
            setComments((old) => [
                {
                    comment: values.comment,
                    user: values.user,
                    date: new Date(),
                    note: values.note,
                },
                ...old,
            ])
            resetForm()
        },
    })

    useEffect(() => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCocktail(transformCocktail(data.drinks[0]))
            })
    }, [id])

    return (
        <div className='flex flex-col md:grid md:grid-cols-[40%,1fr]'>
            <a
                onClick={() => navigate('/')}
                className='self-center col-span-2 justify-self-center'
            >
                ↩ Back to all cocktails
            </a>

            <h2 className="font-['Nova_Mono'] font-bold underline mt-8 text-2xl md:col-start-2 md:justify-self-start md:pl-2">
                {cocktail?.strDrink}
            </h2>
            <img
                src={cocktail?.strDrinkThumb}
                alt={cocktail?.strDrink}
                className='md:col-start-1 lg:row-span-2'
            />
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
                <div className="my-8 text-lg font-['Nova_Mono'] italic">
                    Enjoy 🥂
                </div>
            </div>

            <div className='m-4 md:col-span-2 md:w-1/2 md:m-auto md:mt-8'>
                <h3>Comments 🍹</h3>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 py-4 border-b'
                >
                    <input
                        type='text'
                        placeholder='Your name'
                        name='user'
                        onChange={handleChange}
                        value={values.user}
                    />
                    <textarea
                        placeholder='Your comment'
                        name='comment'
                        onChange={handleChange}
                        value={values.comment}
                    />
                    <input
                        type='number'
                        placeholder='Your note'
                        name='note'
                        onChange={handleChange}
                        value={values.note}
                    />
                    {error && <div className='text-red-500'>{error}</div>}
                    <button type='submit' className='md:self-start'>
                        Add a comment
                    </button>
                </form>
                {comments.map((comment, idx) => (
                    <div
                        key={`${comment.comment}-${idx}`}
                        className='border-b py-4'
                    >
                        <div className='flex items-center'>
                            {comment.user}
                            <p className='text-xs ml-4'>
                                {comment.date.toLocaleDateString('fr')}
                            </p>
                        </div>

                        {comment.note &&
                            Array.from(
                                {
                                    length:
                                        typeof comment.note === 'number'
                                            ? comment.note
                                            : comment.note.length,
                                },
                                (_, i) => (
                                    <span
                                        key={`note-${i}-${idx}-${comment.user}`}
                                    >
                                        ⭐
                                    </span>
                                )
                            )}
                        <div>{comment.comment}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CocktailDetails
