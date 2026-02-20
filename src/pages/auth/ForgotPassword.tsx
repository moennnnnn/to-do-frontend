import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff, IoIosLock } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import axiosInstance from "@/axios/axios-instance";
import { showError } from "@/utils/error/error.util";
import toast from "react-hot-toast";
import ForgotPasswordLogo from "@/assets/ForgotPasswordLogo.png";
import { IoArrowBack } from "react-icons/io5";

type Step = "email" | "code" | "password";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      toast.success(response.data.message);
      setStep("code");
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post("/auth/verify-code", { email, code: fullCode });
      setStep("password");
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email,
        newPassword, // no code needed
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
      <div className="mb-2">
        <img
          src={ForgotPasswordLogo}
          alt="4gotpass-logo"
          className="w-50 mb-20"
        />
      </div>

      <div className="w-full max-w-xs px-4">
        {/* Step 1 - Email */}
        {step === "email" && (
          <>
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
              className="w-full bg-[#1C4D8D] text-white py-2 rounded-md font-[Lexend] font-medium mb-18"
            >
              {loading ? "Sending..." : "Send code"}
            </button>
          </>
        )}

        {/* Step 2 - OTP */}
        {step === "code" && (
          <>
            <p className="text-white/80 text-sm font-[Lexend] text-center mb-6">
              Enter the 6-digit code sent to <br />
              <span className="text-amber-300">{email}</span>
            </p>
            <div className="flex gap-3 mb-6 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 text-center text-lg font-bold bg-white rounded-md outline-none text-gray-700"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyCode}
              className="w-full bg-[#1C4D8D] text-white py-2 rounded-md font-[Lexend] font-medium"
            >
              {loading ? "Verifying..." : "Verify code"}
            </button>
          </>
        )}

        {/* Step 3 - New Password */}
        {step === "password" && (
          <>
            <label className="block text-white text-sm font-[Lexend] mb-1">
              New password
            </label>
            <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3">
              <IoIosLock className="text-gray-400 mr-2" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password..."
                className="w-full text-gray-700 outline-none text-sm font-[Lexend]"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="text-gray-400 ml-2"
              >
                {showNew ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>

            <label className="block text-white text-sm font-[Lexend] mb-1">
              Confirm your password
            </label>
            <div className="flex items-center bg-white rounded-md px-3 py-2 mb-4">
              <IoIosLock className="text-gray-400 mr-2" />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password..."
                className="w-full text-gray-700 outline-none text-sm font-[Lexend]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="text-gray-400 ml-2"
              >
                {showConfirm ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-[#1C4D8D] text-white py-2 rounded-md font-[Lexend] font-medium"
            >
              {loading ? "Resetting..." : "Change password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
