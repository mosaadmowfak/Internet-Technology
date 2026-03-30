import { useState } from "react";
import { useParams, Link } from "react-router-dom";

function ApplyModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", skills: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold bg-transparent border-none outline-none cursor-pointer"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-[#1D2B59] mb-2">Application Sent!</h3>
            <p className="text-gray-500 mb-6">We'll get back to you soon. Good luck!</p>
            <button
              onClick={onClose}
              className="bg-[#1D2B59] text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#1D2B59] mb-1">Apply to Team</h2>
            <p className="text-sm text-gray-400 mb-6">Tell the team a bit about yourself</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ahmed Mohamed"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Skills</label>
                <input
                  type="text"
                  name="skills"
                  required
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Python, UI Design"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/30 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Why do you want to join?</label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Share your motivation and what you can contribute..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/30 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1D2B59] text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const IdeaDetails = () => {
  useParams();
  const [showApply, setShowApply] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Link to="/" className="text-sm text-[#1D2B59] hover:underline mb-6 block">← Back to Ideas</Link>

        <h1 className="text-4xl font-bold text-[#1D2B59] mb-4">University AI Chatbot</h1>
        <div className="flex gap-4 mb-6">
          <span className="bg-blue-100 text-[#1D2B59] px-3 py-1 rounded-full text-sm font-bold">@Ahmed</span>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">
          An intelligent bot to help students navigate campus life, find buildings, and answer FAQs.
          We are currently looking for a backend developer to help with the API integration.
        </p>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-bold text-[#1D2B59] mb-4">Required Skills</h3>
          <div className="flex gap-2">
            <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">Python</span>
            <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">React</span>
          </div>
        </div>

        <button
          onClick={() => setShowApply(true)}
          className="w-full mt-8 bg-[#1D2B59] text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition"
        >
          Apply to Team
        </button>
      </div>

      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}
    </div>
  );
};

export default IdeaDetails;
