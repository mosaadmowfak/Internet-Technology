import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdSunny } from "react-icons/io";
import mustLogo from "../assets/must_logo.png";
import ProfilePic from "../assets/IMG_1731.jpg";

const navItems = [
  {
    label: "The University",
    href: "https://must.edu.eg/",
    dropdown: [
      {
        label: "About MUST",
        sub: [
          { label: "Board of Trustees",        href: "https://must.edu.eg/about-must/board-of-trustees/" },
          { label: "President",                href: "https://must.edu.eg/about-must/president/" },
          { label: "Vision & Mission",         href: "https://must.edu.eg/about-must/vision-mission/" },
          { label: "MUST Values & Principles", href: "https://must.edu.eg/about-must/" },
          { label: "History",                  href: "https://must.edu.eg/about-must/" },
        ],
      },
      {
        label: "Sectors",
        sub: [
          { label: "Environmental & Community Service", href: "https://must.edu.eg/" },
          { label: "Sustainability Office",             href: "https://must.edu.eg/sustainability-office/" },
        ],
      },
      {
        label: "Reports",
        sub: [
          { label: "Interdisciplinary Science", href: "https://must.edu.eg/reports/interdisciplinary-science/" },
          { label: "Financial Report",          href: "https://must.edu.eg/" },
        ],
      },
      { label: "Policies",                               href: "https://must.edu.eg/" },
      { label: "University Council Minutes",             href: "https://must.edu.eg/univeristy-council-minutes/" },
      { label: "Quality Assurance & Accreditation",      href: "https://must.edu.eg/?page_id=1660" },
      { label: "Accreditation & Partnerships",           href: "https://must.edu.eg/" },
      { label: "Contact Us",                             href: "https://must.edu.eg/contact/" },
    ],
  },
  {
    label: "Academics",
    href: "https://must.edu.eg/academic_programs/undergraduate-studies/",
    dropdown: [
      { label: "Undergraduate Studies",              href: "https://must.edu.eg/academic_programs/undergraduate-studies/" },
      { label: "Post-Graduate Program",              href: "https://must.edu.eg/" },
      { label: "Academic Calendar",                  href: "https://must.edu.eg/" },
      { label: "International Students Affairs",     href: "https://must.edu.eg/" },
    ],
  },
  {
    label: "Admission",
    href: "https://admission.must.edu.eg/",
    dropdown: null,
  },
  {
    label: "MUST BUZZ",
    href: "https://must.edu.eg/event/",
    dropdown: [
      { label: "MUST Events",    href: "https://must.edu.eg/event/" },
      { label: "MUST News",      href: "https://must.edu.eg/" },
      { label: "MUST Blogs",     href: "https://must.edu.eg/" },
      { label: "Announcements",  href: "https://must.edu.eg/" },
    ],
  },
  {
    label: "Centers",
    href: "https://must.edu.eg/centers/",
    dropdown: null,
  },
  {
    label: "Life At MUST",
    href: "https://must.edu.eg/must-life/",
    dropdown: [
      { label: "MUST Life",   href: "https://must.edu.eg/must-life/" },
      { label: "MUST Stars",  href: "https://must.edu.eg/" },
      { label: "MUST Clubs",  href: "https://must.edu.eg/" },
      { label: "Facilities",  href: "https://must.edu.eg/" },
    ],
  },
  {
    label: "SDGs",
    href: "https://sdg.must.edu.eg/SDG/",
    dropdown: null,
  },
];

function DropdownMenu({ items }) {
  const [activeSub, setActiveSub] = useState(items[0]?.sub ? items[0].label : null);
  const hasTwoCol = items.some((i) => i.sub);
  const activeItem = items.find((i) => i.label === activeSub);

  return (
    <div className="flex bg-[#1e2a4a]/95 backdrop-blur-sm shadow-2xl min-w-[260px]">
      {/* Left column */}
      <ul className="py-2 min-w-[260px]">
        {items.map((item) => (
          <li
            key={item.label}
            onMouseEnter={() => item.sub && setActiveSub(item.label)}
          >
            <a
              href={item.href || "#"}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-between px-5 py-3 text-sm font-semibold transition
                ${activeSub === item.label ? "text-[#4CAF50]" : "text-white hover:text-[#4CAF50]"}`}
            >
              <span>{item.label}</span>
              {item.sub && (
                activeSub === item.label
                  ? <FaChevronRight className="text-xs text-[#4CAF50]" />
                  : <FaChevronDown className="text-xs opacity-60" />
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* Right sub-column */}
      {hasTwoCol && activeItem?.sub && (
        <ul className="py-2 min-w-[240px] bg-[#16203a]/95 border-l border-white/10">
          {activeItem.sub.map((sub) => (
            <li key={sub.label}>
              <a
                href={sub.href || "#"}
                target="_blank"
                rel="noreferrer"
                className="block px-5 py-3 text-sm font-semibold text-white hover:text-[#4CAF50] transition"
              >
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={`flex items-center gap-1 text-[15px] font-semibold transition
          ${open ? "text-[#4CAF50]" : "text-white hover:text-[#4CAF50]"}`}
      >
        {item.label}
        {item.dropdown && <FaChevronDown className="text-[10px] mt-0.5 opacity-70" />}
      </a>

      {item.dropdown && open && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <DropdownMenu items={item.dropdown} />
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownLinkClass =
    "block px-4 py-3 text-gray-200 hover:bg-[#1f2d5e] hover:text-white transition border-b border-gray-700 last:border-none";

  return (
    <nav className="bg-[#1a2550] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-[95rem] mx-auto px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img src={mustLogo} alt="MUST Logo" className="h-14 object-contain" />
            <div className="leading-tight text-left">
              <p className="text-xs font-bold tracking-wide text-white uppercase">Misr University</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">For Science & Technology</p>
            </div>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            <IoMdSunny className="text-xl cursor-pointer hover:text-gray-300" />
            <div className="h-6 w-[1px] bg-gray-400 opacity-50" />
            <NavLink
              to="/login"
              className="px-4 py-1.5 text-sm font-semibold border border-white/50 rounded-full hover:bg-white hover:text-[#1a2550] transition"
            >
              Login
            </NavLink>
            <div className="h-6 w-[1px] bg-gray-400 opacity-50" />

            {/* Hamburger */}
            <div className="relative">
              <FiMenu
                className="text-2xl cursor-pointer hover:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-[#1a2550] border border-gray-700 rounded-xl shadow-xl overflow-hidden py-2">
                  <NavLink to="/profile" className={dropdownLinkClass} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center gap-3">
                      <img src={ProfilePic} alt="Profile" className="h-8 w-8 rounded-full" />
                      <span>My Profile</span>
                    </div>
                  </NavLink>
                  <NavLink to="/login" className={dropdownLinkClass} onClick={() => setIsMenuOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block text-center m-2 py-2 bg-[#1f2d5e] rounded-lg hover:bg-[#2d3d80]"
                    onClick={() => setIsMenuOpen(false)}
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
