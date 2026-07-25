import React, { useContext, useState } from "react";
import loginImg from "../assets/login.png";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currState, setCurrState] = useState("Admin");
  const {navigate , backendUrl} = useContext(AppContext) ;
  const {setAToken} = useContext(AdminContext) ;

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
  
      if (currState === "Admin") {
        const { data } = await axios.post( backendUrl + "/api/admin/login", { email, password });
        console.log(data);

        if (data.success) {
          // 1. Save to storage
        localStorage.setItem("aToken", data.token);
        
        // 2. Update state (Double-check your spelling here vs AdminContext!)
        setAToken(data.token); 
        
        // 3. Send the user to the dashboard
        navigate("/admin-dashboard");
        }else{
            toast.error(data.message) ;
        }
      }
    } catch (error) {
    //4. Actually catch and show the errors
    console.error("Login Error:", error);
    toast.error(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      {/* Container */}
      <div className="flex h-full w-full">

        {/* Image Side */}
        <div>
          <img src={loginImg} alt="" className="object-cover h-full w-full" />
        </div>

        {/* Form Side */}
        <div className="flexCenter w-full sm:w-1/2">
          <form onSubmit={onSubmitHandler} className=" flex flex-col items-center w-[90%] sm:max-w-md m-auto
          gap-y-5 text-gray-800">
            <div className=" w-full mb-4">
              <h3 className=" bold-32">
                <span className=" text-black border-b-4 border-red-500">{currState}</span>
              </h3>
            </div>
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
            <button type="submit" className="btn-dark w-full mt-5 !py-[7px] !rounded">
                Login
            </button>
            {currState === "Admin" ? (
                <p onClick={() => setCurrState("Tutor")} className="underline cursor-pointer text-red-500 text-lg">
                    Tutor Login?
                </p>) : 
            (
               <p onClick={() => setCurrState("Admin")} className="underline cursor-pointer text-red-500 text-lg">
                    Admin Login?
                </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;