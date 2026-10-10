import React, { useState } from 'react';
import { Course, CourseCategory, Difficulty, User } from '../../types';
import { 
  Code2, 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  Palette, 
  FileCode2, 
  Terminal, 
  Database, 
  GitBranch, 
  CheckCircle2,
  Shield,
  Smartphone,
  Cpu,
  Brain
} from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
  currentUser: User;
  onSelectCourse: (course: Course) => void;
}

const CATEGORIES: CourseCategory[] = [
  'Web Development',
  'Programming Fundamentals',
  'Frontend Development',
  'Backend Development',
  'Full-Stack Development',
  'Mobile App Development',
  'Database Development',
  'Data Structures and Algorithms',
  'Artificial Intelligence and Machine Learning',
  'Computer Science Fundamentals',
  'DevOps and Deployment',
  'Cybersecurity Fundamentals',
];

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  currentUser,
  onSelectCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBeginner, setOnlyBeginner] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    const matchesBeginner = !onlyBeginner || course.isBeginnerFriendly;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesBeginner && matchesSearch;
  });

  const getCourseProgress = (course: Course) => {
    const allLessonIds = course.chapters.flatMap((c) => c.lessons.map((l) => l.id));
    if (allLessonIds.length === 0) return 0;
    const completed = allLessonIds.filter((id) => currentUser.completedLessonIds.includes(id)).length;
    return Math.round((completed / allLessonIds.length) * 100);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'FileCode2': return <FileCode2 className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] bg-orange-100/60 px-3 py-1 rounded-full">
          Comprehensive Curriculum
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717] mt-3 tracking-tight">
          Explore All Developer Courses
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-2">
          From absolute beginner basics to advanced full-stack architecture. Learn hands-on with real code, interactive playgrounds, and line-by-line tutorials.
        </p>

        {/* Global Search Bar */}
        <div className="mt-6 relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by topic, language, or concept (e.g. HTML, Flexbox, React, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#E5E5E5] bg-white shadow-xs focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]"
          />
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-4 sm:p-6 mb-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Difficulty and Beginner Switch */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Difficulty:
            </span>

            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-[#171717] text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {diff}
              </button>
            ))}

            <label className="flex items-center gap-2 ml-2 text-xs font-semibold text-neutral-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyBeginner}
                onChange={(e) => setOnlyBeginner(e.target.checked)}
                className="w-4 h-4 text-[#FF7A00] rounded focus:ring-[#FF7A00]"
              />
              <span>Beginner-Friendly Only</span>
            </label>
          </div>

          <div className="text-xs font-semibold text-neutral-500">
            Showing <span className="text-[#FF7A00] font-bold">{filteredCourses.length}</span> course{filteredCourses.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* 12 Categories Horizontal Pill Scroll */}
        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#FF7A00] text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF7A00] text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E5E5] p-8">
          <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#171717]">No courses matched your filters</h3>
          <p className="text-sm text-neutral-500 mt-1">Try resetting the difficulty or category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
              setOnlyBeginner(false);
            }}
            className="mt-4 px-4 py-2 bg-[#FF7A00] text-white text-xs font-bold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const progress = getCourseProgress(course);
            const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#FF7A00]/50 shadow-2xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Card Header Top */}
                <div className="p-6 pb-4 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: course.color || '#FF7A00' }}
                    >
                      {getIcon(course.thumbnailIcon)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                        {course.difficulty}
                      </span>
                      {course.isBeginnerFriendly && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF7A00] border border-orange-200">
                          Beginner
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-[#FF7A00] uppercase tracking-wider">
                    {course.category}
                  </span>

                  <h3 className="text-lg font-bold text-[#171717] mt-1 group-hover:text-[#FF7A00] transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Prerequisites tags */}
                  {course.prerequisites?.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-neutral-100">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                        Prerequisites:
                      </span>
                      <p className="text-[11px] text-neutral-600 truncate">
                        {course.prerequisites.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Progress bar (if started) */}
                {progress > 0 && (
                  <div className="px-6 py-2 bg-neutral-50 border-t border-neutral-100">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-600 mb-1">
                      <span>Your Progress</span>
                      <span className="text-[#FF7A00] font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF7A00]" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-white border-t border-[#E5E5E5] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.estimatedDuration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {totalLessons} lessons
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold transition-transform active:scale-95 shadow-xs cursor-pointer"
                  >
                    <span>{progress > 0 ? 'Continue' : 'Start Learning'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
