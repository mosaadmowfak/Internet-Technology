import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import profileImage from "../assets/IMG_1731.jpg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);

      if (u?.displayName) {
        setName(u.displayName);
      } else if (u?.email) {
        setName(u.email.split("@")[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  const handleSave = async () => {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    alert("Name updated 🔥");
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      
      <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1D2B59]">
            <img src={profileImage} className="w-full h-full object-cover" />
          </div>

          <div>
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
              />
            ) : (
              <h1 className="text-3xl font-bold">
                {user.displayName || user.email.split("@")[0]}
              </h1>
            )}

            <p className="text-[#1D2B59]">{user.email}</p>
          </div>

          {editing ? (
            <button onClick={handleSave} className="ml-auto bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="ml-auto bg-gray-200 px-4 py-2 rounded">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;