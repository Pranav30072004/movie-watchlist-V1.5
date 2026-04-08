import {Link} from 'react-router-dom'
import MovieCard from './MovieCard.jsx'
function Watchlist(props) {

    const watchlistElements = props.watchlist.map((movie, index) => {
       return <MovieCard movie={movie} key={movie.imdbID} manipulateWatchlist={props.manipulateWatchlist}/>
    })
    return(
        <main className={"watchlist-main"}>
            {props.watchlist.length > 0 ? watchlistElements :
                <div className={"empty-watchlist"}>
                    <h1>Your watchlist is looking a little empty...</h1>
                    <Link to={"/"} className={"home-btn"}><i className="fa-solid fa-circle-plus"></i> Let's add some movies!</Link>
                </div>
            }
        </main>
    )
}

export default Watchlist;