import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { MovieContext } from "./Context";
export default function Navbar() {
  const { count } = useContext(MovieContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-semibold" to="/">
            Movie App
          </NavLink>
          <NavLink className="navbar-brand fw-semibold mx-2" to="/tvshows">
            TVShows
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex">
                <Link
                  className="nav-link active float-lg-end me-2"
                  aria-current="page"
                  to="watchList"
                >
                  <i className="fa-solid fa-heart fs-5"></i> Watchlist
                </Link>
                <button className="count-btn border-0">{count}</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
