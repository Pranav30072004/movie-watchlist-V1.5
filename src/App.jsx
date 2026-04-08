import {useState} from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'

import Header from './Components/Header.jsx'
import Main from './Components/Main.jsx'
import Watchlist from './Components/Watchlist.jsx'
import './CSS/index.css'

function AppContent() {
    // API variable
    const apiKey = import.meta.env.VITE_OMDB_KEY;
    // State variables
    const [moviesList, setMoviesList] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // stable variables
    const location = useLocation();

    async function getMovies(formData) {
        setIsLoading(true);
        try {
            const movieName = encodeURIComponent(formData.get('movie-search').toString().trim())
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`)
            const ResultsData = await response.json();

            const movieDetails = await Promise.all(
                ResultsData.Search.map((movie) => {
                    return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                        .then(res => res.json());
                })
            )

            setMoviesList(movieDetails)

        } catch (e) {
            console.error("Failed to fetch movie: ", e)
        } finally {
            setIsLoading(false);
        }
    }

    function addToWatchlist(movie) {
        const alreadyExists = watchlist.some(watch => {
            return watch.imdbID === movie.imdbID
        })
        if(!alreadyExists) {
            setWatchlist((prevWatchlist) => [...prevWatchlist, movie])
        }
    }

    function removeFromWatchlist(movie) {
        setWatchlist(prevWatchlist => prevWatchlist.filter(item => item.imdbID !== movie.imdbID))
    }

    return(
        <>
            <Header page={location.pathname} />
            <Routes>
            <Route path={"/"} element = {
                <Main
                    getMovies={getMovies}
                    moviesList={moviesList}
                    manipulateWatchlist={addToWatchlist}
                    isLoading={isLoading}
                />
            } />
            <Route path={"/watchlist"} element = {
                <Watchlist watchlist={watchlist} manipulateWatchlist={removeFromWatchlist}/>
            } />
        </Routes>
        </>
    )
}


function App() {


    return (
    <>

        <BrowserRouter>
            <AppContent />
        </BrowserRouter>

    </>
  )
}

export default App
