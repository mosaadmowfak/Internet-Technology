import { useParams, Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  // In a real app, this data would come from your Firebase/Database
  const event = {
    title: "Startup Pitch Night 2026",
    date: "March 15, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Main Hall, MUST",
    description: "Join us for an exciting evening where student founders pitch their startup ideas to a panel of expert judges. Networking opportunities, refreshments, and awards await!",
    speaker: "Dr. Ahmed Hassan",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Banner Area */}
        <div className="bg-[#1D2B59] h-48 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold">{event.title}</h1>
        </div>

        <div className="p-8">
          <Link to="/events" className="text-sm text-[#1D2B59] hover:underline mb-6 block">← Back to Events</Link>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-[#1D2B59] mb-4">About this Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="font-bold text-[#1D2B59] mb-4">Event Info</h3>
              <p className="mb-2"><strong>Date:</strong> {event.date}</p>
              <p className="mb-2"><strong>Time:</strong> {event.time}</p>
              <p className="mb-2"><strong>Location:</strong> {event.location}</p>
              <p><strong>Speaker:</strong> {event.speaker}</p>
              
              <button className="w-full mt-6 bg-[#1D2B59] text-white py-2 rounded-lg font-bold hover:bg-emerald-600 transition">
                Register for Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;