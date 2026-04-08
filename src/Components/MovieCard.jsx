import {Link, useLocation} from 'react-router-dom';

function MovieCard(props) {
    const movie = props.movie
    const location = useLocation();
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
                        <button className="add-watchlist-btn" onClick={() => props.manipulateWatchlist(movie)}>
                            {location.pathname === '/' ? <><i className="fa-solid fa-circle-plus"></i> Watchlist</> :
                                <><i className="fa-solid fa-circle-minus"></i> Watchlist</>}
                        </button>
                    </div>
                    <span className="movie-plot">{movie.Plot}</span>
                </div>
            </section>
            <hr/>
        </>
    )
}

export default MovieCard;