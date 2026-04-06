import { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    try {
      const snapshot = await getDocs(collection(db, "ideas"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("🔥 ALL IDEAS:", data);

      // ✅ accepted فقط
      const acceptedIdeas = data.filter(i => i.status === "accepted");

      console.log("✅ ACCEPTED:", acceptedIdeas);

      setIdeas(acceptedIdeas);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-[#1D2B59]">
            Discover Startup Ideas
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Collaborate with innovators and build your next venture
          </p>
        </div>

        {/* 🔥 لو مفيش أفكار */}
        {ideas.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No accepted ideas yet 😅
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                description={idea.description}
                owner={idea.userId}
                tags={idea.tags || []}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Ideas;