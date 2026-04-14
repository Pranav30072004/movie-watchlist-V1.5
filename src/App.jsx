import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import useMovieWatchlist from "./useMovieWatchlist.js";
import Header from './Components/Header.jsx'
import Main from './Components/Main.jsx'
import Watchlist from './Components/Watchlist.jsx'
import './CSS/index.css'

function AppContent() {
    const location = useLocation();
    const {
        moviesList,
        watchlist,
        user,
        isLoading,
        noResults,
        currentPage,
        totalResults,
        changePage,
        getMovies,
        addToWatchlist,
        removeFromWatchlist,
        handleSignIn,
        handleSignOut,
    } = useMovieWatchlist();

    return(
        <>
            <Header
                    page={location.pathname}
                    signIn={handleSignIn}
                    signOut={handleSignOut}
                    user={user}
            />
            <Routes>
            <Route path={"/"} element = {
                <Main

                    moviesList={moviesList}
                    watchlist={watchlist}
                    isLoading={isLoading}
                    noResults={noResults}
                    currentPage={currentPage}
                    totalResults={totalResults}
                    user={user}
                    changePage={changePage}
                    manipulateWatchlist={addToWatchlist}
                    getMovies={getMovies}

                />
            } />
            <Route path={"/watchlist"} element = {
                <Watchlist
                    watchlist={watchlist}
                    manipulateWatchlist={removeFromWatchlist}
                    user={user}
                />
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
