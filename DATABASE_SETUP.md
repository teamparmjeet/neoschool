# Database Setup & phpMyAdmin Import Guide

This document outlines the setup process for configuring the MySQL database for **CodeNexus**.

## 1. Prerequisites
- MySQL Server 8.0+ or MariaDB 10.5+
- phpMyAdmin installed (XAMPP, WAMP, Laragon, or standalone Docker container)

## 2. Importing via phpMyAdmin (GUI)

1. Open your browser and navigate to phpMyAdmin:
   `http://localhost/phpmyadmin`
2. Click on the **Databases** tab.
3. In the **Create database** input:
   - Database name: `codenexus_db`
   - Collation: `utf8mb4_unicode_ci`
   - Click **Create**.
4. Select `codenexus_db` from the left sidebar navigation.
5. Click on the **Import** tab at the top.
6. Click **Choose File** and select `schema.sql` located in the root directory.
7. Ensure format is set to **SQL**.
8. Scroll to the bottom and click **Import** (or **Go**).
9. You should see a green success message:
   `"Import has been successfully finished, queries executed."`

## 3. Alternative: Importing via Terminal / Command Line

```bash
# Log in to MySQL and create database
mysql -u root -p -e "CREATE DATABASE codenexus_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import schema and seed data
mysql -u root -p codenexus_db < schema.sql
```

## 4. Database Relationship Summary
- `users`: Stores user profiles, hashed passwords, XP points, streak, and role-based permissions (`student`, `instructor`, `admin`).
- `categories`: Groups courses into high-level tracks (Web Development, Backend, etc.).
- `courses` & `course_chapters` & `lessons`: Hierarchical curriculum model.
- `lesson_examples`: Sandboxed playground templates associated with tutorials.
- `exercises` & `exercise_test_cases`: Problem statements, starter code, and unit tests.
- `quizzes`, `quiz_questions`, `quiz_options`, `quiz_attempts`: Topic assessments with scoring.
- `enrollments` & `lesson_progress`: Tracks student completion timestamps.
- `bookmarks` & `student_notes`: Personal study notebook and saved resources.
- `projects`: Real-world guided software engineering milestones.
- `achievements` & `student_achievements`: Gamification badges.
