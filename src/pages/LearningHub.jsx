import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  addPublicItem,
  fetchPublicItems,
  isLearningHubPublished,
  MODERATION_COLLECTIONS,
} from "../services/moderationService";

const LearningHub = () => {
  const [filter, setFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);
  const [resources, setResources] = useState([]);
  const [legacyResources, setLegacyResources] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const inferResourceType = (item) => {
    const t = String(item.type || "").toLowerCase();
    if (t === "video" || t === "post") return t;
    const link = String(item.link || "");
    if (
      link.includes("youtube.com/embed") ||
      link.includes("youtu.be/") ||
      link.includes("watch?v=")
    ) {
      return "video";
    }
    return "post";
  };

  const combinedResources = useMemo(
    () =>
      [...resources, ...legacyResources].sort((a, b) => {
        const ta = a.createdAt?.toMillis?.() ?? 0;
        const tb = b.createdAt?.toMillis?.() ?? 0;
        return tb - ta;
      }),
    [resources, legacyResources]
  );

  const allResources = useMemo(
    () =>
      combinedResources.map((item) => ({
        id: item.id,
        type: inferResourceType(item),
        title: item.title,
        author: item.author || "Community Member",
        thumbnail:
          item.thumbnail ||
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        link: item.link,
        category: item.category || "General",
        description: item.description || "",
      })),
    [combinedResources]
  );

  const filteredResources =
    filter === "all" ? allResources : allResources.filter((r) => r.type === filter);

  useEffect(() => {
    const listeners = [
      {
        ref: collection(db, MODERATION_COLLECTIONS.learningHub),
        setter: setResources,
      },
      {
        ref: collection(db, MODERATION_COLLECTIONS.legacyLearningHub),
        setter: setLegacyResources,
      },
    ];

    const unsubscribes = listeners.map(({ ref, setter }) =>
      onSnapshot(
        ref,
        (snapshot) => {
          const items = snapshot.docs
            .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
            .filter(isLearningHubPublished);
          setter(items);
        },
        (error) => {
          console.error("Learning hub listen error:", error);
        }
      )
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  const loadAcceptedComments = async () => {
    try {
      const allComments = await fetchPublicItems(MODERATION_COLLECTIONS.learningComments);
      setComments(allComments);
    } catch (error) {
      console.log("Failed to load learning comments:", error);
    }
  };

  useEffect(() => {
    loadAcceptedComments();
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }
    try {
      await addPublicItem(
        MODERATION_COLLECTIONS.learningComments,
        { text: newComment.trim() },
        auth.currentUser
      );
      setNewComment("");
      await loadAcceptedComments();
    } catch (error) {
      alert(error.message);
    }
  };

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
        <div className="bg-white p-6 rounded-2xl shadow mb-8 border">
          <h2 className="text-2xl font-bold text-[#1D2B59] mb-2">Learning Hub Comments</h2>
          <p className="text-sm text-gray-500 mb-4">Comments are added instantly.</p>
          <form onSubmit={handleSubmitComment} className="flex gap-3 mb-4">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment"
              className="flex-1 border rounded-lg p-2"
            />
            <button
              type="submit"
              className="bg-[#1D2B59] text-white px-4 rounded-lg font-semibold hover:bg-emerald-600 transition"
            >
              Add Comment
            </button>
          </form>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No accepted comments yet.</p>
          ) : (
            <div className="space-y-2">
              {comments.map((item) => (
                <div key={item.id} className="border rounded-lg p-3">
                  <p className="text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-1">By: {item.userId}</p>
                </div>
              ))}
            </div>
          )}
        </div>

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
          {filteredResources.map((item) => (
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
                      setActiveVideo(
                        item.link.includes("?")
                          ? `${item.link}&autoplay=1`
                          : `${item.link}?autoplay=1`
                      );
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
        {filteredResources.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No learning content available yet. Admin can add videos and articles from dashboard.
          </p>
        )}
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
