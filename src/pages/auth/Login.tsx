import "@/styles/global.css";
import AppLogo from "@/assets/AppLogo.png";

function Login() {
  return (
    <div className="landing-page">
      <div className="absolute top-0 left-0 w-full h-40 bg-white/40 rounded-b-[100%]"></div>
      <div>
        <img src={AppLogo} alt="app-logo" />
      </div>
      <h1> Login </h1>

      <h3 className="font-[Lexend]"> Username </h3>
      <input type="text" placeholder="Enter your username..." />
      <h3 className="font-[Lexend]"> Password </h3>
      <input type="text" placeholder="Enter your password..." />
      <label>
        <input className="accent-pink-500" type="checkbox" checked />
        Remember Me
      </label>
      <a className="font-[Lexend] text-sm" href="../ForgotPassword.tsx">
        Forgot Password?
      </a>
      <button>Login</button>
    </div>
  );
}

export default Login;
