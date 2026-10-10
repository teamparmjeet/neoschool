import React from 'react';
import { Code2, Heart, Github, Twitter, Youtube, Disc as Discord, ArrowUpRight, BookOpen, Terminal, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#171717] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FF7A00] flex items-center justify-center text-white shadow-sm">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Code<span className="text-[#FF7A00]">Nexus</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              The premier interactive developer academy designed for students, beginners, and aspiring software engineers. Master programming through structured tutorials, live browser execution, real projects, and gamified challenges.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-[#FF7A00] hover:text-white flex items-center justify-center text-neutral-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-[#FF7A00] hover:text-white flex items-center justify-center text-neutral-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-[#FF7A00] hover:text-white flex items-center justify-center text-neutral-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Web Technologies */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Web Technologies</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('learn', 'course-html')} className="hover:text-[#FF7A00] transition-colors cursor-pointer">
                  HTML5 Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn', 'course-css')} className="hover:text-[#FF7A00] transition-colors cursor-pointer">
                  CSS3 & Flexbox / Grid
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn', 'course-js')} className="hover:text-[#FF7A00] transition-colors cursor-pointer">
                  JavaScript ES6+
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn', 'course-react')} className="hover:text-[#FF7A00] transition-colors cursor-pointer">
                  React 19 Components
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn', 'course-sql')} className="hover:text-[#FF7A00] transition-colors cursor-pointer">
                  MySQL & Relational Design
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Learning Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('playground')} className="hover:text-[#FF7A00] transition-colors flex items-center gap-1">
                  <span>Code Playground</span>
                  <span className="text-[10px] bg-[#FF7A00]/20 text-[#FF7A00] px-1.5 py-0.2 rounded font-bold">LIVE</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-[#FF7A00] transition-colors">
                  Practice Challenges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quizzes')} className="hover:text-[#FF7A00] transition-colors">
                  Topic Assessments & Quizzes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-[#FF7A00] transition-colors">
                  Hands-on Real Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('paths')} className="hover:text-[#FF7A00] transition-colors">
                  Curated Learning Paths
                </button>
              </li>
            </ul>
          </div>

          {/* Student Center */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Student Hub</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#FF7A00] transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#FF7A00] transition-colors">
                  Saved Bookmarks & Notes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-[#FF7A00] transition-colors">
                  Admin Content CMS
                </button>
              </li>
              <li>
                <span className="text-neutral-500">phpMyAdmin SQL Ready</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} CodeNexus Academy. Empowering developers worldwide with practical, interactive education.
          </p>
          <div className="flex items-center gap-6">
            <span>Color Palette: #FF7A00 Orange Standard</span>
            <span>Sandboxed Execution Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
