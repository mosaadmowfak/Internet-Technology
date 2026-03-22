import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // These categories match the data in your other files (Ideas.jsx, Events.jsx, etc.)
  const stats = [
    { label: 'Total Ideas', count: 6, color: 'border-blue-500' },
    { label: 'Live Events', count: 6, color: 'border-emerald-500' },
    { label: 'Community Posts', count: 12, color: 'border-purple-500' },
    { label: 'Pending Users', count: 3, color: 'border-amber-500' },
  ];

  const sidebarLinks = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'ideas', label: 'Manage Ideas', icon: '💡' },
    { id: 'events', label: 'Manage Events', icon: '📅' },
    { id: 'community', label: 'Community Mod', icon: '💬' },
    { id: 'users', label: 'User Management', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-[#1D2B59] text-white hidden lg:flex flex-col">
        <div className="p-8 border-b border-blue-900">
          <h2 className="text-xl font-bold tracking-tight">Admin Portal</h2>
          <p className="text-xs text-blue-300 mt-1 uppercase tracking-widest">Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === link.id 
                ? 'bg-white text-[#1D2B59] shadow-lg' 
                : 'hover:bg-blue-900 text-gray-300'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-semibold">{link.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500">System overview and platform management.</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition">
              Refresh Data
            </button>
            <button className="bg-[#1D2B59] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
              Export CSV
            </button>
          </div>
        </header>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${stat.color}`}>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2 text-gray-900">{stat.count}</h3>
                </div>
              ))}
            </div>

            {/* Recent Activity Table (Mock) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Platform Activity</h3>
                <span className="text-blue-600 text-sm font-medium cursor-pointer">View All</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-gray-800 font-medium italic">"University AI Chatbot"</td>
                    <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">New Idea</span></td>
                    <td className="px-6 py-4 text-gray-500 text-sm">March 22, 2026</td>
                    <td className="px-6 py-4"><button className="text-[#1D2B59] font-bold hover:underline">Review</button></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-800 font-medium italic">"Startup Pitch Night"</td>
                    <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Event Edit</span></td>
                    <td className="px-6 py-4 text-gray-500 text-sm">March 21, 2026</td>
                    <td className="px-6 py-4"><button className="text-[#1D2B59] font-bold hover:underline">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'overview' && (
          <div className="bg-white p-20 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4">🛠️</div>
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Under Development</h2>
            <p className="text-gray-500 max-w-xs mx-auto">This module is currently being connected to the database. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;