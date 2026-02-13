import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import SignUpLogo from "@/assets/SignUpLogo.png";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    )
      return;

    if (form.password !== form.confirmPassword) return;
    if (!form.agree) return;

    navigate("/login");
  };

  const isDisabled =
    !form.email ||
    !form.username ||
    !form.password ||
    !form.confirmPassword ||
    !form.agree ||
    form.password !== form.confirmPassword;

  return (
    // Full screen gradient background
    <div
      className="min-h-screen flex flex-col items-center justify-start 
      pt-16 px-6
      bg-linear-to-br from-[#7fb2e5] via-[#4f87c2] to-[#2b6cb0] rounded-3xl"
    >
      {/* Logo */}
      <div className="mb-12">
        <img src={SignUpLogo} alt="signup-logo" className="w-44 mb-12 mt-10" />
      </div>

      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm text-white text-sm"
      >
        {/* Email */}
        <label className="block mb-1">Email</label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-4">
          <IoMdMail className="text-gray-500 mr-2" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email..."
            className="w-full text-gray-700 outline-none text-sm"
          />
        </div>

        {/* Username */}
        <label className="block mb-1">Username</label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-4">
          <IoPerson className="text-gray-500 mr-2" />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username..."
            className="w-full text-gray-700 outline-none text-sm"
          />
        </div>

        {/* Password */}
        <label className="block mb-1">Password</label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-4">
          <IoIosLock className="text-gray-500 mr-2" />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password..."
            className="w-full text-gray-700 outline-none text-sm"
          />
        </div>

        {/* Confirm Password */}
        <label className="block mb-1">Confirm Password</label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3">
          <IoIosLock className="text-gray-500 mr-2" />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password..."
            className="w-full text-gray-700 outline-none text-sm"
          />
        </div>

        {/* Terms */}
        <div className="flex items-center text-xs mb-6">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mr-2"
          />
          <span>I agree to the </span> <span className="underline cursor-pointer"> Terms and Conditions</span>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-28 h-9 rounded-md font-medium transition
              ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1C4D8D] hover:bg-[#163d72]"
              }`}
          >
            Sign up
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-xs mt-6">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here.
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
