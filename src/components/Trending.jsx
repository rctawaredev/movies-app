import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Trending = () => {
  const [data, setData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const getMovies = async () => {
  setApiStatus(apiStatusConstants.IN_PROGRESS);

  try {

    // 📅 LAST 3 YEARS WINDOW
    const today = new Date();
    const FourtyYearsAgo = new Date();
    FourtyYearsAgo.setFullYear(today.getFullYear() - 40);

    const fromDate = FourtyYearsAgo.toISOString().split("T")[0];
    const toDate = today.toISOString().split("T")[0];

    // 🔥 CLEAN BASE URL (NO MULTILINE)
    const baseUrl =
      `https://api.themoviedb.org/3/discover/movie` +
      `?with_original_language=hi` +
      `&primary_release_date.gte=${fromDate}` +
      `&primary_release_date.lte=${toDate}` +
      `&sort_by=popularity.desc` +
      `&vote_count.gte=100` +                  // removes unknown movies
      `&watch_region=IN` +
      `&with_watch_monetization_types=flatrate` +
      `&with_watch_providers=8|9|232`;         // Netflix | Prime | Zee5

    const options = {
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQ2ZjQxYmY5OTdlMGVlODc2MzlmM2UwYmJiMzM3MiIsIm5iZiI6MTc3MTY3MzI3My41Niwic3ViIjoiNjk5OTk2YjliMmZkZDAyYzI3NTkwMjg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d5nphk0dKnpoglQnrHoz1mVxVXP3-Vg8hNp7JTFYNM8"
      }
    };

    // 🔥 STEP 1 → GET TOTAL PAGES
    const firstRes = await fetch(`${baseUrl}&page=1`, options);
    const firstJson = await firstRes.json();
    console.log(firstJson)

    if (!firstJson.total_pages) {
      setApiStatus(apiStatusConstants.FAILURE);
      return;
    }

    // Netflix doesn't go too deep → avoid page 400+
    const totalPages = Math.min(firstJson.total_pages, 50);

    // 🔥 STEP 2 → RANDOM PAGE
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    // 🔥 STEP 3 → FETCH RANDOM PAGE
    const finalRes = await fetch(`${baseUrl}&page=${randomPage}`, options);
    const finalJson = await finalRes.json();

    // 🔥 STEP 4 → SAFE POSTERS ONLY
    const safeMovies = finalJson.results.filter(
      (m) => m.poster_path !== null
    );

    setData(safeMovies);
    setApiStatus(apiStatusConstants.SUCCESS);

  } catch (error) {
    console.log(error);
    setApiStatus(apiStatusConstants.FAILURE);
  }
};

  useEffect(() => {
    getMovies();
  }, []);

  const renderLoadingView = () => (
    <div className="flex justify-center py-10">
      <BeatLoader color="#ef4444" />
    </div>
  );

  const renderSuccessView = () => (
    <div className="relative px-[24px] md:px-[164px]">

      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-[110px] top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white text-2xl h-10 w-10 rounded-full items-center justify-center"
      >
        ❮
      </button>

      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-[110px] top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white text-2xl h-10 w-10 rounded-full items-center justify-center"
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
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
      case apiStatusConstants.SUCCESS:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#131313] py-6">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white px-[24px] md:px-[164px] mb-4">
        Most Loved Bollywood Movies
      </h1>
      {renderView()}
    </div>
  );
};

export default Trending;