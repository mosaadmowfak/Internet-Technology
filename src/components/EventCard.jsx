import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

function EventCard({ id, title, date, location, time, description, image }) {
  const navigate = useNavigate();
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });

  return (
    <div
      onClick={() => navigate(`/events/${id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative group overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute bottom-4 left-4 bg-[#1D2B59] text-white px-3 py-2 rounded-lg text-center shadow-lg">
          <p className="text-lg font-bold leading-none">{day}</p>
          <p className="text-xs">{month}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-500" /> {location}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-green-500" /> {time}
          </span>
        </div>
        <h3 className="text-[15px] font-semibold text-gray-800 leading-snug">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{description}</p>
        <span className="inline-block text-xs text-[#1D2B59] font-semibold hover:underline">View Details →</span>
      </div>
    </div>
  );
}

export default EventCard;
