-- ==========================================================
-- CodeNexus: Interactive Coding Learning Platform
-- Complete MySQL Database Schema (Compatible with phpMyAdmin & MySQL 8.0+)
-- ==========================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `student_achievements`;
DROP TABLE IF EXISTS `achievements`;
DROP TABLE IF EXISTS `student_notes`;
DROP TABLE IF EXISTS `bookmarks`;
DROP TABLE IF EXISTS `exercise_submissions`;
DROP TABLE IF EXISTS `exercise_test_cases`;
DROP TABLE IF EXISTS `exercises`;
DROP TABLE IF EXISTS `quiz_answers`;
DROP TABLE IF EXISTS `quiz_attempts`;
DROP TABLE IF EXISTS `quiz_options`;
DROP TABLE IF EXISTS `quiz_questions`;
DROP TABLE IF EXISTS `quizzes`;
DROP TABLE IF EXISTS `lesson_progress`;
DROP TABLE IF EXISTS `lesson_examples`;
DROP TABLE IF EXISTS `lessons`;
DROP TABLE IF EXISTS `course_chapters`;
DROP TABLE IF EXISTS `enrollments`;
DROP TABLE IF EXISTS `learning_path_courses`;
DROP TABLE IF EXISTS `learning_paths`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'instructor', 'admin') NOT NULL DEFAULT 'student',
  `avatar_url` VARCHAR(512) NULL,
  `xp` INT UNSIGNED NOT NULL DEFAULT 0,
  `level` INT UNSIGNED NOT NULL DEFAULT 1,
  `current_streak` INT UNSIGNED NOT NULL DEFAULT 0,
  `highest_streak` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Course Categories
CREATE TABLE `categories` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(128) NOT NULL UNIQUE,
  `slug` VARCHAR(128) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Courses Table
CREATE TABLE `courses` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `category_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `short_description` VARCHAR(280) NOT NULL,
  `description` TEXT NOT NULL,
  `difficulty` ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Beginner',
  `estimated_duration` VARCHAR(64) NOT NULL,
  `thumbnail_icon` VARCHAR(64) NOT NULL DEFAULT 'Code2',
  `color_hex` VARCHAR(16) NOT NULL DEFAULT '#FF7A00',
  `prerequisites_json` JSON NULL,
  `is_beginner_friendly` BOOLEAN NOT NULL DEFAULT TRUE,
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `is_featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_courses_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Course Chapters
CREATE TABLE `course_chapters` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `course_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `chapter_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_chapters_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  INDEX `idx_chapters_course_order` (`course_id`, `chapter_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Lessons
CREATE TABLE `lessons` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `chapter_id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `lesson_order` INT NOT NULL DEFAULT 1,
  `duration_minutes` INT NOT NULL DEFAULT 15,
  `explanation` MEDIUMTEXT NOT NULL,
  `learning_objectives_json` JSON NOT NULL,
  `analogy` TEXT NULL,
  `syntax_guide` TEXT NULL,
  `line_by_line_json` JSON NULL,
  `common_mistakes_json` JSON NULL,
  `practical_use_cases_json` JSON NULL,
  `key_takeaways_json` JSON NOT NULL,
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_lessons_chapter` FOREIGN KEY (`chapter_id`) REFERENCES `course_chapters` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_lessons_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  INDEX `idx_lessons_course_chapter` (`course_id`, `chapter_id`, `lesson_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Lesson Code Examples (for Playground integration)
CREATE TABLE `lesson_examples` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `lesson_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `html_code` MEDIUMTEXT NULL,
  `css_code` MEDIUMTEXT NULL,
  `javascript_code` MEDIUMTEXT NULL,
  `language` VARCHAR(32) NOT NULL DEFAULT 'html',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_examples_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Practice Exercises
CREATE TABLE `exercises` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `lesson_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `difficulty` ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Beginner',
  `exercise_type` ENUM('predict_output', 'find_error', 'complete_code', 'write_function') NOT NULL,
  `problem_statement` TEXT NOT NULL,
  `instructions_json` JSON NOT NULL,
  `starter_code` MEDIUMTEXT NOT NULL,
  `solution_code` MEDIUMTEXT NOT NULL,
  `language` VARCHAR(32) NOT NULL,
  `hints_json` JSON NOT NULL,
  `explanation` TEXT NOT NULL,
  `xp_reward` INT UNSIGNED NOT NULL DEFAULT 25,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_exercises_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Quizzes & Assessments
CREATE TABLE `quizzes` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `course_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NULL,
  `title` VARCHAR(191) NOT NULL,
  `duration_minutes` INT NOT NULL DEFAULT 10,
  `passing_score` INT NOT NULL DEFAULT 80,
  `xp_reward` INT NOT NULL DEFAULT 35,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_quizzes_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Quiz Questions & Options
CREATE TABLE `quiz_questions` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `quiz_id` VARCHAR(64) NOT NULL,
  `question` TEXT NOT NULL,
  `code_snippet` TEXT NULL,
  `question_type` ENUM('multiple_choice', 'true_false', 'predict_output') NOT NULL DEFAULT 'multiple_choice',
  `explanation` TEXT NOT NULL,
  CONSTRAINT `fk_questions_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `quiz_options` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `question_id` VARCHAR(64) NOT NULL,
  `option_text` TEXT NOT NULL,
  `is_correct` BOOLEAN NOT NULL DEFAULT FALSE,
  `explanation` TEXT NULL,
  CONSTRAINT `fk_options_question` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Enrollments & Progress Tracking
CREATE TABLE `enrollments` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) NOT NULL,
  `enrolled_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_enrollments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_enrollments_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_user_course_enroll` (`user_id`, `course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `lesson_progress` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `status` ENUM('in_progress', 'completed') NOT NULL DEFAULT 'completed',
  `completed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_progress_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_progress_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_user_lesson_progress` (`user_id`, `lesson_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Student Bookmarks and Notes
CREATE TABLE `bookmarks` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_bookmarks_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bookmarks_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_user_lesson_bookmark` (`user_id`, `lesson_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `student_notes` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `content` MEDIUMTEXT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_notes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_notes_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Real-World Practical Projects
CREATE TABLE `projects` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `category` VARCHAR(64) NOT NULL,
  `difficulty` ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
  `estimated_hours` VARCHAR(32) NOT NULL,
  `overview` TEXT NOT NULL,
  `objectives_json` JSON NOT NULL,
  `technologies_json` JSON NOT NULL,
  `folder_structure` TEXT NOT NULL,
  `steps_json` JSON NOT NULL,
  `testing_checklist_json` JSON NOT NULL,
  `common_errors_json` JSON NOT NULL,
  `deployment_guide` TEXT NOT NULL,
  `challenges_json` JSON NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Gamified Achievements
CREATE TABLE `achievements` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `title` VARCHAR(128) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `icon_name` VARCHAR(64) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `student_achievements` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `achievement_id` VARCHAR(64) NOT NULL,
  `unlocked_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_ach_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ach_item` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_user_achievement` (`user_id`, `achievement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Sample Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `display_order`) VALUES
('cat-web', 'Web Development', 'web-development', 'Core web technologies including HTML, CSS, JavaScript, and responsive design.', 1),
('cat-prog-fund', 'Programming Fundamentals', 'programming-fundamentals', 'Core algorithms, variables, logic, and computational thinking.', 2),
('cat-frontend', 'Frontend Development', 'frontend-development', 'Modern client UI libraries including React, Next.js, and Tailwind CSS.', 3),
('cat-backend', 'Backend Development', 'backend-development', 'Server architecture, RESTful APIs, Node.js, and authentication.', 4),
('cat-database', 'Database Development', 'database-development', 'Relational database schema modeling, MySQL queries, and optimization.', 5),
('cat-devops', 'DevOps and Deployment', 'devops-deployment', 'Git workflows, GitHub actions, Docker, and CI/CD pipelines.', 6);

-- Seed Initial Achievements
INSERT INTO `achievements` (`id`, `title`, `description`, `icon_name`, `category`) VALUES
('ach-first-lesson', 'First Step', 'Completed your very first coding lesson.', 'Sparkles', 'learning'),
('ach-code-runner', 'Code Experimenter', 'Ran 5 code examples in the interactive playground.', 'Terminal', 'practice'),
('ach-quiz-champ', 'Quiz Whiz', 'Scored 100% on any topic quiz.', 'Award', 'quiz'),
('ach-exercise-pro', 'Bug Squasher', 'Successfully solved your first code exercise.', 'ShieldCheck', 'practice'),
('ach-streak-3', 'Consistency Flame', 'Maintained a 3-day learning streak.', 'Flame', 'streak');
