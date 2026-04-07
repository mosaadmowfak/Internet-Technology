import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPublicItem, fetchAllModerationItems, fetchPublicItems, updateModerationStatus, deleteModerationItem, MODERATION_COLLECTIONS } from "../services/moderationService";
import staticEvents from "../data/events";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState("ideas");
  const [ideas, setIdeas] = useState([]);
  const [learningResources, setLearningResources] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [learningForm, setLearningForm] = useState({
    type: "video",
    title: "",
    author: "",
    category: "",
    link: "",
    thumbnail: "",
    description: "",
  });

  const loadAdminData = async () => {
    try {
      const [
        ideasData,
        learningData,
        legacyLearningData,
        communityData,
        eventsData,
        registrationsData,
      ] = await Promise.all([
        fetchAllModerationItems("ideas"),
        fetchAllModerationItems(MODERATION_COLLECTIONS.learningHub),
        fetchAllModerationItems(MODERATION_COLLECTIONS.legacyLearningHub),
        fetchAllModerationItems(MODERATION_COLLECTIONS.community),
        fetchAllModerationItems(MODERATION_COLLECTIONS.events),
        fetchAllModerationItems(MODERATION_COLLECTIONS.eventRegistrations),
      ]);

      // Filter for students: only show their own submissions
      const isAdmin = userRole === "admin" || userRole === "developer";
      const filterByUser = (data) => isAdmin ? data : data.filter(item => item.userId === user.uid);

      const learningItems = [
        ...learningData.map((item) => ({ ...item, __collection: MODERATION_COLLECTIONS.learningHub })),
        ...legacyLearningData.map((item) => ({ ...item, __collection: MODERATION_COLLECTIONS.legacyLearningHub })),
      ];

      setIdeas(filterByUser(ideasData));
      setLearningResources(filterByUser(learningItems));
      setCommunityPosts(filterByUser(communityData));
      setEvents(filterByUser(eventsData));
      setEventRegistrations(filterByUser(registrationsData));
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      setUser(currentUser);

      // Fetch user role from Firestore
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
        } else {
          setUserRole("student"); // default
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("student");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user && userRole) {
      loadAdminData();
    }
  }, [user, userRole]);

  const handleStatusUpdate = async (collectionName, id, status) => {
    try {
      await updateModerationStatus(collectionName, id, status);
      alert("Updated");
      loadAdminData();
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      alert(error.message);
    }
  };

  const handleDelete = async (collectionName, id) => {
    try {
      await deleteModerationItem(collectionName, id);
      loadAdminData();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  const renderActionButtons = (collectionName, id) => {
    if (userRole !== "admin" && userRole !== "developer") return null;
    return (
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => handleStatusUpdate(collectionName, id, "accepted")}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Accept
        </button>
        <button
          onClick={() => handleStatusUpdate(collectionName, id, "rejected")}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
        <button
          onClick={() => handleDelete(collectionName, id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    );
  };

  const now = new Date();
  const timeHasComeEvents = [...staticEvents, ...events]
    .filter((event) => {
      const dateValue = new Date(event.date);
      return !Number.isNaN(dateValue.getTime()) && dateValue <= now;
    });

  const handleLearningFormChange = (e) => {
    const { name, value } = e.target;
    setLearningForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLearningContent = async (e) => {
    e.preventDefault();
    try {
      const rawLink = learningForm.link.trim();
      let normalizedLink = rawLink;
      if (learningForm.type === "video") {
        const watchMatch = rawLink.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
        );
        const embedMatch = rawLink.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
        if (watchMatch) {
          normalizedLink = `https://www.youtube.com/embed/${watchMatch[1]}`;
        } else if (embedMatch) {
          normalizedLink = `https://www.youtube.com/embed/${embedMatch[1]}`;
        }
      }

      await addPublicItem(
        MODERATION_COLLECTIONS.learningHub,
        {
          type: learningForm.type === "video" ? "video" : "post",
          title: learningForm.title.trim(),
          author: learningForm.author.trim(),
          category: learningForm.category.trim(),
          description: learningForm.description.trim(),
          link: normalizedLink,
          thumbnail:
            learningForm.thumbnail.trim() ||
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        },
        auth.currentUser
      );
      setLearningForm({
        type: "video",
        title: "",
        author: "",
        category: "",
        link: "",
        thumbnail: "",
        description: "",
      });
      loadAdminData();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user || !userRole) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">

      {/* Sidebar */}
      <aside className="w-60 bg-[#1D2B59] text-white p-6">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>

        <button onClick={() => setActiveTab("ideas")} className="block w-full text-left mb-3">
          Ideas
        </button>
        <button onClick={() => setActiveTab("learning")} className="block w-full text-left mb-3">
          Learning Hub
        </button>
        <button onClick={() => setActiveTab("community")} className="block w-full text-left mb-3">
          Community
        </button>
        <button onClick={() => setActiveTab("events")} className="block w-full text-left mb-3">
          Events
        </button>
        <button onClick={() => setActiveTab("registrations")} className="block w-full text-left mb-3">
          Registrations
        </button>
        {(userRole === "admin" || userRole === "developer") && (
          <button onClick={() => setActiveTab("overview")} className="block w-full text-left">
            Overview
          </button>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Overview</h1>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded shadow">
                <p>Total Submissions</p>
                <h2 className="text-2xl font-bold">{ideas.length + learningResources.length + communityPosts.length + events.length + eventRegistrations.length}</h2>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p>Pending</p>
                <h2 className="text-2xl font-bold">
                  {[...ideas, ...learningResources, ...communityPosts, ...events, ...eventRegistrations].filter(i => i.status === "pending").length}
                </h2>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p>Accepted</p>
                <h2 className="text-2xl font-bold">
                  {[...ideas, ...learningResources, ...communityPosts, ...events, ...eventRegistrations].filter(i => i.status === "accepted").length}
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

                {renderActionButtons("ideas", idea.id)}
              </div>
            ))}

          </div>
        )}

        {activeTab === "learning" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Manage Learning Hub</h1>
            {(userRole === "admin" || userRole === "developer") && (
              <form onSubmit={handleAddLearningContent} className="bg-white p-5 rounded shadow mb-6 grid md:grid-cols-2 gap-3">
                <select name="type" value={learningForm.type} onChange={handleLearningFormChange} className="border rounded p-2">
                  <option value="video">Video</option>
                  <option value="post">Article</option>
                </select>
                <input name="category" value={learningForm.category} onChange={handleLearningFormChange} placeholder="Category" required className="border rounded p-2" />
                <input name="title" value={learningForm.title} onChange={handleLearningFormChange} placeholder="Title" required className="border rounded p-2" />
                <input name="author" value={learningForm.author} onChange={handleLearningFormChange} placeholder="Author" required className="border rounded p-2" />
                <input name="link" value={learningForm.link} onChange={handleLearningFormChange} placeholder="Video embed URL or article URL" required className="border rounded p-2 md:col-span-2" />
                <input name="thumbnail" value={learningForm.thumbnail} onChange={handleLearningFormChange} placeholder="Thumbnail URL (optional)" className="border rounded p-2 md:col-span-2" />
                <textarea name="description" value={learningForm.description} onChange={handleLearningFormChange} placeholder="Description" className="border rounded p-2 md:col-span-2" />
                <button type="submit" className="bg-[#1D2B59] text-white px-4 py-2 rounded md:col-span-2">Add To Website</button>
              </form>
            )}
            {learningResources.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded shadow mb-4">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-sm mt-2">Type: <b>{item.type}</b></p>
                <p className="text-sm">Status: <b>{item.status}</b></p>
                <p className="text-xs text-gray-400">By: {item.userId}</p>
                {renderActionButtons(item.__collection || MODERATION_COLLECTIONS.learningHub, item.id)}
              </div>
            ))}
          </div>
        )}

        {activeTab === "community" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Manage Community</h1>
            {communityPosts.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded shadow mb-4">
                <p className="text-gray-700">{item.text}</p>
                <p className="text-sm mt-2">Status: <b>{item.status}</b></p>
                <p className="text-xs text-gray-400">By: {item.userId}</p>
                {renderActionButtons(MODERATION_COLLECTIONS.community, item.id)}
              </div>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Manage Events</h1>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-bold text-yellow-700 mb-2">Events Time Has Come</h2>
              {timeHasComeEvents.length === 0 ? (
                <p className="text-sm text-yellow-700">No events have reached their date yet.</p>
              ) : (
                <div className="space-y-2">
                  {timeHasComeEvents.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="bg-white p-3 rounded border">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600">Date: {item.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {events.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded shadow mb-4">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-sm mt-2">Date: <b>{item.date}</b></p>
                <p className="text-sm">Status: <b>{item.status}</b></p>
                <p className="text-xs text-gray-400">By: {item.userId}</p>
                {renderActionButtons(MODERATION_COLLECTIONS.events, item.id)}
              </div>
            ))}
          </div>
        )}


        {activeTab === "registrations" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Manage Event Registrations</h1>
            {eventRegistrations.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded shadow mb-4">
                <h3 className="font-bold text-lg">{item.eventTitle}</h3>
                <p className="text-gray-700">Name: {item.name}</p>
                <p className="text-gray-700">Email: {item.email}</p>
                <p className="text-gray-700">Phone: {item.phone || "-"}</p>
                <p className="text-sm mt-2">Status: <b>{item.status}</b></p>
                <p className="text-xs text-gray-400">By: {item.userId}</p>
                {renderActionButtons(MODERATION_COLLECTIONS.eventRegistrations, item.id)}
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;