import MovieCard from './MovieCard.jsx'
import noDataImg from '../assets/no data.png'
function Main(props) {

    const movieElements = props.moviesList.map((movie) => {
        return <MovieCard movie={movie} key={movie.imdbID} manipulateWatchlist={props.manipulateWatchlist} />

    })

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

                {props.isLoading ? <p className={"loading-text"}>Searching...</p> :
                    props.moviesList.length > 0 ? movieElements :
                        <div className={"default-look"}>
                            <img src={noDataImg}
                                 alt="classic movie reel image"
                                 className="no-data-img"/>
                            <p className="no-data-text">Start exploring</p>
                        </div>}
            </section>
        </main>
    )
}

export default Main;