import { useContext } from "react";
import { MovieContext } from "./Context";
import { Link, useNavigate } from "react-router-dom";
import notFound from "../assets/sad.png";

export default function Search() {
  const {
    searchResults,
    watchlist,
    toggleWatchlist,
    search,
    searchMovies,
    page,
    totalPages,
    setSearch,
  } = useContext(MovieContext);
  const found = searchResults.length;
  const handleSearch = () => {
    searchMovies(search);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={search}
            onFocus={() => navigate("/search")}
            onChange={(e) => {
              setSearch(e.target.value);
              searchMovies(e.target.value, 1);
            }}
          />
          <button
            className="btn border-0 mx-4 px-4 py-2 rounded-3"
            style={{ backgroundColor: "#FFE353" }}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {!found ? (
          <div className="mx-auto w-100 container mt-5">
            <h3 className="text-center text-danger py-2"> No results found</h3>
            <div className="notFound w-50 mx-auto">
              <img src={notFound} alt="Not Found" className="w-100" />
            </div>
            <Link
              className="btn btn-style border-0 mx-auto d-block w-25 my-3"
              to="/"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <>
            <div className=" text-center text-success py-2">
              <h3>
                Search Results{" "}
                {search && <span className="text-dark">for: "{search}"</span>}
              </h3>
            </div>
            <div className="search_page container">
              <div className="row g-4">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
                  >
                    <div className="card h-100 border-0">
                      <Link to={`/details/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="card-img-top rounded-3 w-100"
                        />
                      </Link>
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="details">
                          <p className="card-title fw-bold">{movie.title}</p>
                          <p className="card-text">{movie.release_date}</p>
                        </div>
                        <button
                          className="icon-btn"
                          onClick={() => toggleWatchlist(movie)}
                        >
                          <i
                            className={`fs-5 fa-heart icon ${
                              watchlist.some((m) => m.id === movie.id)
                                ? "fa-solid text-warning fs-4"
                                : "fa-regular"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagenation */}
              <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination mb-0">
                  {/* Previous */}
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link border-0 text-dark"
                      onClick={() => page > 1 && searchMovies(search, page - 1)}
                    >
                      &lt;
                    </button>
                  </li>

                  {/* Dynamic Page Numbers */}
                  {Array.from({ length: 5 }, (_, i) => {
                    let startPage = Math.max(1, page - 2);
                    let endPage = Math.min(totalPages, startPage + 4);
                    startPage = Math.max(1, endPage - 4);

                    const currentPage = startPage + i;
                    if (currentPage > totalPages) return null;

                    return (
                      <li key={currentPage} className="page-item">
                        <button
                          className="page-link border-0"
                          style={{
                            backgroundColor:
                              page === currentPage ? "#FFE353" : "transparent",
                            color: "black",
                          }}
                          onClick={() => searchMovies(search, currentPage)}
                        >
                          {currentPage}
                        </button>
                      </li>
                    );
                  })}

                  {/* Dots */}
                  {page + 2 < totalPages && (
                    <li className="page-item disabled">
                      <span className="page-link border-0 text-dark">....</span>
                    </li>
                  )}

                  {/* Next */}
                  <li
                    className={`page-item ${
                      page === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link border-0 text-dark"
                      onClick={() =>
                        page < totalPages && searchMovies(search, page + 1)
                      }
                    >
                      &gt;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
}
