import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/splashscreen/LandingPage";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import EmailVerification from "@/pages/auth/EmailVerification";
import CodeVerification from "@/pages/auth/CodeVerification";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Home from "@/pages/todo/Home";

function App() {
  const router = createBrowserRouter([
    { path: "/", Component: LandingPage },

    { path: "/login", Component: Login },

    { path: "/signup", Component: SignUp },

    { path: "/emailverification", Component: EmailVerification },

    { path: "/codeverification", Component: CodeVerification },

    { path: "/forgotpassword", Component: ForgotPassword },

    { path: "/home", Component: Home },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
