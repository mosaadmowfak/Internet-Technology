import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const IdeaDetails = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    const fetchIdea = async () => {
      const docRef = doc(db, "ideas", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setIdea(snap.data());
      }
    };

    fetchIdea();
  }, [id]);

  if (!idea) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8">

        <Link to="/ideas" className="text-sm text-blue-600">
          ← Back
        </Link>

        <h1 className="text-3xl font-bold mt-4">{idea.title}</h1>

        <p className="text-gray-500 mt-2">{idea.description}</p>

        <p className="mt-4 text-sm">
          Status: <span className="font-bold">{idea.status}</span>
        </p>

        <p className="mt-2 text-sm text-gray-400">
          By: {idea.userId}
        </p>

      </div>
    </div>
  );
};

export default IdeaDetails;