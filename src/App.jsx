import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import AITwin from "./components/AITwin";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0e0c0a] text-[#f0ece3] antialiased selection:bg-gold/20 selection:text-gold-light relative overflow-x-hidden">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Navigation */}
        <TopNav />

        {/* Page Content */}
        <main className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/ai-twin"
              element={
                <div className="flex h-screen w-full items-center justify-center px-4 py-24 sm:px-12 md:px-24">
                  <div className="w-full max-w-3xl h-[80vh] min-h-[500px]">
                    <AITwin />
                  </div>
                </div>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
