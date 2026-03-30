import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from "../assets/الأعمال1.jpg";
import img2 from "../assets/الأعمال2.jpg";
import img3 from "../assets/الأعمال3.jpg";
import img4 from "../assets/الأعمال4.jpg";
import img5 from "../assets/الأعمال5.jpg";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function DropLink({ label, options }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => { clearTimeout(timeoutRef.current); setOpen(true); };
  const hide = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <span className="text-white hover:text-gray-300 transition font-medium cursor-pointer">
        {label}
      </span>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a2550]/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden z-50 min-w-[150px]">
          {options.map((opt) =>
            opt.section ? (
              <button
                key={opt.label}
                onClick={() => scrollToSection(opt.section)}
                className="block w-full text-left px-5 py-2.5 text-sm text-white bg-transparent border-none outline-none hover:bg-emerald-500/20 hover:text-emerald-300 transition whitespace-nowrap"
              >
                {opt.label}
              </button>
            ) : (
              <a
                key={opt.label}
                href={opt.href}
                className="block px-5 py-2.5 text-sm text-white hover:bg-emerald-500/20 hover:text-emerald-300 transition whitespace-nowrap"
              >
                {opt.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

const HeroSlider = () => {
  const slides = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
  ];

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed overlay */}
      <div className="absolute inset-0 bg-[#1D2B59]/60 flex flex-col items-center justify-center text-white text-center px-4 z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight drop-shadow-lg">
          Entrepreneurship and Innovation
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-medium text-white pointer-events-auto">

          <button onClick={() => scrollToSection("brief")} className="text-white hover:text-gray-300 transition bg-transparent border-none outline-none p-0 cursor-pointer">Home</button>
          <span className="text-emerald-400">→</span>

          <DropLink
            label="Ideas"
            options={[
              { label: "View Ideas",  section: "ideas"  },
              { label: "Create Idea", href: "/create"   },
            ]}
          />
          <span className="text-emerald-400">→</span>

          <button onClick={() => scrollToSection("learning")} className="text-white hover:text-gray-300 transition bg-transparent border-none outline-none p-0 cursor-pointer">Learning Hub</button>
          <span className="text-emerald-400">→</span>

          <DropLink
            label="Events"
            options={[
              { label: "View Events", section: "events" },
            ]}
          />
          <span className="text-emerald-400">→</span>

          <button onClick={() => scrollToSection("community")} className="text-white font-bold hover:text-gray-300 transition border-b-2 border-emerald-400 bg-transparent border-x-0 border-t-0 outline-none p-0 cursor-pointer">Community</button>

        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
