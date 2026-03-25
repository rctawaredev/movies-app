import { useMyList } from "../hooks/useMyList";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const List = () => {
  const { list, clear } = useMyList();

  const renderMyList = () => {
    if (!list.length) {
      return (
        <div className="px-10 lg:px-[164px] md:px-[100px] py-30 text-white h-screen bg-black">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">My List</h2>
          </div>
          <p className="text-gray-400">
            You haven't added anything to your list yet. Start exploring
            and tap "My List" on any title.
          </p>
        </div>
      );
    }

    return (
      <div className="px-10 lg:px-[164px] md:px-[100px] py-30 text-white bg-[#181818]">
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
    <>
      <Navbar className="bg-black fixed" />
      {renderMyList()}
      <Footer />
    </>
  );
};

export default List;
