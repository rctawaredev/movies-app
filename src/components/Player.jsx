import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUI, setShowUI] = useState(true);

  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQ2ZjQxYmY5OTdlMGVlODc2MzlmM2UwYmJiMzM3MiIsIm5iZiI6MTc3MTY3MzI3My41Niwic3ViIjoiNjk5OTk2YjliMmZkZDAyYzI3NTkwMjg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d5nphk0dKnpoglQnrHoz1mVxVXP3-Vg8hNp7JTFYNM8"
    }
  };

  const getTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        options
      );

      const data = await res.json();

      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      setTrailerKey(trailer?.key);
      setLoading(false);

    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrailer();
  }, [id]);

  // ESC key to go back
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Auto hide UI
  useEffect(() => {
    let timeout;

    const handleMouseMove = () => {
      setShowUI(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowUI(false);
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-black h-screen flex justify-center items-center">
        <BeatLoader color="#ef4444" />
      </div>
    );
  }

  return (
    <div className="bg-black h-screen w-screen relative overflow-hidden">

      {/* VIDEO */}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0&fs=1`}
        allow="autoplay; fullscreen"
        allowFullScreen
      />

      {/* NETFLIX TOP OVERLAY */}
      <div
        className={`absolute top-0 left-0 w-full flex items-center gap-5 p-5 
        bg-gradient-to-b from-black/80 to-transparent
        transition-opacity duration-500 
        ${showUI ? "opacity-100" : "opacity-0"}`}
      >

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="text-white text-3xl hover:scale-110 transition"
        >
          ←
        </button>

        <h1 className="text-white text-lg font-semibold">
          Playing Trailer
        </h1>

      </div>

    </div>
  );
};

export default Player;