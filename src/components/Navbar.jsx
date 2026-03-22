import { useState } from "react"; // Added useState
import { NavLink } from "react-router-dom";
import mustLogo from "../assets/must_logo.png";
import ProfilePic from "../assets/IMG_1731.jpg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold pb-1 border-b-2 border-white transition-all"
      : "text-gray-200 hover:text-white hover:font-semibold transition-all";

  // Class for links inside the dropdown
  const dropdownLinkClass = "block px-4 py-3 text-gray-200 hover:bg-[#2a3c7a] hover:text-white transition-colors border-b border-gray-700 last:border-none";

  return (
    <nav className="bg-[#1D2B59] text-white border-b border-gray-700 sticky top-0 z-50 shadow-md">
      <div className="max-w-[90rem] mx-auto px-6 py-1">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Section: Logo */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <img src={mustLogo} alt="MUST Logo" className="h-16 w-auto" />
            <NavLink to="/" className="text-2xl font-bold tracking-wide text-white hover:text-gray-200 transition-colors">
              ريادة الأعمال والابتكار
            </NavLink>
          </div>

          {/* Middle Section: Navigation Links */}
          <div className="flex space-x-8 items-center text-lg">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/ideas" className={navLinkClass}>Ideas</NavLink>
            <NavLink to="/create" className={navLinkClass}>Create Idea</NavLink>
            <NavLink to="/learning" className={navLinkClass}>Learning Hub</NavLink>
            <NavLink to="/events" className={navLinkClass}>Events</NavLink>
            <NavLink to="/community" className={navLinkClass}>Community</NavLink>
            <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          </div>

          {/* Right Section: Icons & Hamburger */}
          <div className="flex items-center space-x-6 text-base">
            <div className="text-gray-200 cursor-pointer text-xl">☼</div>
            <div className="text-white font-bold text-xl">E</div>
            
            {/* The Hamburger Menu Trigger */}
            <div className="relative">
              <div 
                className="text-white text-3xl cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ≡
              </div>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-[#1D2B59] border border-gray-700 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                  <NavLink 
                    to="/profile" 
                    className={dropdownLinkClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={ProfilePic} alt="P" className="h-8 w-8 rounded-full border border-gray-400" />
                      <span>My Profile</span>
                    </div>
                  </NavLink>
                  
                  <NavLink 
                    to="/login" 
                    className={dropdownLinkClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  
                  <div className="p-3">
                    <NavLink 
                      to="/register" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </div>
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