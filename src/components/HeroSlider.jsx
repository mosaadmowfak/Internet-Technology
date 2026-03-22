import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 1. Import your images so Vite processes them
import img1 from "../assets/الأعمال1.jpg";
import img2 from "../assets/الأعمال2.jpg";
import img3 from "../assets/الأعمال3.jpg";
import img4 from "../assets/الأعمال4.jpg";
import img5 from "../assets/الأعمال5.jpg";

const HeroSlider = () => {
  const slides = [
    { id: 1, image: img1 }, 
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 }
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
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }} // Now using the imported variable
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-[#1D2B59]/60 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                   ريادة الأعمال والابتكار
                </h1>
                <div className="flex items-center space-x-2 text-lg font-medium">
                  <span>Home</span>
                  <span className="text-emerald-400">→</span>
                  <span>MUST Hub</span>
                  <span className="text-emerald-400">→</span>
                  <span className="font-bold border-b-2 border-emerald-400">Empowering Innovators</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;