import  { useContext } from "react";
import { MovieContext } from "./Context";
import { Link ,useNavigate} from "react-router-dom";


export default function Home() {
  const {
    movies,
    loading,
    page,
    fetchMovies,
    watchlist,
    toggleWatchlist,
    searchMovies,
    search,
    setSearch,
  } = useContext(MovieContext);

  if (loading) return <h2 className="text-center my-4">Loading...</h2>;

  return (
    <div className="container my-4">
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
              onFocus={() => navigate("/search")}
            />
          </div>
          <div className="col-12 col-md-2 d-grid">
            <Link
              onClick={() => {
                if (search.trim()) {
                  searchMovies(search);
                }
              }}
              className="btn border-0 mx-4 px-4 py-2 rounded-3"
              style={{ backgroundColor: "#FFE353" }}
              to="search"
            >
              Search
            </Link>
          </div>
        </div>
      </div>

      {/* Now Playing */}
      <h2 className="fw-bold my-5">Now Playing</h2>
      <div className="row g-4">
        {movies.map((movie) => (
          <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <div className="card h-100 border-0">
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
        onClick={() => page > 1 && fetchMovies(page - 1)}
      >
        &lt;
      </button>
    </li>

    {/* Dynamic Page Numbers */}
    {Array.from({ length: 5 }, (_, i) => {
      const startPage = Math.max(1, page - 2);
      const currentPage = startPage + i;
      return (
        <li key={currentPage} className="page-item">
          <button
            className="page-link border-0"
            style={{
              backgroundColor: page === currentPage ? "#FFE353" : "transparent",
              color: "black",
            }}
            onClick={() => fetchMovies(currentPage)}
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
    <li className="page-item">
      <button
        className="page-link border-0 text-dark"
        onClick={() => fetchMovies(page + 1)}
      >
        &gt;
      </button>
    </li>
  </ul>
</nav>
    </div>
  );
}
