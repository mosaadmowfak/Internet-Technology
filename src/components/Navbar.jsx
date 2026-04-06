import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdSunny } from "react-icons/io";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import mustLogo from "../assets/must_logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownLinkClass =
    "block px-4 py-3 text-gray-200 hover:bg-[#1f2d5e] hover:text-white transition border-b border-gray-700 last:border-none";

  // 🔥 user listener
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // 🔥 logout
  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#1a2550] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-[95rem] mx-auto px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={mustLogo} className="h-14" />
            <div>
              <p className="text-xs font-bold uppercase">Misr University</p>
              <p className="text-[10px] text-gray-400 uppercase">For Science & Technology</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <IoMdSunny className="text-xl cursor-pointer" />
            <div className="h-6 w-[1px] bg-gray-400 opacity-50" />

            {/* 🔥 USER DISPLAY */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">
                  {user.displayName || user.email.split("@")[0]}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-red-500 rounded-full hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-1.5 text-sm border border-white/50 rounded-full hover:bg-white hover:text-[#1a2550] transition"
              >
                Login
              </NavLink>
            )}

            <div className="h-6 w-[1px] bg-gray-400 opacity-50" />

            {/* Menu */}
            <div className="relative">
              <FiMenu
                className="text-2xl cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />

              {isMenuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-[#1a2550] border border-gray-700 rounded-xl shadow-xl overflow-hidden">

                  {/* Profile */}
                  <NavLink to="/profile" className={dropdownLinkClass}>
                    My Profile
                  </NavLink>

                  {/* 🔥 NAME + LOGOUT */}
                  {user ? (
                    <>
                      <div className={dropdownLinkClass}>
                        👤 {user.displayName || user.email}
                      </div>

                      <button
                        onClick={handleLogout}
                        className={dropdownLinkClass}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <NavLink to="/login" className={dropdownLinkClass}>
                      Login
                    </NavLink>
                  )}

                  {/* Register */}
                  <NavLink
                    to="/register"
                    className="block text-center m-2 py-2 bg-[#1f2d5e] rounded-lg hover:bg-[#2d3d80]"
                  >
                    Register
                  </NavLink>

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;