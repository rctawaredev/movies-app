import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import Trending from "./Trending";
import Originals from "./Originals";
import TopRated from "./TopRated";
import UpcomingMovies from "./UpcomingMovies";
import { fetchNowPlaying, buildImageUrl } from "../tmdb";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { RiInformationFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Home = () => {
  const [posterData, setPosterData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [trailerKey, setTrailerKey] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const playerRef = useRef(null);
  const playerCreated = useRef(false);

  useEffect(() => {
    if (
      document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    )
      return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  const getPoster = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);
    try {
      const data = await fetchNowPlaying(1);
      const randomMovie =
        data.results[Math.floor(data.results.length * Math.random())];
      setPosterData({
        id: randomMovie.id,
        title: randomMovie.title,
        overview: randomMovie.overview,
        backdropPath: buildImageUrl(randomMovie.backdrop_path, "w1280"),
      });
      setApiStatus(apiStatusConstants.SUCCESS);
      await getTrailer(randomMovie.id);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  const getTrailer = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    );
    const data = await res.json();
    const trailer = data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    );
    if (trailer) setTrailerKey(trailer.key);
  };

  useEffect(() => {
    getPoster();
  }, []);

  useEffect(() => {
    if (!trailerKey || playerCreated.current) return;

    const createPlayer = () => {
      if (playerCreated.current) return;
      playerCreated.current = true;

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: trailerKey,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          disablekb: 1,
          iv_load_policy: 3,
          playlist: trailerKey,
          loop: 0,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            setTimeout(() => {
              event.target.playVideo();
              setPlayTrailer(true);
              setShowControls(true);
            }, 3000);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setPlayTrailer(false);
              setVideoEnded(true);
              setShowControls(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, [trailerKey]);

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const stopTrailer = () => {
    if (!playerRef.current) return;
    playerRef.current.pauseVideo();
    playerRef.current.seekTo(0, true);
    setPlayTrailer(false);
    setVideoEnded(true);
    setShowControls(false);
  };

  const playAgain = () => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0, true);
    playerRef.current.mute();
    playerRef.current.playVideo();
    setIsMuted(true);
    setPlayTrailer(true);
    setVideoEnded(false);
    setShowControls(true);
  };

  const renderSuccessView = () => (
    <div className="relative w-full h-[80vh] md:h-[95vh] overflow-hidden">
      {/* ✅ YouTube player — always at z-index 1, ALWAYS visible to browser */}
      <div
        id="youtube-player"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ✅ Backdrop image — sits ON TOP of player (z-index 2), fades out when trailer plays */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 60%, #181818 100%),
            url(${posterData.backdropPath})
          `,
          zIndex: 2,
          opacity: playTrailer ? 0 : 1,
          transition: "opacity 1.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade always visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 85%, #131313 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      <div
        className="absolute left-6 md:left-[164px] bottom-20 max-w-[600px]"
        style={{ zIndex: 4 }}
      >
        {!playTrailer && (
          <h1 className="text-white text-[28px] md:text-[48px] font-bold mb-3 drop-shadow-lg">
            {posterData.title}
          </h1>
        )}

        {!playTrailer && (
          <p className="text-white text-[14px] md:text-[16px] drop-shadow-md">
            {posterData.overview}
          </p>
        )}

        {!playTrailer && (
          <div className="flex justify-start gap-3 mt-6">
            <Link to={`/watch/${posterData.id}`}>
              <button className="flex gap-2 m-2 items-center bg-white text-black px-6 py-2 mt-6 rounded-md hover:scale-105 hover:bg-gray-300 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1 className="font-[500]"> Play </h1>
              </button>
            </Link>
            <Link to={`/movies/${posterData.id}`}>
              <button className="flex items-center gap-2 bg-white m-2 text-black px-6 py-2 mt-6 rounded-md hover:scale-105 hover:bg-gray-300 transition duration-300">
                <RiInformationFill className="text-2xl"/> <h1 className="font-[500]">More Info</h1>
              </button>
            </Link>
          </div>
        )}
      </div>

      {playTrailer && (
        <div className="absolute left-6 md:left-[164px] bottom-24 z-10">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771334227/Group_7399_1_f1gwrg.png"
            className="w-25 md:w-30 mb-3"
          />
          <h1 className="text-white text-xl md:text-3xl font-semibold">
            {posterData.title}
          </h1>
        </div>
      )}

      {/* Mute + Stop */}
      {showControls && (
        <>
          <button
            onClick={toggleMute}
            style={{ zIndex: 10 }}
            className="absolute right-6 bottom-24
              bg-white/40 backdrop-blur-md rounded-full
              w-10 h-10 md:w-14 md:h-14
              flex items-center justify-center
              text-white text-xl hover:bg-black/60 transition"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>

          <button
            onClick={stopTrailer}
            style={{ zIndex: 10 }}
            className="absolute right-6 bottom-6
              bg-white/40 backdrop-blur-md rounded-full
              w-10 h-10 md:w-14 md:h-14
              flex items-center justify-center
              text-white text-xl hover:bg-black/60 transition"
          >
            ❚❚
          </button>
        </>
      )}

      {/* Play Again */}
      {videoEnded && !playTrailer && (
        <button
          onClick={playAgain}
          style={{ zIndex: 10 }}
          className="absolute right-6 bottom-24
            bg-white/40 backdrop-blur-md rounded-full
            w-10 h-10 md:w-14 md:h-14
            flex items-center justify-center
            text-white text-xl hover:bg-black/60 transition"
        >
          ▶
        </button>
      )}
    </div>
  );

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return (
          <div className="flex justify-center py-20">
            <BeatLoader color="#ef4444" />
          </div>
        );
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
      <UpcomingMovies />
      <Trending />
      <TopRated />
      <Originals />
    </div>
  );
};

export default Home;
