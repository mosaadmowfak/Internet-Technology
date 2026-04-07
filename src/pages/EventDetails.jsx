import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaTag, FaChair } from "react-icons/fa";
import events from "../data/events";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { MODERATION_COLLECTIONS, submitForModeration } from "../services/moderationService";

function RegisterModal({ event, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await submitForModeration(
        MODERATION_COLLECTIONS.eventRegistrations,
        {
          eventId: event.id,
          eventTitle: event.title,
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        auth.currentUser
      );
      setSubmitted(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
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
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-[#1D2B59] mb-2">You're Registered!</h3>
            <p className="text-gray-500 mb-1">See you at <span className="font-semibold text-gray-700">{event.title}</span></p>
            <p className="text-gray-400 text-sm mb-6">A confirmation will be sent to your email.</p>
            <button
              onClick={onClose}
              className="bg-[#1D2B59] text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#1D2B59] mb-1">Register for Event</h2>
            <p className="text-sm text-gray-400 mb-6">{event.title}</p>

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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 01012345678"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2B59]/30 transition"
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
                  disabled={submitting}
                  className="flex-1 bg-[#1D2B59] text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition"
                >
                  {submitting ? "Submitting..." : "Confirm Registration"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [dynamicEvent, setDynamicEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const staticEvent = events.find((e) => String(e.id) === String(id));
  const event = staticEvent || dynamicEvent;

  useEffect(() => {
    const loadEvent = async () => {
      if (staticEvent) {
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, MODERATION_COLLECTIONS.events, id);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setDynamicEvent({ id: snapshot.id, ...snapshot.data() });
        }
      } catch (error) {
        console.log("Failed to load event details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, staticEvent]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p className="text-2xl font-semibold mb-4">Event not found.</p>
        <button onClick={() => navigate(-1)} className="text-[#1D2B59] hover:underline">← Go Back</button>
      </div>
    );
  }

  const d = new Date(event.date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1D2B59]/70 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow">{event.title}</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {(event.tags || []).map(tag => (
              <span key={tag} className="bg-white/20 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="text-sm text-[#1D2B59] hover:underline mb-8 block font-medium">
          ← Back to Events
        </button>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left — About */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#1D2B59] mb-4">About this Event</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {event.fullDescription || event.description}
            </p>

            <h3 className="text-lg font-bold text-[#1D2B59] mb-2">Speaker</h3>
            <p className="text-gray-600">{event.speaker || "TBA"}</p>
          </div>

          {/* Right — Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 h-fit">
            <h3 className="font-bold text-[#1D2B59] text-lg">Event Info</h3>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <FaClock className="text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">{`${day} ${month} ${year}`}</p>
                <p>{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-green-500 mt-0.5 shrink-0" />
              <p>{event.location}</p>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <FaChair className="text-green-500 mt-0.5 shrink-0" />
              <p>{event.seats || 0} seats available</p>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <FaTag className="text-green-500 mt-0.5 shrink-0" />
              <div className="flex flex-wrap gap-2">
                {(event.tags || []).map(tag => (
                  <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">{tag}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowRegister(true)}
              className="w-full mt-2 bg-[#1D2B59] text-white py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition"
            >
              Register for Event
            </button>
          </div>

        </div>
      </div>

      {showRegister && <RegisterModal event={event} onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default EventDetails;
