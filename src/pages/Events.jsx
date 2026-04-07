import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import eventsData from "../data/events";
import { auth } from "../firebase";
import {
  fetchAcceptedItems,
  MODERATION_COLLECTIONS,
  submitForModeration,
} from "../services/moderationService";

const Events = () => {
  const [submittedEvents, setSubmittedEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    time: "",
    description: "",
    fullDescription: "",
    speaker: "",
    seats: "",
    image: "",
    tags: "",
  });

  const events = useMemo(
    () => [
      ...eventsData,
      ...submittedEvents.map((event) => ({
        ...event,
        tags: Array.isArray(event.tags)
          ? event.tags
          : String(event.tags || "")
              .split(",")
              .map((value) => value.trim())
              .filter(Boolean),
      })),
    ],
    [submittedEvents]
  );

  const loadAcceptedEvents = async () => {
    try {
      const accepted = await fetchAcceptedItems(MODERATION_COLLECTIONS.events);
      setSubmittedEvents(accepted);
    } catch (error) {
      console.log("Failed to load accepted events:", error);
    }
  };

  useEffect(() => {
    loadAcceptedEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      await submitForModeration(
        MODERATION_COLLECTIONS.events,
        {
          ...form,
          seats: Number(form.seats || 0),
          tags: form.tags
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          image:
            form.image ||
            "https://images.unsplash.com/photo-1556761175-4b46a572b786",
        },
        auth.currentUser
      );
      alert("Event sent to admin for review.");
      setForm({
        title: "",
        date: "",
        location: "",
        time: "",
        description: "",
        fullDescription: "",
        speaker: "",
        seats: "",
        image: "",
        tags: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow mb-10 border">
          <h2 className="text-2xl font-bold text-[#1D2B59] mb-2">Submit New Event</h2>
          <p className="text-sm text-gray-500 mb-4">
            Event will appear after admin acceptance.
          </p>
          <form onSubmit={handleSubmitEvent} className="grid md:grid-cols-2 gap-3">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border rounded-lg p-2" />
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="border rounded-lg p-2" />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="border rounded-lg p-2" />
            <input name="time" value={form.time} onChange={handleChange} placeholder="Time (e.g. 6:00 PM - 9:00 PM)" required className="border rounded-lg p-2" />
            <input name="speaker" value={form.speaker} onChange={handleChange} placeholder="Speaker" className="border rounded-lg p-2" />
            <input name="seats" type="number" value={form.seats} onChange={handleChange} placeholder="Seats" className="border rounded-lg p-2" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" className="md:col-span-2 border rounded-lg p-2" />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags separated by commas" className="md:col-span-2 border rounded-lg p-2" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description" required className="md:col-span-2 border rounded-lg p-2" />
            <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} placeholder="Full description" className="md:col-span-2 border rounded-lg p-2" />
            <button type="submit" className="md:col-span-2 bg-[#1D2B59] text-white py-2 rounded-lg font-semibold hover:bg-emerald-600 transition">
              Send To Admin
            </button>
          </form>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1D2B59]">
            Entrepreneurship Events
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Events;