import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Password from "../pages/Password/Password";
import Welcome from "../pages/Welcome/Welcome";
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword";
import PrivateRoute from "../components/privateRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/dashboard",
    element: <PrivateRoute element={<Dashboard />} />,
  },
  {
    path: "/forgotPassword",
    element: <Password />,
  },
  {
    path: "/updatePassword",
    element: <UpdatePassword />,
  },
]);

export default route;
