const CreateIdea = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#1D2B59] mb-6">Create New Idea</h2>
        <form className="space-y-4">
          <input className="w-full p-3 border rounded-lg" placeholder="Project Title" />
          <textarea className="w-full p-3 border rounded-lg h-32" placeholder="Describe your project..."></textarea>
          <input className="w-full p-3 border rounded-lg" placeholder="Skills Needed (e.g. React, Design)" />
          <button className="w-full bg-[#1D2B59] text-white py-3 rounded-lg font-bold hover:bg-emerald-600 transition">
            Publish Idea
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIdea;