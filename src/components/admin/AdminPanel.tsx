import React, { useState } from 'react';
import { Course, Lesson, Chapter, User } from '../../types';
import { saveStoredCourses, triggerConfetti } from '../../db/storage';
import { 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Check, 
  Download, 
  Upload, 
  BookOpen, 
  Layers, 
  FileCode2, 
  AlertCircle 
} from 'lucide-react';

interface AdminPanelProps {
  courses: Course[];
  currentUser: User;
  onCoursesUpdate: (updatedCourses: Course[]) => void;
  onSelectCourse: (course: Course) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  courses,
  currentUser,
  onCoursesUpdate,
  onSelectCourse,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [showNewLessonModal, setShowNewLessonModal] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonExplanation, setNewLessonExplanation] = useState('');
  const [newLessonCode, setNewLessonCode] = useState('<h1>Hello CodeNexus</h1>');
  const [statusMessage, setStatusMessage] = useState('');

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleToggleCoursePublish = (courseId: string) => {
    const updated = courses.map((c) =>
      c.id === courseId ? { ...c, published: !c.published } : c
    );
    saveStoredCourses(updated);
    onCoursesUpdate(updated);
    setStatusMessage('Course status toggled successfully.');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleAddLesson = () => {
    if (!newLessonTitle.trim() || !currentCourse) return;

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      chapterId: currentCourse.chapters[0]?.id || 'ch-1',
      courseId: currentCourse.id,
      title: newLessonTitle,
      slug: newLessonTitle.toLowerCase().replace(/\s+/g, '-'),
      order: (currentCourse.chapters[0]?.lessons.length || 0) + 1,
      durationMinutes: 15,
      explanation: newLessonExplanation || 'A comprehensive guide to this programming topic.',
      learningObjectives: ['Understand the core concepts', 'Write practical working code'],
      syntaxGuide: `<example>Code syntax guide</example>`,
      primaryExample: {
        title: 'Working Example',
        html: newLessonCode,
        css: 'body { font-family: sans-serif; padding: 20px; }',
        javascript: 'console.log("Custom lesson initialized!");',
      },
      keyTakeaways: ['Practice writing code daily.', 'Test code in the sandbox.'],
      published: true,
    };

    const updatedCourses = courses.map((c) => {
      if (c.id === currentCourse.id) {
        const firstChapter = c.chapters[0];
        const updatedChapters = [
          {
            ...firstChapter,
            lessons: [...firstChapter.lessons, newLesson],
          },
          ...c.chapters.slice(1),
        ];
        return { ...c, chapters: updatedChapters };
      }
      return c;
    });

    saveStoredCourses(updatedCourses);
    onCoursesUpdate(updatedCourses);
    setShowNewLessonModal(false);
    setNewLessonTitle('');
    setNewLessonExplanation('');
    setStatusMessage(`Lesson "${newLessonTitle}" added and published.`);
    triggerConfetti();
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleDeleteLesson = (lessonId: string) => {
    const updatedCourses = courses.map((c) => {
      if (c.id === currentCourse.id) {
        const updatedChapters = c.chapters.map((ch) => ({
          ...ch,
          lessons: ch.lessons.filter((l) => l.id !== lessonId),
        }));
        return { ...c, chapters: updatedChapters };
      }
      return c;
    });

    saveStoredCourses(updatedCourses);
    onCoursesUpdate(updatedCourses);
    setStatusMessage('Lesson removed.');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(courses, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'codenexus-curriculum-backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Staff Only
            </span>
            <span className="text-xs text-neutral-500 font-medium">Logged in as {currentUser.name}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#171717]">
            Educational Content Management System (CMS)
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage course taxonomies, chapters, interactive lessons, quizzes, and live templates with zero code changes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-neutral-500" />
            <span>Export JSON Backup</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Course Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCourseId === c.id
                ? 'bg-[#171717] text-white'
                : 'bg-white border border-[#E5E5E5] text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Main CMS Card */}
      {currentCourse && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
          
          {/* Course Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]">
                {currentCourse.category}
              </span>
              <h2 className="text-xl font-bold text-[#171717]">{currentCourse.title}</h2>
              <p className="text-xs text-neutral-500 mt-1">{currentCourse.shortDescription}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleCoursePublish(currentCourse.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  currentCourse.published
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {currentCourse.published ? 'Published' : 'Draft'}
              </button>

              <button
                onClick={() => setShowNewLessonModal(true)}
                className="px-4 py-1.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lesson</span>
              </button>
            </div>
          </div>

          {/* Chapters and Lessons Table */}
          <div className="mt-6 space-y-6">
            {currentCourse.chapters.map((chapter) => (
              <div key={chapter.id} className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="bg-neutral-50 px-4 py-2.5 font-bold text-xs text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#FF7A00]" />
                    <span>{chapter.title}</span>
                  </span>
                  <span className="text-[11px] text-neutral-400 font-normal">
                    {chapter.lessons.length} lessons in chapter
                  </span>
                </div>

                <div className="divide-y divide-neutral-100 bg-white">
                  {chapter.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded bg-neutral-100 text-neutral-500 text-[10px] font-mono flex items-center justify-center font-bold">
                          {lesson.order}
                        </span>
                        <div>
                          <span className="font-bold text-[#171717]">{lesson.title}</span>
                          <span className="text-[11px] text-neutral-400 block">
                            {lesson.durationMinutes} mins • {lesson.learningObjectives?.length || 0} objectives
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectCourse(currentCourse)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-800"
                          title="Preview lesson in viewer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600"
                          title="Delete lesson"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Lesson Modal */}
      {showNewLessonModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-300">
            <h3 className="text-base font-bold text-[#171717] mb-4">
              Add New Interactive Lesson to {currentCourse.title}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Lesson Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mastering CSS Grid Template Areas"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Short Beginner-Friendly Explanation
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain the concept in simple terms..."
                  value={newLessonExplanation}
                  onChange={(e) => setNewLessonExplanation(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Primary Starter Code (HTML/CSS)
                </label>
                <textarea
                  rows={4}
                  value={newLessonCode}
                  onChange={(e) => setNewLessonCode(e.target.value)}
                  className="w-full text-xs p-2.5 font-mono bg-[#171717] text-[#FF7A00] rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowNewLessonModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLesson}
                className="px-5 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Publish Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
