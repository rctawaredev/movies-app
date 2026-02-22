import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { fetchOriginals, buildImageUrl } from "../tmdb";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Originals = () => {
  const [originalsData, setOriginalsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  
  const getOriginalsMovies = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const data = await fetchOriginals(1);

      if (!data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      setOriginalsData(data.results);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getOriginalsMovies();
  }, []);

  
  const renderLoadingView = () => (
  <div className="flex justify-center px-6 md:px-[164px]">
    
    <div className="
      flex f
      gap-5
      justify-center
      items-center
      py-16
      bg-[#0D0D0D]
      w-full
      max-w-6xl
      rounded-lg
    ">
         <BeatLoader color="#ef4444" />
    </div>
  </div>
);

  const renderFailureView = () => (
    <div className="flex justify-center  px-6 md:px-[164px]">
      <div className="flex flex-col gap-5 rounded-lg justify-center items-center py-10 bg-[#0D0D0D] w-full py-10  px-6 max-w-6xl ">
        <img src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png" />
        <h1 className="text-white text-xs md:text-lg">
          Something went wrong. Please try again
        </h1>
         <button
        onClick={getOriginalsMovies}
        className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md"
      >
        Try Again
      </button>
      </div>
    </div>
  );

 

 

  const renderSuccessView = () => (
    <div className="relative px-[24px] md:px-[164px]">
      {/* LEFT ARROW */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-[110px] top-1/2 -translate-y-1/2 z-10
      bg-black/60 text-white text-2xl h-10 w-10 rounded-full
      items-center justify-center"
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-[110px] top-1/2 -translate-y-1/2 z-10
      bg-black/60 text-white text-2xl h-10 w-10 rounded-full
      items-center justify-center"
      >
        ❯
      </button>

      {/* EMBLA */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {originalsData.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="flex-none w-[35%] md:w-[180px]"
            >
              {/* PORTRAIT CARD */}
              <div className="w-full aspect-[2/3] rounded-[8px] overflow-hidden">
                <img
                  src={buildImageUrl(movie.poster_path || movie.backdrop_path, "w500")}
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
    <div className="bg-[#131313] py-6 pb-20">
      <h1
        className="
        text-xl md:text-2xl
        font-semibold text-white
        px-[24px] md:px-[164px]
        mb-4 pt-3
      "
      >
        Originals
      </h1>

      {renderView()}
    </div>
  );
};

export default Originals;
