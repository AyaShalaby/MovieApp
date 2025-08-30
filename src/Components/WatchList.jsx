import  { useContext } from "react";
import { MovieContext } from "./Context";
import { Link } from "react-router-dom";
import noMovie from "../assets/noMovies.png";

export default function WatchList() {
  const { watchlist, toggleWatchlist } = useContext(MovieContext);

  // Separate movies and TV shows
  const moviesInWatchlist = watchlist.filter((item) => item.title);
  const tvInWatchlist = watchlist.filter((item) => item.name);

  if (watchlist.length === 0) {
    return (
      <div className="container text-center mt-5">
        <div className="img my-3 mx-auto">
          <img src={noMovie} alt="image" className="w-100" />
        </div>
        <p className="fs-5">No Movies or TV Shows in watch list</p>
        <Link className="btn btn-style border-0 w-25 mt-3" to="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Movies Section */}
      {moviesInWatchlist.length > 0 && (
        <>
          <h2 className="py-3">Movies</h2>
          <div className="row gy-4 gx-3">
            {moviesInWatchlist.map((movie) => (
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
                    {/* Title and Heart Button */}          
                     <div className="d-flex justify-content-between align-items-start mb-3">                    
  <div className="d-flex flex-column">
    <p className="card-title fw-bold fs-4 mb-1">{movie.title}</p>
    <p className="text-muted mb-0">{movie.release_date}</p>
  </div>
  <button
    className="icon-btn px-3"
    onClick={() => toggleWatchlist(movie)}
  >
    <i className="fa-solid fa-heart fs-4 mt-3 text-warning"></i>
  </button>
</div>
                    {/* Rating */}
                    <div className="rate d-flex align-items-center mb-2">
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-regular fa-star fs-6"></i>
                      <p className="card-text fs-6 mx-2 mb-0">{movie.popularity}</p>
                    </div>

                    {/* Overview */}
                    <p className="card-text fs-6 mt-auto">{movie.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TV Shows Section */}
      {tvInWatchlist.length > 0 && (
        <>
          <h2 className="py-3 mt-5">TV Shows</h2>
          <div className="row gy-4 gx-3">
            {tvInWatchlist.map((show) => (
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
    <p className="card-title fw-bold fs-4 mb-1">{show.name}</p>
    <p className="text-muted mb-0">{show.first_air_date}</p>
  </div>
  <button
    className="icon-btn px-3"
    onClick={() => toggleWatchlist(show)}
  >
    <i className="fa-solid fa-heart fs-4 mt-3 text-warning"></i>
  </button>
</div>

                    {/* Rating */}
                    <div className="rate d-flex align-items-center mb-2">
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-solid fa-star fs-6"></i>
                      <i className="fa-regular fa-star fs-6"></i>
                      <p className="card-text fs-6 mx-2 mb-0">{show.popularity}</p>
                    </div>

                    {/* Overview */}
                    <p className="card-text fs-6 mt-auto">{show.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
