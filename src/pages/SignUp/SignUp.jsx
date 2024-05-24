import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase";

const schema = yup
  .object({
    name: yup
      .string(20, "Name must be at least 20 characters")
      .required("Name must not be empty"),
    email: yup.string().email().required("Email must not be empty"),
    password: yup
      .string()
      .min(10, "Password must be at least 10 characters")
      .required("Password is required"),
  })
  .required();

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const auth = getAuth(app);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (data) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // ...
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }

    console.log(data);
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="SignWidth">
          <div>
            <h1 className="is-size-2 has-text-weight-bold">Register</h1>
            <p className="mt-3">Enter your user details below.</p>
          </div>

          <div className="mt-5">
            <div className="field mb-5">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                />
              </div>
              <p className="help is-danger">{errors.name?.message}</p>
            </div>
            <div className="field mb-5">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              <p className="help is-danger">{errors.email?.message}</p>
            </div>
            <div className="field mb-5">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              <p className="help is-danger">{errors.password?.message}</p>
            </div>
            <div className="field mb-5 is-flex is-justify-content-center is-align-content-center">
              <div className="control">
                <button className="button is-danger" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 has-text-centered">
            <p>
              Have an account?{" "}
              <Link className="has-text-danger" to={"/login"}>
                Login!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
