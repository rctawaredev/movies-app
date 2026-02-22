import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import defaultProfile from "../assets/defaultProfile.png";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieSimilar,
  fetchMovieWatchProviders,
  buildImageUrl,
} from "../tmdb";
import { useMyList } from "../hooks/useMyList";

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
  const { isInList, toggle } = useMyList();

  const formatBudget = (budget) => {
    if (!budget || budget === 0) return "Not Available";
    return `${(budget / 10000000).toFixed(2)} Crores`;
  };

  const getMovieDetails = async () => {
    try {
      const [movie, similar, castJson, providerJson] = await Promise.all([
        fetchMovieDetails(id),
        fetchMovieSimilar(id),
        fetchMovieCredits(id),
        fetchMovieWatchProviders(id),
      ]);

      setMovieData({
        title: movie.title,
        backdropPath: buildImageUrl(
          movie.backdrop_path || movie.poster_path,
          "original"
        ),
        posterPath: buildImageUrl(movie.poster_path, "w500"),
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
        (similar.results || [])
          .filter((m) => m.poster_path)
          .map((each) => ({
            id: each.id,
            posterPath: buildImageUrl(each.poster_path, "w500"),
          }))
      );

      setCast(
        (castJson.cast || []).slice(0, 6).map((c) => ({
          id: c.id,
          name: c.name,
          profile: c.profile_path
            ? buildImageUrl(c.profile_path, "w200")
            : defaultProfile,
<<<<<<< HEAD
        })),
=======
        }))
        }))(p) => ({
          name: p.provider_name,
          logo: buildImageUrl(p.logo_path, "w200"),
<<<<<<< HEAD
        })) || [],
=======
        })) || []
        })) || []
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  const hours = Math.floor((movieData.runtime || 0) / 60);
  const minutes = (movieData.runtime || 0) % 60;
  const year = movieData.releaseDate?.slice(0, 4);

<<<<<<< HEAD
  const movieId = Number(id);
  const inMyList = isInList(movieId);

  const renderSuccessView = () => (
    <>
      {/* HERO */}
      <div
  const movieId = Number(id);
  const inMyList = isInList(movieId);

  const renderSuccessView = () => (
    <>
      {/* HERO */}
      <div
        className="w-full h-[80vh] md:h-[90vh] lg:h-[100vh] flex flex-col justify-end px-[24px] md:px-[164px] pb-10 bg-cover bg-center transition-all duration-500"
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
          <p>
            {hours}h {minutes}m
          </p>
          <p className="border px-2 rounded-sm">U/A</p>
          <p>{year}</p>
          <p className="bg-yellow-500 text-black px-2 rounded">
            ⭐ {movieData.voteAverage}
          </p>
        </div>

        <p className="max-w-[600px] mb-4 text-gray-300">{movieData.overview}</p>

        <div className="flex flex-wrap gap-3">
          <Link to={`/watch/${id}`}>
            <button className="bg-white text-black px-6 py-2 rounded-md w-fit hover:scale-105 transition duration-300">
              ▶ Play
            </button>
          </Link>

          <button
            onClick={() =>
              toggle({
                id: movieId,
                title: movieData.title,
                posterPath: movieData.posterPath,
                backdropPath: movieData.backdropPath,
              })
            }
            className="bg-[#2c2b2b] text-white px-6 py-2 rounded-md w-fit hover:bg-red-600 transition duration-300"
          >
            {inMyList ? "✓ My List" : "+ My List"}
          </button>
        </div>
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
<<<<<<< HEAD
      <Navbar className="fixed top-0 left-0 right-0 bg-black/20 z-50" />
=======
       <Navbar className="fixed top-0 left-0 right-0 bg-black/20 z-50" />
>>>>>>> c8861e679e6e1f15e1ee9062d5be3c70b74db587
      {renderView()}
    </div>
  );
};

<<<<<<< HEAD
export default MovieDetails;
=======
export default MovieDetails;
>>>>>>> c8861e679e6e1f15e1ee9062d5be3c70b74db587
      <Navbar className="fixed top-0 left-0 right-0 bg-black/20 z-50" />
      {renderView()}
    </div>
  );
};

export default MovieDetails;