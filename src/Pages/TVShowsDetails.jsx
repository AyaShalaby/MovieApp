import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieContext } from "../Context/Context";

export default function TVShowDetails() {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const [selectedTVShow, setSelectedTVShow] = useState(null);
  const [tvRecommendations, setTvRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { toggleWatchlist, watchlist } = useContext(MovieContext);
  // TV Shows Details
  const fetchTVShowDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();
      setSelectedTVShow(data);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    } finally {
      setLoading(false);
    }
  };

  //
  // fetch TV Show recommendations
  const fetchTVRecommendations = async (tvId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();
      setTvRecommendations(data.results || []);
    } catch (error) {
      console.error("Error fetching TV show recommendations:", error);
    }
  };

  useEffect(() => {
    if (!selectedTVShow || selectedTVShow.id.toString() !== id) {
      fetchTVShowDetails(id);
    }
    if (id) {
      fetchTVRecommendations(id);
    }
  }, [id, fetchTVShowDetails, fetchTVRecommendations, selectedTVShow]);

  if (loading || !selectedTVShow) {
    return <h2 className="text-center my-4">Loading...</h2>;
  }

  return (
    <div className="container movie-details-page my-5 text">
      <div className="row">
        <div className="col-12 col-md-4 text-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedTVShow.poster_path}`}
            alt={selectedTVShow.name}
            className="img-fluid rounded shadow h-75"
            style={{ maxHeight: "600px" }}
          />
        </div>
        <div className="col-12 col-md-8">
          <div className="d-flex justify-content-between align-items-center max-h-75">
            <h2>{selectedTVShow.name}</h2>
            <div
              onClick={() => toggleWatchlist(selectedTVShow)}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`fs-3 fa-heart icon ${
                  watchlist.some((m) => m.id === selectedTVShow.id)
                    ? "fa-solid color fs-2"
                    : "fa-regular text"
                }`}
              />
            </div>
          </div>
          <p className="text-muted">{selectedTVShow.first_air_date}</p>
          <div className="d-flex align-items-center mb-3">
            <i className="fa-solid fa-star fs-6 mx-1 color-links"></i>
            <span className="h5 mb-0">
              {selectedTVShow.vote_average
                ? selectedTVShow.vote_average.toFixed(1)
                : "N/A"}
            </span>
            <span className="text-muted ms-2 small">
              ({selectedTVShow.vote_count} votes)
            </span>
          </div>
          <p>{selectedTVShow.overview}</p>
          <div className="mb-3">
            {selectedTVShow.genres &&
              selectedTVShow.genres.map((genre) => (
                <span key={genre.id} className="badge bg-new me-2 text">
                  {genre.name}
                </span>
              ))}
          </div>
          <p>
            <strong>Seasons:</strong> {selectedTVShow.number_of_seasons}
          </p>
          <p>
            <strong>Language:</strong> {selectedTVShow.original_language}{" "}
          </p>
          <p className="mb-2">
            <strong>Production:</strong>{" "}
            {selectedTVShow.production_companies?.map((c) => c.name).join(", ")}
          </p>
          <div className="mt-3">
            <img
              src={`https://image.tmdb.org/t/p/w200${selectedTVShow.backdrop_path}`}
              alt={selectedTVShow.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "150px" }}
            />
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <h3>Recommendations</h3>
      {tvRecommendations.length > 0 ? (
        <div className="row g-4">
          {tvRecommendations.slice(0, 8).map((rec) => (
            <div key={rec.id} className="col-6 col-md-3 col-lg-2 mb-4">
              <div className="card h-100 border-0 text">
                <Link to={`/tv-details/${rec.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                    alt={rec.name}
                    className="card-img-top rounded-3"
                  />
                </Link>
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="details">
                    <p className="card-title fw-bold">{rec.name}</p>
                    <p className="card-text">{rec.first_air_date}</p>
                  </div>
                  <button
                    className="icon-btn"
                    onClick={() => toggleWatchlist(rec)}
                  >
                    <i
                      className={`fs-5 fa-heart icon ${
                        watchlist.some((item) => item.id === rec.id)
                          ? "fa-solid color"
                          : "fa-regular text"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center">
          No recommendations found.
        </div>
      )}
    </div>
  );
}
