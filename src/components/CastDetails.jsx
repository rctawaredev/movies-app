import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import defaultProfile from "../assets/defaultProfile.png";
import LazyImage from "./LazyImage";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const CastDetails = () => {

  const { id } = useParams();

  const [cast, setCast] = useState({});
  const [movies, setMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQ2ZjQxYmY5OTdlMGVlODc2MzlmM2UwYmJiMzM3MiIsIm5iZiI6MTc3MTY3MzI3My41Niwic3ViIjoiNjk5OTk2YjliMmZkZDAyYzI3NTkwMjg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d5nphk0dKnpoglQnrHoz1mVxVXP3-Vg8hNp7JTFYNM8"
    },
  };

  const getCastDetails = async () => {

    try {

      // PERSON DETAILS
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}`,
        options
      );
      const data = await res.json();

      // MOVIE CREDITS
      const creditRes = await fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits`,
        options
      );
      const credits = await creditRes.json();

      setCast({
        name: data.name,
        bio: data.biography,
        birthday: data.birthday,
        place: data.place_of_birth,
        known: data.known_for_department,
        profile: data.profile_path
          ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
          : defaultProfile,
      });

      // 🔥 IMPORTANT FILTER FIX
      const safeMovies =
        credits.cast
          .filter(
            (m) =>
              (m.poster_path || m.backdrop_path)
          )
          .sort((a, b) => {
            const dateA = new Date(a.release_date || "1900-01-01");
            const dateB = new Date(b.release_date || "1900-01-01");
            return dateB - dateA;
          })
          .slice(0, 20)
          .map((m) => ({
            id: m.id,
            title: m.title,
            year: m.release_date
              ? m.release_date.slice(0, 4)
              : "N/A",
            poster: m.poster_path
              ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
              : `https://image.tmdb.org/t/p/w500${m.backdrop_path}`,
          }));

      setMovies(safeMovies);

      setApiStatus(apiStatusConstants.SUCCESS);

    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getCastDetails();
  }, [id]);

  const renderLoading = () => (
    <div className="flex justify-center items-center h-[90vh]">
      <BeatLoader color="#ef4444" />
    </div>
  );

  const renderFailure = () => (
    <div className="flex justify-center items-center h-[90vh] text-white">
      Something went wrong
    </div>
  );

  const renderSuccess = () => (
    <>
      {/* HERO */}
      <div className="px-[24px] md:px-[164px] py-10 flex flex-col md:flex-row gap-10 animate-fadeIn">

        <img
          src={cast.profile}
          alt="profile"
          className="w-[250px] h-[350px] object-cover rounded-lg shadow-lg hover:scale-105 transition duration-500"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">
            {cast.name}
          </h1>

          <p className="text-gray-400 mb-2">
            Known For : {cast.known}
          </p>

          <p className="text-gray-400 mb-2">
            Born : {cast.birthday}
          </p>

          <p className="text-gray-400 mb-5">
            Place : {cast.place}
          </p>

          <p className="text-sm leading-relaxed max-w-[600px]">
            {cast.bio || "Biography Not Available"}
          </p>
        </div>
      </div>

      {/* MOVIES */}
      <div className="px-[24px] md:px-[164px] pb-10">

        <h1 className="text-2xl font-bold mb-5">
          Movies Featuring {cast.name}
        </h1>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 items-start will-change-transform">

  {movies.map((movie) => (

    <Link to={`/movies/${movie.id}`} key={movie.id}>

      <div className="group w-full">

        {/* FIXED POSTER SIZE */}
        <div className="relative w-full pt-[150%] overflow-hidden rounded-lg">

          <LazyImage
            src={movie.poster}
            alt={movie.title}
          />

        </div>

        <p className="mt-2 text-sm group-hover:text-red-500 transition line-clamp-2">
          {movie.title} ({movie.year})
        </p>

      </div>

    </Link>

  ))}

</div>

      </div>
    </>
  );

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.INITIAL:
        return renderLoading();
      case apiStatusConstants.SUCCESS:
        return renderSuccess();
      case apiStatusConstants.FAILURE:
        return renderFailure();
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen text-white">
      <Navbar />
      {renderView()}
    </div>
  );
};

export default CastDetails;