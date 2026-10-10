/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Course, Lesson, Project, User } from './types';
import { getStoredCourses, getStoredUser, saveStoredUser } from './db/storage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { CourseCatalog } from './components/courses/CourseCatalog';
import { LessonView } from './components/learn/LessonView';
import { CodePlayground } from './components/playground/CodePlayground';
import { PracticeHub } from './components/practice/PracticeHub';
import { QuizCenter } from './components/quiz/QuizCenter';
import { ProjectsDirectory } from './components/projects/ProjectsDirectory';
import { LearningPathsView } from './components/learning-paths/LearningPathsView';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(getStoredUser());
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [playgroundPreload, setPlaygroundPreload] = useState<any>(null);

  // Initialize data on mount
  useEffect(() => {
    const loadedCourses = getStoredCourses();
    setCourses(loadedCourses);
    if (loadedCourses.length > 0) {
      setSelectedCourse(loadedCourses[0]);
      if (loadedCourses[0].chapters[0]?.lessons[0]) {
        setSelectedLesson(loadedCourses[0].chapters[0].lessons[0]);
      }
    }
  }, []);

  // Global keyboard shortcut for Cmd+K / Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const refreshUser = () => {
    setCurrentUser(getStoredUser());
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    const firstLesson = course.chapters[0]?.lessons[0] || null;
    setSelectedLesson(firstLesson);
    setActiveView('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLesson = (course: Course, lessonId: string) => {
    setSelectedCourse(course);
    const lesson = course.chapters.flatMap((c) => c.lessons).find((l) => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setActiveView('learn');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPlaygroundWithCode = (code?: any) => {
    if (code) {
      setPlaygroundPreload(code);
    }
    setActiveView('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleUserRole = () => {
    const newRole = currentUser.role === 'student' ? 'admin' : 'student';
    const updated = {
      ...currentUser,
      role: newRole as 'student' | 'admin',
      name: newRole === 'admin' ? 'Admin Parmjeet' : 'Parmjeet Rathore',
    };
    saveStoredUser(updated);
    setCurrentUser(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3] text-[#171717]">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openSearch={() => setSearchModalOpen(true)}
        openAuth={() => setAuthModalOpen(true)}
        onToggleRole={handleToggleUserRole}
      />

      {/* Main Viewport Router */}
      <div className="flex-1">
        {activeView === 'home' && (
          <HomePage
            courses={courses}
            currentUser={currentUser}
            onNavigate={(v, courseId) => {
              if (v === 'learn' && courseId) {
                const target = courses.find((c) => c.id === courseId);
                if (target) handleSelectCourse(target);
              } else {
                setActiveView(v);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCourse={handleSelectCourse}
            openSearch={() => setSearchModalOpen(true)}
          />
        )}

        {activeView === 'courses' && (
          <CourseCatalog
            courses={courses}
            currentUser={currentUser}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {activeView === 'learn' && selectedCourse && selectedLesson && (
          <LessonView
            course={selectedCourse}
            currentLesson={selectedLesson}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            currentUser={currentUser}
            onUserUpdate={refreshUser}
            onOpenPlayground={handleOpenPlaygroundWithCode}
          />
        )}

        {activeView === 'playground' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
                  Live Sandboxed Execution Engine
                </span>
                <h1 className="text-2xl font-extrabold text-[#171717]">Code Playground</h1>
                <p className="text-xs text-neutral-500">
                  Experiment with HTML5, CSS3, and JavaScript ES6+ in an isolated sandbox with real-time console streaming.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('practice')}
                  className="px-3 py-1.5 border border-[#E5E5E5] bg-white rounded-lg text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Solve Practice Drills &rarr;
                </button>
              </div>
            </div>

            <CodePlayground initialCode={playgroundPreload} />
          </div>
        )}

        {activeView === 'practice' && (
          <PracticeHub
            currentUser={currentUser}
            onUserUpdate={refreshUser}
          />
        )}

        {activeView === 'quizzes' && (
          <QuizCenter
            currentUser={currentUser}
            onUserUpdate={refreshUser}
          />
        )}

        {activeView === 'projects' && (
          <ProjectsDirectory
            onOpenPlayground={handleOpenPlaygroundWithCode}
          />
        )}

        {activeView === 'paths' && (
          <LearningPathsView
            courses={courses}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {activeView === 'dashboard' && (
          <StudentDashboard
            currentUser={currentUser}
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onOpenLesson={handleOpenLesson}
            onUserUpdate={refreshUser}
          />
        )}

        {activeView === 'admin' && (
          <AdminPanel
            courses={courses}
            currentUser={currentUser}
            onCoursesUpdate={(updated) => setCourses(updated)}
            onSelectCourse={handleSelectCourse}
          />
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={(v, courseId) => {
          if (v === 'learn' && courseId) {
            const target = courses.find((c) => c.id === courseId);
            if (target) handleSelectCourse(target);
          } else {
            setActiveView(v);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        courses={courses}
        onSelectCourse={handleSelectCourse}
        onSelectLesson={handleOpenLesson}
        onSelectProject={() => {
          setActiveView('projects');
          setSearchModalOpen(false);
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onUserUpdate={refreshUser}
      />
    </div>
  );
}
