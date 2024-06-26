import "./Password.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebase/firebase";

const schema = yup
  .object({
    email: yup.string().email().required("Please input your Email address"),
  })
  .required();

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleClick = () => {
    navigate("/login");
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    if (data) {
      sendPasswordResetEmail(auth, data.email)
        .then(() => {
          // Password reset email sent!
          // ..
          navigate("/updatePassword");
          //..
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button className="button is-white mb-5 back" onClick={handleClick}>
          Back
        </button>
        <div className="password">
          <h1 className="is-size-4 has-text-weight-bold is-text-centered mb-4">
            Forgot Password
          </h1>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <div className="is-flex is-justify-content-space-between">
            <p className="help is-danger">{errors.email?.message}</p>
          </div>

          <button className="mt-4 button is-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Password;
