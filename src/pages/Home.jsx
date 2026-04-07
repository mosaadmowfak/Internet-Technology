import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import SocialSidebar from "../components/SocialSidebar";
import IdeaCard from "../components/IdeaCard";
import EventCard from "../components/EventCard";
import events from "../data/events";
import ProfilePic from "../assets/IMG_1731.jpg";
import { db } from "../firebase";
import { MODERATION_COLLECTIONS, isLearningHubPublished } from "../services/moderationService";
import {
  FaLightbulb, FaBook, FaCalendarAlt, FaUsers,
  FaRegCommentDots, FaQuestionCircle, FaRegSmile,
  FaPoll, FaRegThumbsUp, FaRegComment, FaShare,
} from "react-icons/fa";

/* ─── Data ─────────────────────────────────────────────── */

const services = [
  { icon: <FaLightbulb />, title: "Ideas",        description: "Share startup ideas and collaborate with innovators.",                          to: "#ideas"     },
  { icon: <FaBook />,       title: "Learning Hub", description: "Access curated resources and courses to sharpen your skills.",                 to: "#learning"  },
  { icon: <FaCalendarAlt />,title: "Events",       description: "Discover workshops, pitch competitions, and networking events.",               to: "#events"    },
  { icon: <FaUsers />,      title: "Community",    description: "Connect with students, mentors, and entrepreneurs.",                           to: "#community" },
];

/* ─── Home ──────────────────────────────────────────────── */
export default function Home() {
  const [filter, setFilter]       = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);
  const [comment, setComment]     = useState("");
  const [resources, setResources] = useState([]);
  const [legacyResources, setLegacyResources] = useState([]);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const subscriptions = [
      {
        ref: collection(db, MODERATION_COLLECTIONS.learningHub),
        setter: setResources,
      },
      {
        ref: collection(db, MODERATION_COLLECTIONS.legacyLearningHub),
        setter: setLegacyResources,
      },
      {
        ref: collection(db, MODERATION_COLLECTIONS.ideas),
        setter: setIdeas,
      },
    ];

    const unsubscribes = subscriptions.map(({ ref, setter }) =>
      onSnapshot(
        ref,
        (snapshot) => {
          const items = snapshot.docs
            .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
            .filter(isLearningHubPublished);
          setter(items);
        },
        (error) => {
          console.error("Home learning hub listener error:", error);
        }
      )
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  const combinedResources = useMemo(() => {
    return [...resources, ...legacyResources].sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? 0;
      const tb = b.createdAt?.toMillis?.() ?? 0;
      return tb - ta;
    });
  }, [resources, legacyResources]);

  const approvedIdeas = useMemo(() => {
    return ideas
      .filter((item) => item.status === "accepted")
      .sort((a, b) => {
        const ta = a.createdAt?.toMillis?.() ?? 0;
        const tb = b.createdAt?.toMillis?.() ?? 0;
        return tb - ta;
      });
  }, [ideas]);

  const filtered = filter === "all" ? combinedResources : combinedResources.filter(r => r.type === filter);

  return (
    <div className="relative">
      <SocialSidebar />
      <HeroSlider />

      {/* ── Brief ─────────────────────────────────────────── */}
      <section id="brief" className="bg-gray-50 py-14 px-6 text-center scroll-mt-20">
        <h2 className="text-3xl font-bold text-[#4CAF50] mb-6">Brief</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed mb-3">
          The MUST Entrepreneurship & Innovation Hub is a platform built to empower students and aspiring entrepreneurs at Misr University for Science & Technology.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
          Whether you have a startup idea, want to learn new skills, or connect with a thriving community — this is your space to innovate, collaborate, and grow.
        </p>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section className="bg-gray-50 pb-16 px-6">
        <h2 className="text-3xl font-bold text-[#4CAF50] mb-10 pl-4 md:pl-16">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((s) => (
            <a key={s.title} href={s.to}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col items-center text-center group"
            >
              <span className="text-4xl text-[#4CAF50] mb-4">{s.icon}</span>
              <h3 className="text-lg font-bold text-[#1a2550] mb-2 group-hover:text-[#4CAF50] transition">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── Ideas ─────────────────────────────────────────── */}
      <section id="ideas" className="bg-[#f5f7fb] py-16 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1D2B59]">Discover Startup Ideas</h2>
              <p className="text-gray-500 mt-2">Collaborate with innovators and build your next venture</p>
            </div>
            <Link to="/create" className="px-5 py-2.5 bg-[#1a2550] text-white rounded-full text-sm font-semibold hover:bg-[#2d3d80] transition">
              + Submit Idea
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedIdeas.length > 0 ? (
              approvedIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  id={idea.id}
                  title={idea.title}
                  description={idea.description}
                  owner={idea.userId || "Community"}
                  tags={idea.tags || []}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-16 border border-dashed rounded-3xl">
                No approved ideas are available yet. Once admin accepts them, they will appear here.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Learning Hub ──────────────────────────────────── */}
      <section id="learning" className="bg-gray-50 py-16 scroll-mt-20">
        <div className="bg-[#1D2B59] text-white py-12 px-6 text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-3">Learning Hub</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Curated videos & articles to master entrepreneurship.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex bg-white p-2 rounded-2xl shadow-lg w-fit mx-auto mb-12 border">
            {["all", "video", "post"].map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-xl font-bold transition capitalize ${filter === t ? "bg-[#1D2B59] text-white" : "text-gray-500 hover:bg-gray-100"}`}
              >
                {t}s
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length > 0 ? (
              filtered.map(item => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition group">
                  <div className="relative h-52 overflow-hidden">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-xl">▶</div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold">{item.category}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">By {item.author}</p>
                    {item.type === "post" && <p className="text-sm text-gray-600 mb-4">{item.description}</p>}
                    <button
                      onClick={() => item.type === "video" ? setActiveVideo(item.link + "?autoplay=1") : window.open(item.link, "_blank")}
                      className="w-full py-2 rounded-lg border font-semibold hover:bg-[#1D2B59] hover:text-white transition"
                    >
                      {item.type === "video" ? "Watch Video" : "Read Article"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-16 border border-dashed rounded-3xl">
                No approved Learning Hub content is available yet. Check back after admin approval.
              </div>
            )}
          </div>
        </div>

        {activeVideo && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl overflow-hidden w-[90%] md:w-[700px] relative">
              <button onClick={() => setActiveVideo(null)} className="absolute top-2 right-3 text-xl">✕</button>
              <iframe width="100%" height="400" src={activeVideo} title="Video" allowFullScreen />
            </div>
          </div>
        )}
      </section>

      {/* ── Events ────────────────────────────────────────── */}
      <section id="events" className="bg-[#f5f7fb] py-16 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-[#1D2B59]">Entrepreneurship Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ─────────────────────────────────────── */}
      <section id="community" className="bg-gray-50 py-16 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-4xl font-bold text-[#1D2B59] text-center mb-8">Community</h2>

          {/* Create Post */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3 border-b pb-4">
              <img src={ProfilePic} className="w-10 h-10 rounded-full" />
              <input type="text" placeholder="Share thoughts, ideas, or updates"
                className="w-full bg-gray-100 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div className="flex justify-between items-center mt-4 text-sm flex-wrap gap-2">
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: <FaRegCommentDots className="text-orange-500" />, label: "Discussion" },
                  { icon: <FaQuestionCircle className="text-blue-500" />,   label: "Question"   },
                  { icon: <FaRegSmile className="text-pink-500" />,         label: "Praise"     },
                  { icon: <FaPoll className="text-green-500" />,            label: "Poll"       },
                ].map(b => (
                  <button key={b.label} className="!bg-transparent flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition">
                    {b.icon}{b.label}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition">Drafts</span>
            </div>
          </div>

          {/* Sample Post */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Posted in <span className="font-semibold text-gray-800">All MUSTIANS</span></p>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img src={ProfilePic} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-800">200039281 - Ahmed Khaled Farouk Elmalah</p>
                  <p className="text-xs text-gray-500">Sat at 11:09 PM • @2</p>
                </div>
              </div>
              <div className="text-sm text-gray-400">Seen by 804</div>
            </div>
            <div className="text-right text-gray-700 leading-loose text-[15px] space-y-2">
              <p dir="rtl">أنا حالياً بفكر أبدأ مشروع SaaS صغير، بس محتار أبدأ منين:</p>
              <p dir="ltr" className="text-left">What are the biggest challenges you faced when starting your first business idea? 🚀</p>
              <ul className="list-disc pr-5" dir="rtl">
                <li>هل أبدأ بـ MVP الأول؟</li>
                <li>ولا أعمل market research الأول؟</li>
              </ul>
              <p dir="rtl">ياريت أي حد عنده تجربة يفيدنا 🙏</p>
            </div>
            <div className="flex gap-4 border-t pt-3">
              {[
                { icon: <FaRegThumbsUp />, label: "Like"    },
                { icon: <FaRegComment />,  label: "Comment" },
                { icon: <FaShare />,       label: "Share"   },
              ].map(b => (
                <button key={b.label} className="!bg-transparent flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition">
                  {b.icon}{b.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600">👍 200053946 - Ahmed Ibrahim Ramadan Salem Mohamed Ashour</p>
            <div className="flex items-center gap-3 pt-2">
              <img src={ProfilePic} className="w-8 h-8 rounded-full" />
              <input type="text" placeholder="Write a comment" value={comment} onChange={e => setComment(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
