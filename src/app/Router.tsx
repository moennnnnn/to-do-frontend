import { createBrowserRouter } from "react-router-dom";

import SplashScreen from "../pages/general/SplashScreen";
import LandingPage from "../pages/general/LandingPage";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import EmailVerification from "../pages/auth/EmailVerification";
import CodeVerification from "../pages/auth/CodeVerification";
import Home from "../pages/todo/Home";
import InProgress from "../pages/todo/InProgress";
import Completed from "../pages/todo/Completed";

const router = createBrowserRouter([
    { path: "/", Component: SplashScreen},
    { path: "/landing", Component: LandingPage},

    { path: "/login", Component: Login},
    { path: "/signup", Component: SignUp},
    { path: "/forgot-password", Component: ForgotPassword},
    
    { path: "/verify-email", Component: EmailVerification},
    { path: "/verify-code", Component: CodeVerification},

    { path: "/home", Component: Home},
    { path: "/in-progress", Component: InProgress},
    { path: "/completed", Component: Completed},
]);

export default router;