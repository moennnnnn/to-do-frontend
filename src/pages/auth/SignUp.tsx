import SignUpLogo from "@/assets/SignUpLogo.png";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/home");
  };
  return (
    // BG
    <div className="landing-page">
      <div className="flex flex-col items-center mb-20">
        <img src={SignUpLogo} alt="signup-logo" />
      </div>
      <div className="flex flex-col text-white items-center justify-center">
        <div className="mb-35">
          {/* Email*/}
          <label className="block text-sm mb-1">Email</label>
          <div className="border-double mb-3 outline-1 outline-black w-90 h-8 flex items-center bg-white rounded-md px-3 py-2 ">
            <span className="text-gray-600 mr-2">
              <IoMdMail />
            </span>
            <input
              type="text"
              placeholder="Enter your email..."
              className="w-full text-gray-700 outline-none"
            />
          </div>

          {/* Username */}
          <label className="block text-sm mb-1">Username</label>
          <div className="border-double mb-3 outline-1 outline-black w-90 h-8 flex items-center bg-white rounded-md px-3 py-2 ">
            <span className="text-gray-600 mr-2">
              <IoPerson />
            </span>
            <input
              type="text"
              placeholder="Enter your username..."
              className="w-full text-gray-700 outline-none"
            />
          </div>

          {/* Password */}
          <label className="block text-sm mb-1">Password</label>
          <div className="mb-3 border-double outline-1 outline-black w-90 h-8 flex items-center bg-white rounded-md px-3 py-2 ">
            <span className="text-gray-600 mr-2">
              <IoIosLock />
            </span>
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-full text-gray-700 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <label className="block text-sm mb-1">Confirm Password</label>
          <div className="border-double outline-1 outline-black w-90 h-8 flex items-center bg-white rounded-md px-3 py-2 ">
            <span className="text-gray-600 mr-2">
              <IoIosLock />
            </span>
            <input
              type="password"
              placeholder="Re-enter your password..."
              className="w-full text-gray-700 outline-none"
            />
          </div>
          
          {/* Login */}
          <button
            className="mb-5 mt-20 text-white bg-[#1C4D8D] w-24 h-8 rounded-sm text items-center font-[Lexend]"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
