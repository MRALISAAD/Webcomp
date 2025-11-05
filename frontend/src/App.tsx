import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import Toaster from "./components/ui/toaster";
import Home from "./pages/Home";
import Packs from "./pages/Packs";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Processus = lazy(() => import("./pages/Processus"));
const Booking = lazy(() => import("./pages/Booking"));
const Partners = lazy(() => import("./pages/Partners"));

const App = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Toaster />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/packs" element={<Packs />} />
            <Route path="/processus" element={<Processus />} />
            <Route path="/process" element={<Processus />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/temoignages" element={<Testimonials />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
