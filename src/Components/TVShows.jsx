import { useContext, useEffect } from "react";
import { MovieContext } from "./Context";
import { Link } from "react-router-dom";

const TVShows = () => {
  const {
    tvShows,
    loading,
    fetchTvShows,
    watchlist,
    toggleWatchlist,
    tvPage,
    tvTotalPages,
  } = useContext(MovieContext);

  useEffect(() => {
    fetchTvShows(tvPage);
  }, [fetchTvShows, tvPage]);

  if (loading || tvShows.length === 0) {
    return <h2 className="text-center my-4">Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Popular TV Shows</h2>
      <div className="row g-4">
        {tvShows.map((show) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={show.id}>
            <div className="card h-100 border-0">
              <Link to={`/tv-details/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="card-img-top rounded-3"
                />
              </Link>
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="details">
                  <p className="card-title fw-bold">{show.name}</p>
                  <p className="card-text">{show.first_air_date}</p>
                </div>
                <button
                  className="icon-btn"
                  onClick={() => toggleWatchlist(show)}
                >
                  <i
                    className={`fs-5 fa-heart icon ${
                      watchlist.some((s) => s.id === show.id)
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

      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination mb-0">
          {/* Previous */}
          <li className={`page-item ${tvPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link border-0 text-dark"
              onClick={() => tvPage > 1 && fetchTvShows(tvPage - 1)}
            >
              &lt;
            </button>
          </li>

          {/* Dynamic Page Numbers */}
          {Array.from({ length: Math.min(5, tvTotalPages) }, (_, i) => {
            const startPage = Math.max(1, tvPage - 2);
            const currentPage = startPage + i;

            if (currentPage > tvTotalPages) return null;

            return (
              <li
                key={currentPage}
                className={`page-item ${
                  tvPage === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link border-0"
                  style={{
                    backgroundColor:
                      tvPage === currentPage ? "#FFE353" : "transparent",
                    color: "black",
                  }}
                  onClick={() => fetchTvShows(currentPage)}
                >
                  {currentPage}
                </button>
              </li>
            );
          })}
          {/* Dots */}
          <li className="page-item disabled">
            <span className="page-link border-0 text-dark">....</span>
          </li>

          {/* Next */}
          <li
            className={`page-item ${tvPage === tvTotalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link border-0 text-dark"
              onClick={() => tvPage < tvTotalPages && fetchTvShows(tvPage + 1)}
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TVShows;
