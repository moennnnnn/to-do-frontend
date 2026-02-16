import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import SignUpLogo from "@/assets/SignUpLogo.png";
import { useAuthStore } from "@/stores/auth.store";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();

  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const { setRegister, loading } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!form.agree) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    const success = await setRegister({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      username: form.username,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
    if (success) {
      navigate("/login");
    }
  };

  return (
    // Full screen gradient background
    <div
      className="landing-page min-h-screen flex flex-col items-center justify-start 
      pt-16 px-6
      bg-linear-to-br from-[#7fb2e5] via-[#4f87c2] to-[#2b6cb0] "
    >
      {/* Logo */}
      <div className="mb-12">
        <img src={SignUpLogo} alt="signup-logo" className="w-44 mb-10" />
      </div>

      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm text-white text-sm font-[Lexend] "
      >
        {/* First Name */}
        <label className="block mb-1">First Name</label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border-double outline-1 outline-black">
          <IoPerson className="text-gray-600 mr-2" />
          <input
            type="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter your first name..."
            className="w-full text-gray-700 outline-none text-sm"
          />
        </div>

        {/* Last Name */}
        <label className="block mb-1">Last Name</label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border-double outline-1 outline-black">
          <IoPerson className="text-gray-600 mr-2" />
          <input
            type="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter your last name..."
            className="w-full text-gray-700 outline-none text-sm"
          />
        </div>

        {/* Email */}
        <label className="block mb-1">Email</label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border-double outline-1 outline-black">
          <IoMdMail className="text-gray-600 mr-2" />
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
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border-double outline-1 outline-black">
          <IoPerson className="text-gray-600 mr-2" />
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
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border-double outline-1 outline-black">
          <IoIosLock className="text-gray-600 mr-2" />
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
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border-double outline-1 outline-black">
          <IoIosLock className="text-gray-600 mr-2" />
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
          <div className="gap-2 font-[Lexend]">
            <span>I agree to the </span>
            <span
              onClick={() => setIsTermsOpen(true)}
              className="underline cursor-pointer text-amber-300"
            >
              Terms and Conditions
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center font-[Lexend]">
          <button
            type="submit"
            className="w-28 h-9 rounded-md font-medium transition bg-[#1C4D8D]"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-xs mt-6 font-[Lexend]">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer text-amber-300"
            onClick={() => navigate("/login")}
          >
            Login here.
          </span>
        </p>
      </form>
      {isTermsOpen && (
        <div
          onClick={() => setIsTermsOpen(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 font-[Lexend]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-full max-w-wd max-h-[70vh] overflow-y-auto relative text-sm text-gray-700"
          >
            <button
              onClick={() => setIsTermsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <FiX size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-black">
              Terms and Conditions
            </h2>

            <p className="mb-3">
              By creating an account, you agree to use this application for
              lawful purposes only.
            </p>

            <p className="mb-3">
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </p>

            <p className="mb-3">
              The application stores your tasks and account information for
              functionality purposes only.
            </p>

            <p className="mb-3">
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>

            <p>
              By continuing registration, you confirm that you have read and
              agree to these Terms and Conditions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
