// pages/Ideas.jsx
import IdeaCard from "../components/IdeaCard";

const Ideas = () => {
  const ideas = [
    { 
      id: 1, 
      title: "University AI Chatbot", 
      description: "An intelligent bot to help students navigate campus life, find buildings, and answer FAQ.", 
      owner: "Closed", 
      tags: ["AI", "Education"],
      status: "open"
    },
    { 
      id: 2, 
      title: "Green Campus Initiative", 
      description: "Sustainable waste management and recycling rewards system for students on campus.", 
      owner: "Open", 
      tags: ["Environment", "Startup"],
      status: "closed"
    },
    { 
      id: 3, 
      title: "Campus Ride-Share", 
      description: "A secure way for students living in the same area to share rides to university.", 
      owner: "Open", 
      tags: ["Transport", "Social"],
    },
    { 
      id: 4, 
      title: "Textbook Exchange", 
      description: "A digital marketplace to buy, sell, or swap used textbooks with fellow students.", 
      owner: "Closed", 
      tags: ["Business", "Education"],
    },
    { 
      id: 5, 
      title: "Mentor Connect", 
      description: "Connecting fresh graduates with alumni industry mentors for career guidance.", 
      owner: "Closed", 
      tags: ["Business", "Networking"],
      status: "open"
    },
    { 
      id: 6, 
      title: "Student Wellness Tracker", 
      description: "An app that helps students manage exam stress through mindfulness and health tips.", 
      owner: "open", 
      tags: ["Health", "Startup"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-[#1D2B59]">
            Discover Startup Ideas
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Collaborate with innovators and build your next venture
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <IdeaCard 
              key={idea.id} 
              title={idea.title} 
              description={idea.description} 
              owner={idea.owner} 
              tags={idea.tags} 
              status={idea.status}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Ideas;