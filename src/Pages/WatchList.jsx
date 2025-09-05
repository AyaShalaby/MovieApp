import { useContext, useState } from "react";
import { MovieContext } from "../Context/Context";
import { Link } from "react-router-dom";
import noMovie from "../assets/noMovies.png";

export default function WatchList() {
  const { watchlist, toggleWatchlist, setWatchlist } = useContext(MovieContext);

  // Separate movies and TV shows
  const moviesInWatchlist = watchlist.filter((item) => item.title);
  const tvInWatchlist = watchlist.filter((item) => item.name);

  // Pagination for Movies
  const [moviePage, setMoviePage] = useState(1);
  const moviesPerPage = 4;//display at most 4
  const movieTotalPages = Math.ceil(moviesInWatchlist.length / moviesPerPage);

  const movieStartIndex = (moviePage - 1) * moviesPerPage;
  const movieEndIndex = movieStartIndex + moviesPerPage;
  const currentMovies = moviesInWatchlist.slice(movieStartIndex, movieEndIndex);

  // Pagination  for TV Shows
  const [tvPage, setTvPage] = useState(1);
  const tvPerPage = 4;
  const tvTotalPages = Math.ceil(tvInWatchlist.length / tvPerPage);

  const tvStartIndex = (tvPage - 1) * tvPerPage;
  const tvEndIndex = tvStartIndex + tvPerPage;
  const currentTv = tvInWatchlist.slice(tvStartIndex, tvEndIndex);
  //remove all
  function clearWatchList() {
    setWatchlist([]);
  }

  if (watchlist.length === 0) {
    return (
      <div className="container text-center mt-5 text">
        <div className="img my-3 mx-auto">
          <img src={noMovie} alt="image" className="w-100" />
        </div>
        <p className="fs-5">No Movies or TV Shows in watch list</p>
        <Link className="btn bg-new border-0 w-25 mt-3" to="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container text">
      <div className="top d-flex justify-content-center mt-4">
        <button className="btn border-0" onClick={clearWatchList}>
          <span className="fs-6 fw-bolder text">Clear WatchList</span>
          <i className="fa-regular fa-trash-can color mx-2"></i>
        </button>
      </div>
      {/* Movies Section */}
      {moviesInWatchlist.length > 0 && (
        <>
          <h2 className="py-3">Movies</h2>

          <div className="row gy-4 gx-3">
            {currentMovies.map((movie) => (
              <div key={movie.id} className="col-12 col-lg-6 d-flex">
                <div className="watchlist-card p-3 rounded-5 shadow border-0 w-100 h-100 d-flex flex-column flex-lg-row">
                  <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-3 w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div className="body px-3 col-12 col-lg-8 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex flex-column">
                        <p className="card-title fw-bold fs-4 mb-1">
                          {movie.title}
                        </p>
                        <p className="text-muted mb-0">{movie.release_date}</p>
                      </div>
                      <button
                        className="icon-btn px-3"
                        onClick={() => toggleWatchlist(movie)}
                      >
                        <i className="fa-solid fa-heart fs-4 mt-3 color"></i>
                      </button>
                    </div>
                    <div className="rate d-flex align-items-center mb-2">
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-regular fa-star fs-6"></i>
                      <p className="card-text fs-6 mx-2 mb-0">
                        {movie.popularity}
                      </p>
                    </div>
                    <p className="card-text fs-6 mt-auto">{movie.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for Movies */}
          {movieTotalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination mb-0">
                <li
                  className={`page-item ${moviePage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link border-0 text-dark"
                    onClick={() => setMoviePage(moviePage - 1)}
                  >
                    &lt;
                  </button>
                </li>

                {Array.from({ length: movieTotalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      moviePage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link border-0"
                      style={{
                        backgroundColor:
                          moviePage === i + 1 ? "#F8B55F" : "transparent",
                        color: "black",
                      }}
                      onClick={() => setMoviePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    moviePage === movieTotalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link border-0 text-dark"
                    onClick={() => setMoviePage(moviePage + 1)}
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {/* TV Shows Section */}
      {tvInWatchlist.length > 0 && (
        <>
          <h2 className="py-3 mt-5">TV Shows</h2>
          <div className="row gy-4 gx-3">
            {currentTv.map((show) => (
              <div key={show.id} className="col-12 col-lg-6 d-flex">
                <div className="watchlist-card p-3 rounded-5 shadow border-0 w-100 h-100 d-flex flex-column flex-lg-row">
                  <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                      className="rounded-3 w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div className="body px-3 col-12 col-lg-8 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex flex-column">
                        <p className="card-title fw-bold fs-4 mb-1">
                          {show.name}
                        </p>
                        <p className="text-muted mb-0">{show.first_air_date}</p>
                      </div>
                      <button
                        className="icon-btn px-3"
                        onClick={() => toggleWatchlist(show)}
                      >
                        <i className="fa-solid fa-heart fs-4 mt-3 color"></i>
                      </button>
                    </div>
                    <div className="rate d-flex align-items-center mb-2">
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-regular fa-star fs-6"></i>
                      <p className="card-text fs-6 mx-2 mb-0">
                        {show.popularity}
                      </p>
                    </div>
                    <p className="card-text fs-6 mt-auto">{show.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for TV Shows */}
          {tvTotalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination mb-0">
                <li className={`page-item ${tvPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link border-0 text-dark"
                    onClick={() => setTvPage(tvPage - 1)}
                  >
                    &lt;
                  </button>
                </li>

                {Array.from({ length: tvTotalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${tvPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link border-0"
                      style={{
                        backgroundColor:
                          tvPage === i + 1 ? "#F8B55F" : "transparent",
                        color: "black",
                      }}
                      onClick={() => setTvPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    tvPage === tvTotalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link border-0 text-dark"
                    onClick={() => setTvPage(tvPage + 1)}
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
