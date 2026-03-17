import { useState } from "react";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const buildImageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Search = () => {

  const [searchText, setSearchText] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSearchMovies = async (query, page) => {
    const params = new URLSearchParams({
      language: "en-US",
      query,
      page: String(page),
      include_adult: "false",
    });

    const url = `https://api.themoviedb.org/3/search/movie?${params.toString()}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.status_message || "Search request failed");
    }
    return data;
  };

  const getSearchResults = async () => {

    if (searchText.trim() === "") return;

    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS);
      const page = 1;
      setCurrentPage(page);
      const data = await fetchSearchMovies(searchText, page);
      setMoviesList(data.results || []);
      setTotalPages(data.total_pages || 0);
      setApiStatus(apiStatusConstants.SUCCESS);

    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-[90vh]">
      <BeatLoader color="#ef4444" />
    </div>
  );

  const renderFailureView = () => (
    <div className="flex flex-col justify-center items-center h-[90vh] text-white">
      <img
        src="https://res.cloudinary.com/distnojxb/image/upload/v1771588535/Background-Complete_yqtj3n.png"
        alt="failure view"
        className="h-50 md:h-60"
      />
      <h1 className="text-white pt-10 text-md md:text-lg">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={getSearchResults}
        className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md mt-5"
      >
        Try Again
      </button>
    </div>
  );

  const renderNoResults = () => (
    <div className="flex flex-col items-center justify-center h-[90vh] text-white">
      <img
        src="https://res.cloudinary.com/distnojxb/image/upload/v1771588828/Group_7394_v64aiu.png"
        alt="no movies"
        className="h-60 md:h-70"
      />
      <p className="text-white text-md md:text-lg">
        Your search for {searchText} did not find any matches.
      </p>
    </div>
  );

  const renderSuccessView = () => {

    if (moviesList.length === 0) {
      return renderNoResults();
    }

    return (
      <>
        <div className="px-6 md:px-[164px] py-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-[90px]">
          {moviesList.map(movie => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <img
                src={buildImageUrl(movie.backdrop_path || movie.poster_path, "w500")}
                alt={movie.title}
                className="rounded-lg object-cover hover:scale-105 transition duration-300"
              />
            </Link>
          ))}
        </div>

      
        <div className="flex justify-center items-center gap-4 pb-10">
          <button
            disabled={currentPage === 1}
            onClick={async () => {
              const newPage = currentPage - 1;
              setCurrentPage(newPage);
              try {
                setApiStatus(apiStatusConstants.IN_PROGRESS);
                const data = await fetchSearchMovies(searchText, newPage);
                setMoviesList(data.results || []);
                setTotalPages(data.total_pages || 0);
                setApiStatus(apiStatusConstants.SUCCESS);
              } catch {
                setApiStatus(apiStatusConstants.FAILURE);
              }
            }}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❮
          </button>

          <p className="text-white text-sm">
            {currentPage} of {totalPages}
          </p>

          <button
            disabled={currentPage === totalPages}
            onClick={async () => {
              const newPage = currentPage + 1;
              setCurrentPage(newPage);
              try {
                setApiStatus(apiStatusConstants.IN_PROGRESS);
                const data = await fetchSearchMovies(searchText, newPage);
                setMoviesList(data.results || []);
                setTotalPages(data.total_pages || 0);
                setApiStatus(apiStatusConstants.SUCCESS);
              } catch {
                setApiStatus(apiStatusConstants.FAILURE);
              }
            }}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❯
          </button>
        </div>
      </>
    );
  };

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return renderLoadingView();
      case apiStatusConstants.FAILURE:
        return renderFailureView();
      case apiStatusConstants.SUCCESS:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen">

      <Navbar
        className="bg-[#131313]"
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={getSearchResults}
      />

      {renderView()}

    </div>
  );
};

export default Search;