import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/Home";
import Directory from "./pages/Directory";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Groups from "./pages/Groups";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/groups" element={<Groups />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
