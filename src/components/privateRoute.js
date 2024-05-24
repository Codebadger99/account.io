import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import { useEffect } from "react";

const auth = getAuth(app);

const privateRoute = ({ element }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? element : null;
};

export default privateRoute;
