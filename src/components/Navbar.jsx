import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ className = "", searchText, setSearchText, onSearch }) => {
  const [clickedHamb, setClickedHamb] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";
  const activePath = location.pathname;

  useEffect(() => {
    setClickedHamb(false);
  }, [activePath]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (path) =>
    `hidden md:block md:text-md transition ${
      activePath === path
        ? "text-white"
        : "text-gray-200 hover:text-white hover:underline hover:decoration-red-500"
    }`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      onSearch();
    }
  };

  return (
    <nav
      className={`w-full px-6 md:px-[164px] ${
        scrolled ? "bg-black/85 backdrop-blur-md" : "bg-black/20 backdrop-blur-sm"
      } ${className}`}
    >
      <div className="max-w-7xl flex justify-between items-center text-white py-[16px]">
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/distnojxb/image/upload/v1771334227/Group_7399_1_f1gwrg.png"
                alt="website logo"
                className="h-7 md:h-6 lg:h-7"
              />
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className={linkClass("/")}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/popular"
              className={linkClass("/popular")}
            >
              Popular
            </Link>
          </li>

          <li>
            <Link
              to="/saved-videos"
              className={linkClass("/account")}
            >
              My List
            </Link>
          </li>
        </ul>

        <ul className="flex items-center  gap-4">
          {!isSearchPage && (
            <li>
              <button
                onClick={() => navigate("/search")}
                className="hover:scale-110  md:h-7 h-6 transition duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="23"
                  height="23"
                  data-icon="MagnifyingGlassMedium"
                  data-icon-id=":re:"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  role="img"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          )}

          {isSearchPage && (
            <li className="flex items-center">
              <div
                className="
                flex items-center
                border-gray-400 border
                rounded-md
                overflow-hidden
                lg:w-[300px]
                md:w-[150px]
                w-[180px]
                h-[40px]
                "
              >
                <input
                  type="search"
                  role="searchbox"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search"
                  className="
                  w-full
                  h-full
                  bg-transparent
                  px-3
                  outline-none
                  text-sm
                  placeholder:text-gray-400
                  "
                />

                <button
                  data-testid="searchButton"
                  onClick={() => {
                    if (searchText.trim() !== "") {
                      onSearch();
                    }
                  }}
                  className="
                  h-full
                  px-3
                  bg-[#2c2b2b]
                  flex items-center justify-center
                  hover:bg-red-500
                  transition duration-200
                  "
                >
                  <FaSearch className="text-white text-md" />
                </button>
              </div>
            </li>
          )}

          <li>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/distnojxb/image/upload/v1771359519/Mask_Group_lz65bf.png"
                alt="profile"
                className="h-10 mb-2 md:block hidden hover:scale-110 transition duration-200"
              />
            </Link>
          </li>

          <li className="mb-2">
            {clickedHamb ? (
              <RxCross2
                className="md:hidden text-white text-xl"
                onClick={() => setClickedHamb((prev) => !prev)}
              />
            ) : (
             <GiHamburgerMenu
                className="md:hidden text-white text-xl"
                onClick={() => setClickedHamb((prev) => !prev)}
              />
            )}
          </li>
        </ul>
      </div>

      <ul
        className={`md:hidden flex flex-col items-center gap-4 
        transition-all duration-200 ease-in-out
        ${clickedHamb ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"}
        bg-black/90`}
      >
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/popular" className="text-white">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/saved-videos" className="text-white">
            My List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
