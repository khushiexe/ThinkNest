import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import upload_icon from "../assets/upload_icon.png";
import { CgMenuLeft } from "react-icons/cg";
import { TbArrowNarrowRight } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";

import { AppContext } from "../context/AppContext";
import userImage from "../assets/user.jpg";

const Header = ({ aiMode, toggleHeader }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowMenu(false);
    navigate("/");
  };

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-50 bg-deep text-white py-3">
      <div className="max-padd-container flex items-center justify-between">

        {aiMode ? (
          <button
            onClick={toggleHeader}
            className="bold-24 flex bg-transparent border-none cursor-pointer text-white"
          >
            <span className="inline-flex items-center">
              <span className="inline-flex items-center justify-center h-8 w-8 bg-secondary text-tertiary rounded-2xl -rotate-12">
                T
              </span>
              hinkNest
            </span>
          </button>
        ) : (
          <Link to="/" className="bold-24 flex">
            <span className="inline-flex items-center">
              <span className="inline-flex items-center justify-center h-8 w-8 bg-secondary text-tertiary rounded-2xl -rotate-12">
                T
              </span>
              hinkNest
            </span>
          </Link>
        )}

        {/* ================= NAVBAR ================= */}
        <div className="mx-auto">
          <Navbar
            menuOpened={menuOpened}
            toggleMenu={toggleMenu}
            containerStyles={
              menuOpened
                ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-deep z-50 px-10 py-4 shadow-2xl"
                : "hidden xl:flex gap-x-5 xl:gap-x-12 medium-15 rounded-full px-2 py-1"
            }
          />
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-end gap-x-3 sm:gap-x-10">

          {/* Mobile Menu Icon */}
          {!menuOpened && (
            <CgMenuLeft
              className="text-2xl xl:hidden cursor-pointer"
              onClick={toggleMenu}
            />
          )}

          {/* Login / Profile */}
          {token ? (
            <div className="relative">

              <img
                src={userData?.image || userImage}
                alt="User"
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />

              {showMenu && (
                <ul
                  className="
                    absolute
                    right-0
                    top-14
                    w-44
                    bg-white
                    text-gray-700
                    rounded-lg
                    shadow-xl
                    ring-1
                    ring-slate-200
                    z-[9999]
                    overflow-hidden
                  "
                >
                  <li
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                    className="flexBetween px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <p>My Profile</p>
                    <TbArrowNarrowRight className="opacity-50 text-lg" />
                  </li>

                  <hr />

                  <li
                    onClick={() => {
                      navigate("/my-sessions");
                      setShowMenu(false);
                    }}
                    className="flexBetween px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <p>My Sessions</p>
                    <TbArrowNarrowRight className="opacity-50 text-lg" />
                  </li>

                  <hr />

                  <li onClick={logout} className="flexBetween px-4 py-3 hover:bg-gray-100 cursor-pointer">
                    <p className="text-red-500">Logout</p>
                    <TbArrowNarrowRight className="opacity-50 text-lg" />
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn-white !border-none flexCenter gap-x-2 !py-3"
            >
              Login
              <RiUserLine />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;