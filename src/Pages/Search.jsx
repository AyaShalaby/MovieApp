import { useContext, useEffect } from "react";
import { MovieContext } from "../Context/Context";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import notFound from "../assets/sad.png";

export default function Search() {
  const {
    searchResults,
    watchlist,
    toggleWatchlist,
    search,
    setSearch,
    searchMovies,
    totalPages,
    loading,
  } = useContext(MovieContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  const found = searchResults.length;

  const handleSearch = () => {
    if (search.trim()) {
      setSearchParams({ query: search, page: 1 });
    }
  };

  const goToPage = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  useEffect(() => {
    if (query) {
      searchMovies(query, pageNumber);
      setSearch(query);
    }
  }, [query, pageNumber]);

  if (loading) return <h2 className="text-center my-4">Loading...</h2>;

  return (
    <div className="container mt-4">
      {/* Input */}
      <div className="input-group  mt-5 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie..."
          value={search}
          onFocus={() => navigate("/search")}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button
          className={
            search.trim()
              ? "btn border-0 mx-4 px-4 py-2 rounded-3 color-links"
              : "btn border-0 mx-4 px-4 py-2 rounded-3 disabled color-links"
          }
          style={{ backgroundColor: "#7C4585" }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* No Results */}
      {!found ? (
        <div className="mx-auto w-100 container mt-5">
          <h3 className="text-center color py-2">No results found</h3>
          <div className="notFound w-50 mx-auto">
            <img src={notFound} alt="Not Found" className="w-100" />
          </div>
          <Link
            className="btn bg-new border-0 mx-auto d-block w-25 my-3"
            to="/"
          >
            Back to home
          </Link>
        </div>
      ) : (
        <>
          {/* Results */}
          <div className="text-center text py-3">
            <h5>
              Search Results for :   <span className="color">  {search}</span>
            </h5>
          </div>

          <div className="search_page container">
            <div className="row g-4">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
                >
                  <div className="card h-100 border-0 text">
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
                          className={`fs-5 fa-heart icon ms-2 ${
                            watchlist.some((m) => m.id === movie.id)
                              ? "fa-solid color fs-4"
                              : "fa-regular text"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination mb-0">
                {/* Previous */}
                <li
                  className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link border-0 text-dark"
                    onClick={() => pageNumber > 1 && goToPage(pageNumber - 1)}
                  >
                    &lt;
                  </button>
                </li>

                {/* Always  page 1 */}
                <li className={`page-item ${pageNumber === 1 ? "active" : ""}`}>
                  <button
                    className="page-link border-0"
                    style={{
                      backgroundColor:
                        pageNumber === 1 ? "#F8B55F" : "transparent",
                      color: "black",
                    }}
                    onClick={() => goToPage(1)}
                  >
                    First
                  </button>
                </li>

                {/* Middle pages */}
                {Array.from({ length: 3 }, (_, i) => {
                  const currentPage = pageNumber - 1 + i;
                  if (
                    currentPage <= 1 ||
                    currentPage >= Math.min(totalPages, 500)
                  )
                    return null;
                  return (
                    <li
                      key={currentPage}
                      className={`page-item ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link border-0"
                        style={{
                          backgroundColor:
                            pageNumber === currentPage
                              ? "#F8B55F"
                              : "transparent",
                          color: "black",
                        }}
                        onClick={() => goToPage(currentPage)}
                      >
                        {currentPage}
                      </button>
                    </li>
                  );
                })}

                {/* Dots + Last page */}
                {pageNumber + 1 < Math.min(totalPages, 500) && (
                  <>
                    <li className="page-item disabled">
                      <span className="page-link border-0 text-dark">....</span>
                    </li>
                    <li
                      className={`page-item ${
                        pageNumber === Math.min(totalPages, 500) ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link border-0"
                        style={{
                          backgroundColor:
                            pageNumber === Math.min(totalPages, 500)
                              ? "#F8B55F"
                              : "transparent",
                          color: "black",
                        }}
                        onClick={() => goToPage(Math.min(totalPages, 500))}
                      >
                        Last
                      </button>
                    </li>
                  </>
                )}

                {/* Next */}
                <li
                  className={`page-item ${
                    pageNumber === Math.min(totalPages, 500) ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link border-0 text-dark"
                    onClick={() =>
                      pageNumber < Math.min(totalPages, 500) &&
                      goToPage(pageNumber + 1)
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
  );
}
