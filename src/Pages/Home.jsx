import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../Context/Context";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate("/");
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const fetchMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 12));
      goToPage(pageNumber);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(pageNumber);
  }, [pageNumber]);

  const { watchlist, toggleWatchlist, searchMovies, search, setSearch } =
    useContext(MovieContext);

  if (loading) return <h2 className="text-center my-4">Loading...</h2>;

  return (
    <div className="container my-4 text">
      {/* Welcome Box */}
      <div className="welcome mx-auto p-5 text-center text-md-start bg-light rounded-2">
        <h1 className="py-1">Welcome to our movie app</h1>
        <p className="py-1">
          Millions of movies, Tv shows and people to discover. Explore now.
        </p>

        {/* Search Section */}
        <div className="search row mx-1">
          <div className="col-12 col-md-9 mb-2 mb-md-0">
            <input
              type="search"
              className="form-control border-0 py-2 shadow-sm"
              id="search"
              placeholder="Search and explore...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (search.trim()) {
                    searchMovies(search);

                    navigate(`/search?query=${search}&page=1`);
                  }
                }
              }}
            />
          </div>
          <div className="col-12 col-md-2 d-grid">
            <button
              onClick={() => {
                if (search.trim()) {
                  searchMovies(search);

                  navigate(`/search?query=${search}&page=1`);
                }
              }}
              className={
                search.trim()
                  ? "btn border-0 mx-4 px-4 py-2 rounded-3 color-links"
                  : "btn border-0 mx-4 px-4 py-2 rounded-3 disabled color-links"
              }
              style={{ backgroundColor: "#7C4585" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Now Playing */}
      <h2 className="fw-bold my-5">Now Playing</h2>
      <div className="row g-4">
        {movies.map((movie) => (
          <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <div className="card h-100 border-0 text">
              <Link to={`/details/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top rounded-3 shadow-sm"
                />
              </Link>
              <div className="card-body d-flex align-items-center justify-content-between p-2">
                <div className="details">
                  <p className="card-title fw-bold mb-1">{movie.title}</p>
                  <p className="card-text text-muted small mb-0">
                    {movie.release_date}
                  </p>
                </div>
                <button
                  className="icon-btn border-0 bg-transparent align-items-center"
                  onClick={() => toggleWatchlist(movie)}
                >
                  <i
                    className={`fs-5 ms-2 fa-heart icon ${
                      watchlist.some((m) => m.id === movie.id)
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

          {/* Always display first page */}
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

          {/* Dynamic middle pages */}
          {Array.from({ length: 3 }, (_, i) => {
            const currentPage = pageNumber - 1 + i;
            if (currentPage <= 1 || currentPage >= Math.min(totalPages, 500))
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

          {/* Dots + Last page */}
          {pageNumber + 1 < Math.min(totalPages, 500) && (
            <>
              <li className="page-item disabled">
                <span className="page-link border-0 black">....</span>
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
  );
}
