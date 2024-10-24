import React, { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../slices/authSlice';
import navbarData from "../utils/navbarData.json"; 
import { ADMIN_ID } from "../utils/constantData"; 

const Navbar = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);
  const user = useSelector((state) => state.auth.user); 
  console.log(user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout()); 
    navigate("/"); 
  };

  return (
    isAuthenticated && user ? (
      <nav className="bg-black text-white">
        <div className="flex justify-between items-center py-4 px-4">
          <div className="flex items-center">
            <FaBars 
              onClick={() => setShowNavbarMenu(!showNavbarMenu)} 
              className="text-2xl md:hidden block cursor-pointer"
            />
           
            <ul className={`md:flex ${showNavbarMenu ? "block" : "hidden"} md:space-x-6 mt-4 md:mt-0 md:flex-row`}>
              
              <li>
                <NavLink to="/polls" className={({ isActive }) => isActive ? "text-white" : "text-gray-500"}>
                  Polls
                </NavLink>
              </li>
              {user.roleId === ADMIN_ID && (
                <>
                  {navbarData.map((item, index) => (
                    <li key={index}>
                      <NavLink 
                        to={item.path} 
                        className={({ isActive }) => isActive ? "text-white" : "text-gray-500"}>
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="relative flex items-center cursor-pointer">
            <div onClick={() => setShowLogoutBtn(!showLogoutBtn)} className="flex items-center space-x-3">
              <FaUserCircle className="text-3xl" />
              <div>
                <h1 className="text-sm md:text-base">{user.name || 'No Name'}</h1>
                <p className="text-xs md:text-sm">{user.email || 'No Email'}</p>
              </div>
            </div>
            {/* Logout Dropdown */}
            {showLogoutBtn && (
              <div className="absolute right-0 mt-32 w-32 bg-red-500 text-white rounded-md shadow-lg z-10">
                <button 
                  onClick={onLogoutClick} 
                  className="block w-full text-left px-4 py-2 text-sm">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    ) : null
  );
};

export default Navbar;
