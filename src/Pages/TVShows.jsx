import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../Context/Context";
import { Link, useSearchParams } from "react-router-dom";

const TVShows = () => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const [loading, setLoading] = useState(true);
  const [tvShows, setTvShows] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page")) || 1;
  const [tvTotalPages, setTvTotalPages] = useState(1);

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  // TV Shows
  const fetchTvShows = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`
      );
      const data = await res.json();
      setTvShows(data.results.slice(0, 12) || []);
      goToPage(pageNumber);

      setTvTotalPages(Math.min(data.total_pages, 500));
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  const { watchlist, toggleWatchlist } = useContext(MovieContext);

  useEffect(() => {
    fetchTvShows(pageNumber);
  }, [pageNumber]);

  if (loading || tvShows.length === 0) {
    return <h2 className="text-center my-4">Loading...</h2>;
  }

  return (
    <div className="container mt-4 text">
      <h2 className="mb-4">Popular TV Shows</h2>
      <div className="row g-4">
        {tvShows.map((show) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={show.id}>
            <div className="card h-100 border-0 text">
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
                        ? "fa-solid color fs-5"
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
          <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
            <button
              className="page-link border-0 text-dark"
              onClick={() => pageNumber > 1 && goToPage(pageNumber - 1)}
            >
              &lt;
            </button>
          </li>

          {/* Always show page 1 */}
          <li className={`page-item ${pageNumber === 1 ? "active" : ""}`}>
            <button
              className="page-link border-0"
              style={{
                backgroundColor: pageNumber === 1 ? "#F8B55F" : "transparent",
                color: "black",
              }}
              onClick={() => goToPage(1)}
            >
              First
            </button>
          </li>

          {/* Dynamic Page Numbers (around current) */}
          {Array.from({ length: 3 }, (_, i) => {
            const currentPage = pageNumber - 1 + i;
            if (currentPage <= 1 || currentPage >= tvTotalPages) return null;

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
                      pageNumber === currentPage ? "#F8B55F" : "transparent",
                    color: "black",
                  }}
                  onClick={() => goToPage(currentPage)}
                >
                  {currentPage}
                </button>
              </li>
            );
          })}

          {/* Dots + Last */}
          {pageNumber + 1 < tvTotalPages && (
            <>
              <li className="page-item disabled">
                <span className="page-link border-0 text-dark">....</span>
              </li>
              <li
                className={`page-item ${
                  pageNumber === tvTotalPages ? "active" : ""
                }`}
              >
                <button
                  className="page-link border-0"
                  style={{
                    backgroundColor:
                      pageNumber === tvTotalPages ? "#F8B55F" : "transparent",
                    color: "black",
                  }}
                  onClick={() => goToPage(tvTotalPages)}
                >
                  Last
                </button>
              </li>
            </>
          )}

          {/* Next */}
          <li
            className={`page-item ${
              pageNumber === tvTotalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link border-0 text-dark"
              onClick={() =>
                pageNumber < tvTotalPages && goToPage(pageNumber + 1)
              }
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
