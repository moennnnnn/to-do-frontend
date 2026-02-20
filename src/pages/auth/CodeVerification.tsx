import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axiosInstance from "@/axios/axios-instance";
import { showError } from "@/utils/error/error.util";
import toast from "react-hot-toast";
import VerificationCodeLogo from "@/assets/VerificationCodeLogo.png";

function CodeVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // numbers only
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/verify-code", {
        email,
        code: fullCode,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await axiosInstance.post("/auth/send-code", { email });
      toast.success(response.data.message);
    } catch (error) {
      showError(error);
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
          src={VerificationCodeLogo}
          alt="code-logo"
          className="w-50 mb-20"
        />
      </div>

      <p className="text-white/80 text-sm font-[Lexend] text-center mb-8 px-8">
        Enter the verification code sent <br /> to your email.
      </p>

      {/* OTP inputs */}
      <div className="flex gap-3 mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-12 text-center text-lg font-bold bg-white rounded-md outline-none text-gray-700 font-[Lexend]"
          />
        ))}
      </div>

      <button
        onClick={handleConfirm}
        className="w-full max-w-xs bg-[#1C4D8D] text-white py-2 rounded-md font-[Lexend] font-medium mb-4"
      >
        {loading ? "Verifying..." : "Confirm"}
      </button>

      <p className="text-white/70 text-xs font-[Lexend]">
        Didn't get the code?{" "}
        <span
          onClick={handleResend}
          className="underline cursor-pointer text-amber-300"
        >
          Resend
        </span>
      </p>
    </div>
  );
}

export default CodeVerification;
