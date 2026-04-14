import {Link, useLocation} from 'react-router-dom';

function MovieCard(props) {
    const movie = props.movie
    const location = useLocation();
    const isInWatchlist = props.watchlist.some(watch => watch.imdbID === movie.imdbID);

    const buttonElement = location.pathname === '/watchlist'
        ? <button className={"add-watchlist-btn"} onClick={() => props.manipulateWatchlist(movie)}>
            <i className="fa-solid fa-circle-minus"></i> Remove from watchlist
        </button>
        : isInWatchlist ?
            <button className={"add-watchlist-btn saved"} onClick={() => props.manipulateWatchlist(movie)}>
                <i className={"fa-solid fa-circle-check"}></i> Saved
            </button>
            : <button className={'add-watchlist-btn'} onClick={() => props.manipulateWatchlist(movie)}>
                <i className={"fa-solid fa-circle-plus"}></i> Watchlist
            </button>
    return (
        <>
            <section className="movie">
                <img src={movie.Poster} alt={movie.Title}/>
                <div className="movie-data">
                    <div className="movie-overview">
                        <h2 className="movie-title">{movie.Title}</h2>
                        <h3 className="movie-rating">⭐ {movie.imdbRating}</h3>
                    </div>
                    <div className="movie-detail">
                        <p>{movie.Runtime}</p>
                        <p>{movie.Genre}</p>
                        {props.user ?
                            buttonElement :
                        <p className={"sign-in-prompt"}>Sign in to save to watchlist</p>}
                    </div>
                    <span className="movie-plot">{movie.Plot}</span>
                </div>
            </section>
            <hr/>
        </>
    )
}

export default MovieCard;