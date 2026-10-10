import React, { useState } from 'react';
import { User, Course, StudentNote } from '../../types';
import { calculateLevel, deleteNote, toggleBookmark } from '../../db/storage';
import { 
  Sparkles, 
  Flame, 
  Award, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  StickyNote, 
  Trash2, 
  Search, 
  ArrowRight, 
  TrendingUp,
  Clock,
  Code2
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: User;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenLesson: (course: Course, lessonId: string) => void;
  onUserUpdate: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  courses,
  onSelectCourse,
  onOpenLesson,
  onUserUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'notes' | 'achievements'>('overview');
  const [notesSearch, setNotesSearch] = useState('');

  const levelInfo = calculateLevel(currentUser.xp);

  // Enrolled courses
  const enrolledCourses = courses.filter((c) => currentUser.enrolledCourseIds.includes(c.id));

  // Find bookmarked lessons across all courses
  const bookmarkedLessons = courses.flatMap((c) =>
    c.chapters.flatMap((ch) =>
      ch.lessons.filter((l) => currentUser.bookmarkedLessonIds.includes(l.id)).map((l) => ({
        lesson: l,
        course: c,
      }))
    )
  );

  const filteredNotes = currentUser.notes.filter((n) =>
    n.content.toLowerCase().includes(notesSearch.toLowerCase()) ||
    n.lessonTitle.toLowerCase().includes(notesSearch.toLowerCase())
  );

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    onUserUpdate();
  };

  const handleRemoveBookmark = (lessonId: string) => {
    toggleBookmark(lessonId);
    onUserUpdate();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banner Card: Student Identity & XP Level */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#FF7A00] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{currentUser.name}</h1>
                <span className="text-xs px-2 py-0.5 rounded bg-[#FF7A00] font-bold text-white uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">{currentUser.email}</p>
              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-neutral-300">
                <span className="text-[#FF7A00] font-bold">{levelInfo.title}</span>
                <span>•</span>
                <span>Level {levelInfo.level}</span>
                <span>•</span>
                <span>{currentUser.xp} Total XP</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Streak */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-orange-400 font-extrabold text-lg">
                <Flame className="w-5 h-5 fill-current" />
                <span>{currentUser.currentStreak}</span>
              </div>
              <span className="text-[10px] text-neutral-300 uppercase tracking-wider font-semibold">
                Day Streak
              </span>
            </div>

            {/* Completed Lessons */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10 text-center min-w-[90px]">
              <div className="text-green-400 font-extrabold text-lg">
                {currentUser.completedLessonIds.length}
              </div>
              <span className="text-[10px] text-neutral-300 uppercase tracking-wider font-semibold">
                Completed
              </span>
            </div>

            {/* Badges */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10 text-center min-w-[90px]">
              <div className="text-yellow-400 font-extrabold text-lg">
                {currentUser.achievements.length}
              </div>
              <span className="text-[10px] text-neutral-300 uppercase tracking-wider font-semibold">
                Badges
              </span>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 mb-1.5">
            <span>Level {levelInfo.level} Progression</span>
            <span>{levelInfo.progressPercent}% to next rank ({levelInfo.nextLevelXp} XP)</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF7A00] to-yellow-400 rounded-full transition-all duration-500" 
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs Toolbar */}
      <div className="flex items-center gap-2 border-b border-[#E5E5E5] pb-3 mb-8 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview & Learning', icon: TrendingUp },
          { id: 'bookmarks', label: `Saved Lessons (${bookmarkedLessons.length})`, icon: Bookmark },
          { id: 'notes', label: `Study Notes (${currentUser.notes.length})`, icon: StickyNote },
          { id: 'achievements', label: `Achievements (${currentUser.achievements.length})`, icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#FF7A00] text-white shadow-xs'
                  : 'bg-white border border-[#E5E5E5] text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Continue Learning Grid */}
          <div>
            <h2 className="text-base font-extrabold text-[#171717] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#FF7A00]" /> Continue Learning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => {
                const allLessonIds = course.chapters.flatMap((c) => c.lessons.map((l) => l.id));
                const completedInCourse = allLessonIds.filter((id) => currentUser.completedLessonIds.includes(id)).length;
                const percent = Math.round((completedInCourse / (allLessonIds.length || 1)) * 100);

                // Find next unfinished lesson
                const nextUnfinished = course.chapters.flatMap((c) => c.lessons).find((l) => !currentUser.completedLessonIds.includes(l.id));

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-[#E5E5E5] p-5 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]">
                          {course.category}
                        </span>
                        <span className="text-xs font-bold text-neutral-500">{percent}%</span>
                      </div>

                      <h3 className="font-bold text-sm text-[#171717]">{course.title}</h3>

                      <div className="w-full h-1.5 bg-neutral-200 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-[#FF7A00]" style={{ width: `${percent}%` }} />
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-500">
                        {completedInCourse} of {allLessonIds.length} done
                      </span>

                      <button
                        onClick={() => {
                          if (nextUnfinished) {
                            onOpenLesson(course, nextUnfinished.id);
                          } else {
                            onSelectCourse(course);
                          }
                        }}
                        className="px-3 py-1.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <span>Resume</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Activity Heatmap Bar */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-[#171717] mb-1">Weekly Learning Activity</h3>
            <p className="text-xs text-neutral-500 mb-6">Lessons completed and focus time spent over the last 7 days</p>

            <div className="grid grid-cols-7 gap-2 text-center">
              {currentUser.weeklyActivity.map((w, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-28 w-full max-w-[42px] bg-neutral-100 rounded-xl flex items-end p-1">
                    <div 
                      className="w-full bg-[#FF7A00] rounded-lg transition-all" 
                      style={{ height: `${Math.min(100, (w.minutes / 50) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#171717] mt-2">{w.day}</span>
                  <span className="text-[10px] text-neutral-500">{w.minutes}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h2 className="text-base font-extrabold text-[#171717] mb-4">Saved & Bookmarked Lessons</h2>

          {bookmarkedLessons.length === 0 ? (
            <p className="text-xs text-neutral-500 italic py-6">You have no bookmarked lessons yet.</p>
          ) : (
            <div className="divide-y divide-neutral-100">
              {bookmarkedLessons.map(({ lesson, course }) => (
                <div key={lesson.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#FF7A00] uppercase block">
                      {course.title}
                    </span>
                    <h4 className="text-sm font-bold text-[#171717]">{lesson.title}</h4>
                    <span className="text-xs text-neutral-500">{lesson.durationMinutes} min read</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemoveBookmark(lesson.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenLesson(course, lesson.id)}
                      className="px-3 py-1.5 bg-[#FF7A00] text-white text-xs font-bold rounded-lg hover:bg-[#e66e00]"
                    >
                      Open Lesson &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: STUDY NOTES */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-[#171717]">Personal Study Notebook</h2>
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search your notes..."
                value={notesSearch}
                onChange={(e) => setNotesSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#FF7A00]"
              />
            </div>
          </div>

          {filteredNotes.length === 0 ? (
            <p className="text-xs text-neutral-500 italic py-6">No study notes found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.map((note) => (
                <div key={note.id} className="p-4 bg-[#FFF9F3] border border-orange-200 rounded-xl relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#FF7A00] uppercase">
                      {note.courseTitle}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-neutral-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-[#171717] mb-2">{note.lessonTitle}</h4>
                  <p className="text-xs text-neutral-700 whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ACHIEVEMENTS & BADGES */}
      {activeTab === 'achievements' && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h2 className="text-base font-extrabold text-[#171717] mb-2">Earned Achievements & Badges</h2>
          <p className="text-xs text-neutral-500 mb-6">Complete tutorials, solve code drills, and maintain daily learning streaks to unlock badges.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUser.achievements.map((ach) => (
              <div key={ach.id} className="p-4 bg-white border border-[#E5E5E5] rounded-xl flex items-center gap-3 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF7A00] shrink-0 font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#171717]">{ach.title}</h4>
                  <p className="text-[11px] text-neutral-500">{ach.description}</p>
                  {ach.unlockedAt && (
                    <span className="text-[10px] text-green-700 font-semibold block mt-1">
                      Unlocked on {new Date(ach.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
