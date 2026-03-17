import Navbar from "./Navbar";
import { useMyList } from "../hooks/useMyList";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const buildImageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

const Account = () => {
  const { list, clear } = useMyList();

  const renderAccount = () => {
    return (
      <>
        <div className="bg-white flex flex-col items-start justify-center px-10 lg:px-[164px] md:px-[100px] pt-28 pb-10">
          <h1 className="text-[#131313] md:text-3xl text-2xl font-[500] tracking-normal leading-[100%] pb-4">
            Account
          </h1>
          <ul className="flex gap-4 border-y-[#CBD5E1] border-y-2 py-6 w-full">
            <li>
              <h1 className="md:text-xl text-lg text-[#94A3B8]">
                Membership
              </h1>
            </li>
            <li>
              <p className="text-[#1E293B] md:text-lg text-sm">
                rohantaware.work@gmail.com
              </p>
              <p className="text-[#64748B] md:text-lg text-md">
                ******************
              </p>
            </li>
          </ul>
          <ul className="flex items-start gap-7 border-b-[#CBD5E1] border-b-2 py-6 w-full">
            <li>
              <h1 className="md:text-xl text-lg text-[#94A3B8]">
                Plan details
              </h1>
            </li>
            <li className="flex gap-6">
              <p className="text-[#1E293B] md:text-lg text-md">Premium</p>
              <p className="text-[#1E293B] border border-[#1E293B] px-1 rounded-sm md:text-lg text-md font-medium">
                Ultra HD
              </p>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const renderMyList = () => {
    if (!list.length) {
      return (
        <div className="px-10 lg:px-[164px] md:px-[100px] py-10 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">My List</h2>
          </div>
          <p className="text-gray-400">
            You haven&apos;t added anything to your list yet. Start exploring
            and tap &quot;My List&quot; on any title.
          </p>
        </div>
      );
    }

    return (
      <div className="px-10 lg:px-[164px] md:px-[100px] py-10 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">My List</h2>
          <button
            onClick={clear}
            className="text-xs md:text-sm border border-gray-500 px-3 py-1 rounded hover:bg-gray-800 transition"
          >
            Clear My List
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {list.map((item) => (
            <Link key={item.id} to={`/movies/${item.id}`}>
              <div className="w-full aspect-[2/3] rounded-lg overflow-hidden group bg-[#0d0d0d]">
                <img
                  src={
                    item.posterPath ||
                    item.backdropPath ||
                    buildImageUrl(null, "w500")
                  }
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#181818] min-h-screen">
      <Navbar className="bg-[#131313] fixed" />
      {renderAccount()}
      {renderMyList()}
      <Footer />
    </div>
  );
};

export default Account;

