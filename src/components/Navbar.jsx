// Navbar.jsx
import { useEffect, useState } from "react";
import { FaCaretDown, FaHeart, FaSignOutAlt, FaUser, FaHome, FaUtensils, FaShoppingCart, FaInfoCircle, FaEnvelope, FaCrown } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo1.png";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUser(userObj);
        
        // Load user-specific cart count
        const userCart = JSON.parse(localStorage.getItem(`cart_${userObj.id}`) || "[]");
        setCartItemCount(userCart.length);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = (event) => {
      setCartItemCount(event.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setCartItemCount(0); // Reset cart count on logout
    setIsDropdownOpen(false);
    setShowLogoutConfirm(false);
    navigate("/");
    toast.success("You have been logged out!");
  };

  // Simulate authentication (replace with your actual auth logic)
  const isLoggedIn = !!localStorage.getItem("token"); // or your auth check

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Cookbook Logo" className="h-14 w-auto" />
            <span className="text-xl font-bold text-[#509343]">Cookbook</span>
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#509343]" : "text-gray-700"} hover:text-[#509343]`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#509343]" : "text-gray-700"} hover:text-[#509343]`
              }
            >
              Recipes
            </NavLink>
            <NavLink
              to="/AboutUs"
              className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#509343]" : "text-gray-700"} hover:text-[#509343]`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/ContactUs"
              className={({ isActive }) =>
                `text-lg font-medium ${isActive ? "text-[#509343]" : "text-gray-700"} hover:text-[#509343]`
              }
            >
              Help
            </NavLink>
            
            {/* Show cart only for authenticated users */}
            {user && (
              <NavLink
                to="/cart"
                className="text-gray-700 hover:text-[#509343] transition-colors relative"
              >
                <FaShoppingCart className="inline mr-1" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#509343] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#509343] transition-colors"
                >
                  <FaUser className="text-lg" />
                  <span>{user.name || user.email}</span>
                  <FaCaretDown />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {user.role === 'admin' && (
                      <Link
                        to="/adminDash"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaCrown className="inline mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="inline mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/saved-recipes"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaHeart className="inline mr-2" />
                      Saved Recipes
                    </Link>
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-[#509343] hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-10 w-full max-w-md md:max-w-lg rounded-2xl shadow-2xl flex flex-col">
            <p className="mb-8 text-xl font-semibold text-gray-800">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={handleLogout}
                className="bg-[#509343] hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#509343] focus:ring-offset-2"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-white border border-[#509343] hover:bg-gray-100 text-[#509343] px-6 py-2 rounded-lg font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#509343] focus:ring-offset-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
