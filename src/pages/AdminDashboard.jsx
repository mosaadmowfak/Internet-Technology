import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("ideas");
  const [ideas, setIdeas] = useState([]);

  // 🔥 fetch ideas
  const fetchIdeas = async () => {
    try {
      const snapshot = await getDocs(collection(db, "ideas"));

      const data = snapshot.docs.map((docu) => ({
        id: docu.id,
        ...docu.data()
      }));

      console.log("DATA:", data); // 🔥 debug

      setIdeas(data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // ✅ Accept / Reject (FIXED + DEBUG)
  const updateIdeaStatus = async (id, status) => {
    try {
      console.log("UPDATING:", id, status);

      const ref = doc(db, "ideas", id);

      await updateDoc(ref, {
        status: status,
      });

      alert("Updated ✅");

      fetchIdeas(); // refresh

    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert(err.message); // 🔥 هتعرف المشكلة
    }
  };

  // ❌ Delete
  const removeIdea = async (id) => {
    try {
      await deleteDoc(doc(db, "ideas", id));
      fetchIdeas();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">

      {/* Sidebar */}
      <aside className="w-60 bg-[#1D2B59] text-white p-6">
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

        <button onClick={() => setActiveTab("ideas")} className="block w-full text-left mb-3">
          Ideas
        </button>

        <button onClick={() => setActiveTab("overview")} className="block w-full text-left">
          Overview
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Overview</h1>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded shadow">
                <p>Total Ideas</p>
                <h2 className="text-2xl font-bold">{ideas.length}</h2>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p>Pending</p>
                <h2 className="text-2xl font-bold">
                  {ideas.filter(i => i.status === "pending").length}
                </h2>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p>Accepted</p>
                <h2 className="text-2xl font-bold">
                  {ideas.filter(i => i.status === "accepted").length}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* IDEAS */}
        {activeTab === "ideas" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Manage Ideas</h1>

            {ideas.map((idea) => (
              <div key={idea.id} className="bg-white p-5 rounded shadow mb-4">

                <h3 className="font-bold text-lg">{idea.title}</h3>

                <p className="text-gray-600">{idea.description}</p>

                <p className="text-sm mt-2">
                  Status: <b>{idea.status}</b>
                </p>

                <p className="text-xs text-gray-400">
                  By: {idea.userId}
                </p>

                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => updateIdeaStatus(idea.id, "accepted")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateIdeaStatus(idea.id, "rejected")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => removeIdea(idea.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;