import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Pages
import Ideas from "./pages/Ideas";
import IdeaDetails from "./pages/IdeaDetails";
import CreateIdea from "./pages/CreateIdea";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails"; // Added this
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // Home page with HeroSlider and Ideas feed
import LearningHub from "./pages/LearningHub";
import Community from "./pages/Community";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page with HeroSlider and Ideas feed */}
            {/* Core Idea Routes */}
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/ideas/:id" element={<IdeaDetails />} />
            <Route path="/create" element={<CreateIdea />} />
            <Route path="/learning" element={<LearningHub />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Core Event Routes */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} /> {/* Added this */}
            <Route path="/community" element={<Community />} />
            {/* User Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;