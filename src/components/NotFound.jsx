import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="
        min-h-screen
        w-full
        flex
        justify-center
        items-center
        text-center
        bg-cover
        bg-center
      "
      style={{
        backgroundImage: `
          linear-gradient(
            180deg,
            #4368EB 0%,
            rgba(164,184,255,0) 100%
          ),
          url('https://res.cloudinary.com/distnojxb/image/upload/v1771580898/93955cfc4c28572ced55c420bbcd234b14c68813_flitly.jpg')
        `
      }}
    >
      <div className="px-6">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
          Lost Your Way ?
        </h1>

        <p className="text-white text-sm md:text-lg mb-6 max-w-md">
          We are sorry, the page you requested could not be found.
          Please go back to the homepage.
        </p>

        <Link to="/">
          <button className="bg-white text-black px-6 text-sm md:text-md py-2 rounded-md">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;