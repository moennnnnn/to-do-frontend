import { useNavigate } from "react-router-dom";
import "@/styles/global.css";
import AppLogo from "@/assets/AppLogo.png"

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="relative">
        <img src={AppLogo} alt="app-logo" className="absolute inset-x-0 top-0"/>
      </div>

      <button
        className="absolute bottom-10 w-90 h-8 bg-[#1C4D8D] text-white rounded-md font-[Lexend]"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  );
}
