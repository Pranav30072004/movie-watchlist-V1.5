import {Link} from "react-router-dom";

function Header(props) {
    const username = props.user?.displayName?.split(' ')[0];
    return (
        <header className={"watchlist-header"}>
            <button
                className={"authentication-btn"}
                onClick={props.user ? props.signOut : props.signIn}
                aria-label={props.user ? "Sign out of your account" : "Sign in with Google"}
            >{props.user ? "Sign out" : "Sign in"}
            </button>
            <h1>Find your film</h1>

            <div className={"header-right"}>
                {props.user &&
                    <span
                    className={'signed-in-text'}
                    aria-live={"polite"}
                    aria-atomic={true}
                >Welcome back, {username}</span>}
            {props.page === "/watchlist" ?
                <Link to="/" className={"watchlist-btn"} aria-label={"Got to movie search"}>Search Movies</Link>
                : <Link to="/watchlist" className={"watchlist-btn"} aria-label={"Go to my watchlist"}>My watchlist</Link>
             }
            </div>
        </header>
    )
}

export default Header;