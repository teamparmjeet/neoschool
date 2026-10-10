export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseCategory =
  | 'Web Development'
  | 'Programming Fundamentals'
  | 'Frontend Development'
  | 'Backend Development'
  | 'Full-Stack Development'
  | 'Mobile App Development'
  | 'Database Development'
  | 'Data Structures and Algorithms'
  | 'Artificial Intelligence and Machine Learning'
  | 'Computer Science Fundamentals'
  | 'DevOps and Deployment'
  | 'Cybersecurity Fundamentals';

export interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput: string;
}

export interface Exercise {
  id: string;
  title: string;
  lessonId: string;
  category: string;
  difficulty: Difficulty;
  type: 'predict_output' | 'find_error' | 'complete_code' | 'write_function';
  problemStatement: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  language: 'html' | 'css' | 'javascript' | 'python' | 'sql';
  hints: string[];
  explanation: string;
  testCases?: TestCase[];
  expectedOutput?: string;
  xpReward: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  type: 'multiple_choice' | 'true_false' | 'predict_output';
  options: QuizOption[];
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  lessonId?: string;
  courseId: string;
  durationMinutes: number;
  passingScore: number;
  xpReward: number;
  questions: QuizQuestion[];
}

export interface LessonExample {
  title: string;
  description?: string;
  html?: string;
  css?: string;
  javascript?: string;
  singleLanguageCode?: string;
  language?: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  courseId: string;
  title: string;
  slug: string;
  order: number;
  durationMinutes: number;
  explanation: string;
  learningObjectives: string[];
  analogy?: string;
  syntaxGuide?: string;
  primaryExample: LessonExample;
  lineByLineExplanation?: { line: string; explanation: string }[];
  commonMistakes?: { mistake: string; fix: string; why: string }[];
  practicalUseCases?: string[];
  keyTakeaways: string[];
  quiz?: Quiz;
  exercise?: Exercise;
  published: boolean;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: CourseCategory;
  difficulty: Difficulty;
  estimatedDuration: string;
  thumbnailIcon: string;
  color: string;
  prerequisites: string[];
  isBeginnerFriendly: boolean;
  chapters: Chapter[];
  published: boolean;
  featured?: boolean;
}

export interface ProjectGuideStep {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: string;
  language?: string;
  fileLocation?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: Difficulty;
  estimatedHours: string;
  overview: string;
  objectives: string[];
  technologies: string[];
  prerequisites: string[];
  folderStructure: string;
  steps: ProjectGuideStep[];
  testingChecklist: string[];
  commonErrors: { error: string; solution: string }[];
  deploymentGuide: string;
  challenges: string[];
  starterTemplate?: {
    html: string;
    css: string;
    javascript: string;
  };
}

export interface LearningPathCourseRef {
  courseId: string;
  title: string;
  description: string;
  roleInPath: string;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  headline: string;
  description: string;
  badge: string;
  estimatedMonths: string;
  difficulty: Difficulty;
  steps: LearningPathCourseRef[];
  careerRoles: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'practice' | 'quiz' | 'streak';
  unlockedAt?: string;
}

export interface StudentNote {
  id: string;
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  content: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar: string;
  xp: number;
  level: number;
  currentStreak: number;
  highestStreak: number;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  completedExerciseIds: string[];
  passedQuizIds: string[];
  achievements: Achievement[];
  notes: StudentNote[];
  weeklyActivity: { day: string; lessonsCount: number; minutes: number }[];
}

export interface GlobalSearchResult {
  id: string;
  title: string;
  category: string;
  type: 'course' | 'lesson' | 'exercise' | 'project' | 'documentation';
  description: string;
  url: string;
  courseTitle?: string;
}
