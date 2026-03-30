import { useState } from 'react';
import {
  FaTrash, FaCheck, FaTimes, FaPlus, FaChartBar,
  FaLightbulb, FaCalendarAlt, FaUsers, FaBook,
  FaEye, FaRegClock, FaMapMarkerAlt,
} from 'react-icons/fa';
import eventsData from '../data/events';

/* ─── Seed data ─────────────────────────────────────────────── */
const seedIdeas = [
  { id: 1, title: 'University AI Chatbot',    owner: 'Ahmed Khaled',   tags: ['AI', 'Education'],       status: 'pending',  description: 'An intelligent bot to help students navigate campus life.' },
  { id: 2, title: 'Green Campus Initiative',  owner: 'Sara Mahmoud',   tags: ['Environment', 'Startup'], status: 'accepted', description: 'Sustainable waste management and recycling rewards system.' },
  { id: 3, title: 'Campus Ride-Share',        owner: 'Omar Ali',       tags: ['Transport', 'Social'],    status: 'pending',  description: 'A secure way for students to share rides to university.' },
  { id: 4, title: 'Textbook Exchange',        owner: 'Nour Hassan',    tags: ['Business', 'Education'],  status: 'rejected', description: 'A digital marketplace to buy, sell, or swap used textbooks.' },
  { id: 5, title: 'Mentor Connect',           owner: 'Youssef Ibrahim',tags: ['Business', 'Networking'], status: 'pending',  description: 'Connecting fresh graduates with alumni industry mentors.' },
  { id: 6, title: 'Student Wellness Tracker', owner: 'Hana Fathy',     tags: ['Health', 'Startup'],      status: 'accepted', description: 'An app that helps students manage exam stress.' },
];

const seedPosts = [
  { id: 1, user: 'Ahmed Khaled',  time: 'Sat, Mar 22 • 11:09 PM', seen: 804, content: 'أنا حالياً بفكر أبدأ مشروع SaaS، بس محتار أبدأ بـ MVP ولا market research؟ 🚀' },
  { id: 2, user: 'Yousef Ahmed',  time: 'Sun, Mar 23 • 2:30 PM',  seen: 520, content: 'إزاي أجيب أول عملاء لمشروع marble export؟ 🌍' },
  { id: 3, user: 'Nour Hassan',   time: 'Mon, Mar 24 • 9:00 AM',  seen: 310, content: 'Anyone interested in a co-founder for a HealthTech startup? 💊' },
];

const seedResources = [
  { id: 1, type: 'video', title: 'Entrepreneurship Reality Check',  author: 'Omar Saleh (CEO of Khazna)', category: 'Leadership', link: 'https://www.youtube.com/embed/ITzSqEjqNMw' },
  { id: 2, type: 'video', title: 'دليل النجاح في ريادة الأعمال',   author: 'باسم المحمدي',              category: 'Leadership', link: 'https://www.youtube.com/embed/6oox-CSglWw' },
  { id: 3, type: 'video', title: 'Startup & Business Insights',     author: 'YouTube',                   category: 'Startup',    link: 'https://www.youtube.com/embed/Izdf8guwjFs' },
  { id: 4, type: 'post',  title: 'How to Start a Startup',          author: 'Y Combinator',              category: 'Startup',    link: 'https://www.ycombinator.com/library/4A-how-to-start-a-startup' },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const styles = {
    pending:  'bg-amber-100 text-amber-700',
    accepted: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] ?? styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const emptyEvent  = { title: '', date: '', location: '', time: '', description: '', fullDescription: '', speaker: '', seats: '', image: '', tags: '' };
const emptyResource = { title: '', author: '', category: '', type: 'video', link: '' };

/* ─── Main component ─────────────────────────────────────────── */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // state slices
  const [ideas,     setIdeas]     = useState(seedIdeas);
  const [posts,     setPosts]     = useState(seedPosts);
  const [events,    setEvents]    = useState(eventsData);
  const [resources, setResources] = useState(seedResources);

  // add-forms visibility
  const [showEventForm,    setShowEventForm]    = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);

  // form state
  const [eventForm,    setEventForm]    = useState(emptyEvent);
  const [resourceForm, setResourceForm] = useState(emptyResource);

  /* Ideas */
  const updateIdeaStatus = (id, status) => setIdeas(ideas.map(i => i.id === id ? { ...i, status } : i));
  const removeIdea = (id) => setIdeas(ideas.filter(i => i.id !== id));

  /* Posts */
  const removePost = (id) => setPosts(posts.filter(p => p.id !== id));

  /* Events */
  const removeEvent = (id) => setEvents(events.filter(e => e.id !== id));
  const submitEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventForm,
      id: Date.now(),
      seats: Number(eventForm.seats),
      tags: eventForm.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    setEvents([...events, newEvent]);
    setEventForm(emptyEvent);
    setShowEventForm(false);
  };

  /* Resources */
  const removeResource = (id) => setResources(resources.filter(r => r.id !== id));
  const submitResource = (e) => {
    e.preventDefault();
    setResources([...resources, { ...resourceForm, id: Date.now() }]);
    setResourceForm(emptyResource);
    setShowResourceForm(false);
  };

  /* Stats */
  const stats = [
    { label: 'Total Ideas',       value: ideas.length,                       icon: <FaLightbulb />,    color: 'border-blue-500',    bg: 'bg-blue-50',    text: 'text-blue-600'   },
    { label: 'Pending Ideas',     value: ideas.filter(i=>i.status==='pending').length, icon: <FaRegClock />, color: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Active Events',     value: events.length,                      icon: <FaCalendarAlt />,  color: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600'},
    { label: 'Community Posts',   value: posts.length,                       icon: <FaUsers />,        color: 'border-purple-500',  bg: 'bg-purple-50',  text: 'text-purple-600' },
    { label: 'Learning Resources',value: resources.length,                   icon: <FaBook />,         color: 'border-pink-500',    bg: 'bg-pink-50',    text: 'text-pink-600'   },
    { label: 'Accepted Ideas',    value: ideas.filter(i=>i.status==='accepted').length, icon: <FaCheck />, color: 'border-teal-500', bg: 'bg-teal-50', text: 'text-teal-600' },
  ];

  const sidebarLinks = [
    { id: 'overview',  label: 'Overview',       icon: <FaChartBar />    },
    { id: 'ideas',     label: 'Ideas',          icon: <FaLightbulb />   },
    { id: 'community', label: 'Community',      icon: <FaUsers />       },
    { id: 'events',    label: 'Events',         icon: <FaCalendarAlt /> },
    { id: 'learning',  label: 'Learning Hub',   icon: <FaBook />        },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="w-60 bg-[#1D2B59] text-white hidden lg:flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-bold">Admin Portal</h2>
          <p className="text-xs text-blue-300 mt-0.5 uppercase tracking-wide">Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                activeTab === link.id ? 'bg-white text-[#1D2B59] font-bold' : 'text-blue-200 hover:bg-white/10'
              }`}
            >
              {link.icon}<span>{link.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main ────────────────────────────────────── */}
      <main className="flex-1 p-8 overflow-auto">

        {/* ══ OVERVIEW ══════════════════════════════ */}
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Analytics Overview</h1>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
              {stats.map(s => (
                <div key={s.label} className={`bg-white rounded-2xl p-6 border-l-4 ${s.color} shadow-sm flex items-center gap-5`}>
                  <div className={`${s.bg} ${s.text} text-2xl p-4 rounded-xl`}>{s.icon}</div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{s.label}</p>
                    <p className="text-3xl font-extrabold text-gray-800">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini-tables */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Recent Ideas */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FaLightbulb className="text-blue-500"/>Recent Ideas</h3>
                <div className="space-y-3">
                  {ideas.slice(0,4).map(idea => (
                    <div key={idea.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 font-medium">{idea.title}</span>
                      <StatusBadge status={idea.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FaCalendarAlt className="text-emerald-500"/>Upcoming Events</h3>
                <div className="space-y-3">
                  {events.slice(0,4).map(ev => (
                    <div key={ev.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 font-medium">{ev.title}</span>
                      <span className="text-gray-400 text-xs">{ev.date}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ══ IDEAS ════════════════════════════════ */}
        {activeTab === 'ideas' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Ideas</h1>
            <p className="text-sm text-gray-400 mb-6">{ideas.filter(i=>i.status==='pending').length} ideas awaiting review</p>

            <div className="space-y-4">
              {ideas.map(idea => (
                <div key={idea.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-bold text-gray-800">{idea.title}</h3>
                        <StatusBadge status={idea.status} />
                      </div>
                      <p className="text-xs text-gray-400 mb-2">by {idea.owner}</p>
                      <p className="text-sm text-gray-600">{idea.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {idea.tags.map(t => (
                          <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {idea.status !== 'accepted' && (
                        <button
                          onClick={() => updateIdeaStatus(idea.id, 'accepted')}
                          className="flex items-center gap-1.5 text-xs bg-emerald-500 text-white px-3 py-2 rounded-lg hover:bg-emerald-600 transition"
                        >
                          <FaCheck />Accept
                        </button>
                      )}
                      {idea.status !== 'rejected' && (
                        <button
                          onClick={() => updateIdeaStatus(idea.id, 'rejected')}
                          className="flex items-center gap-1.5 text-xs bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition"
                        >
                          <FaTimes />Reject
                        </button>
                      )}
                      <button
                        onClick={() => removeIdea(idea.id)}
                        className="flex items-center gap-1.5 text-xs bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <FaTrash />Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ COMMUNITY ════════════════════════════ */}
        {activeTab === 'community' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Community Moderation</h1>
            <p className="text-sm text-gray-400 mb-6">{posts.length} active posts</p>

            <div className="space-y-4">
              {posts.length === 0 && (
                <div className="text-center py-16 text-gray-400">No posts remaining.</div>
              )}
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-0.5">{post.user}</p>
                      <p className="text-xs text-gray-400 mb-3">{post.time}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                        <FaEye /><span>Seen by {post.seen}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removePost(post.id)}
                      className="flex items-center gap-1.5 text-xs bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition shrink-0"
                    >
                      <FaTrash />Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ EVENTS ══════════════════════════════ */}
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
                <p className="text-sm text-gray-400">{events.length} events total</p>
              </div>
              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="flex items-center gap-2 bg-[#1D2B59] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition"
              >
                <FaPlus />{showEventForm ? 'Cancel' : 'Add Event'}
              </button>
            </div>

            {/* Add event form */}
            {showEventForm && (
              <form onSubmit={submitEvent} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 grid sm:grid-cols-2 gap-4">
                <h2 className="sm:col-span-2 text-lg font-bold text-gray-700">New Event</h2>

                {[
                  { name: 'title',       label: 'Title',             placeholder: 'e.g. Startup Pitch Night' },
                  { name: 'date',        label: 'Date',              placeholder: 'YYYY-MM-DD', type: 'date' },
                  { name: 'location',    label: 'Location',          placeholder: 'e.g. Innovation Hub, MUST' },
                  { name: 'time',        label: 'Time',              placeholder: 'e.g. 6:00 PM – 10:00 PM' },
                  { name: 'speaker',     label: 'Speaker',           placeholder: 'Name – Role' },
                  { name: 'seats',       label: 'Seats',             placeholder: '120', type: 'number' },
                  { name: 'image',       label: 'Image URL',         placeholder: 'https://...' },
                  { name: 'tags',        label: 'Tags (comma-separated)', placeholder: 'Pitch, Funding, Networking' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      required={f.name !== 'image'}
                      value={eventForm[f.name]}
                      onChange={e => setEventForm({ ...eventForm, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Short Description</label>
                  <textarea rows={2} required value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})}
                    placeholder="One-line teaser for the event card"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Description</label>
                  <textarea rows={3} required value={eventForm.fullDescription} onChange={e => setEventForm({...eventForm, fullDescription: e.target.value})}
                    placeholder="Detailed description shown on the event details page"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20" />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button type="submit" className="bg-[#1D2B59] text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition text-sm">
                    Save Event
                  </button>
                </div>
              </form>
            )}

            {/* Events list */}
            <div className="space-y-4">
              {events.map(ev => (
                <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start">
                  {ev.image && (
                    <img src={ev.image} alt={ev.title} className="w-20 h-16 object-cover rounded-xl shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{ev.title}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><FaRegClock />{ev.date} • {ev.time}</span>
                      <span className="flex items-center gap-1"><FaMapMarkerAlt />{ev.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-1">{ev.description}</p>
                  </div>
                  <button
                    onClick={() => removeEvent(ev.id)}
                    className="flex items-center gap-1.5 text-xs bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition shrink-0"
                  >
                    <FaTrash />Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ LEARNING HUB ════════════════════════ */}
        {activeTab === 'learning' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Learning Hub</h1>
                <p className="text-sm text-gray-400">{resources.length} resources</p>
              </div>
              <button
                onClick={() => setShowResourceForm(!showResourceForm)}
                className="flex items-center gap-2 bg-[#1D2B59] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition"
              >
                <FaPlus />{showResourceForm ? 'Cancel' : 'Add Resource'}
              </button>
            </div>

            {/* Add resource form */}
            {showResourceForm && (
              <form onSubmit={submitResource} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 grid sm:grid-cols-2 gap-4">
                <h2 className="sm:col-span-2 text-lg font-bold text-gray-700">New Resource</h2>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                  <input type="text" required value={resourceForm.title} onChange={e => setResourceForm({...resourceForm, title: e.target.value})}
                    placeholder="e.g. How to Build an MVP"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Author</label>
                  <input type="text" required value={resourceForm.author} onChange={e => setResourceForm({...resourceForm, author: e.target.value})}
                    placeholder="e.g. Y Combinator"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                  <input type="text" required value={resourceForm.category} onChange={e => setResourceForm({...resourceForm, category: e.target.value})}
                    placeholder="e.g. Leadership, Startup"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                  <select value={resourceForm.type} onChange={e => setResourceForm({...resourceForm, type: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20 bg-white">
                    <option value="video">Video</option>
                    <option value="post">Article / Post</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Link (embed URL for videos)</label>
                  <input type="url" required value={resourceForm.link} onChange={e => setResourceForm({...resourceForm, link: e.target.value})}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/20" />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button type="submit" className="bg-[#1D2B59] text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition text-sm">
                    Save Resource
                  </button>
                </div>
              </form>
            )}

            {/* Resources list */}
            <div className="space-y-4">
              {resources.map(r => (
                <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                  <div className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${r.type === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {r.type === 'video' ? '▶ Video' : '📄 Post'}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-sm">{r.title}</p>
                    <p className="text-xs text-gray-400">By {r.author} • {r.category}</p>
                  </div>
                  <button
                    onClick={() => removeResource(r.id)}
                    className="flex items-center gap-1.5 text-xs bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition shrink-0"
                  >
                    <FaTrash />Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
