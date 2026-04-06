import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateIdea = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "ideas"), {
        title,
        description,
        status: "pending",
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });

      alert("Idea submitted 🚀");
      navigate("/ideas");

    } catch (err) {
      console.log(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Create Idea</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateIdea;