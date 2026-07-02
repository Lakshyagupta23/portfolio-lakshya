import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import AITwin from './components/AITwin';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#02050e] text-slate-100 font-sans antialiased selection:bg-primary selection:text-black relative overflow-x-hidden">
        
        {/* Ambient Glowing Background Blobs */}
        <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-primary/10 blur-[130px] pointer-events-none animate-float-1" />
        <div className="absolute top-[40%] right-[-15%] w-[550px] h-[550px] rounded-full bg-[#7000ff]/12 blur-[170px] pointer-events-none animate-float-2" />
        <div className="absolute bottom-[15%] left-[25%] w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[150px] pointer-events-none animate-float-3" />

        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Global Page Content Container */}
        <main className="relative z-10 w-full min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            
            {/* Scoped wrapper for AI Twin chat client */}
            <Route path="/ai-twin" element={
              <div className="flex h-screen w-full items-center justify-center bg-transparent px-4 py-20 sm:px-12 md:px-24">
                <div className="w-full max-w-3xl h-[80vh] min-h-[500px]">
                  <AITwin />
                </div>
              </div>
            } />
            
            <Route path="/contact" element={<Contact />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}
