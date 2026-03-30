import { useState } from "react";
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

function CommunityPage() {
  const [comment, setComment] = useState("");

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

            <span className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition">
              Drafts
            </span>

          </div>
        </div>

        {/* 🔥 Post Card */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4 hover:shadow-md transition">

          {/* Header */}
          <p className="text-sm text-gray-500">
            Posted in{" "}
            <span className="font-semibold text-gray-800">
              All MUSTIANS
            </span>
          </p>

          {/* User */}
          <div className="flex justify-between items-start">

            <div className="flex gap-3">
              <img src={ProfilePic} className="w-10 h-10 rounded-full" />

              <div>
                <p className="font-semibold text-gray-800">
                  200039281 - Ahmed Khaled Farouk Elmalah
                </p>
                <p className="text-xs text-gray-500">
                  Sat at 11:09 PM • @2
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Seen by 804
            </div>

          </div>

          {/* Content */}
          <div className="text-right text-gray-700 leading-loose text-[15px] space-y-2">

            <p dir="rtl">
              أنا حالياً بفكر أبدأ مشروع SaaS صغير، بس محتار أبدأ منين:
            </p>

            <p dir="ltr" className="text-left">
              What are the biggest challenges you faced when starting your first business idea? 🚀
            </p>

            <ul className="list-disc pr-5" dir="rtl">
              <li>هل أبدأ بـ MVP الأول؟</li>
              <li>ولا أعمل market research الأول؟</li>
            </ul>

            <p dir="rtl">
              ياريت أي حد عنده تجربة يفيدنا 🙏
            </p>

          </div>

          {/* Actions */}
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

          {/* Likes */}
          <p className="text-sm text-gray-600">
            👍 200053946 - Ahmed Ibrahim Ramadan Salem Mohamed Ashour
          </p>

          {/* Comment */}
          <div className="flex items-center gap-3 pt-2">
            <img src={ProfilePic} className="w-8 h-8 rounded-full" />
            <input
              type="text"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-100/80 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default CommunityPage;