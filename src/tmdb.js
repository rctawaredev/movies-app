const API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const buildSearchParams = (params = {}) => {
  const searchParams = new URLSearchParams();

  if (TMDB_API_KEY) {
    searchParams.set("api_key", TMDB_API_KEY);
  }

  // default language for most endpoints
  if (!("language" in params)) {
    searchParams.set("language", "en-US");
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};

const tmdbFetch = async (path, params = {}) => {
  if (!TMDB_API_KEY) {
    console.warn(
      "[TMDB] Missing VITE_TMDB_API_KEY. Requests to TMDB will fail until this is set."
    );
  }

  const query = buildSearchParams(params);
  const url = `${API_BASE_URL}${path}?${query}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    const message = data?.status_message || "TMDB request failed";
    throw new Error(message);
  }

  return data;
};

export const buildImageUrl = (path, size = "w500") => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// ---- List & discovery helpers ----

export const fetchPopular = (page = 1) => {
  return tmdbFetch("/movie/popular", { page });
};

export const fetchTopRated = (page = 1) => {
  return tmdbFetch("/movie/top_rated", { page });
};

export const fetchUpcoming = (page = 1) => {
  return tmdbFetch("/movie/upcoming", { page });
};

export const fetchTrending = (page = 1) => {
  return tmdbFetch("/trending/movie/week", { page });
};

// Custom Bollywood-style discovery similar to existing logic
export const fetchTrendingBollywood = (page = 1) => {
  const today = new Date();
  const fortyYearsAgo = new Date();
  fortyYearsAgo.setFullYear(today.getFullYear() - 40);

  const fromDate = fortyYearsAgo.toISOString().split("T")[0];
  const toDate = today.toISOString().split("T")[0];

  return tmdbFetch("/discover/movie", {
    with_original_language: "hi",
    "primary_release_date.gte": fromDate,
    "primary_release_date.lte": toDate,
    sort_by: "popularity.desc",
    "vote_count.gte": 100,
    watch_region: "IN",
    with_watch_monetization_types: "flatrate",
    with_watch_providers: "8|9|232", // Netflix | Prime | Zee5
    page,
  });
};

// Netflix Originals style (by network)
export const fetchOriginals = (page = 1) => {
  return tmdbFetch("/discover/tv", {
    with_networks: 213, // Netflix
    sort_by: "popularity.desc",
    page,
  });
};

// ---- Search ----

export const searchMovies = (query, page = 1) => {
  if (!query) {
    return Promise.resolve({
      page: 1,
      total_pages: 0,
      total_results: 0,
      results: [],
    });
  }

  return tmdbFetch("/search/movie", {
    query,
    page,
    include_adult: "false",
  });
};

// ---- Details / credits / providers ----

export const fetchMovieDetails = (id) => {
  return tmdbFetch(`/movie/${id}`);
};

export const fetchMovieCredits = (id) => {
  return tmdbFetch(`/movie/${id}/credits`);
};

export const fetchMovieSimilar = (id, page = 1) => {
  return tmdbFetch(`/movie/${id}/similar`, { page });
};

export const fetchMovieWatchProviders = (id) => {
  // language is not relevant here; use default region-based payload
  return tmdbFetch(`/movie/${id}/watch/providers`, { language: undefined });
};

// ---- People / cast helpers ----

export const fetchPersonDetails = (id) => {
  return tmdbFetch(`/person/${id}`);
};

export const fetchPersonMovieCredits = (id) => {
  return tmdbFetch(`/person/${id}/movie_credits`);
};

// ---- Hero / banner helper ----

export const fetchNowPlaying = (page = 1) => {
  return tmdbFetch("/movie/now_playing", { page });
};

