import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import navbarData from '../utils/navbarData.json';
import { ADMIN_ID } from '../utils/constantData';

const Navbar = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };
  return isAuthenticated && user ? (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white fixed w-full top-0 z-20">
      <div className="flex justify-between items-center py-4 px-4">
        {/* Left Section: Hamburger and Links */}
        <div className="flex items-center">
          <FaBars
            onClick={() => setShowNavbarMenu((prev) => !prev)}
            className="text-2xl md:hidden block cursor-pointer"
          />
          <ul
            className={`${
              showNavbarMenu ? 'block' : 'hidden'
            } md:flex md:space-x-6 absolute md:static left-0 top-full w-full md:w-auto bg-blue-700 md:bg-transparent space-y-4 md:space-y-0 md:flex-row px-4 py-2 md:p-0`} // Positioning menu properly
          >
            <li>
              <NavLink
                to="/polls"
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-gray-300'
                }
              >
                Polls
              </NavLink>
            </li>
            {user.roleId === ADMIN_ID &&
              navbarData.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'text-white' : 'text-gray-300'
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>

        {/* Right Section: User and Logout */}
        <div className="relative flex items-center cursor-pointer">
          <div
            onClick={() => setShowLogoutBtn((prev) => !prev)}
            className="flex items-center space-x-3"
          >
            <FaUserCircle className="text-3xl" />
            <div>
              <h1 className="text-sm md:text-base">
                {user.firstName || 'No Name'}
              </h1>
              <p className="text-xs md:text-sm">{user.email || 'No Email'}</p>
            </div>
          </div>
          {showLogoutBtn && (
            <div className="absolute right-0 mt-36 w-32  text-white rounded-md shadow-lg z-10">
            <button
              onClick={() => {
                setShowLogoutBtn(false); // Hide logout after clicking
                onLogoutClick();
              }}
              className="block w-full text-left px-4 py-2 text-xl bg-red-500 rounded-md "
            >
              Logout
            </button>
          </div>          
          )}
        </div>
      </div>
    </nav>
  ) : null;
};

export default Navbar;
