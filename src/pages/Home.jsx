import HeroSlider from "../components/HeroSlider";
import SocialSidebar from "../components/SocialSidebar";
import Ideas from "./Ideas"; // Bringing in your ideas feed below the slider

const Home = () => {
  return (
    <div className="relative">
      <SocialSidebar />
      <HeroSlider />
    </div>
  );
};

export default Home;