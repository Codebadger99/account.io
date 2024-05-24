import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const LinkRedirect = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="has-text-centered">
        {" "}
        <h1 className="is-size-2 mb-2">An Email will be sent to you shortly</h1>
        <p>
          please click this <Link onClick={LinkRedirect}>Link</Link> to be
          redirected to the login page after you have updated your password
        </p>
      </div>
    </>
  );
};

export default UpdatePassword;
