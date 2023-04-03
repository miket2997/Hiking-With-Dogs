import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ isLoggedIn, logout }){
    return (
        <footer className="footer">
            <Link className="footer--links" to="/">Home</Link>
            <Link className="footer--links" to="/trailList">Trail List</Link>
            {!isLoggedIn && <Link className="footer--links" to="/login">Login</Link>}
            {!isLoggedIn && <Link className="footer--links" to="/registerForm">Sign up</Link>}
            {isLoggedIn && <button className="footer--links logout" onClick={logout}>Logout</button>}
        </footer>
    )
}