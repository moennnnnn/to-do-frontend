import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/general/LandingPage";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import EmailVerification from "@/pages/auth/EmailVerification";
import CodeVerification from "@/pages/auth/CodeVerification";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Home from "@/pages/todo/Home";
import SplashScreen from "@/pages/general/SplashScreen";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/stores/token/token.store";


function AppInitializer({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const init = useTokenStore((s) => s.init);

  useEffect(() => {
    init().finally(() => setReady(true));
  }, [init]);

  if (!ready) return null; // or a loading spinner

  return <>{children}</>;
}

function App() {
  const router = createBrowserRouter([
    { path: "/", Component: SplashScreen },

    { path: "/landing", Component: LandingPage },

    { path: "/login", Component: Login },

    { path: "/signup", Component: SignUp },

    { path: "/emailverificaiton", Component: EmailVerification },

    { path: "/codeverification", Component: CodeVerification },

    { path: "/forgotpassword", Component: ForgotPassword },

    { path: "/home", Component: Home },
  ]);
  return (
   <AppInitializer>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </AppInitializer>
  );
}

export default App;
