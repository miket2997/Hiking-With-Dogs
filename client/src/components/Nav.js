import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Nav({ isLoggedIn, logout }) {
  const [navOpen, setNavOpen] = useState(false);

  function handleNavChange() {
    setNavOpen(prev => !prev);
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">Hiking With Your Pup</Link>
      <button onClick={handleNavChange} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/trailList">Trails</Link>
          </li>
          {!isLoggedIn && <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>}
          {!isLoggedIn && <li className="nav-item">
            <Link className="nav-link" to="/registerForm">Sign up</Link>
          </li>}
          {isLoggedIn && <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>}
          {isLoggedIn && <li className="nav-item">
              <button className= "logout" onClick={logout}>Logout</button>
            </li>}
        </ul>
      </div>
    </nav>
  );
}
