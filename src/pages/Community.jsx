import React, { useState } from 'react';
import ProfilePic from "../assets/IMG_1731.jpg";

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Omar Sherif",
      content: "Just started working on the new AI recommendation engine for StyleHub! 🚀",
      timestamp: "2h ago",
      replies: ["yesss! can't wait to see it in action!"],
    }
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    const postObj = {
      id: Date.now(),
      user: "Omar Sherif", // This would eventually come from your Auth context
      content: newPost,
      timestamp: "Just now",
      replies: []
    };
    setPosts([postObj, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#1D2B59] mb-8">Community Feed</h1>

        {/* Compose Post */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex space-x-4">
            <img src={ProfilePic} alt="User" className="h-12 w-12 rounded-full object-cover" />
            <textarea
              className="w-full p-3 border-none focus:ring-0 text-lg resize-none"
              placeholder="What's happening in innovation?"
              rows="3"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4 border-t pt-3">
            <button 
              onClick={handlePost}
              className="bg-[#1D2B59] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition"
            >
              Post
            </button>
          </div>
        </div>

        {/* Post Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition cursor-pointer">
              <div className="flex space-x-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-[#1D2B59]">
                  {post.user[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{post.user}</span>
                    <span className="text-gray-500 text-sm">· {post.timestamp}</span>
                  </div>
                  <p className="mt-2 text-gray-800 leading-relaxed">{post.content}</p>
                  
                  {/* Interaction Bar */}
                  <div className="flex items-center space-x-8 mt-4 text-gray-500 text-sm">
                    <button className="hover:text-blue-500 flex items-center space-x-1">
                      <span>💬</span> <span>{post.replies.length}</span>
                    </button>
                    <button className="hover:text-green-500 flex items-center space-x-1">
                      <span>🔁</span> <span>50</span>
                    </button>
                    <button className="hover:text-red-500 flex items-center space-x-1">
                      <span>❤️</span> <span>100</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;