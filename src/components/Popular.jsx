import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const buildImageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Popular = () => {
  const [popularData, setPopularData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const fetchPopularMovies = async (page) => {
    const params = new URLSearchParams({
      language: "en-US",
      page: String(page),
    });
    const url = `https://api.themoviedb.org/3/movie/popular?${params.toString()}`;
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
      throw new Error(data?.status_message || "Popular request failed");
    }
    return data;
  };

  const getPopularMovies = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const data = await fetchPopularMovies(currentPage);
      if (!data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      setPopularData(data.results);
      setTotalPages(data.total_pages || 0);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, [currentPage]);

  const renderLoadingView = () => (
    <>
      <Navbar className="bg-[#131313]" />

      <div className="h-[90vh] flex justify-center items-center px-6 md:px-[164px]">
        <div className="flex justify-center items-center bg-[#0D0D0D] w-full max-w-6xl h-[213px] md:h-[466px] rounded-lg">
          <BeatLoader color="#ef4444" />
        </div>
      </div>
    </>
  );

  const renderFailureView = () => (
    <>
      <Navbar className="bg-[#131313]" />

      <div className="h-[90vh] flex justify-center items-center px-6 md:px-[164px]">
        <div className="flex flex-col gap-5 justify-center items-center bg-[#0D0D0D] w-full max-w-6xl h-[213px] md:h-[466px] rounded-lg">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png"
            alt="failure view"
            className="h-6"
          />
          <p className="text-white text-xs md:text-lg text-center">
            Something went wrong. Please try again
          </p>
          <button
            onClick={getPopularMovies}
            className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );

  const renderSuccessView = () => (
    <>
      <Navbar className="bg-[#131313] fixed top-0 left-0 right-0 z-50" />

      <div className="pt-[100px] px-6 md:pt-30 md:px-[164px] pb-10">
        <h1 className="text-white text-xl md:text-2xl font-semibold mb-6">
          Popular Movies
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {popularData.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="w-full aspect-[2/3] rounded-lg overflow-hidden group bg-[#0d0d0d]">
                <img
                  src={buildImageUrl(movie.poster_path || movie.backdrop_path, "w500")}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❮
          </button>

          <p className="text-white text-sm">
            {currentPage} of {totalPages}
          </p>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❯
          </button>
        </div>
      </div>
      <Footer />
    </>
  );

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

  return <div className="bg-[#181818] min-h-screen">{renderView()}</div>;
};

export default Popular;
