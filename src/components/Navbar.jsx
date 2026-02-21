import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ className = "", searchText, setSearchText, onSearch }) => {
  const [clickedHamb, setClickedHamb] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      onSearch();
    }
  };

  return (
    <nav className={`w-full px-9  md:px-[164px] ${className}`}>
      <div className="max-w-7xl flex justify-between items-center text-white py-[20px] ">
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
              className="hidden md:block  md:text-md hover:underline hover:decoration-red-500"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/popular"
              className="hidden md:block md:text-md hover:underline hover:decoration-red-500"
            >
              Popular
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
                  width="20"
                  height="20"
                  data-icon="MagnifyingGlassMedium"
                  data-icon-id=":re:"
                  aria-hidden="true"
                  class="search-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  role="img"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          )}

          {isSearchPage && (
            <li className="flex items-center">
              <div
                className="
                flex items-center
                border border-[#F8FAFC]
                rounded-md
                overflow-hidden
                lg:w-[300px]
                md:w-[150px]
                w-[180px]
                h-[32px]
                focus-within:border-red-500
                transition duration-300
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
                  <FaSearch className="text-white text-sm" />
                </button>
              </div>
            </li>
          )}

          <li>
            <button className="hover:scale-110  md:h-7 h-6  transition duration-200">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                data-icon="BellMedium"
                data-icon-id=":Raskiaq:"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.9c-.23 0-.43.15-.42.37"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <li>
            <Link to="/account">
             <button  className="md:h-7 h-6 md:block hidden hover:scale-110 transition duration-200">
              <img
                class="rounded-xs pb-3 h-9"
                src="https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                alt="avatar"
              ></img>
            </button>
            </Link>
           
          </li>

          <li>
            {clickedHamb ? (
              <RxCross2
                className="md:hidden text-white text-xl"
                onClick={() => setClickedHamb((prev) => !prev)}
              />
            ) : (
              <button  className="md:hidden text-white"  onClick={() => setClickedHamb((prev) => !prev)}>
              <img
                class="rounded-xs md:h-7 h-6"
                src="https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                alt="avatar"
              ></img>
            </button>
            )}
          </li>
        </ul>
      </div>

      <ul
        className={`md:hidden flex flex-col items-center gap-4 
        transition-all duration-200 ease-in-out
        ${clickedHamb ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"}
        bg-black/80`}
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
          <Link to="/account" className="text-white">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
