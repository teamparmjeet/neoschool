import React, { useState } from 'react';
import { Course, Project, User } from '../../types';
import { INITIAL_PROJECTS, INITIAL_LEARNING_PATHS } from '../../db/initialData';
import { CodePlayground } from '../playground/CodePlayground';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Play, 
  Code2, 
  Layers, 
  Terminal, 
  Database, 
  FileCode2, 
  CheckCircle2, 
  Flame, 
  Compass, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  FolderGit2,
  Clock,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  courses: Course[];
  currentUser: User;
  onNavigate: (view: string, courseId?: string) => void;
  onSelectCourse: (course: Course) => void;
  openSearch: () => void;
}

const FAQS = [
  {
    q: 'Is CodeNexus really free to start for beginners?',
    a: 'Yes! All core tutorials, code documentation, interactive sandbox exercises, and learning paths are 100% accessible to any learner worldwide without paywalls.'
  },
  {
    q: 'How does the interactive code execution work?',
    a: 'We provide an isolated, sandboxed execution environment with live HTML/CSS/JS rendering and a built-in virtual console so you can experiment in real-time without installing local software or compilers.'
  },
  {
    q: 'Can I track my learning progress across devices?',
    a: 'Yes. Your completed lessons, exercise scores, study notes, bookmarked tutorials, streaks, and XP points are persisted and tied to your student account.'
  },
  {
    q: 'How do the practical projects work?',
    a: 'Every project comes with an architectural blueprint, folder structure, step-by-step code walkthrough, testing checklist, common bugs to avoid, and deployment instructions.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  courses,
  currentUser,
  onNavigate,
  onSelectCourse,
  openSearch,
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const featuredCourses = courses.filter((c) => c.featured);
  const featuredProjects = INITIAL_PROJECTS.slice(0, 3);
  const featuredPath = INITIAL_LEARNING_PATHS[0];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    openSearch();
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E5E5E5] bg-gradient-to-b from-[#FFF9F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-[#FF7A00] text-xs font-bold mb-6 shadow-2xs">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Developer Education • Zero Fluff, 100% Code</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#171717] tracking-tight leading-tight sm:leading-none max-w-4xl mx-auto">
            Learn to Code. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E40]">
              Build Your Future.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            The modern interactive platform for students, beginners, and aspiring software engineers. Master web development, databases, and problem solving through structured lessons, live browser playgrounds, and real-world projects.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleHeroSearch} className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
            <input
              type="text"
              readOnly
              onClick={openSearch}
              placeholder="Search any programming topic (e.g. HTML, Flexbox, React, SQL)..."
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-[#E5E5E5] bg-white shadow-sm text-sm text-[#171717] cursor-pointer hover:border-[#FF7A00] transition-colors"
            />
            <button
              type="button"
              onClick={openSearch}
              className="absolute right-2 top-2 px-4 py-2 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold rounded-xl"
            >
              Search
            </button>
          </form>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white text-sm font-extrabold shadow-md shadow-[#FF7A00]/25 transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Learning Free</span>
            </button>

            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-50 text-[#171717] border border-[#E5E5E5] text-sm font-bold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Tutorials</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => onNavigate('playground')}
              className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#FF7A00] fill-current" />
              <span>Try Code Online</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-8 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#171717]">100%</p>
              <p className="text-xs text-neutral-500 font-semibold mt-0.5">Free & Interactive</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FF7A00]">12+</p>
              <p className="text-xs text-neutral-500 font-semibold mt-0.5">Curated Categories</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#171717]">Live</p>
              <p className="text-xs text-neutral-500 font-semibold mt-0.5">Browser Sandbox</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FF7A00]">Gamified</p>
              <p className="text-xs text-neutral-500 font-semibold mt-0.5">XP, Badges & Streaks</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED LANGUAGES BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">Foundational Technologies</span>
          <h2 className="text-2xl font-extrabold text-[#171717] mt-1">Start With What Matters</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'HTML5', desc: 'Structure & Markup', color: '#FF7A00', id: 'course-html' },
            { name: 'CSS3', desc: 'Flexbox & Grid', color: '#2563EB', id: 'course-css' },
            { name: 'JavaScript', desc: 'Logic & DOM', color: '#EAB308', id: 'course-js' },
            { name: 'React 19', desc: 'UI Components', color: '#06B6D4', id: 'course-react' },
            { name: 'Python', desc: 'Algorithms & AI', color: '#3B82F6', id: 'course-python' },
            { name: 'MySQL', desc: 'Relational SQL', color: '#0284C7', id: 'course-sql' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate('learn', item.id)}
              className="p-4 bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#FF7A00] transition-all text-center group cursor-pointer shadow-2xs hover:shadow-sm"
            >
              <span className="block font-extrabold text-base text-[#171717] group-hover:text-[#FF7A00] transition-colors">
                {item.name}
              </span>
              <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE CODE PLAYGROUND PREVIEW ON HOMEPAGE */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF9F3] border border-orange-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] bg-orange-100 px-3 py-1 rounded-full">
                Try Code Online
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-3">
                Interactive Live Playground
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                Edit the HTML, tweak the CSS, or run JavaScript below. Changes update in real-time inside the sandboxed preview with instant console feedback!
              </p>
            </div>

            <button
              onClick={() => onNavigate('playground')}
              className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>Launch Fullscreen Playground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <CodePlayground title="Home Interactive Preview" />
        </div>
      </section> */}

      {/* 4. POPULAR COURSES & TRENDING TUTORIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">Trending Tutorials</span>
            <h2 className="text-2xl font-extrabold text-[#171717] mt-1">Featured Developer Courses</h2>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-[#FF7A00] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]">
                    {c.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                    {c.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#171717]">{c.title}</h3>
                <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                  {c.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {c.estimatedDuration}
                </span>

                <button
                  onClick={() => onSelectCourse(c)}
                  className="px-3.5 py-1.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Start Lesson &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GUIDED LEARNING PATH PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] bg-white/10 px-3 py-1 rounded-full">
              Recommended Path
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
              {featuredPath.headline}
            </h2>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              {featuredPath.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredPath.careerRoles.map((role, idx) => (
                <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-700">
                  {role}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => onNavigate('paths')}
                className="px-6 py-3 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Follow Learning Roadmap &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POPULAR PRACTICAL PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">Build What Matters</span>
            <h2 className="text-2xl font-extrabold text-[#171717] mt-1">Practical Real-World Projects</h2>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-bold text-[#FF7A00] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 text-[#FF7A00]">
                    {proj.difficulty}
                  </span>
                  <span className="text-xs text-neutral-400">{proj.estimatedHours}</span>
                </div>

                <h3 className="font-bold text-base text-[#171717]">{proj.title}</h3>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                  {proj.overview}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">{proj.technologies.join(', ')}</span>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-xs font-bold text-[#FF7A00] hover:underline cursor-pointer"
                >
                  View Blueprint &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STUDENT PROGRESS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E5E5E5] p-6 sm:p-10 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#FF7A00]">
              <Flame className="w-4 h-4 fill-current" />
              <span>Personalized Student Journey</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#171717]">
              Track Your Progress & Earn Verified Badges
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
              Currently logged in as <strong>{currentUser.name}</strong> with <strong>{currentUser.xp} XP</strong> and a <strong>{currentUser.currentStreak}-day learning streak</strong>. Save your notes, bookmark hard lessons, and prepare for developer interviews.
            </p>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer shadow-xs"
          >
            Open Student Dashboard &rarr;
          </button>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">Frequently Asked Questions</span>
          <h2 className="text-2xl font-extrabold text-[#171717] mt-1">Everything You Need to Know</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm font-bold text-[#171717] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#FF7A00]" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
