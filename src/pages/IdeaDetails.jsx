import { useParams, Link } from "react-router-dom";

const IdeaDetails = () => {
  const { id } = useParams(); // Gets the ID from the URL

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

        <button className="w-full mt-8 bg-[#1D2B59] text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition">
          Apply to Team
        </button>
      </div>
    </div>
  );
};

export default IdeaDetails;
