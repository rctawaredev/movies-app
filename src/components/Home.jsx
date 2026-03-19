import { useState, useEffect, useRef } from "react";
import {useNavigate} from 'react-router-dom'
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import Trending from "./Trending";
import Originals from "./Originals";
import TopRated from "./TopRated";
import UpcomingMovies from "./UpcomingMovies";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
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

const Home = () => {
  const Navigate=useNavigate()
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
      const params = new URLSearchParams({
        language: "en-US",
        page: "1",
      });
      const url = `https://api.themoviedb.org/3/movie/now_playing?${params.toString()}`;
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
        throw new Error(data?.status_message || "Now playing request failed");
      }
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
    const params = new URLSearchParams({
      language: "en-US",
    });
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?${params.toString()}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    };
    const res = await fetch(url, options);
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

      {/* Title always visible */}
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
         <button className="flex items-center gap-2 bg-white text-black  px-3 py-2 my-7 rounded-md hover:scale-105  transition duration-300" onClick={()=> Navigate(`/movies/${posterData.id}`) }>More Info <AiFillInfoCircle className="text-xl"/></button>
        )}
      </div>

     

      {playTrailer && (
        <div className="absolute left-6 md:left-[164px] bottom-24 z-10">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771334227/Group_7399_1_f1gwrg.png"
            className="w-28 md:w-40 mb-3"
          />
          <h1 className="text-white text-lg md:text-2xl font-semibold">
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
      <Footer />
    </div>
  );
};

export default Home;
