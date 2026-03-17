import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const links = [
    "Audio Description",
    "Help Centre",
    "Gift Cards",
    "Media Centre",
    "Investor Relations",
    "Jobs",
    "Terms of Use",
    "Privacy",
    "Legal Notices",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
  ];

  return (
    <footer className="bg-[#181818] text-[#b3b3b3] px-6 md:px-[164px] py-14">
      <p className="text-sm mb-6">
        Questions? Call{" "}
        <a className="underline hover:text-white" href="tel:000-800-919-1694">
          000-800-919-1694
        </a>
      </p>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3 text-[13px]">
        {links.map((label) => (
          <li key={label}>
            <button
              type="button"
              className="text-left hover:underline hover:text-white"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-4">
        <button
          type="button"
          className="w-fit border border-[#737373] px-3 py-1 text-sm hover:text-white hover:border-white transition"
        >
          Service Code
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          <p>
          <span className="text-xs text-[#737373]"> 
          {new Date().getFullYear()} © Movies   {"  "}
          </span>
        
            Built with love by{" "}
            <a
              href="https://www.linkedin.com/in/rctaware/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Rohan Taware 
            </a>
            {" "}
            ❤️
          
          </p>

          <div className="flex items-center gap-4 text-lg">
            <a
              href="https://x.com/Rctaware05"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rohan on X"
              className="hover:text-white"
            >
              <RiTwitterXFill />
            </a>
            <a
              href="https://www.linkedin.com/in/rctaware/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rohan on LinkedIn"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <p className="text-xs text-[#737373]">
        {new Date().getFullYear()} © Movies 
        </p>
      </div>
    </footer>
  );
};

export default Footer;

