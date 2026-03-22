import profileImage from "../assets/IMG_1731.jpg"

const Profile = () => {
  // Mock data - eventually, this will come from your database
  const user = {
    name: "Omar Sherif",
    role: "Software Engineer",
    bio: "Passionate about building scalable web applications and exploring AI solutions for educational challenges.",
    skills: ["React", "Next.js", "AI engineering", "Node.js", "UI/UX Design", "Firebase"],
    projects: [
      { title: "Eco-Connect", status: "Active" },
      { title: "AI Study Buddy", status: "In-Progress" }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1D2B59]">
            <img 
              src={profileImage} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-[#1D2B59] font-medium text-lg">{user.role}</p>
          </div>

          <button className="ml-auto bg-gray-100 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
            Edit Profile
          </button>
        </div>

        <p className="mt-6 text-gray-600 max-w-2xl">{user.bio}</p>

        {/* Skills Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill} className="bg-blue-50 text-[#1D2B59] px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">My Projects</h3>
        <div className="space-y-4">
          {user.projects.map((project, index) => (
            <div key={index} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:border-[#1D2B59] transition">
              <span className="font-medium text-gray-800">{project.title}</span>
              <span className={`text-xs px-3 py-1 rounded-full ${
                project.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;