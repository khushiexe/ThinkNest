import React, { useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import { AdminContext } from '../context/AdminContext';
import { AppContext } from '../context/AppContext';
import { FaClipboardList, FaSquarePlus } from "react-icons/fa6";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";

function Sidebar() {
  // FIXED: Changed setAtoken to setAToken so it matches your logout function
  const { aToken, setAToken } = useContext(AdminContext);
  const { navigate } = useContext(AppContext);

  const logOut = () => {
    navigate("/");
    aToken && setAToken(""); 
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="max-sm:flexCenter bg-deep sm:w-1/5 sm:min-h-[98vh] sm:fixed rounded-xl m-2">
      <div className="flex flex-col gap-y-6 max-sm:items-center sm:flex-col pt-4 sm:pt-14">
        {/* LOGO */}
        <Link to="/" className="bold-21 md-bold-24 flex flex-1 gap-y-1 flex-col text-white pl-2 lg:pl-[15%]">
          <span className="inline-flex">
            <span className="inline-flex items-center justify-center h-8 w-8 bg-secondary text-tertiary rounded-2xl -rotate-12">
              T
            </span>
            hinkNest
          </span>
          <span className="text-xs bg-secondary text-tertiary px-2 rounded-xl max-w-[76px]">
            {aToken ? "For Admin" : "For Tutor"}
          </span>
        </Link>

        {aToken && (
          <div className="flex sm:flex-col sm:gap-x-5 gap-y-8 sm:pt-10 text-white">
            
            {/* FIXED: Template literals safely combine base layout classes with Active-link */}
            {/* 1. Dashboard */}
            <NavLink 
              to="/admin-dashboard" 
              className={({ isActive }) => `flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10 transition-all
               duration-200 ${isActive ? "text-xl text-green-600 bg-secondary": "text-white"}`}
            >
              <FaListAlt className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Dashboard</div>
            </NavLink>

            {/* 2. All Sessions */}
            <NavLink 
              to="/all-sessions" 
              className={({ isActive }) => `flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10 transition-all
               duration-200 ${isActive ? "text-xl text-green-600 bg-secondary" : "text-white"}`}
            >
              <MdFactCheck className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">AllSessions</div>
            </NavLink>

            {/* 3. Tutors List */}
            <NavLink 
              to="/tutors-list" 
              className={({ isActive }) => `flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10 transition-all
               duration-200 ${isActive ? "text-xl text-green-600 bg-secondary" : "text-white"}`}
            >
              <FaClipboardList className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Tutors List</div>
            </NavLink>

            {/* 4. Add Tutor */}
            <NavLink 
              to="/add-tutor" 
              className={({ isActive }) => `flexStart gap-x-2 p-5 lg:pl-12 medium-15 cursor-pointer h-10 transition-all
               duration-200 ${isActive ? "text-xl text-green-600 bg-secondary" : "text-white"}`}
            >
              <FaSquarePlus className="text-lg sm:hidden md:flex" />
              <div className="hidden sm:flex">Add Tutor</div>
            </NavLink>

            {/* Logout Button */}
            <div className='max-sm:ml-5 sm:mt-48'>
              <button 
                onClick={logOut} 
                className='flexStart gap-x-2 lg:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-red-500' 
              >
               <BiLogOut className="text-lg sm:hidden md:flex" />
               <div className="hidden sm:flex">Logout</div>
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;