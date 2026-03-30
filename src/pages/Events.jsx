import EventCard from "../components/EventCard";

const Events = () => {

  const events = [
    {
      id: 1,
      title: "Startup Pitch Night",
      date: "2026-03-15",
      location: "Innovation Hub",
      time: "6:00 pm - 10:00 pm",
      description: "طلاب يعرضوا مشاريعهم قدام مستثمرين حقيقيين وفرصة للحصول على funding.",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786"
    },
    {
      id: 2,
      title: "Build Startup from Zero",
      date: "2026-03-20",
      location: "Main Auditorium",
      time: "12:00 pm - 3:00 pm",
      description: "تعلم ازاي تبدأ مشروع من فكرة لمنتج حقيقي.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
    },
    {
      id: 3,
      title: "Entrepreneur Networking",
      date: "2026-03-25",
      location: "Business Lounge",
      time: "4:00 pm - 8:00 pm",
      description: "قابل founders وابني شبكة علاقات قوية.",
      image: "https://images.unsplash.com/photo-1515169067868-5387ec356754"
    }
  ]; // 🔥 مهم جدًا تقفل ال array

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-12 px-6">
      <div className="max-w-7xl mx-auto">

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