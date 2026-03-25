import Navbar from "./Navbar";
import Footer from "./Footer";

const buildImageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

const Account = () => {
  const renderAccount = () => {
    return (
      <>
        <div className="bg-white flex flex-col items-start justify-center px-10 lg:px-[164px] md:px-[100px] pt-28 pb-10">
          <h1 className="text-[#131313] md:text-3xl text-2xl font-[500] tracking-normal leading-[100%] pb-4">
            Account
          </h1>
          <ul className="flex gap-4 border-y-[#CBD5E1] border-y-2 py-6 w-full">
            <li>
              <h1 className="md:text-xl text-lg text-[#94A3B8]">Membership</h1>
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

  return (
    <div className="bg-[#181818] min-h-screen">
      <Navbar className="bg-[#131313] fixed" />
      {renderAccount()}
      <Footer />
    </div>
  );
};

export default Account;
