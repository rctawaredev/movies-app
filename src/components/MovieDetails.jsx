import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import defaultProfile from "../assets/defaultProfile.png";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const MovieDetails = () => {
  const { id } = useParams();

  const [movieData, setMovieData] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [providers, setProviders] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDQ2ZjQxYmY5OTdlMGVlODc2MzlmM2UwYmJiMzM3MiIsIm5iZiI6MTc3MTY3MzI3My41Niwic3ViIjoiNjk5OTk2YjliMmZkZDAyYzI3NTkwMjg3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d5nphk0dKnpoglQnrHoz1mVxVXP3-Vg8hNp7JTFYNM8",
    },
  };

  const formatBudget = (budget) => {
    if (!budget || budget === 0) return "Not Available";
    return `${(budget / 10000000).toFixed(2)} Crores`;
  };

  const getMovieDetails = async () => {
    try {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        options
      );
      const movie = await movieRes.json();

      const similarRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar`,
        options
      );
      const similar = await similarRes.json();

      const castRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        options
      );
      const castJson = await castRes.json();

      const providerRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
        options
      );
      const providerJson = await providerRes.json();

      setMovieData({
        title: movie.title,
        backdropPath: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        overview: movie.overview,
        genres: movie.genres,
        spokenLanguages: movie.spoken_languages,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        budget: movie.budget,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
      });

      setSimilarMovies(
        similar.results
          .filter((m) => m.poster_path)
          .map((each) => ({
            id: each.id,
            posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
          }))
      );

      setCast(
        castJson.cast.slice(0, 6).map((c) => ({
          id: c.id,
          name: c.name,
          profile: c.profile_path
            ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
            : defaultProfile,
        }))
      );

      setProviders(
        providerJson.results?.IN?.flatrate?.map((p) => ({
          name: p.provider_name,
          logo: `https://image.tmdb.org/t/p/w200${p.logo_path}`,
        })) || []
      );

      setApiStatus(apiStatusConstants.SUCCESS);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  const hours = Math.floor((movieData.runtime || 0) / 60);
  const minutes = (movieData.runtime || 0) % 60;
  const year = movieData.releaseDate?.slice(0, 4);

 const renderSuccessView = () => (
  <>
    {/* HERO */}
    <div
      className="w-full h-[80vh] flex flex-col justify-end px-[24px] md:px-[164px] pb-10 bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `
        linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(0,0,0,0.5)40%,#181818 95%),
        url(${movieData.backdropPath})
        `,
      }}
    >
      <h1 className="text-[32px] md:text-[48px] font-bold animate-fadeIn">
        {movieData.title}
      </h1>

      <div className="flex items-center gap-3 my-3">
        <p>{hours}h {minutes}m</p>
        <p className="border px-2 rounded-sm">U/A</p>
        <p>{year}</p>
        <p className="bg-yellow-500 text-black px-2 rounded">
          ⭐ {movieData.voteAverage}
        </p>
      </div>

      <p className="max-w-[600px] mb-4 text-gray-300">
        {movieData.overview}
      </p>

      <Link to={`/watch/${id}`}>
        <button className="bg-white text-black px-6 py-2 rounded-md w-fit hover:scale-105 transition duration-300">
          ▶ Play
        </button>
      </Link>
    </div>

    {/* INFO SECTION */}
    <div className="px-[24px] md:px-[164px] py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

      {/* GENRES */}
      <div>
        <p className="text-[#94A3B8] mb-2">Genres</p>
        {movieData.genres?.map((g) => (
          <p key={g.id}>{g.name}</p>
        ))}
      </div>

      {/* AUDIO */}
      <div>
        <p className="text-[#94A3B8] mb-2">Audio Available</p>
        {movieData.spokenLanguages?.map((l) => (
          <p key={l.iso_639_1}>{l.english_name}</p>
        ))}
      </div>

      {/* RATINGS */}
      <div>
        <p className="text-[#94A3B8] mb-2">Rating Count</p>
        <p>{movieData.voteCount}</p>
        <p className="mt-2 text-[#94A3B8]">Rating Average</p>
        <p>{movieData.voteAverage}</p>
      </div>

      {/* BUDGET */}
      <div>
        <p className="text-[#94A3B8] mb-2">Budget</p>
        <p>{formatBudget(movieData.budget)}</p>
        <p className="mt-2 text-[#94A3B8]">Release Date</p>
        <p>{movieData.releaseDate}</p>
      </div>

    </div>

    {/* CAST */}
    <div className="px-[24px] md:px-[164px] pb-10">
      <h1 className="text-xl mb-4">Top Cast</h1>

      <div className="flex gap-5 overflow-x-auto scrollbar-hide">
        {cast.map((c) => (
          <Link to={`/cast/${c.id}`} key={c.id}>
            <div className="text-center w-[110px] group">
              <img
                src={c.profile}
                alt={c.name}
                className="rounded-full w-[80px] h-[80px] object-cover mx-auto border border-gray-700 group-hover:scale-110 transition duration-300"
              />
              <p className="text-sm mt-2 group-hover:text-red-400 transition">
                {c.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>

    {/* OTT PROVIDERS */}
    <div className="px-[24px] md:px-[164px] pb-10">
      <h1 className="text-xl mb-4">Available On</h1>
      <div className="flex gap-4">
        {providers.map((p, i) => (
          <img
            key={i}
            src={p.logo}
            alt={p.name}
            className="h-12 hover:scale-110 transition"
          />
        ))}
      </div>
    </div>

    {/* SIMILAR MOVIES */}
    <div className="px-[24px] md:px-[164px] pb-10">
      <h1 className="text-xl mb-4">More Like This</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {similarMovies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <img
              src={movie.posterPath}
              alt="similar"
              className="w-full h-[150px] rounded-lg object-cover hover:scale-105 transition duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  </>
);

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.INITIAL:
        return (
          <div className="flex justify-center items-center h-[90vh]">
            <BeatLoader color="#ef4444" />
          </div>
        );
      case apiStatusConstants.SUCCESS:
        return renderSuccessView();
      case apiStatusConstants.FAILURE:
        return (
          <div className="flex justify-center items-center h-[90vh] text-white">
            Something went wrong
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen text-white">
       <Navbar className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-sm z-50" />
      {renderView()}
    </div>
  );
};

export default MovieDetails;