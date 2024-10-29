import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import navbarData from '../utils/navbarData.json';
import { ADMIN_ID ,HR_ID} from '../utils/constantData';

const Navbar = () => {
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogoutDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return isAuthenticated && user ? (
    <nav className="bg-gradient-to-r from-sky-400 to-blue-400 text-white fixed w-full top-0 z-20 sm:px-4">
      <div className="flex justify-between items-center xl:px-4 py-2 px-3">
        {/* Left Section */}
        <div className="flex items-center justify-between py-4 px-1">
          {/* Mobile Menu Icon */}
          <FaBars
            onClick={() => setShowNavbarMenu((prev) => !prev)}
            className="text-2xl md:hidden block cursor-pointer"
          />
          {/* Dropdown Menu for Mobile */}
          <ul
            className={`${
              showNavbarMenu ? 'translate-x-0' : '-translate-x-full'
            } fixed top-20 left-0 h-full bg-gradient-to-r from-sky-400 to-blue-400 space-y-4 px-4 py-2 w-[70vw] transition-transform duration-300 ease-in-out md:hidden`}
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
            {(user.roleId === ADMIN_ID || user.roleId === HR_ID) &&
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

          {/* Horizontal Navbar for Desktop */}
          <ul className="hidden md:flex md:space-x-6 md:bg-transparent">
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
            {(user.roleId === ADMIN_ID || user.roleId === HR_ID) &&
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

        {/* Right Section: User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowLogoutDropdown((prev) => !prev)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FaUserCircle className="text-3xl" />
          </div>
          {/* Dropdown Menu */}
          {showLogoutDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg text-gray-800 z-10 w-40 sm:w-64  sm:p-4 p-2">
              {/* User Info */}
              <div className="sm:px-4 sm:py-3  border-b border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-lg">
                <h1 className="font-semibold text-sm text-gray-700 truncate sm:p-1">
                  {user.firstName || 'No Name'}
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || 'No Email'}
                </p>
              </div>

              {/* Logout Button */}
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => {
                    setShowLogoutDropdown(false);
                    onLogoutClick();
                  }}
                  className="w-full sm:px-4 sm:py-2 px-2 py-1 text-lg text-white bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-400 transition duration-300 ease-in-out rounded-lg shadow-md"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  ) : null;
};

export default Navbar;
