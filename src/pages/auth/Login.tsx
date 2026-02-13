import "@/styles/global.css";
import AppLogo from "@/assets/AppLogo.png";
import LoginLogo from "@/assets/LoginLogo.png";
import { IoPerson } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import type { AccountType } from "@/types/account/account.type";
import { useState, type ChangeEvent } from "react";

function Login() {
  const navigate = useNavigate();
  const { loading, setLogin } = useAuthStore();

  const [form, setForm] = useState<Partial<AccountType>>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Form: ", form);
    const success = await setLogin(form);
    if (success) {
      navigate("/home");
    }
  };
  return (
    <div className="landing-page relative overflow-hidden">
      {/* White curved top */}
      <div className="absolute top-0 left-0 w-full h-40 bg-white/40 rounded-b-[100%]"></div>

      {/*App Logo*/}
      <div className="absolute top-6">
        <img src={AppLogo} alt="app-logo" />
      </div>

      {/*Login Logo*/}
      <div>
        <img src={LoginLogo} alt="login-logo" />
      </div>

      <form
        onSubmit={submitForm}
        className="flex flex-col z-10 mt-24 text-white items-center justify-center"
      >
        <div className="">
          {/* Username */}
          <label className="block text-sm mb-1 font-[Lexend]">Username</label>
          <div className="border-double mb-4 outline-1 outline-black w-90 h-8 flex items-center bg-white rounded-md px-3 py-2 ">
            <span className="text-gray-600 mr-2">
              <IoPerson />
            </span>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username..."
              className="font-[Lexend] w-full text-gray-700 outline-none"
            />
          </div>

          {/* Password */}
          <label className="block text-sm mb-1 font-[Lexend]">Password</label>
          <div className="border-double outline-1 outline-black w-90 h-8 flex items-center bg-white rounded-md px-3 py-2 ">
            <span className="text-gray-600 mr-2">
              <IoIosLock />
            </span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="w-full text-gray-700 outline-none font-[Lexend]"
            />
          </div>
        </div>

        {/* Remember Me */}
        <div className="font-[Lexend] ml-1 text-white flex flex-row justify-between items-center gap-30">
          <div className="">
            <input className="accent-white mr-2 " type="checkbox" />
            <label>Remember Me</label>
          </div>

          {/* Forgot Pass */}
          <Link
            to="/forgotpassword"
            className=" underline font-[Lexend] text-sm text-amber-300"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login */}
        <button
          type="submit"
          className="text-white bg-[#1C4D8D] w-24 h-8 rounded-sm text items-center font-[Lexend]"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Sign Up */}
        <div className="text-white font-[Lexend] text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline text-amber-300">
            {" "}
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
