import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CocktailDetails from './CocktailDetails';
import Home from './Home';

function App() {
    return (
        <main className='bg-neutral-50'>
            <h1>
                M<span className='italic'>i</span>x It Up
                <span className='italic'>!</span>
            </h1>

            <BrowserRouter>
                <Routes>
                    <Route path='/cocktail/:id' element={<CocktailDetails />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App
