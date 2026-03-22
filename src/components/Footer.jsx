import { Link } from "react-router-dom";
import mustLogo from "../assets/must_logo.png";

function Footer() {
  const headerClass = "text-emerald-400 font-bold mb-4 uppercase tracking-wider";
  const linkClass = "text-white hover:text-gray-300 block mb-2 transition";

  return (
    <footer className="bg-[#1D2B59] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Logo Section */}
        <div className="flex justify-center mb-10">
          <img src={mustLogo} alt="Logo" className="h-20 w-auto" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Links Column */}
          <div>
            <h4 className={headerClass}>Links</h4>
            <Link to="/" className={linkClass}>Home</Link>
            <Link to="/" className={linkClass}>Ideas</Link>
            <Link to="/events" className={linkClass}>Events</Link>
            <Link to="/profile" className={linkClass}>Profile</Link>
          </div>

          {/* About University Column */}
          <div>
            <h4 className={headerClass}>About University</h4>
            {["About MUST", "History", "Accreditation", "Privacy Policy"].map((item) => (
              <span key={item} className="block mb-2 hover:text-gray-300 cursor-pointer transition">{item}</span>
            ))}
          </div>

          {/* MUST BUZZ Column */}
          <div>
            <h4 className={headerClass}>MUST BUZZ</h4>
            {["MUST Events", "MUST News", "Blog", "Announcement"].map((item) => (
              <span key={item} className="block mb-2 hover:text-gray-300 cursor-pointer transition">{item}</span>
            ))}
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className={headerClass}>Contact Info</h4>
            <p className="mb-2">16878</p>
            <p className="mb-2">Info@Must.edu.eg</p>
            <p className="text-gray-300">Al Motamayez District – 6th of October, Egypt</p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Startup Collab. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;