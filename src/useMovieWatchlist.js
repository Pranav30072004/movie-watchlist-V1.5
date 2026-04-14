import {useState, useEffect} from 'react'
// Firebase imports
import {db, auth, googleProvider} from './firebase.js'
import {doc, setDoc, deleteDoc, getDocs, collection} from 'firebase/firestore'
import {signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth'

export default function useMovieWatchlist(){
    // API variable
    const apiKey = import.meta.env.VITE_OMDB_KEY;
    // State variables
    const [moviesList, setMoviesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentSearch, setCurrentSearch] = useState('');
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [user, setUser] = useState(null);

    // authentication functions
    async function handleSignIn() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch(err) {
            console.error("Sign in failed: ", err)
        }
    }
    async function handleSignOut() {
        try {
            await signOut(auth);
            setWatchlist([])
        } catch(err) {
            console.error("Sign out failed: ", err)
        }
    }

    // useEffect
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if(currentUser) {
                const watchlistSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'watchlist'));
                const movies = watchlistSnapshot.docs.map(doc => doc.data());
                setWatchlist(movies);
            }
            else {
                setWatchlist([]);
            }
        })
        return unsubscribe;
    }, [])

    // movie listing function
    async function getMovies(formData, page = 1) {
        try {
            setIsLoading(true);
            const movieName = encodeURIComponent(formData.get('movie-search').toString().trim())
            setCurrentSearch(movieName);

            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}&page=${page}`)
            const resultsData = await response.json();

            if(!resultsData.Search) {
                setNoResults(true)
                setMoviesList([])
                return
            }

            setTotalResults(parseInt(resultsData.totalResults))
            setCurrentPage(page)

            const movieDetails = await Promise.all(
                resultsData.Search.map((movie) => {
                    return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                        .then(res => res.json());
                })
            )

            setNoResults(false);
            setMoviesList(movieDetails);

        } catch (err) {
            console.error("Failed to fetch movie: ", err)
        } finally {
            setIsLoading(false);
        }
    }

    // change page function
    async function changePage(newPage) {
        try {
            setIsLoading(true);
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${currentSearch}&page=${newPage}`)
            const resultsData = await response.json();

            const movieDetails = await Promise.all(
                resultsData.Search.map((movie) => {
                    return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                        .then(res => res.json());
                })
            )
            setMoviesList(movieDetails);
            setCurrentPage(newPage);
        } catch(err) {
            console.error("Failed to change page: ", err)
        } finally {
            setIsLoading(false);
        }
    }

    // watchlist functions
    async function addToWatchlist(movie) {
        const alreadyExists = watchlist.some(watch => {
            return watch.imdbID === movie.imdbID
        })
        if(!alreadyExists) {
            setWatchlist((prevWatchlist) => [...prevWatchlist, movie])
            await setDoc(doc(db, 'users', user.uid, 'watchlist', movie.imdbID),movie);
        }
    }

    async function removeFromWatchlist(movie) {
        setWatchlist(prevWatchlist => prevWatchlist.filter(item => item.imdbID !== movie.imdbID))
        await deleteDoc(doc(db, 'users', user.uid, 'watchlist', movie.imdbID));
    }

    return {
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
    }
}