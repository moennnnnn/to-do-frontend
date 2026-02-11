import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/global.css";
import AppLogo from "@/assets/AppLogo.png"

function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const navTimer = setTimeout(() => {
      navigate("/landing", { replace: true });
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center rounded-3xl overflow-hidden
      bg-[#4988C4]
      transition-opacity duration-700
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
        <div>
            <img src= {AppLogo} alt="app-logo" />
        </div>
        
    </div>
  );
}

export default SplashScreen;
