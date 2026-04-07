import { useEffect, useState } from "react";
import {
  FaRegCommentDots,
  FaQuestionCircle,
  FaRegSmile,
  FaPoll,
  FaRegThumbsUp,
  FaRegComment,
  FaShare,
} from "react-icons/fa";

import ProfilePic from "../assets/IMG_1731.jpg";
import { auth } from "../firebase";
import {
  addPublicItem,
  fetchAcceptedItems,
  fetchPublicItems,
  MODERATION_COLLECTIONS, submitForModeration,
} from "../services/moderationService";

function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [communityComments, setCommunityComments] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  const loadPosts = async () => {
    try {
      const acceptedPosts = await fetchAcceptedItems(MODERATION_COLLECTIONS.community);
      setPosts(acceptedPosts);
    } catch (error) {
      console.log("Failed to load community posts:", error);
    }
  };

  const loadComments = async () => {
    try {
      const allComments = await fetchPublicItems(MODERATION_COLLECTIONS.communityComments);
      setCommunityComments(allComments);
    } catch (error) {
      console.log("Failed to load community comments:", error);
    }
  };

  useEffect(() => {
    loadPosts();
    loadComments();
  }, []);

  const handleSubmitPost = async () => {
    if (!newPost.trim()) {
      return;
    }

    try {
      await submitForModeration(
        MODERATION_COLLECTIONS.community,
        {
          text: newPost.trim(),
        },
        auth.currentUser
      );
      alert("Post sent to admin for review.");
      setNewPost("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmitComment = async (postId) => {
    const value = (commentInputs[postId] || "").trim();
    if (!value) {
      return;
    }

    try {
      await addPublicItem(
        MODERATION_COLLECTIONS.communityComments,
        {
          postId,
          text: value,
        },
        auth.currentUser
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      await loadComments();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-10">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* 🔥 Create Post Card */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition">

          {/* Input */}
          <div className="flex items-center gap-3 border-b pb-4">
            <img src={ProfilePic} className="w-10 h-10 rounded-full" />
            <input
              type="text"
              placeholder="Share thoughts, ideas, or updates"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full bg-gray-100/80 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-4 text-sm">

            <div className="flex gap-3 flex-wrap">

              <button className="!bg-transparent flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition">
                <FaRegCommentDots className="text-orange-500" />
                Discussion
              </button>

              <button className="!bg-transparent flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition">
                <FaQuestionCircle className="text-blue-500" />
                Question
              </button>

              <button className="!bg-transparent flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition">
                <FaRegSmile className="text-pink-500" />
                Praise
              </button>

              <button className="!bg-transparent flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition">
                <FaPoll className="text-green-500" />
                Poll
              </button>

            </div>

            <button
              onClick={handleSubmitPost}
              className="bg-[#1D2B59] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-emerald-600 transition"
            >
              Send To Admin
            </button>

          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-sm p-5 text-center text-gray-500">
            No accepted posts yet.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4 hover:shadow-md transition"
            >
              <p className="text-sm text-gray-500">
                Posted in <span className="font-semibold text-gray-800">All MUSTIANS</span>
              </p>
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <img src={ProfilePic} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-800">{post.userId || "Community User"}</p>
                  </div>
                </div>
              </div>

              <div className="text-gray-700 leading-loose text-[15px]">
                <p>{post.text}</p>
              </div>

              <div className="flex gap-4 border-t pt-3">
                <button className="!bg-transparent flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition">
                  <FaRegThumbsUp /> Like
                </button>
                <button className="!bg-transparent flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition">
                  <FaRegComment /> Comment
                </button>
                <button className="!bg-transparent flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition">
                  <FaShare /> Share
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <img src={ProfilePic} className="w-8 h-8 rounded-full" />
                <input
                  type="text"
                  placeholder="Write a comment"
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                  }
                  className="w-full bg-gray-100/80 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                />
                <button
                  onClick={() => handleSubmitComment(post.id)}
                  className="bg-[#1D2B59] text-white px-3 py-2 rounded-lg text-xs"
                >
                  Send
                </button>
              </div>

              <div className="space-y-2">
                {communityComments
                  .filter((entry) => entry.postId === post.id)
                  .map((entry) => (
                    <div key={entry.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <p>{entry.text}</p>
                      <p className="text-xs text-gray-400 mt-1">By: {entry.userId}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default CommunityPage;