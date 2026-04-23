import {Link, useLocation} from 'react-router-dom';

function MovieCard(props) {
    const movie = props.movie
    const location = useLocation();
    const isInWatchlist = props.watchlist.some(watch => watch.imdbID === movie.imdbID);

    const buttonElement = location.pathname === '/watchlist'
        ? <button
            className={"add-watchlist-btn"}
            onClick={() => props.manipulateWatchlist(movie)}
            aria-label={`Remove ${movie.Title} from watchlist`}>
            <i className="fa-solid fa-circle-minus"></i> Remove from watchlist
        </button>
        : isInWatchlist ?
            <button
                className={"add-watchlist-btn saved"}
                onClick={() => props.manipulateWatchlist(movie)}
                aria-label={`${movie.Title} is saved to your watchlist`}
                aria-pressed={"true"}
            >
                <i className={"fa-solid fa-circle-check"}></i> Saved
            </button>
            : <button
                className={'add-watchlist-btn'}
                onClick={() => props.manipulateWatchlist(movie)}
                aria-label={`Add ${movie.Title} to your watchlist`}
                aria-pressed={"false"}
            >
                <i className={"fa-solid fa-circle-plus"}></i> Watchlist
            </button>
    return (
        <>
            <section className="movie" aria-label={movie.Title}>
                <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                <div className="movie-data">
                    <div className="movie-overview">
                        <h2 className="movie-title">{movie.Title}</h2>
                        <h3 className="movie-rating" aria-label={`Rating: ${movie.imdbRating} out of 10`}>⭐ {movie.imdbRating}</h3>
                    </div>
                    <div className="movie-detail">
                        <p arial-label={`Runtime: ${movie.Runtime}`}>{movie.Runtime}</p>
                        <p arial-label={`Genre: ${movie.Genre}`}>{movie.Genre}</p>
                        {props.user ?
                            buttonElement :
                        <p className={"sign-in-prompt"}>Sign in to save to watchlist</p>}
                    </div>
                    <span className="movie-plot">{movie.Plot}</span>
                </div>
            </section>
            <hr aria-hidden={"true"}/>
        </>
    )
}

export default MovieCard;