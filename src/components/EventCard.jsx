// components/EventCard.jsx
import { Link } from 'react-router-dom';

const EventCard = ({ id, title, date, location, category }) => {
  
  // Logic updated to match your IdeaCard color palette
  const getCategoryStyle = (cat) => {
    switch(cat.toLowerCase()) {
      case 'pitch': return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 'tech': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'networking': return "bg-purple-100 text-purple-700 border-purple-200";
      case 'build': return "bg-orange-100 text-orange-700 border-orange-200";
      case 'legal': return "bg-slate-100 text-slate-700 border-slate-200";
      case 'business': return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Category Badge */}
      <div className="mb-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getCategoryStyle(category)}`}>
          {category.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#1D2B59] group-hover:text-indigo-800 transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm font-medium mt-1">{date}</p>
        <p className="text-gray-400 text-sm mt-1">{location}</p>
      </div>

      {/* Button */}
      <Link 
        to={`/events/${id}`} 
        className="block text-center w-full bg-[#1D2B59] text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;