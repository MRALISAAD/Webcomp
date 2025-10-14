import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Packs from "./pages/Packs.jsx";
import About from "./pages/About.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Contact from "./pages/Contact.jsx";
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/temoignages" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
