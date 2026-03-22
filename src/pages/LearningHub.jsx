import { useState } from "react";

const LearningHub = () => {
  const [filter, setFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);

  const resources = [
    {
      id: 1,
      type: "video",
      title: "Entrepreneurship Reality Check",
      author: "Omar Saleh (CEO of Khazna)",
      thumbnail: "https://img.youtube.com/vi/ITzSqEjqNMw/maxresdefault.jpg",
      link: "https://www.youtube.com/embed/ITzSqEjqNMw",
      category: "Leadership",
      description: "Learn about the real journey of a Fintech giant."
    },
    {
      id: 2,
      type: "video",
      title: "دليل النجاح في ريادة الأعمال",
      author: "باسم المحمدي",
      thumbnail: "https://img.youtube.com/vi/6oox-CSglWw/maxresdefault.jpg",
      link: "https://www.youtube.com/embed/6oox-CSglWw",
      category: "Leadership",
      description: "Learn entrepreneurship fundamentals."
    },
    {
      id: 3,
      type: "video",
      title: "Startup & Business Insights",
      author: "YouTube",
      thumbnail: "https://img.youtube.com/vi/Izdf8guwjFs/maxresdefault.jpg",
      link: "https://www.youtube.com/embed/Izdf8guwjFs",
      category: "Startup",
      description: "Learn key insights about startups and business growth."
    },
    {
      id: 4,
      type: "post",
      title: "How to Start a Startup",
      author: "Y Combinator",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
      category: "Startup",
      description: "A complete guide to building your startup from scratch.",
      link: "https://www.ycombinator.com/library/4A-how-to-start-a-startup"
    }
  ];

  const filteredResources =
    filter === "all" ? resources : resources.filter(r => r.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#1D2B59] text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Learning Hub
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Curated videos & articles to master entrepreneurship.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Filters */}
        <div className="flex bg-white p-2 rounded-2xl shadow-lg w-fit mx-auto mb-12 border">
          {["all", "video", "post"].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-2 rounded-xl font-bold transition capitalize ${
                filter === t
                  ? "bg-[#1D2B59] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t}s
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-xl">
                      ▶
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-3">
                  By {item.author}
                </p>

                {item.type === "post" && (
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                )}

                <button
                  onClick={() => {
                    if (item.type === "video") {
                      setActiveVideo(item.link + "?autoplay=1");
                    } else if (item.type === "post") {
                      window.open(item.link, "_blank");
                    }
                  }}
                  className="w-full py-2 rounded-lg border font-semibold hover:bg-[#1D2B59] hover:text-white transition"
                >
                  {item.type === "video"
                    ? "Watch Video"
                    : "Read Article"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-hidden w-[90%] md:w-[700px] relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="400"
              src={activeVideo}
              title="Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningHub;
