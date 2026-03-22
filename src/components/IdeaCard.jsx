// components/IdeaCard.js
import { Link } from 'react-router-dom';

const IdeaCard = ({ id, title, description, owner, tags }) => {
  
  // Updated helper function to handle the new tags
  const getTagStyle = (tag) => {
    switch(tag.toLowerCase()) {
      case 'ai': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'environment': return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 'business': return "bg-purple-100 text-purple-700 border-purple-200";
      case 'education': return "bg-orange-100 text-orange-700 border-orange-200";
      case 'startup': return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case 'transport': return "bg-teal-100 text-teal-700 border-teal-200";
      case 'social': return "bg-pink-100 text-pink-700 border-pink-200";
      case 'networking': return "bg-amber-100 text-amber-700 border-amber-200";
      case 'health': return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-[#1D2B59] group-hover:text-indigo-800 transition-colors">{title}</h3>
        <span className="text-xs font-semibold text-white bg-[#1D2B59] px-3 py-1 rounded-full">@{owner}</span>
      </div>
      
      <p className="text-gray-600 mb-6 h-16 line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span key={index} className={`text-xs px-3 py-1 rounded-full border ${getTagStyle(tag)}`}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Linked to the specific Idea Details ID */}
      <Link 
        to={`/ideas/${id}`} 
        className="block text-center w-full bg-[#1D2B59] text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default IdeaCard;