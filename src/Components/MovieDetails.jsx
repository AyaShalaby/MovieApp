import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieContext } from "./Context";
import { Button, Image } from "react-bootstrap";

export default function MovieDetails() {
  const { id } = useParams();
  const {
    recommendations,
    selectedMovie,
    loading,
    toggleWatchlist,
    watchlist,
    fetchMovieDetails,
    fetchRecommendations,
  } = useContext(MovieContext);

  useEffect(() => {
    fetchMovieDetails(id);
    fetchRecommendations(id);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <h2 className="text-center my-5">Loading...</h2>;
  if (!selectedMovie) return <h2 className="text-center">Movie not found</h2>;

  //We use some as it rturn bool value
  const isInWatchlist = watchlist.some((m) => m.id === selectedMovie.id);

  return (
    <div className="container-fluid my-4" style={{ maxWidth: "1400px" }}>
      <div className="row g-4 align-items-stretch h-100">
        {/* Poster */}
        <div className="col-12 col-md-6  col-lg-3 d-flex justify-content-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="img-fluid rounded-3 shadow"
            style={{
              maxHeight: "420px",
              objectFit: "cover",
              width: "100%",
              maxWidth: "300px",
            }}
          />
        </div>

        {/* Details */}
        <div className="col-12 col-md-6 col-lg-9">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="fw-bold">{selectedMovie.title}</h2>
              <p className="text-muted small mb-2">
                {selectedMovie.release_date}
              </p>
              <div className="mb-2">
                <i className="fa-solid fa-star text-warning"></i>{" "}
                <span className="fw-semibold">
                  {selectedMovie.vote_average?.toFixed(1)}
                </span>
                <span className="text-muted ms-2 small">
                  ({selectedMovie.vote_count} votes)
                </span>
              </div>
            </div>
            {/* Add to watchlist */}
            <button
              className="btn border-0"
              onClick={() => toggleWatchlist(selectedMovie)}
            >
              <i
                className={
                  isInWatchlist
                    ? "fa-solid fa-heart fa-2x"
                    : "fa-regular fa-heart fa-2x"
                }
                style={{ color: isInWatchlist ? "#FFE353" : "black" }}
              ></i>
            </button>
          </div>

          {/* overview */}
          <p className="mt-3">{selectedMovie.overview}</p>

          {/* genres */}
          <div className="mb-3">
            {selectedMovie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="badge text-dark me-2 px-3 py-2 rounded-pill"
                style={{ backgroundColor: "#FFE353" }}
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* info */}
          <p className="mb-1">
            <strong>Duration:</strong> {selectedMovie.runtime} min
          </p>
          <p className="mb-1">
            <strong>Languages:</strong>{" "}
            {selectedMovie.spoken_languages
              ?.map((lang) => lang.english_name)
              .join(", ")}
          </p>
          <p className="mb-2">
            <strong>Production:</strong>{" "}
            {selectedMovie.production_companies?.map((c) => c.name).join(", ")}
          </p>

          {/* Company logo + Website button */}
          <div className="company mt-5 d-flex flex-column align-items-start gap-2">
            <Image
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.production_companies?.[0]?.logo_path}`}
              alt="Company Logo"
              fluid
              style={{ maxWidth: "120px" }}
            />

            {/* website button snd logo*/}
            <Button
              href={`https://www.themoviedb.org/company/${selectedMovie.production_companies?.[0]?.id}`}
              target="_blank"
              className="mt-2"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #FFE353",
                color: "#000",
                borderRadius: "100px",
                padding: "6px 12px",
                display: "block",
                width: "fit-content",
              }}
            >
              Website <i className="fas fa-globe ms-1"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-5">
        <h4 className="fw-bold mb-4">Recommendations</h4>
        <div className="row g-3">
          {recommendations.slice(0, 6).map((rec) => (
            <div key={rec.id} className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 h-100">
                <Link
                  to={`/details/${rec.id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                    alt={rec.title}
                    className="card-img-top rounded-3 shadow-sm"
                    style={{ height: "230px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body d-flex align-items-center justify-content-between p-2">
                  <div>
                    <p className="card-title fw-bold small mb-1 text-dark">
                      {rec.title}
                    </p>
                    <p className="text-muted small">{rec.release_date}</p>
                  </div>
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(rec);
                    }}
                  >
                    <i
                      className={`fs-5 fa-heart icon ${
                        watchlist.some((item) => item.id === rec.id)
                          ? "fa-solid text-warning"
                          : "fa-regular"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
