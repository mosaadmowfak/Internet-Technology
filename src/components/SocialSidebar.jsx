import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { 
  faLinkedinIn, 
  faFacebookF, 
  faInstagram, 
  faXTwitter 
} from "@fortawesome/free-brands-svg-icons";

const SocialSidebar = () => {
  const links = [
    { name: "LinkedIn", icon: faLinkedinIn, color: "bg-white text-[#0077b5]", url: "https://www.linkedin.com/school/misr-university-for-science-and-technology/" },
    { name: "Facebook", icon: faFacebookF, color: "bg-white text-[#1877f2]", url: "https://www.facebook.com/mustuni" },
    { name: "Instagram", icon: faInstagram, color: "bg-white text-[#e4405f]", url: "https://www.instagram.com/mustuni" },
    { name: "X", icon: faXTwitter, color: "bg-white text-black", url: "https://x.com/must_university" },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-3">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"           /* Opens in new tab */
          rel="noopener noreferrer"   /* Security best practice for target="_blank" */
          aria-label={link.name}      /* Good for accessibility */
          className={`${link.color} w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-gray-100 text-lg`}
        >
          <FontAwesomeIcon icon={link.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;