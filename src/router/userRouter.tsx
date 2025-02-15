import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/user/Landing1";
import LoginPage from "../pages/user/Login";
import SignupPage from "../pages/user/Register";
import OTPPage from "../pages/user/otpPage";
import HomePage from "../pages/user/Home";
import Protect from "./protect/Protect";
import ErrorPage from "../pages/user/Error";
import NotAuthorized from "../pages/user/notAuthorized";
import App from "../App";
import SuccessPage from "../pages/user/Success";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignupPage />,
  },
  {
    path: "/otp",
    element: <OTPPage />,
  },
  {
    path: "/notAuthorized",
    element: <NotAuthorized />,
  },
  {
    path: "/success",
    element: <SuccessPage/>,
  },
  {
    path: "/home",
    element: (
      <Protect>
        <App />
      </Protect>
    ),
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
    ],
  },
]);

export default appRouter;
