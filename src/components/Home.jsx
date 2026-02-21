import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import Trending from "./Trending";
import Originals from "./Originals";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";
import TopRated from "./TopRated";
import UpcomingRow from "./UpcomingRow";
import { fetchNowPlaying, buildImageUrl } from "../tmdb";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Home = () => {
  const [posterData, setPosterData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
 // for iframe video  banner
const [playTrailer, setPlayTrailer] = useState(false);
const [trailerKey, setTrailerKey] = useState(null);

  const getPoster = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const data = await fetchNowPlaying(1);

      if (!data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      const randomMovie =
        data.results[Math.floor(data.results.length * Math.random())];

      setPosterData({
        id: randomMovie.id,
        title: randomMovie.title,
        overview: randomMovie.overview,
        backdropPath: buildImageUrl(randomMovie.backdrop_path, "w1280"),
        posterPath: buildImageUrl(randomMovie.poster_path, "w500"),
        rating: randomMovie.vote_average,
        voteCount: randomMovie.vote_count,
        releaseDate: randomMovie.release_date,
        language: randomMovie.original_language,
        isAdult: randomMovie.adult,
        genreIds: randomMovie.genre_ids,
        popularity: randomMovie.popularity,
      }
  );
      setApiStatus(apiStatusConstants.SUCCESS);
      // get trailer detail
       await getTrailer(randomMovie.id);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  // has trailer function 
  const getTrailer = async (movieId) => {
  try {

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    );

    const data = await res.json();

    const trailer = data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (trailer) {
      setTrailerKey(trailer.key);
    }

  } catch (e) {
    console.log("Trailer fetch failed");
  }
};

  useEffect(() => {
    getPoster();
  }, []);

  useEffect(() => {

  if (!trailerKey) return;

  const timer = setTimeout(() => {
    setPlayTrailer(true);
  }, 3000);

  return () => clearTimeout(timer);

}, [trailerKey]);

  const renderLoadingView = () => (
    <>
      <div className="flex justify-center px-6 md:px-[164px] py-10 ">
        <div
          className="
            flex
            justify-center
            items-center
            bg-[#0D0D0D]
            w-full
            max-w-6xl
            rounded-lg
          "
        >
          <BeatLoader color="#ef4444" />
        </div>
      </div>
    </>
  );

  const renderFailureView = () => (
    <>
      <div className="flex justify-center px-6 md:px-[164px] py-10 pt-[135px]">
        <div
          className="
            flex flex-col
            gap-5
            justify-center
            items-center
            py-10
            bg-[#0D0D0D]
            w-full
            h-[60vh]
            max-w-6xl
            rounded-lg
          "
        >
          <img src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png" />

          <h1 className="text-white text-xs md:text-lg">
            Something went wrong. Please try again
          </h1>

          <button
            onClick={getPoster}
            className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );

  const renderFooter = () => {
    return (
      <div className="flex justify-center py-10">
        <ul className="flex flex-col items-center gap-3">
          <li className="flex gap-5">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>

            <a
              href="https://x.com/NetflixIndia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXFill className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>

            <a
              href="https://www.instagram.com/netflix_in/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>

            <a
              href="https://www.youtube.com/@NetflixIndiaOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/rctaware/">
              <h1 className="text-white md:text-[20px] font-extrabold hover:text-blue-500 transition duration-200">
                Contact Us
              </h1>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const renderSuccessView = () => (
    <>
<div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">

  {/* 🎬 TRAILER ALWAYS MOUNTED */}
  {trailerKey && (
    <iframe
      className={`absolute inset-0 w-full h-full z-0
      transition-opacity duration-1000
      ${playTrailer ? "opacity-100" : "opacity-0"}`}
    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0&cc_load_policy=1&cc_lang_pref=en`}
      allow="autoplay"
    />
  )}

  {/* 🖼️ POSTER OVER VIDEO */}
  <div
    className={`absolute inset-0 bg-cover bg-center z-10
    transition-opacity duration-1000
    ${playTrailer ? "opacity-0" : "opacity-100"}`}
    style={{
      backgroundImage: `
      linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(0,0,0,0.5)40%,#181818 95%),
      url(${posterData.backdropPath})
      `,
    }}
  />

  {/* TEXT */}
  <div
    className={`relative z-20 flex flex-col justify-end
    h-full px-[24px] md:px-[164px]
    pb-[60px]
    transition-opacity duration-700
    ${playTrailer ? "opacity-0" : "opacity-100"}`}
  >
    <div className="max-w-[600px]">
      <h1 className="text-white text-[28px] md:text-[48px] font-bold mb-3">
        {posterData.title}
      </h1>

      <p className="text-white text-[14px] md:text-[16px] mb-4">
        {posterData.overview}
      </p>
    </div>
  </div>

</div>
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

  return (
    <div className="bg-[#131313]">
      <Navbar className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-sm z-50" />
      {renderView()}
      <UpcomingRow  />
      <Trending />
      <TopRated />
      <Originals />
      {renderFooter()}
    </div>
  );
};

export default Home;
