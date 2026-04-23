import {Link} from 'react-router-dom'
import MovieCard from './MovieCard.jsx'
function Watchlist(props) {

    const watchlistElements = props.watchlist.map((movie) => {
       return <MovieCard
           movie={movie} key={movie.imdbID}
           manipulateWatchlist={props.manipulateWatchlist}
           watchlist={props.watchlist}
           user={props.user}
       />
    })
    return(
        <main className={"watchlist-main"} aria-label={"My watchlist"}>
            {props.watchlist.length > 0 ? watchlistElements :
                <div className={"empty-watchlist"} role={"status"}>
                    <h1>Your watchlist is looking a little empty...</h1>
                    <Link to={"/"} className={"home-btn"} aria-label={"Go to search to add movies"}><i className="fa-solid fa-circle-plus" aria-hidden={"true"}></i> Let's add some movies!</Link>
                </div>
            }
        </main>
    )
}

export default Watchlist;