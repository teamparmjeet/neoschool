import React, { useState } from 'react';
import { 
  Course, 
  Lesson, 
  User, 
  StudentNote 
} from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  Play, 
  Bookmark, 
  BookmarkCheck, 
  StickyNote, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Lightbulb, 
  Check, 
  Copy, 
  HelpCircle,
  Clock,
  Layers,
  Search,
  Award
} from 'lucide-react';
import { 
  toggleLessonCompletion, 
  toggleBookmark, 
  saveOrUpdateNote, 
  triggerConfetti, 
  awardXp 
} from '../../db/storage';
import { CodePlayground } from '../playground/CodePlayground';

interface LessonViewProps {
  course: Course;
  currentLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  currentUser: User;
  onUserUpdate: () => void;
  onOpenPlayground: (code?: any) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  course,
  currentLesson,
  onSelectLesson,
  currentUser,
  onUserUpdate,
  onOpenPlayground,
}) => {
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({});
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [showTryItEditor, setShowTryItEditor] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Exercise state
  const [exerciseAnswer, setExerciseAnswer] = useState(currentLesson.exercise?.starterCode || '');
  const [exerciseStatus, setExerciseStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [revealedHintLevel, setRevealedHintLevel] = useState<number>(0);

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Check if completed or bookmarked
  const isCompleted = currentUser.completedLessonIds.includes(currentLesson.id);
  const isBookmarked = currentUser.bookmarkedLessonIds.includes(currentLesson.id);

  // Load existing note
  const existingNote = currentUser.notes.find((n) => n.lessonId === currentLesson.id);

  const allLessons = course.chapters.flatMap((c) => c.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Calculate course completion percentage
  const completedCount = allLessons.filter((l) => currentUser.completedLessonIds.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  const toggleChapter = (chapterId: string) => {
    setCollapsedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handleToggleComplete = () => {
    const newlyCompleted = toggleLessonCompletion(currentLesson.id);
    if (newlyCompleted) {
      triggerConfetti();
    }
    onUserUpdate();
  };

  const handleToggleBookmark = () => {
    toggleBookmark(currentLesson.id);
    onUserUpdate();
  };

  const handleSaveNote = () => {
    saveOrUpdateNote({
      lessonId: currentLesson.id,
      lessonTitle: currentLesson.title,
      courseTitle: course.title,
      content: noteContent || existingNote?.content || '',
    });
    onUserUpdate();
    setShowNotesDrawer(false);
  };

  const handleExerciseCheck = () => {
    if (!currentLesson.exercise) return;
    const cleanUser = exerciseAnswer.trim().replace(/\s+/g, ' ');
    const cleanSol = currentLesson.exercise.solutionCode.trim().replace(/\s+/g, ' ');

    if (cleanUser.toLowerCase() === cleanSol.toLowerCase()) {
      setExerciseStatus('success');
      awardXp(currentLesson.exercise.xpReward, 'Solved Exercise');
      triggerConfetti();
      onUserUpdate();
    } else {
      setExerciseStatus('failed');
    }
  };

  const handleQuizSubmit = () => {
    if (!selectedQuizOption || !currentLesson.quiz) return;
    setQuizSubmitted(true);
    const question = currentLesson.quiz.questions[0];
    const chosen = question.options.find((o) => o.id === selectedQuizOption);
    if (chosen?.isCorrect) {
      awardXp(currentLesson.quiz.xpReward, 'Passed Quiz');
      triggerConfetti();
      onUserUpdate();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#FFF9F3]">
      
      {/* LEFT SIDEBAR: Course Chapters & Lessons */}
      <aside className="w-full lg:w-80 bg-white border-r border-[#E5E5E5] flex flex-col shrink-0">
        
        {/* Sidebar Header: Course Progress */}
        <div className="p-4 border-b border-[#E5E5E5] bg-[#FFF9F3]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7A00]">Course Curriculum</span>
          <h2 className="font-bold text-base text-[#171717] line-clamp-1">{course.title}</h2>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 mb-1">
              <span>Progress ({completedCount}/{allLessons.length})</span>
              <span className="text-[#FF7A00]">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF7A00] rounded-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Search in Course */}
          <div className="mt-3 relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Filter lessons..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-white focus:outline-none focus:border-[#FF7A00]"
            />
          </div>
        </div>

        {/* Chapters & Lessons Accordion */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {course.chapters.map((chapter) => {
            const isCollapsed = collapsedChapters[chapter.id];
            const filteredLessons = chapter.lessons.filter((l) =>
              l.title.toLowerCase().includes(sidebarSearch.toLowerCase())
            );

            if (filteredLessons.length === 0 && sidebarSearch) return null;

            return (
              <div key={chapter.id} className="rounded-xl border border-neutral-100 overflow-hidden">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full px-3 py-2.5 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between text-left text-xs font-bold text-neutral-800 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    {isCollapsed ? <ChevronRight className="w-3.5 h-3.5 text-neutral-500" /> : <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />}
                    <span>{chapter.title}</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-normal">
                    {chapter.lessons.length} lessons
                  </span>
                </button>

                {!isCollapsed && (
                  <div className="divide-y divide-neutral-100 bg-white">
                    {filteredLessons.map((lesson) => {
                      const isCurrent = lesson.id === currentLesson.id;
                      const isLessonDone = currentUser.completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(lesson);
                            setExerciseStatus('idle');
                            setSelectedQuizOption(null);
                            setQuizSubmitted(false);
                            setRevealedHintLevel(0);
                            setExerciseAnswer(lesson.exercise?.starterCode || '');
                          }}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#FFF9F3] text-[#FF7A00] font-bold border-l-4 border-[#FF7A00]'
                              : 'text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isLessonDone ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-neutral-300 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-neutral-400 shrink-0 ml-1">
                            {lesson.durationMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* MAIN LESSON VIEWPORT */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-8 overflow-y-auto">
        
        {/* Breadcrumb & Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>Courses</span>
            <ChevronRight className="w-3 h-3" />
            <span>{course.title}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#FF7A00] font-semibold">{currentLesson.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-white border-[#E5E5E5] text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            {/* Note taker drawer button */}
            <button
              onClick={() => {
                setNoteContent(existingNote?.content || '');
                setShowNotesDrawer(true);
              }}
              className="p-2 rounded-lg border border-[#E5E5E5] bg-white hover:bg-neutral-50 text-neutral-600 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <StickyNote className="w-4 h-4 text-[#FF7A00]" />
              <span>Notes {existingNote ? '(1)' : ''}</span>
            </button>

            {/* Mark completed */}
            <button
              onClick={handleToggleComplete}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-[#FF7A00] text-white hover:bg-[#e66e00] shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Completed (+20 XP)'}</span>
            </button>
          </div>
        </div>

        {/* 1. Lesson Header */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-[#FF7A00] font-bold">
              Lesson {currentLesson.order}
            </span>
            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {currentLesson.durationMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            {currentLesson.title}
          </h1>
        </div>

        {/* 2. Short Beginner-Friendly Explanation */}
        <div className="mt-4 text-base text-neutral-700 leading-relaxed bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <p>{currentLesson.explanation}</p>
        </div>

        {/* 3. Learning Objectives */}
        {currentLesson.learningObjectives?.length > 0 && (
          <div className="mt-6 bg-[#FFF9F3] border border-orange-200 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[#FF7A00] uppercase tracking-wider flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" /> What You Will Master
            </h3>
            <ul className="space-y-2">
              {currentLesson.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-800">
                  <Check className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. Real-World Analogy */}
        {currentLesson.analogy && (
          <div className="mt-6 bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              <Lightbulb className="w-4 h-4 text-amber-600" /> Real-World Mental Model
            </div>
            <p className="text-sm text-amber-950 italic leading-relaxed">
              "{currentLesson.analogy}"
            </p>
          </div>
        )}

        {/* 5. Syntax Guide */}
        {currentLesson.syntaxGuide && (
          <div className="mt-6">
            <h3 className="text-sm font-bold text-[#171717] mb-2">Syntax Pattern</h3>
            <pre className="bg-[#171717] text-[#FF7A00] p-4 rounded-xl text-xs font-mono overflow-x-auto border border-neutral-800">
              <code>{currentLesson.syntaxGuide}</code>
            </pre>
          </div>
        )}

        {/* 6 & 7. Code Example & Try It Yourself Banner */}
        <div className="mt-8 bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-5 py-3 bg-neutral-50 border-b border-[#E5E5E5]">
            <span className="font-bold text-sm text-[#171717] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FF7A00]" />
              {currentLesson.primaryExample.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const example = currentLesson.primaryExample;
                  onOpenPlayground({
                    html: example.html || '',
                    css: example.css || '',
                    javascript: example.javascript || example.singleLanguageCode || '',
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF7A00] text-white text-xs font-bold hover:bg-[#e66e00] transition-colors cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Open in Playground</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto">
            <pre>
              <code>
                {currentLesson.primaryExample.singleLanguageCode || currentLesson.primaryExample.html}
              </code>
            </pre>
          </div>

          {/* Quick interactive Try-It-Yourself Drawer toggle */}
          <div className="p-3 bg-neutral-50 border-t border-[#E5E5E5] flex items-center justify-between">
            <span className="text-xs text-neutral-600">Want to test this live inside this lesson?</span>
            <button
              onClick={() => setShowTryItEditor(!showTryItEditor)}
              className="text-xs font-bold text-[#FF7A00] hover:underline cursor-pointer"
            >
              {showTryItEditor ? 'Hide Interactive Editor ▲' : 'Try It Yourself Now ▼'}
            </button>
          </div>

          {showTryItEditor && (
            <div className="p-4 bg-neutral-100 border-t border-[#E5E5E5]">
              <CodePlayground
                initialCode={{
                  html: currentLesson.primaryExample.html || '<p>Hello world</p>',
                  css: currentLesson.primaryExample.css || 'body { font-family: sans-serif; }',
                  javascript: currentLesson.primaryExample.javascript || 'console.log("Ready");',
                }}
              />
            </div>
          )}
        </div>

        {/* 9. Line-by-Line Breakdown */}
        {currentLesson.lineByLineExplanation && currentLesson.lineByLineExplanation.length > 0 && (
          <div className="mt-8">
            <h3 className="text-base font-bold text-[#171717] mb-3">Line-by-Line Code Breakdown</h3>
            <div className="space-y-2">
              {currentLesson.lineByLineExplanation.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-[#E5E5E5] text-xs">
                  <code className="text-[#FF7A00] font-bold bg-orange-50 px-1.5 py-0.5 rounded mr-2">
                    {item.line}
                  </code>
                  <span className="text-neutral-700">{item.explanation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. Common Mistakes & Pitfalls */}
        {currentLesson.commonMistakes && currentLesson.commonMistakes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-base font-bold text-[#171717] mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" /> Common Mistakes & Gotchas
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {currentLesson.commonMistakes.map((m, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-red-200">
                  <div className="text-xs font-bold text-red-600 mb-1">❌ Mistake: {m.mistake}</div>
                  <div className="text-xs font-semibold text-green-700 mb-1">✅ Fix: {m.fix}</div>
                  <div className="text-xs text-neutral-500">Why it happens: {m.why}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. Practical Real-World Use Cases */}
        {currentLesson.practicalUseCases && currentLesson.practicalUseCases.length > 0 && (
          <div className="mt-8">
            <h3 className="text-base font-bold text-[#171717] mb-3">Industry Use Cases</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentLesson.practicalUseCases.map((uc, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E5E5E5] text-xs font-medium text-neutral-800 shadow-2xs">
                  • {uc}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 12. Interactive Practice Exercise */}
        {currentLesson.exercise && (
          <div className="mt-10 bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF7A00] text-white">
                  Hands-On Exercise
                </span>
                <h3 className="font-bold text-base text-[#171717]">{currentLesson.exercise.title}</h3>
              </div>
              <span className="text-xs font-bold text-orange-600">+{currentLesson.exercise.xpReward} XP</span>
            </div>

            <p className="text-sm text-neutral-700 mb-3">{currentLesson.exercise.problemStatement}</p>

            <ul className="text-xs text-neutral-600 space-y-1 mb-4 list-disc pl-5">
              {currentLesson.exercise.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>

            {/* Code Input */}
            <div className="rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 mb-4">
              <div className="px-3 py-1.5 bg-neutral-800 text-[11px] font-mono text-neutral-400">
                Write your solution ({currentLesson.exercise.language})
              </div>
              <textarea
                value={exerciseAnswer}
                onChange={(e) => setExerciseAnswer(e.target.value)}
                spellCheck={false}
                rows={5}
                className="w-full bg-transparent p-3 text-neutral-100 font-mono text-xs focus:outline-none"
              />
            </div>

            {/* Exercise Action and Feedback */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExerciseCheck}
                  className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-transform active:scale-95 shadow-sm"
                >
                  Check Solution
                </button>

                {currentLesson.exercise.hints.length > 0 && (
                  <button
                    onClick={() => setRevealedHintLevel((prev) => Math.min(prev + 1, currentLesson.exercise!.hints.length))}
                    className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Need a Hint? ({revealedHintLevel}/{currentLesson.exercise.hints.length})
                  </button>
                )}
              </div>

              {exerciseStatus === 'success' && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Excellent! Solved correctly (+{currentLesson.exercise.xpReward} XP)</span>
                </div>
              )}

              {exerciseStatus === 'failed' && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                  <AlertCircle className="w-4 h-4" />
                  <span>Output doesn't match yet. Check hints below!</span>
                </div>
              )}
            </div>

            {/* Revealed Hints */}
            {revealedHintLevel > 0 && (
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                {currentLesson.exercise.hints.slice(0, revealedHintLevel).map((hint, i) => (
                  <p key={i} className="text-xs text-amber-900 flex items-start gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Hint {i + 1}:</strong> {hint}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 13. Short Lesson Quiz */}
        {currentLesson.quiz && currentLesson.quiz.questions.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#171717] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF7A00]" />
                Knowledge Check: {currentLesson.quiz.title}
              </h3>
              <span className="text-xs font-bold text-[#FF7A00]">+{currentLesson.quiz.xpReward} XP</span>
            </div>

            {currentLesson.quiz.questions.slice(0, 1).map((q) => (
              <div key={q.id}>
                <p className="text-sm font-semibold text-neutral-800 mb-3">{q.question}</p>
                
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = selectedQuizOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(opt.id)}
                        className={`w-full p-3 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? quizSubmitted
                              ? opt.isCorrect
                                ? 'bg-green-50 border-green-500 text-green-900 font-bold'
                                : 'bg-red-50 border-red-500 text-red-900 font-bold'
                              : 'bg-orange-50 border-[#FF7A00] text-orange-900 font-semibold'
                            : quizSubmitted && opt.isCorrect
                            ? 'bg-green-50 border-green-500 text-green-900 font-bold'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {quizSubmitted && opt.isCorrect && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!selectedQuizOption}
                    className="mt-4 px-4 py-2 bg-[#171717] hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <p className="mt-3 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 14. Key Takeaways Card */}
        <div className="mt-8 bg-neutral-900 text-white p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-[#FF7A00] uppercase tracking-wider mb-3">
            Key Takeaways
          </h3>
          <ul className="space-y-2 text-xs text-neutral-300">
            {currentLesson.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#FF7A00] font-bold">✔</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 15. Bottom Navigation Bar */}
        <div className="mt-12 pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
          {prevLesson ? (
            <button
              onClick={() => onSelectLesson(prevLesson)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E5E5] bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: {prevLesson.title}</span>
            </button>
          ) : <div />}

          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-xs font-bold text-white shadow-sm cursor-pointer"
            >
              <span>Next: {nextLesson.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>

      {/* STUDENT NOTES SIDE-DRAWER */}
      {showNotesDrawer && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-[#E5E5E5] shadow-2xl p-5 z-50 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <h3 className="font-bold text-sm text-[#171717] flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-[#FF7A00]" /> My Study Note
            </h3>
            <button
              onClick={() => setShowNotesDrawer(false)}
              className="text-xs text-neutral-500 hover:text-neutral-800"
            >
              Close ✕
            </button>
          </div>

          <div className="mt-3 flex-1 flex flex-col">
            <label className="text-[11px] font-semibold text-neutral-500 mb-1">
              Lesson: {currentLesson.title}
            </label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write personal insights, snippets, or questions here..."
              className="flex-1 w-full p-3 text-xs border border-[#E5E5E5] rounded-xl resize-none focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
            <button
              onClick={handleSaveNote}
              className="w-full py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm"
            >
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
