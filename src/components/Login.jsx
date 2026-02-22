import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const navigate= useNavigate()

  const onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onFailureLogin = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowErrorMsg(true);
  };

  const onSignIn= async (event)=> {
    event.preventDefault()
    const userDetails= {username, password}
    const url="https://apis.ccbp.in/login";
    const response= await fetch(url,{
      method: 'POST',
      body: JSON.stringify(userDetails)
    })
    const data= await response.json()

    if (response.ok) {
      onSuccessLogin(data.jwt_token);
    } else {
      onFailureLogin(data.error_msg);
    }
    

  }

  return (
    <div className="text-white bg-[#131313] min-h-screen  md:bg-[url('https://res.cloudinary.com/distnojxb/image/upload/v1771338835/netfilx_1_nuz4ey.png')] md:bg-cover md:bg-center">
      {/* Logo */}
      <img
        src="https://res.cloudinary.com/distnojxb/image/upload/v1771334227/Group_7399_1_f1gwrg.png"
        className="h-13 md:h-15 px-7 pt-7"
        alt="logo"
      />

      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={onSignIn} className="flex flex-col md:p-10 md:bg-black/60 md:rounded-md">
          <h1 className="text-3xl font-medium pb-8 md:text-center">Login</h1>

          <label htmlFor="username" className="text-xs pb-2">
            USERNAME
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event)=> setUsername(event.target.value)}
            placeholder="Username"
            className="p-2 w-64 md:w-80 rounded-sm outline-none bg-[#333333] placeholder:text-gray-300 placeholder:text-sm"
          />

          <br />

          <label htmlFor="password" className="text-xs pb-2">
            PASSWORD
          </label>

          <div className="relative w-64 md:w-80">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event)=> setPassword(event.target.value)}
              placeholder="Password"
              className="p-2 w-full  rounded-sm outline-none bg-[#333333] placeholder:text-gray-300 placeholder:text-sm pr-10"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2  cursor-pointer text-gray-400"
            >
              {showPassword ? (
                <IoEyeOffSharp className="text-white" />
              ) : (
                <IoEyeOutline className="text-white" />
              )}
            </span>
          </div>
          {showErrorMsg && <p className="text-red-500 text-sm pt-2">{errorMsg}</p>}

          <br />

          <button
            type="submit"
            className="bg-[#E50914] p-2 w-64 md:w-80 rounded-md mt-4 hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


