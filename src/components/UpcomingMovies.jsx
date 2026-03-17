import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import LazyImage from "./LazyImage";

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const buildImageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const UpcomingMovies= () => {
  const [data, setData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

const getUpcomingMovies = async () => {

  setApiStatus(apiStatusConstants.IN_PROGRESS);

  try {

    const params = new URLSearchParams({
      language: "en-US",
      page: "1",
    });
    const url = `https://api.themoviedb.org/3/movie/upcoming?${params.toString()}`;
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
      throw new Error(data?.status_message || "Upcoming request failed");
    }

    const safeMovies = (data.results || []).filter(
      (movie) => movie.poster_path !== null
    );

    setData(safeMovies);
    setApiStatus(apiStatusConstants.SUCCESS);

  } catch {
    setApiStatus(apiStatusConstants.FAILURE);
  }
};

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const renderLoading = () => (
    <div className="flex justify-center py-10">
      <BeatLoader color="#ef4444" />
    </div>
  );

  const renderFailure = () => (
    <div className="flex justify-center py-10 text-white">
      Something went wrong
    </div>
  );

  const renderSuccess = () => (
    <div className="relative px-[24px] md:px-[164px]">
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-[110px] top-1/2 -translate-y-1/2 z-10
        bg-black/60 text-white text-2xl h-10 w-10 rounded-full items-center justify-center"
      >
        ❮
      </button>

      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-[110px] top-1/2 -translate-y-1/2 z-10
        bg-black/60 text-white text-2xl h-10 w-10 rounded-full items-center justify-center"
      >
        ❯
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
       <div className="flex gap-4 md:gap-6">
          {data.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="flex-none w-[35%] md:w-[180px]"
            >
              <div className="w-full aspect-[2/3] rounded-[8px] overflow-hidden">
                <img
                  src={buildImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return renderLoading();
      case apiStatusConstants.FAILURE:
        return renderFailure();
      case apiStatusConstants.SUCCESS:
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#131313] py-6">
      <h1 className="text-xl md:text-2xl font-semibold text-white px-[24px] md:px-[164px] mb-4">
        Upcoming Movies
      </h1>
      {renderView()}
    </div>
  );
};

export default UpcomingMovies;
