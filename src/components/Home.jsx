import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";
import Trending from "./Trending";
import Originals from "./Originals";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";
import TopRated from "./TopRated";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Home = () => {
  const [posterData, setPosterData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const getPoster = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const url =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US";

      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQ2ZjQxYmY5OTdlMGVlODc2MzlmM2UwYmJiMzM3MiIsIm5iZiI6MTc3MTY3MzI3My41Niwic3ViIjoiNjk5OTk2YjliMmZkZDAyYzI3NTkwMjg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d5nphk0dKnpoglQnrHoz1mVxVXP3-Vg8hNp7JTFYNM8",
        },
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok || !data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      const randomMovie =
        data.results[Math.floor(data.results.length * Math.random())];

      (setPosterData({
        id: randomMovie.id,
        title: randomMovie.title,
        overview: randomMovie.overview,
        backdropPath: `https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
        rating: randomMovie.vote_average,
        voteCount: randomMovie.vote_count,
        releaseDate: randomMovie.release_date,
        language: randomMovie.original_language,
        isAdult: randomMovie.adult,
        genreIds: randomMovie.genre_ids,
        popularity: randomMovie.popularity,
      }),
        setApiStatus(apiStatusConstants.SUCCESS));
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getPoster();
  }, []);

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
      <div className="relative w-full h-[80vh] md:h-[90vh]">
        <div
          className="
        absolute inset-0
        bg-no-repeat bg-cover bg-center
        md:hidden
        "
          style={{
            backgroundImage: `
          linear-gradient(
            180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.5) 40%,
            #181818 95%
          ),
          url(${posterData.posterPath})
          `,
          }}
        />

        <div
          className="
        absolute inset-0
        bg-no-repeat bg-cover bg-center
        hidden md:block
        "
          style={{
            backgroundImage: `
          linear-gradient(
            180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.5) 40%,
            #181818 95%
          ),
          url(${posterData.backdropPath})
          `,
          }}
        />

        <div
          className="
        relative
        flex flex-col justify-end
        h-full
        px-[24px] md:px-[164px]
        pb-[40px] md:pb-[60px] lg:pb-[80px]
        "
        >
          <div className="max-w-[90%] md:max-w-[600px]">
            <h1 className="text-white text-[28px] md:text-[48px] font-bold mb-3">
              {posterData.title}
            </h1>

            <p className="text-white text-[14px] md:text-[16px] mb-4">
              {posterData.overview}
            </p>

            <button className="bg-white text-black rounded-md h-9 px-6">
              Play
            </button>
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
      <Trending />
      <TopRated />
      <Originals />
      {renderFooter()}
    </div>
  );
};

export default Home;
