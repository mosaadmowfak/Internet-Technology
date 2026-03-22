// pages/Events.js
import EventCard from "../components/EventCard";

const Events = () => {
  // Six events curated for an Entrepreneurial hub at MUST
  const events = [
    { id: 1, title: "Startup Pitch Night", date: "March 15, 2026", location: "Main Hall", category: "Pitch" },
    { id: 2, title: "AI/ML Workshop", date: "March 20, 2026", location: "Computer Lab 4", category: "Tech" },
    { id: 3, title: "Industry Mentor Mixer", date: "March 25, 2026", location: "Alumni Lounge", category: "Networking" },
    { id: 4, title: "24-Hour Campus Hackathon", date: "April 02, 2026", location: "Innovation Hub", category: "Build" },
    { id: 5, title: "IP & Law Seminar", date: "April 10, 2026", location: "Library Hall B", category: "Legal" },
    { id: 6, title: "Funding Strategies Talk", date: "April 18, 2026", location: "Main Auditorium", category: "Business" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-[#1D2B59]">Upcoming Events</h1>
          <p className="text-gray-500 mt-3 text-lg">Don't miss out on these opportunities to learn and connect</p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              id={event.id}
              title={event.title} 
              date={event.date} 
              location={event.location}
              category={event.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;