import { User, Course, StudentNote, Achievement } from '../types';
import { INITIAL_COURSES, INITIAL_ACHIEVEMENTS } from './initialData';
import confetti from 'canvas-confetti';

const STORAGE_KEYS = {
  USER: 'codenexus_current_user',
  COURSES: 'codenexus_courses',
  NOTES: 'codenexus_notes',
  ACHIEVEMENTS: 'codenexus_achievements',
  SAVED_PLAYGROUND: 'codenexus_playground_saved',
};

const DEFAULT_USER: User = {
  id: 'usr-student-1',
  name: 'Parmjeet Rathore',
  email: 'parmjeetrathore27@gmail.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  xp: 180,
  level: 2,
  currentStreak: 3,
  highestStreak: 5,
  enrolledCourseIds: ['course-html', 'course-css', 'course-js'],
  completedLessonIds: ['html-intro'],
  bookmarkedLessonIds: ['html-semantic', 'css-box-model'],
  completedExerciseIds: ['ex-html-intro'],
  passedQuizIds: ['quiz-html-intro'],
  achievements: [
    { ...INITIAL_ACHIEVEMENTS[0], unlockedAt: '2026-10-07T10:00:00Z' },
    { ...INITIAL_ACHIEVEMENTS[3], unlockedAt: '2026-10-08T15:30:00Z' },
  ],
  notes: [
    {
      id: 'note-1',
      lessonId: 'html-intro',
      lessonTitle: 'Introduction to HTML & Web Structure',
      courseTitle: 'HTML5 Modern Web Architecture',
      content: 'Remember: <!DOCTYPE html> on line 1 prevents Quirks Mode! Semantic tags improve accessibility score.',
      updatedAt: '2026-10-08T16:00:00Z',
    }
  ],
  weeklyActivity: [
    { day: 'Mon', lessonsCount: 1, minutes: 25 },
    { day: 'Tue', lessonsCount: 2, minutes: 40 },
    { day: 'Wed', lessonsCount: 1, minutes: 30 },
    { day: 'Thu', lessonsCount: 0, minutes: 0 },
    { day: 'Fri', lessonsCount: 2, minutes: 45 },
    { day: 'Sat', lessonsCount: 1, minutes: 20 },
    { day: 'Sun', lessonsCount: 1, minutes: 35 },
  ]
};

export const getStoredCourses = (): Course[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
      return INITIAL_COURSES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load courses from localStorage', e);
    return INITIAL_COURSES;
  }
};

export const saveStoredCourses = (courses: Course[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  } catch (e) {
    console.error('Failed to save courses', e);
  }
};

export const getStoredUser = (): User => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user', e);
    return DEFAULT_USER;
  }
};

export const saveStoredUser = (user: User) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user', e);
  }
};

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF7A00', '#2563EB', '#16A34A', '#EAB308', '#FFFFFF']
    });
  } catch (e) {
    // ignore
  }
};

export const calculateLevel = (xp: number): { level: number; title: string; nextLevelXp: number; progressPercent: number } => {
  const levels = [
    { level: 1, minXp: 0, title: 'Code Apprentice' },
    { level: 2, minXp: 150, title: 'Syntax Explorer' },
    { level: 3, minXp: 350, title: 'Logic Crafter' },
    { level: 4, minXp: 650, title: 'Full-Stack Developer' },
    { level: 5, minXp: 1000, title: 'Software Architect' },
  ];

  let current = levels[0];
  let next = levels[1];

  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].minXp) {
      current = levels[i];
      next = levels[i + 1] || { level: current.level + 1, minXp: current.minXp + 500, title: 'Master Guru' };
    }
  }

  const range = next.minXp - current.minXp;
  const inRange = xp - current.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((inRange / range) * 100)));

  return {
    level: current.level,
    title: current.title,
    nextLevelXp: next.minXp,
    progressPercent
  };
};

export const awardXp = (amount: number, reason: string): { newXp: number; leveledUp: boolean } => {
  const user = getStoredUser();
  const prevLevel = calculateLevel(user.xp).level;
  const newXp = user.xp + amount;
  const newLevelInfo = calculateLevel(newXp);
  const leveledUp = newLevelInfo.level > prevLevel;

  user.xp = newXp;
  user.level = newLevelInfo.level;
  saveStoredUser(user);

  if (leveledUp || amount >= 30) {
    triggerConfetti();
  }

  return { newXp, leveledUp };
};

export const toggleLessonCompletion = (lessonId: string): boolean => {
  const user = getStoredUser();
  const isCompleted = user.completedLessonIds.includes(lessonId);
  let nowCompleted = false;

  if (isCompleted) {
    user.completedLessonIds = user.completedLessonIds.filter(id => id !== lessonId);
  } else {
    user.completedLessonIds.push(lessonId);
    user.xp += 20;
    nowCompleted = true;
    triggerConfetti();
  }

  user.level = calculateLevel(user.xp).level;
  saveStoredUser(user);
  return nowCompleted;
};

export const toggleBookmark = (lessonId: string): boolean => {
  const user = getStoredUser();
  const isBookmarked = user.bookmarkedLessonIds.includes(lessonId);
  if (isBookmarked) {
    user.bookmarkedLessonIds = user.bookmarkedLessonIds.filter(id => id !== lessonId);
  } else {
    user.bookmarkedLessonIds.push(lessonId);
  }
  saveStoredUser(user);
  return !isBookmarked;
};

export const saveOrUpdateNote = (note: Omit<StudentNote, 'id' | 'updatedAt'> & { id?: string }): StudentNote => {
  const user = getStoredUser();
  const existingIndex = user.notes.findIndex(n => n.lessonId === note.lessonId || (note.id && n.id === note.id));
  const newNote: StudentNote = {
    id: note.id || `note-${Date.now()}`,
    lessonId: note.lessonId,
    lessonTitle: note.lessonTitle,
    courseTitle: note.courseTitle,
    content: note.content,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    user.notes[existingIndex] = newNote;
  } else {
    user.notes.unshift(newNote);
  }

  saveStoredUser(user);
  return newNote;
};

export const deleteNote = (noteId: string) => {
  const user = getStoredUser();
  user.notes = user.notes.filter(n => n.id !== noteId);
  saveStoredUser(user);
};
