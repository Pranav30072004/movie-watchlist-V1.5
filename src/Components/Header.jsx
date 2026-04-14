import {Link} from "react-router-dom";

function Header(props) {
    const username = props.user?.displayName?.split(' ')[0];
    return (
        <header className={"watchlist-header"}>
            <button
                className={"authentication-btn"}
                onClick={props.user ? props.signOut : props.signIn}
            >{props.user ? "Sign out" : "Sign in"}
            </button>
            <h1>Find your film</h1>

            <div className={"header-right"}>
                {props.user && <span className={'signed-in-text'}>Welcome back, {username}</span>}
            {props.page === "/watchlist" ?
                <Link to="/" className={"watchlist-btn"}>Search Movies</Link>
                : <Link to="/watchlist" className={"watchlist-btn"}>My watchlist</Link>
             }
            </div>
        </header>
    )
}

export default Header;