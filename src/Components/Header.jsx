import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className={"watchlist-header"}>
            <h1>Find your film</h1>

            {props.page === "/watchlist" ?
                <Link to="/" className={"watchlist-btn"}>Search Movies</Link>
                : <Link to="/watchlist" className={"watchlist-btn"}>My watchlist</Link>
             }

        </header>
    )
}

export default Header;