import React, { useState, useEffect } from 'react';
import { Course, Project } from '../../types';
import { INITIAL_PROJECTS } from '../../db/initialData';
import { 
  Search, 
  X, 
  BookOpen, 
  Terminal, 
  FolderGit2, 
  ArrowRight,
  Code2
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (course: Course, lessonId: string) => void;
  onSelectProject: (project: Project) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  onSelectCourse,
  onSelectLesson,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or focus
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Search Results
  const matchingCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const matchingLessons = courses.flatMap((c) =>
    c.chapters.flatMap((ch) =>
      ch.lessons.filter((l) =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.explanation.toLowerCase().includes(query.toLowerCase())
      ).map((l) => ({ lesson: l, course: c }))
    )
  );

  const matchingProjects = INITIAL_PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.overview.toLowerCase().includes(query.toLowerCase()) ||
    p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const totalResults = matchingCourses.length + matchingLessons.length + matchingProjects.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#E5E5E5] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#E5E5E5] flex items-center gap-3 bg-[#FAFAFA]">
          <Search className="w-5 h-5 text-[#FF7A00]" />
          <input
            autoFocus
            type="text"
            placeholder="Search all courses, tutorials, exercises, and projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#171717] focus:outline-none placeholder-neutral-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              <p>Type a keyword like <strong className="text-[#171717]">"HTML"</strong>, <strong className="text-[#171717]">"Flexbox"</strong>, <strong className="text-[#171717]">"JavaScript"</strong>, or <strong className="text-[#171717]">"Portfolio"</strong></p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              No results found for "{query}".
            </div>
          ) : (
            <>
              {/* Courses results */}
              {matchingCourses.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#FF7A00]" /> Courses ({matchingCourses.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingCourses.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCourse(c);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#171717] group-hover:text-[#FF7A00]">
                            {c.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 truncate max-w-md">
                            {c.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF7A00]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons results */}
              {matchingLessons.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#2563EB]" /> Lessons & Documentation ({matchingLessons.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingLessons.slice(0, 6).map(({ lesson, course }) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(course, lesson.id);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <span className="text-[10px] text-[#FF7A00] font-semibold block">
                            {course.title}
                          </span>
                          <p className="text-xs font-bold text-[#171717] group-hover:text-[#FF7A00]">
                            {lesson.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 truncate max-w-md">
                            {lesson.explanation}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF7A00]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects results */}
              {matchingProjects.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-green-600" /> Practical Projects ({matchingProjects.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingProjects.slice(0, 3).map((proj) => (
                      <button
                        key={proj.id}
                        onClick={() => {
                          onSelectProject(proj);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#171717] group-hover:text-[#FF7A00]">
                            {proj.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 truncate max-w-md">
                            {proj.overview}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF7A00]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-50 border-t border-[#E5E5E5] text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Search in Real-Time</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
