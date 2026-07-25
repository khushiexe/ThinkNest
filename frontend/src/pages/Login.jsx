import React, { useContext, useState } from "react";
import loginImg from "../assets/login.png";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const { navigate, token, setToken , backendUrl } = useContext(AppContext);
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currState === "Sign Up") {
          const { data } = await axios.post(
              backendUrl + "/api/user/register",
              { name, email, password }
          )
  
          if (data.success) {
            localStorage.setItem("token",data.token) ;
            setToken(data.token) ;
          }else{
            toast.error(data.message) ;
          }
      }else{
        const { data } = await axios.post(backendUrl + "/api/user/login",{ email, password })
      if (data.success) {
        localStorage.setItem("token",data.token) ;
        setToken(data.token) ;
      }else {
          toast.error(data.message)
      }
      }
  
  } catch (error) {
    console.error("An error occurred during submission:", error);
  }
  };

  useEffect(() => {
    if (token) {
        navigate("/")
    }
}, [token])

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      {/* Container */}
      <div className="flex h-full w-full">

        {/* Image Side */}
        <div className="w-1/2 hidden sm:block">
          <img
            src={loginImg}
            alt="login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Side */}
        <div className="flex w-full sm:w-1/2 items-center justify-center">

          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto gap-y-5 text-gray-800"
          >

            <div className="w-full mb-4">
              <h3 className="bold-36">{currState}</h3>
            </div>

            {currState === "Sign Up" && (
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="medium-14"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1 ring-1 ring-slate-900/10 bg-primary mt-1"
                />
              </div>
            )}

            <div className="w-full">
              <label
                htmlFor="email"
                className="medium-14"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 bg-primary mt-1"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="medium-14"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 bg-primary mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn-dark w-full mt-5 !py-[7px] !rounded"
            >
              {currState === "Sign Up"
                ? "Sign Up"
                : "Login"}
            </button>

            <div className="w-full flex flex-col gap-y-3 medium-14">

              {currState === "Login" ? (
                <div className="">
                  Don't have an account?{" "}
                  <span
                    onClick={() =>
                      setCurrState("Sign Up")
                    }
                    className="cursor-pointer text-red-500 underline"
                  >
                    Create account
                  </span>
                </div>
              ) : (
                <div className="">
                  Already have an account?{" "}
                  <span
                    onClick={() =>
                      setCurrState("Login")
                    }
                    className="cursor-pointer text-red-500 underline"
                  >
                    Login
                  </span>
                </div>
              )}

            </div>

          </form>

        </div>

      </div>
    </section>
  );
};

export default Login;