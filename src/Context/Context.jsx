import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Watchlist
  const [watchlist, setWatchlist] = useState(() => {
    // Load from localStorage initially
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Search
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Toggle add/remove from watchlist
  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.find((mov) => mov.id === movie.id);
      let updated;
      if (exists) {
        updated = prev.filter((mov) => mov.id !== movie.id);
      } else {
        updated = [...prev, movie];
      }
      // Save updated watchlist to localStorage
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  // Count of items in watchlist
  const count = watchlist.length;

  // Search movies
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

  return (
    <MovieContext.Provider
      value={{
        page,
        totalPages,
        searchMovies,
        watchlist,
        setWatchlist,
        toggleWatchlist,
        count,
        searchResults,
        search,
        setSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
