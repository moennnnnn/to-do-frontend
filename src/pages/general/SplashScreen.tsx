import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/global.css";
import AppLogo from "@/assets/AppLogo.png";

function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.5s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // Navigate AFTER fade animation (1.5s + 700ms transition)
    const navTimer = setTimeout(() => {
      navigate("/landing", { replace: true });
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center rounded-3xl overflow-hidden
      bg-linear-to-br from-[#7fb2e5] via-[#4f87c2] to-[#2b6cb0]
      transition-opacity duration-700
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <img
        src={AppLogo}
        alt="app-logo"
        className="opacity-0 translate-y-0 animate-logo"
      />
    </div>
  );
}

export default SplashScreen;
