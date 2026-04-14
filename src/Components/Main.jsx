import MovieCard from './MovieCard.jsx'
import noDataImg from '../assets/no data.png'
function Main(props) {

    const movieElements = props.moviesList.map((movie) => {
        return <MovieCard
            movie={movie} key={movie.imdbID}
            manipulateWatchlist={props.manipulateWatchlist}
            watchlist={props.watchlist}
            user={props.user}
        />

    })

    const totalPages = Math.floor(props.totalResults / 10);
    console.log(totalPages);
    return (
        <main className={"movie-main"}>
            <search>
                <form
                    id={"search-form"}
                    className={"search-form"}
                    action={props.getMovies}
                >
                    <input type={"search"}
                           name={"movie-search"}
                           id={"movie-search"}
                           className={"movie-search"}
                           aria-label={"search for a movie"}
                           placeholder={"Search for a movie"}
                           required
                    />
                    <button id={"search-btn"} className={"search-btn"}>Search</button>
                </form>
            </search>


            <section className={`list-section 
                                ${props.moviesList.length === 0 ? 'empty' : null}`}
            >
                {
                    props.isLoading ? <div className={"loading-spinner"}></div> :
                    props.noResults ? <p>No results found. Try a different title.</p> :
                        props.moviesList.length > 0 ? movieElements :
                            <div className={"default-look"}>
                                <img src={noDataImg}
                                     alt="classic movie reel image"
                                     className="no-data-img"/>
                                <p className="no-data-text">Start exploring</p>
                            </div>
                }
                {
                    props.totalResults > 10 &&
                    <div className={"pagination-controls"}>
                        <button className={"pagination-btn"} onClick={() => props.changePage(props.currentPage - 1)} disabled={props.currentPage === 1}>
                            Previous
                        </button>
                        <span>{props.currentPage} of {totalPages}</span>
                        <button className={"pagination-btn"} onClick={() => props.changePage(props.currentPage + 1)} disabled={props.currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                }
            </section>
        </main>
    )
}

export default Main;