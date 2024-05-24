import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./Dashboard.css";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setUserName(user.displayName);
    }
  }, [user]);

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        const auth = auth.signOut();
      
        navigate("/login");
        return auth;
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const DeleteAcc = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
        navigate("/signUp");
        console.log("Deleted");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        toast.error(error.message);
      });
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="dashboard">
        <h1 className="has-text-centered mb-4 is-size-2">
          Welcome {user.displayName === null ? "user" : userName} 👏
        </h1>
        <div className="is-flex is-align-content-center is-justify-content-center">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={SignOut}>
                {" "}
                <Link to={"/login"} className="has-text-white">
                  Logout
                </Link>
              </button>
            </div>
            <div className="control">
              <button className="button is-danger" onClick={DeleteAcc}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
