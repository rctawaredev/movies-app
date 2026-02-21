import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import LazyImage from "./LazyImage";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const UpcomingRow = ({ title }) => {

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

    const url= 'https://api.themoviedb.org/3/movie/upcoming?language=en-US';
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQ2ZjQxYmY5OTdlMGVlODc2MzlmM2UwYmJiMzM3MiIsIm5iZiI6MTc3MTY3MzI3My41Niwic3ViIjoiNjk5OTk2YjliMmZkZDAyYzI3NTkwMjg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d5nphk0dKnpoglQnrHoz1mVxVXP3-Vg8hNp7JTFYNM8",
      },
    };

    // 🔹 STEP 1 → total pages
    const firstRes = await fetch(`${url}&page=1`, options);
    const firstJson = await firstRes.json();

    const totalPages = firstJson.total_pages;

    // 🔹 STEP 2 → random page
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    // 🔹 STEP 3 → fetch that page
    const finalRes = await fetch(`${url}&page=${randomPage}`, options);
    const finalJson = await finalRes.json();

    const safeMovies = finalJson.results.filter(
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

  // ---------- SUCCESS ----------
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
              <div className="relative w-full pt-[150%] overflow-hidden rounded-lg group">

                <LazyImage
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  className="absolute top-0 left-0 w-full h-full object-cover
                  transition-transform duration-500 group-hover:scale-110"
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
        return (
          <div className="flex justify-center py-10">
            <BeatLoader color="#ef4444" />
          </div>
        );
      case apiStatusConstants.SUCCESS:
        return renderSuccess();
      case apiStatusConstants.FAILURE:
        return (
          <div className="flex justify-center py-10 text-white">
            Failed to fetch movies
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#131313] py-6">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white px-[24px] md:px-[164px] mb-4">
        Upcoming Movies
      </h1>
      {renderView()}
    </div>
  );
};

export default UpcomingRow;