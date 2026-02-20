import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import axiosInstance from "@/axios/axios-instance";
import { showError } from "@/utils/error/error.util";
import toast from "react-hot-toast";
import EmailVerificationLogo from "@/assets/EmailVerificationLogo.png";

function EmailVerification() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/send-code", { email });
      toast.success(response.data.message);
      navigate("/codeverification", { state: { email } });
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white text-2xl"
      >
        <IoArrowBack />
      </button>

      {/* Logo */}
      <div className="mb-12">
        <img
          src={EmailVerificationLogo}
          alt="email-logo"
          className="w-50 mb-20"
        />
      </div>

      <div className="w-full max-w-xs px-4">
        <label className="block text-white text-sm font-[Lexend] mb-1">
          Email
        </label>
        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-4">
          <IoMdMail className="text-gray-400 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="w-full text-gray-700 outline-none text-sm font-[Lexend]"
          />
        </div>

        <button
          onClick={handleSendCode}
          className="w-full bg-[#1C4D8D] text-white py-2 rounded-md font-[Lexend] font-medium"
        >
          {loading ? "Sending..." : "Send code"}
        </button>
      </div>
    </div>
  );
}

export default EmailVerification;
