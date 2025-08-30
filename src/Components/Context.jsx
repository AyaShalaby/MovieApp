import { createContext, useState, useEffect, useCallback } from "react";
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const apiKey = "6a43242685085b9cdb0367f8e71421d0";
  const [movies, setMovies] = useState([]); //now playing
  const [page, setPage] = useState(1); //pagination
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); //details
  //watchlist: which added to fav movies
  const [watchlist, setWatchlist] = useState([]);
  //recommendations
  const [recommendations, setRecommendations] = useState([]);
  //search results
  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  //tv show
  const [tvShows, setTvShows] = useState([]);
  const [selectedTVShow, setSelectedTVShow] = useState(null);
  const [tvRecommendations, setTvRecommendations] = useState([]);
  // tv shows pagination
  const [tvPage, setTvPage] = useState(1);
  const [tvTotalPages, setTvTotalPages] = useState(1);

  // Now Playing with Pagination
  const fetchMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`
      );
      const data = await res.json();

      setMovies(data.results.slice(0, 12) || []); // only 12 movies
      setPage(pageNumber);
      setTotalPages(data.total_pages);
      console.log(data.results.slice(0, 12));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // toggle add/remove from watchlist
  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.find((mov) => mov.id === movie.id);
      if (exists) {
        return prev.filter((mov) => mov.id !== movie.id); // remove
      } else {
        return [...prev, movie]; // add
      }
    });
  };
  //update  count
  let count = watchlist.length;

  // Search
  const searchMovies = async (query, pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${pageNumber}`
      );
      const data = await res.json();
      setSearchResults(data.results.slice(0, 12) || []);
      setPage(pageNumber);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Movie Details
  const fetchMovieDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  //Function to fetch recommendations for each film
  const fetchRecommendations = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`
      );
      const data = await res.json();
      setRecommendations(data.results || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };
  // TV Shows
  const fetchTvShows = useCallback(
    async (pageNumber = 1) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`
        );
        const data = await res.json();
        setTvShows(data.results.slice(0, 12) || []);
        setTvPage(pageNumber);
        setTvTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  // TV Shows Details
  const fetchTVShowDetails = useCallback(
    async (id) => {
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
    },
    [apiKey]
  ); //
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
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        page,
        totalPages,
        fetchMovies,
        searchMovies,
        fetchMovieDetails,
        selectedMovie,
        watchlist,
        toggleWatchlist,
        count,
        recommendations,
        fetchRecommendations,
        searchResults,
        search,
        setSearch,
        tvShows,
        fetchTvShows,
        selectedTVShow,
        fetchTVShowDetails,
        tvRecommendations,
        fetchTVRecommendations,
        tvPage,
        tvTotalPages,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
