import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/user/Landing1';
import LoginPage from '../pages/user/Login';
import SignupPage from '../pages/user/Register';
const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<LandingPage/>
    },
    {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/signUp',
        element:<SignupPage/>
      },
]);

export default appRouter;