import { Course, Project, LearningPath, Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-lesson',
    title: 'First Step',
    description: 'Completed your very first coding lesson.',
    icon: 'Sparkles',
    category: 'learning',
  },
  {
    id: 'ach-code-runner',
    title: 'Code Experimenter',
    description: 'Ran 5 code examples in the interactive playground.',
    icon: 'Terminal',
    category: 'practice',
  },
  {
    id: 'ach-quiz-champ',
    title: 'Quiz Whiz',
    description: 'Scored 100% on any topic quiz.',
    icon: 'Award',
    category: 'quiz',
  },
  {
    id: 'ach-exercise-pro',
    title: 'Bug Squasher',
    description: 'Successfully solved your first code exercise.',
    icon: 'ShieldCheck',
    category: 'practice',
  },
  {
    id: 'ach-streak-3',
    title: 'Consistency Flame',
    description: 'Maintained a 3-day learning streak.',
    icon: 'Flame',
    category: 'streak',
  },
  {
    id: 'ach-web-starter',
    title: 'HTML & CSS Craftsman',
    description: 'Mastered web structure and visual layout fundamentals.',
    icon: 'Palette',
    category: 'learning',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-html',
    title: 'HTML5 Modern Web Architecture',
    slug: 'html-modern-web',
    shortDescription: 'Master the fundamental building blocks of the web: semantic markup, accessible forms, audio/video, and SEO.',
    description: 'Hypertext Markup Language (HTML) is the foundation of all websites. In this hands-on course, you will learn how to structure content semantically, build accessible forms with validation, embed multimedia, configure SEO metadata, and create clean, valid markup used by professional engineering teams.',
    category: 'Web Development',
    difficulty: 'Beginner',
    estimatedDuration: '6 Hours',
    thumbnailIcon: 'Code2',
    color: '#FF7A00',
    prerequisites: ['No prior experience required', 'Basic computer literacy'],
    isBeginnerFriendly: true,
    published: true,
    featured: true,
    chapters: [
      {
        id: 'html-ch-1',
        courseId: 'course-html',
        title: 'HTML Fundamentals',
        order: 1,
        lessons: [
          {
            id: 'html-intro',
            chapterId: 'html-ch-1',
            courseId: 'course-html',
            title: 'Introduction to HTML & Web Structure',
            slug: 'introduction-to-html',
            order: 1,
            durationMinutes: 15,
            explanation: 'HTML stands for HyperText Markup Language. It describes the structure of Web pages using markup. HTML elements tell the browser how to display content such as headings, paragraphs, links, and media.',
            learningObjectives: [
              'Understand the purpose of HTML in web development',
              'Recognize the role of tags, elements, and attributes',
              'Construct the minimal boilerplate for an HTML5 document',
            ],
            analogy: 'Think of a building: HTML is the concrete foundation and steel framework, CSS is the interior paint and aesthetic styling, and JavaScript is the electrical grid and automated elevators.',
            syntaxGuide: '<tagname attribute="value">Content goes here...</tagname>',
            primaryExample: {
              title: 'Basic HTML5 Page Structure',
              html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to CodeNexus</h1>
    <p>This is where your software engineering journey begins!</p>
    <a href="https://developer.mozilla.org" target="_blank">Explore MDN Docs</a>
  </body>
</html>`,
              css: `body {
  font-family: system-ui, sans-serif;
  padding: 24px;
  background-color: #f8fafc;
  color: #1e293b;
}
h1 {
  color: #ff7a00;
}`,
              javascript: `console.log("HTML document rendered successfully!");`,
            },
            lineByLineExplanation: [
              { line: '<!DOCTYPE html>', explanation: 'Informs the browser engine to render the document in modern HTML5 standards mode.' },
              { line: '<html lang="en">', explanation: 'Root element of the document; specifies English as the primary human language for accessibility and search engines.' },
              { line: '<head> ... </head>', explanation: 'Container for metadata about the document (character set, title, linked stylesheets, scripts) not directly shown in the page body.' },
              { line: '<meta charset="UTF-8">', explanation: 'Declares standard character encoding capable of displaying universal UTF-8 characters and emojis.' },
              { line: '<body> ... </body>', explanation: 'Contains all the visible content rendered to the user on screen.' },
              { line: '<h1>', explanation: 'Top-level primary heading of the webpage. Essential for hierarchical readability.' },
            ],
            commonMistakes: [
              {
                mistake: 'Omitting the <!DOCTYPE html> declaration',
                fix: 'Always place <!DOCTYPE html> on the very first line of your HTML document.',
                why: 'Without doctype, browsers switch to Quirks Mode, causing inconsistent layout bugs.'
              },
              {
                mistake: 'Forgetting to close elements like <p> or <div>',
                fix: 'Ensure every opening tag has a matching closing tag </...>.',
                why: 'Unclosed tags can cascade unpredictable styles and break the DOM tree.'
              }
            ],
            practicalUseCases: [
              'Creating document templates for landing pages',
              'Structuring email newsletters with clean HTML',
              'Setting up web application shell layouts'
            ],
            keyTakeaways: [
              'HTML documents are built using nested hierarchical tags.',
              'The <head> stores metadata; the <body> holds visible content.',
              'Every web page begins with <!DOCTYPE html> and standard tags.',
            ],
            quiz: {
              id: 'quiz-html-intro',
              title: 'HTML Foundations Quiz',
              courseId: 'course-html',
              lessonId: 'html-intro',
              durationMinutes: 5,
              passingScore: 80,
              xpReward: 35,
              questions: [
                {
                  id: 'q1',
                  question: 'What does HTML stand for?',
                  type: 'multiple_choice',
                  explanation: 'HTML stands for HyperText Markup Language.',
                  options: [
                    { id: 'opt1', text: 'HyperText Markup Language', isCorrect: true, explanation: 'Correct! HyperText refers to links, and Markup refers to formatting tags.' },
                    { id: 'opt2', text: 'High Tech Modern Language', isCorrect: false, explanation: 'Incorrect.' },
                    { id: 'opt3', text: 'Hyperlinks and Text Management Line', isCorrect: false, explanation: 'Incorrect.' },
                    { id: 'opt4', text: 'Home Tool Markup Language', isCorrect: false, explanation: 'Incorrect.' },
                  ]
                },
                {
                  id: 'q2',
                  question: 'Which HTML element contains the visible content of a webpage?',
                  type: 'multiple_choice',
                  explanation: 'The <body> tag holds all elements displayed directly in the browser viewport.',
                  options: [
                    { id: 'q2-1', text: '<head>', isCorrect: false, explanation: 'Head contains metadata.' },
                    { id: 'q2-2', text: '<body>', isCorrect: true, explanation: 'Correct! Body contains all user-visible text, graphics, and elements.' },
                    { id: 'q2-3', text: '<meta>', isCorrect: false, explanation: 'Meta specifies properties.' },
                    { id: 'q2-4', text: '<script>', isCorrect: false, explanation: 'Script contains code.' },
                  ]
                }
              ]
            },
            exercise: {
              id: 'ex-html-intro',
              title: 'Build a Welcome Header and Paragraph',
              lessonId: 'html-intro',
              category: 'HTML',
              difficulty: 'Beginner',
              type: 'complete_code',
              problemStatement: 'Add a level-1 heading <h1> with the exact text "Hello World" and a paragraph <p> with the text "Welcome to Coding".',
              instructions: [
                'Write an <h1> tag with text "Hello World"',
                'Write a <p> tag with text "Welcome to Coding"',
                'Ensure both tags are properly closed'
              ],
              starterCode: `<!-- Add your <h1> and <p> elements below -->\n`,
              solutionCode: `<h1>Hello World</h1>\n<p>Welcome to Coding</p>`,
              language: 'html',
              hints: [
                'Remember the syntax: <h1>Your Heading</h1>',
                'Paragraphs use the <p> tag: <p>Your Text</p>'
              ],
              explanation: 'Heading tags range from <h1> (highest significance) to <h6>. Paragraphs are written inside <p> tags.',
              xpReward: 25,
            },
            published: true,
          },
          {
            id: 'html-semantic',
            chapterId: 'html-ch-1',
            courseId: 'course-html',
            title: 'Semantic HTML5 Elements',
            slug: 'semantic-html',
            order: 2,
            durationMinutes: 20,
            explanation: 'Semantic elements clearly describe their meaning to both the browser and the developer. Using semantic tags like <header>, <nav>, <main>, <article>, <section>, and <footer> provides meaningful structure, improves search engine indexing, and allows screen readers to navigate effortlessly.',
            learningObjectives: [
              'Distinguish between non-semantic tags (div, span) and semantic tags',
              'Structure an accessible webpage using <header>, <nav>, <main>, and <footer>',
              'Enhance Web Content Accessibility Guidelines (WCAG) compliance',
            ],
            analogy: 'Using <div> everywhere is like labeling every drawer in your kitchen "Box". Semantic tags are like labeling them "Utensils", "Spices", and "Pots".',
            syntaxGuide: `<header>\n  <nav>Navigation links</nav>\n</header>\n<main>\n  <article>Content</article>\n</main>`,
            primaryExample: {
              title: 'Accessible Semantic Blog Layout',
              html: `<header class="site-header">
  <h2>Developer Weekly</h2>
  <nav>
    <a href="#articles">Articles</a> | 
    <a href="#about">About</a>
  </nav>
</header>

<main>
  <article>
    <h3>Why Clean Code Matters</h3>
    <p>Writing readable code saves hundreds of debugging hours.</p>
    <time datetime="2026-10-09">October 9, 2026</time>
  </article>
</main>

<footer>
  <p>&copy; 2026 Developer Weekly. Built with semantic markup.</p>
</footer>`,
              css: `.site-header {
  border-bottom: 2px solid #ff7a00;
  padding-bottom: 12px;
  margin-bottom: 16px;
}
article {
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}
time {
  color: #64748b;
  font-size: 0.85rem;
}`,
              javascript: `console.log("Semantic layout evaluated.");`,
            },
            lineByLineExplanation: [
              { line: '<header>', explanation: 'Represents introductory content or navigation links.' },
              { line: '<nav>', explanation: 'Section of a page whose purpose is to provide navigation links.' },
              { line: '<main>', explanation: 'Represents the dominant content of the <body>. There must be only one <main> per page.' },
              { line: '<article>', explanation: 'Self-contained composition intended to be independently distributable or reusable (e.g., blog post, comment).' },
              { line: '<footer>', explanation: 'Represents a footer for its nearest sectioning content (copyright, author, contact info).' },
            ],
            commonMistakes: [
              {
                mistake: 'Wrapping everything in dozens of generic <div> tags ("div soup")',
                fix: 'Replace wrapper divs with semantic tags: <section>, <nav>, <aside>, etc.',
                why: 'Screen reader users cannot use landmark shortcuts if your document is all divs.'
              }
            ],
            practicalUseCases: [
              'Professional blog and news platforms',
              'E-commerce product detail pages',
              'SaaS application documentation'
            ],
            keyTakeaways: [
              'Semantic HTML communicates meaning and purpose.',
              'Improves SEO, code maintainability, and web accessibility.',
              'Use <main> for unique page content and <nav> for navigation bars.',
            ],
            quiz: {
              id: 'quiz-html-semantic',
              title: 'Semantic HTML Quiz',
              courseId: 'course-html',
              lessonId: 'html-semantic',
              durationMinutes: 5,
              passingScore: 80,
              xpReward: 35,
              questions: [
                {
                  id: 'qs1',
                  question: 'Which tag should be used for the primary navigation links of a website?',
                  type: 'multiple_choice',
                  explanation: '<nav> specifically identifies major navigation link blocks.',
                  options: [
                    { id: 'qs1-1', text: '<nav>', isCorrect: true, explanation: 'Correct! <nav> provides a landmark for assistive technology.' },
                    { id: 'qs1-2', text: '<navigation>', isCorrect: false, explanation: 'Incorrect. There is no <navigation> element in HTML.' },
                    { id: 'qs1-3', text: '<menu-bar>', isCorrect: false, explanation: 'Incorrect.' },
                    { id: 'qs1-4', text: '<div>', isCorrect: false, explanation: '<div> has no semantic meaning.' },
                  ]
                }
              ]
            },
            exercise: {
              id: 'ex-html-semantic',
              title: 'Build a Semantic Article Card',
              lessonId: 'html-semantic',
              category: 'HTML',
              difficulty: 'Beginner',
              type: 'complete_code',
              problemStatement: 'Wrap a heading <h3> and a paragraph in an <article> element.',
              instructions: [
                'Create an <article> container',
                'Inside it, add an <h3> tag with "Web Development"',
                'Add a <p> tag with "Learn HTML and CSS"'
              ],
              starterCode: `<!-- Add the semantic <article> element here -->\n`,
              solutionCode: `<article>\n  <h3>Web Development</h3>\n  <p>Learn HTML and CSS</p>\n</article>`,
              language: 'html',
              hints: ['Open with <article>, place your child tags inside, and close with </article>.'],
              explanation: 'An <article> element represents a self-contained composition.',
              xpReward: 25,
            },
            published: true,
          },
          {
            id: 'html-forms',
            chapterId: 'html-ch-1',
            courseId: 'course-html',
            title: 'Forms, Inputs & Validation',
            slug: 'forms-and-validation',
            order: 3,
            durationMinutes: 25,
            explanation: 'HTML forms collect user input—from account registrations and search queries to file uploads and checkout cards. With HTML5 native validation attributes (required, pattern, min, max, type="email"), you can validate input instantly before submission.',
            learningObjectives: [
              'Create functional forms with the <form> element and action/method',
              'Use appropriate <input> types (text, email, password, number, checkbox)',
              'Link labels to inputs using the for and id attributes for accessibility',
              'Enforce client-side validation using required and pattern',
            ],
            analogy: 'An HTML form is like a printed application sheet: the <label> is the question text, the <input> is the blank box you write in, and the <button type="submit"> is handing the sheet to the receptionist.',
            syntaxGuide: `<form action="/submit" method="POST">\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" required>\n  <button type="submit">Submit</button>\n</form>`,
            primaryExample: {
              title: 'Accessible Registration Form',
              html: `<form class="card-form" onsubmit="event.preventDefault(); alert('Form submitted successfully!');">
  <div class="field">
    <label for="user-email">Email Address:</label>
    <input type="email" id="user-email" name="email" placeholder="coder@example.com" required>
  </div>
  
  <div class="field">
    <label for="user-pwd">Password (Min 8 chars):</label>
    <input type="password" id="user-pwd" name="password" minlength="8" required>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="terms" required>
    <label for="terms">I accept the terms and conditions</label>
  </div>

  <button type="submit" class="btn-orange">Register Account</button>
</form>`,
              css: `.card-form {
  max-width: 360px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}
.field {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
}
.field label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.field input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}
.checkbox-field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.btn-orange {
  width: 100%;
  background: #ff7a00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`,
              javascript: `console.log("Interactive form ready.");`,
            },
            keyTakeaways: [
              'Always associate <label for="..."> with <input id="..."> for screen readers and clickability.',
              'Use appropriate types (email, password, number) to activate mobile keyboard optimizations.',
              'Native validation attributes like required and minlength provide immediate user feedback.',
            ],
            published: true,
          }
        ]
      }
    ]
  },
  {
    id: 'course-css',
    title: 'CSS3 & Modern Responsive Design',
    slug: 'css3-responsive-design',
    shortDescription: 'Master modern layouts with Flexbox, CSS Grid, custom properties, animations, and mobile-first responsive architecture.',
    description: 'Cascading Style Sheets (CSS) brings life, beauty, and responsiveness to raw HTML markup. Learn how the browser box model calculates dimensions, master Flexbox for 1D alignments, leverage CSS Grid for 2D layouts, and craft fluid responsive websites that look stunning on any screen resolution.',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    estimatedDuration: '8 Hours',
    thumbnailIcon: 'Palette',
    color: '#2563EB',
    prerequisites: ['Basic HTML knowledge'],
    isBeginnerFriendly: true,
    published: true,
    featured: true,
    chapters: [
      {
        id: 'css-ch-1',
        courseId: 'course-css',
        title: 'CSS Core & Box Model',
        order: 1,
        lessons: [
          {
            id: 'css-box-model',
            chapterId: 'css-ch-1',
            courseId: 'course-css',
            title: 'The CSS Box Model Explained',
            slug: 'css-box-model',
            order: 1,
            durationMinutes: 20,
            explanation: 'Every element rendered on a webpage is fundamentally a rectangular box. The CSS Box Model describes how four distinct concentric layers wrap around every element: Content, Padding, Border, and Margin.',
            learningObjectives: [
              'Identify the 4 components: content, padding, border, margin',
              'Understand the difference between content-box and border-box',
              'Use box-sizing: border-box for predictable responsive sizing',
            ],
            analogy: 'Think of a framed painting: the Content is the artwork itself, the Padding is the matting border around the painting, the Border is the physical wooden frame, and the Margin is the empty wall space between this frame and other pictures.',
            syntaxGuide: `* {\n  box-sizing: border-box;\n}\n.card {\n  margin: 16px;\n  border: 2px solid #ff7a00;\n  padding: 24px;\n  width: 300px;\n}`,
            primaryExample: {
              title: 'Visual Box Model Demonstration',
              html: `<div class="container">
  <div class="box-model-demo">
    <div class="margin-box">
      <span class="label">Margin</span>
      <div class="border-box-layer">
        <span class="label">Border</span>
        <div class="padding-box">
          <span class="label">Padding</span>
          <div class="content-box">
            <strong>Content Area</strong>
            <p>200px &times; 80px</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
              css: `.container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.margin-box {
  background: #fed7aa;
  padding: 18px;
  border: 1px dashed #ea580c;
  text-align: center;
}
.border-box-layer {
  background: #fde047;
  padding: 16px;
  border: 2px solid #ca8a04;
}
.padding-box {
  background: #bbf7d0;
  padding: 16px;
  border: 1px dashed #16a34a;
}
.content-box {
  background: #93c5fd;
  padding: 20px;
  border: 1px solid #2563eb;
  color: #1e3a8a;
}
.label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #475569;
  display: block;
  margin-bottom: 6px;
}`,
              javascript: `console.log("Box Model initialized!");`,
            },
            lineByLineExplanation: [
              { line: 'box-sizing: border-box', explanation: 'Forces the padding and border to be included inside the specified width and height rather than expanding them.' },
              { line: 'padding: 16px', explanation: 'Creates breathing room between the element content and its outer border.' },
              { line: 'margin: 18px', explanation: 'Creates external spacing outside the border, separating it from adjacent sibling elements.' },
            ],
            commonMistakes: [
              {
                mistake: 'Not resetting box-sizing globally',
                fix: 'Always declare *, *::before, *::after { box-sizing: border-box; } at the top of your CSS.',
                why: 'Without border-box, adding 20px padding to a 100% width element causes horizontal scrollbars and broken layouts.'
              }
            ],
            practicalUseCases: [
              'Creating consistent UI card components',
              'Ensuring full-width form inputs fit their parent containers',
              'Building button styles with proportional touch targets'
            ],
            keyTakeaways: [
              'Total width = Content + Padding + Border (with border-box, width includes padding & border).',
              'Margin creates exterior separation; padding creates interior comfort.',
            ],
            quiz: {
              id: 'quiz-css-box',
              title: 'CSS Box Model Quiz',
              courseId: 'course-css',
              lessonId: 'css-box-model',
              durationMinutes: 5,
              passingScore: 80,
              xpReward: 35,
              questions: [
                {
                  id: 'qc1',
                  question: 'Which property ensures an element width includes padding and border?',
                  type: 'multiple_choice',
                  explanation: 'box-sizing: border-box calculates width inclusive of border and padding.',
                  options: [
                    { id: 'qc1-1', text: 'box-sizing: border-box;', isCorrect: true, explanation: 'Correct! This prevents unexpected dimensional growth.' },
                    { id: 'qc1-2', text: 'box-sizing: content-box;', isCorrect: false, explanation: 'Default behavior where padding expands outside specified width.' },
                    { id: 'qc1-3', text: 'display: block;', isCorrect: false, explanation: 'Incorrect.' },
                    { id: 'qc1-4', text: 'overflow: hidden;', isCorrect: false, explanation: 'Incorrect.' },
                  ]
                }
              ]
            },
            exercise: {
              id: 'ex-css-box',
              title: 'Apply Border and Padding to a Card',
              lessonId: 'css-box-model',
              category: 'CSS',
              difficulty: 'Beginner',
              type: 'complete_code',
              problemStatement: 'Style the .card class with a padding of 20px and a 2px solid #FF7A00 border.',
              instructions: [
                'Add padding: 20px;',
                'Add border: 2px solid #ff7a00;'
              ],
              starterCode: `.card {\n  /* Add your CSS properties here */\n}`,
              solutionCode: `.card {\n  padding: 20px;\n  border: 2px solid #ff7a00;\n}`,
              language: 'css',
              hints: ['Use padding: 20px; and border: 2px solid #ff7a00;.'],
              explanation: 'Padding provides interior cushion and border frames the element.',
              xpReward: 25,
            },
            published: true,
          },
          {
            id: 'css-flexbox',
            chapterId: 'css-ch-1',
            courseId: 'course-css',
            title: 'Modern Layouts with CSS Flexbox',
            slug: 'css-flexbox-mastery',
            order: 2,
            durationMinutes: 25,
            explanation: 'Flexible Box Layout (Flexbox) provides a powerful way to distribute space and align items along a single axis (either row or column). It makes vertical centering, equal-height columns, and adaptive navigation bars effortless.',
            learningObjectives: [
              'Understand flex containers vs flex items',
              'Master justify-content (main axis) and align-items (cross axis)',
              'Use flex-direction, flex-wrap, and gap for adaptive layouts',
            ],
            analogy: 'Imagine children sitting on a school bench: flex-direction determines if the bench is horizontal or a queue line; justify-content decides whether they pack to the left, center, or space out evenly.',
            syntaxGuide: `.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}`,
            primaryExample: {
              title: 'Interactive Flexbox Navbar & Card Row',
              html: `<div class="navbar">
  <div class="logo">CodeNexus</div>
  <div class="nav-links">
    <a href="#">Courses</a>
    <a href="#">Playground</a>
    <a href="#">Community</a>
  </div>
  <button class="btn">Sign In</button>
</div>

<div class="cards-row">
  <div class="feature-card">Card 1: Fast</div>
  <div class="feature-card">Card 2: Responsive</div>
  <div class="feature-card">Card 3: Interactive</div>
</div>`,
              css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  margin-bottom: 24px;
}
.logo {
  font-weight: 800;
  color: #ff7a00;
  font-size: 1.2rem;
}
.nav-links {
  display: flex;
  gap: 20px;
}
.nav-links a {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
}
.btn {
  background: #ff7a00;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
.cards-row {
  display: flex;
  gap: 16px;
}
.feature-card {
  flex: 1;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  text-align: center;
}`,
              javascript: `console.log("Flexbox demo rendered.");`,
            },
            keyTakeaways: [
              'display: flex creates a flex formatting context.',
              'justify-content aligns along the main axis; align-items aligns along the cross axis.',
              'gap property provides clean spacing without tricky margin hacks.',
            ],
            published: true,
          }
        ]
      }
    ]
  },
  {
    id: 'course-js',
    title: 'JavaScript ES6+ & Dynamic Programming',
    slug: 'javascript-es6-complete',
    shortDescription: 'From variables, functions, and arrays to DOM manipulation, async/await, and APIs—build dynamic web applications.',
    description: 'JavaScript is the programming language that powers interactivity on the web. In this comprehensive course, explore modern JavaScript syntax (const/let, arrow functions, template literals), master higher-order array methods (map, filter, reduce), manipulate the DOM in real time, and handle asynchronous data with Promises and fetch.',
    category: 'Programming Fundamentals',
    difficulty: 'Beginner',
    estimatedDuration: '10 Hours',
    thumbnailIcon: 'FileCode2',
    color: '#EAB308',
    prerequisites: ['Basic HTML and CSS'],
    isBeginnerFriendly: true,
    published: true,
    featured: true,
    chapters: [
      {
        id: 'js-ch-1',
        courseId: 'course-js',
        title: 'JavaScript Essentials',
        order: 1,
        lessons: [
          {
            id: 'js-variables',
            chapterId: 'js-ch-1',
            courseId: 'course-js',
            title: 'Variables, Data Types & Operators',
            slug: 'variables-and-data-types',
            order: 1,
            durationMinutes: 20,
            explanation: 'Variables store data values in memory. In modern JavaScript (ES6+), we use const for values that do not change and let for variables that will be reassigned. JavaScript has primitive types (string, number, boolean, null, undefined, symbol, bigint) and reference types (object, array, function).',
            learningObjectives: [
              'Understand the difference between const, let, and deprecated var',
              'Work with strings, numbers, booleans, arrays, and objects',
              'Use template literals for clean string interpolation',
            ],
            analogy: 'A variable is like a labeled storage jar. const is a jar sealed with tamper-proof tape; let is a jar with a reusable lid that you can empty and refill anytime.',
            syntaxGuide: `const name = "Alice"; // Cannot be reassigned\nlet score = 100;     // Can be updated\nscore += 25;`,
            primaryExample: {
              title: 'Interactive User Score Calculator',
              html: `<div class="app-card">
  <h3>Player Profile</h3>
  <p id="player-info">Loading...</p>
  <button id="add-points-btn">Add 50 XP</button>
</div>`,
              css: `.app-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  max-width: 300px;
}
#add-points-btn {
  background: #ff7a00;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}`,
              javascript: `const playerName = "Jordan";
let playerXP = 120;
let level = 1;

function updateUI() {
  const display = document.getElementById("player-info");
  display.innerText = \`Player: \${playerName} | Level: \${level} | XP: \${playerXP}\`;
}

document.getElementById("add-points-btn").addEventListener("click", () => {
  playerXP += 50;
  if (playerXP >= 200) {
    level = 2;
  }
  updateUI();
  console.log(\`XP updated: \${playerXP}\`);
});

updateUI();`,
            },
            lineByLineExplanation: [
              { line: 'const playerName = "Jordan";', explanation: 'Declares a block-scoped constant string variable that cannot be reassigned.' },
              { line: 'let playerXP = 120;', explanation: 'Declares a block-scoped mutable number variable that will change as the player earns points.' },
              { line: '`Player: ${playerName} | XP: ${playerXP}`', explanation: 'Template literal using backticks allow embedding expressions seamlessly with ${...}.' },
            ],
            commonMistakes: [
              {
                mistake: 'Using var in modern applications',
                fix: 'Always use const by default, and let only when reassignment is explicitly required.',
                why: 'var is function-scoped rather than block-scoped and hoists unintuitively, leading to scope leak bugs.'
              }
            ],
            practicalUseCases: [
              'Calculating cart totals in an e-commerce checkout',
              'Managing game score and player state',
              'Validating user form inputs'
            ],
            keyTakeaways: [
              'Default to const; use let only when reassignment is needed.',
              'Use backtick template literals for readable string formatting.',
              'JavaScript dynamically infers types (strings, numbers, booleans).',
            ],
            quiz: {
              id: 'quiz-js-vars',
              title: 'Variables & Data Types Quiz',
              courseId: 'course-js',
              lessonId: 'js-variables',
              durationMinutes: 5,
              passingScore: 80,
              xpReward: 35,
              questions: [
                {
                  id: 'qj1',
                  question: 'Which keyword should you use by default when declaring variables that do not need to be reassigned?',
                  type: 'multiple_choice',
                  explanation: 'const guarantees the identifier cannot be reassigned.',
                  options: [
                    { id: 'qj1-1', text: 'const', isCorrect: true, explanation: 'Correct! const prevents accidental variable reassignment.' },
                    { id: 'qj1-2', text: 'let', isCorrect: false, explanation: 'Use let only when reassignment is needed.' },
                    { id: 'qj1-3', text: 'var', isCorrect: false, explanation: 'var is legacy and discouraged.' },
                    { id: 'qj1-4', text: 'static', isCorrect: false, explanation: 'Incorrect.' },
                  ]
                }
              ]
            },
            exercise: {
              id: 'ex-js-vars',
              title: 'Calculate Total with Tax',
              lessonId: 'js-variables',
              category: 'JavaScript',
              difficulty: 'Beginner',
              type: 'write_function',
              problemStatement: 'Write a function calculateTotal(price, taxRate) that returns the total price: price + (price * taxRate).',
              instructions: [
                'Define function calculateTotal(price, taxRate)',
                'Return price + (price * taxRate)'
              ],
              starterCode: `function calculateTotal(price, taxRate) {\n  // Write your code here\n}`,
              solutionCode: `function calculateTotal(price, taxRate) {\n  return price + (price * taxRate);\n}`,
              language: 'javascript',
              hints: ['Use return price + (price * taxRate);'],
              explanation: 'Standard arithmetic operators compute price plus tax.',
              xpReward: 25,
            },
            published: true,
          },
          {
            id: 'js-dom',
            chapterId: 'js-ch-1',
            courseId: 'course-js',
            title: 'DOM Manipulation & Event Listeners',
            slug: 'dom-manipulation-events',
            order: 2,
            durationMinutes: 25,
            explanation: 'The Document Object Model (DOM) is an object-oriented representation of the webpage. JavaScript can modify the DOM to change text, inject HTML, alter CSS styles, and react to user events like clicks, typing, and mouse movements.',
            learningObjectives: [
              'Select elements using document.querySelector and getElementById',
              'Update element textContent and classList',
              'Attach interactive event listeners with addEventListener',
            ],
            analogy: 'The DOM is like a puppet on strings. JavaScript is the puppeteer who pulls the strings (events) to make the puppet dance on cue.',
            syntaxGuide: `const btn = document.querySelector("#my-button");\nbtn.addEventListener("click", () => {\n  console.log("Button clicked!");\n});`,
            primaryExample: {
              title: 'Live Color Switcher & Counter',
              html: `<div class="interactive-panel">
  <h2 id="counter-display">Count: 0</h2>
  <div class="actions">
    <button id="inc-btn">+ Increment</button>
    <button id="reset-btn">Reset</button>
    <button id="color-btn">Toggle Mood</button>
  </div>
</div>`,
              css: `.interactive-panel {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  text-align: center;
  transition: all 0.3s ease;
}
.interactive-panel.happy-mood {
  background: #fef08a;
  border-color: #eab308;
}
.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 16px;
}
button {
  background: #ff7a00;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
button#reset-btn {
  background: #64748b;
}`,
              javascript: `let count = 0;
const display = document.getElementById("counter-display");
const incBtn = document.getElementById("inc-btn");
const resetBtn = document.getElementById("reset-btn");
const colorBtn = document.getElementById("color-btn");
const panel = document.querySelector(".interactive-panel");

incBtn.addEventListener("click", () => {
  count++;
  display.textContent = "Count: " + count;
});

resetBtn.addEventListener("click", () => {
  count = 0;
  display.textContent = "Count: 0";
});

colorBtn.addEventListener("click", () => {
  panel.classList.toggle("happy-mood");
});`,
            },
            keyTakeaways: [
              'querySelector and getElementById find DOM nodes.',
              'addEventListener attaches event triggers without overwriting existing listeners.',
              'classList.add, remove, and toggle update element styling cleanly.',
            ],
            published: true,
          }
        ]
      }
    ]
  },
  {
    id: 'course-react',
    title: 'React 19 & Modern Component Architecture',
    slug: 'react-component-architecture',
    shortDescription: 'Build high-performance web applications using functional components, hooks (useState, useEffect), props, and state management.',
    description: 'React is the world’s most popular declarative UI library. Learn how component-based architecture decomposes complex user interfaces into reusable, testable parts. Master the component lifecycle, hooks, conditional rendering, forms, and performance optimization.',
    category: 'Frontend Development',
    difficulty: 'Intermediate',
    estimatedDuration: '12 Hours',
    thumbnailIcon: 'Layers',
    color: '#06B6D4',
    prerequisites: ['Solid JavaScript ES6+ foundation'],
    isBeginnerFriendly: false,
    published: true,
    featured: true,
    chapters: [
      {
        id: 'react-ch-1',
        courseId: 'course-react',
        title: 'React Fundamentals',
        order: 1,
        lessons: [
          {
            id: 'react-components',
            chapterId: 'react-ch-1',
            courseId: 'course-react',
            title: 'Components, JSX, and Props',
            slug: 'components-jsx-props',
            order: 1,
            durationMinutes: 25,
            explanation: 'React components are JavaScript functions that return JSX (JavaScript XML). JSX allows you to write HTML-like structures directly inside your JavaScript code. Props (properties) allow parent components to pass data down to child components, enabling high reusability.',
            learningObjectives: [
              'Understand JSX syntax and expression embedding with curly braces',
              'Construct reusable functional components',
              'Pass and destruct props with TypeScript and prop-types patterns',
            ],
            analogy: 'A React component is like a custom Lego brick mold. You create the mold once, and you can stamp out dozens of identical bricks with different colors and labels passed in as props.',
            syntaxGuide: `function UserCard({ name, role }) {\n  return (\n    <div className="card">\n      <h3>{name}</h3>\n      <p>{role}</p>\n    </div>\n  );\n}`,
            primaryExample: {
              title: 'Reusable Dev Badge Component in React',
              singleLanguageCode: `// Example React Functional Component
function Badge({ label, count, color = "orange" }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 12px",
      borderRadius: "9999px",
      background: color === "orange" ? "#FFF9F3" : "#F5F5F5",
      border: "1px solid #E5E5E5",
      fontWeight: 600
    }}>
      <span>{label}</span>
      <span style={{
        background: "#FF7A00",
        color: "#fff",
        borderRadius: "9999px",
        padding: "2px 8px",
        fontSize: "0.8rem"
      }}>
        {count}
      </span>
    </div>
  );
}

// App renders multiple instances
export default function App() {
  return (
    <div style={{ padding: "20px", display: "flex", gap: "12px" }}>
      <Badge label="Active Tasks" count={4} />
      <Badge label="Pull Requests" count={2} color="gray" />
    </div>
  );
}`,
              language: 'javascript',
            },
            keyTakeaways: [
              'Components must return a single root element (or Fragment <>...</>).',
              'Props are read-only and flow strictly downward from parent to child.',
              'Curly braces {} in JSX evaluate any valid JavaScript expression.',
            ],
            published: true,
          }
        ]
      }
    ]
  },
  {
    id: 'course-python',
    title: 'Python for Beginners & Problem Solving',
    slug: 'python-beginners-problem-solving',
    shortDescription: 'Learn one of the most versatile languages in the world: data types, loops, functions, lists, dictionaries, and problem-solving.',
    description: 'Python is renowned for its clean, English-like syntax and immense versatility in web development, data science, automation, and artificial intelligence. Learn core syntax, indentation, data structures (lists, tuples, dicts), file I/O, and algorithmic thinking.',
    category: 'Programming Fundamentals',
    difficulty: 'Beginner',
    estimatedDuration: '8 Hours',
    thumbnailIcon: 'Terminal',
    color: '#3B82F6',
    prerequisites: ['No prerequisites'],
    isBeginnerFriendly: true,
    published: true,
    featured: false,
    chapters: [
      {
        id: 'py-ch-1',
        courseId: 'course-python',
        title: 'Python Syntax & Basics',
        order: 1,
        lessons: [
          {
            id: 'py-basics',
            chapterId: 'py-ch-1',
            courseId: 'course-python',
            title: 'Python Syntax, Variables & Print',
            slug: 'python-basics',
            order: 1,
            durationMinutes: 15,
            explanation: 'Unlike C or JavaScript which use curly braces {}, Python uses whitespace indentation to define code blocks. Variables are created the moment you first assign a value to them without needing variable keywords.',
            learningObjectives: [
              'Understand Python indentation rules',
              'Print outputs and format strings using f-strings',
              'Create lists, dictionaries, and loops',
            ],
            analogy: 'Python reads almost like plain written instructions in an English recipe book.',
            syntaxGuide: `name = "Dev"\nage = 22\nprint(f"Hello {name}, age {age}")`,
            primaryExample: {
              title: 'Student Grade Classifier in Python',
              singleLanguageCode: `# Python Data Structure & Logic
students = [
    {"name": "Alice", "score": 92},
    {"name": "Bob", "score": 78},
    {"name": "Charlie", "score": 85}
]

def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    else:
        return "C"

for student in students:
    grade = calculate_grade(student["score"])
    print(f"{student['name']} scored {student['score']}% - Grade: {grade}")`,
              language: 'python',
            },
            keyTakeaways: [
              'Python uses 4-space indentation to define scope and blocks.',
              'f-strings f"..." provide fast, expressive string interpolation.',
            ],
            published: true,
          }
        ]
      }
    ]
  },
  {
    id: 'course-sql',
    title: 'MySQL & Relational Database Design',
    slug: 'mysql-database-design',
    shortDescription: 'Design normalized relational databases, master SQL queries (SELECT, JOIN, GROUP BY), foreign keys, and indexes.',
    description: 'Structured Query Language (SQL) is the standard language for relational database systems like MySQL. In this course, learn how to model entities, normalize data schemas, write optimized queries, execute complex multi-table JOINs, aggregate data, and administer databases via phpMyAdmin.',
    category: 'Database Development',
    difficulty: 'Intermediate',
    estimatedDuration: '7 Hours',
    thumbnailIcon: 'Database',
    color: '#0284C7',
    prerequisites: ['Basic understanding of data tables'],
    isBeginnerFriendly: true,
    published: true,
    featured: false,
    chapters: [
      {
        id: 'sql-ch-1',
        courseId: 'course-sql',
        title: 'SQL Query Fundamentals',
        order: 1,
        lessons: [
          {
            id: 'sql-queries',
            chapterId: 'sql-ch-1',
            courseId: 'course-sql',
            title: 'SELECT, WHERE, and Filtering',
            slug: 'select-where-filtering',
            order: 1,
            durationMinutes: 20,
            explanation: 'The SELECT statement retrieves rows and columns from one or more tables. The WHERE clause filters records based on specific logical conditions (AND, OR, LIKE, BETWEEN, IN).',
            learningObjectives: [
              'Write syntactically sound SELECT queries',
              'Filter records using comparison and logical operators',
              'Sort results using ORDER BY and paginate with LIMIT',
            ],
            analogy: 'A SQL database is like a spreadsheet with millions of rows; a SELECT query is like applying a custom filter and viewing only the specific columns you need.',
            syntaxGuide: `SELECT first_name, email\nFROM users\nWHERE role = 'student'\nORDER BY created_at DESC\nLIMIT 10;`,
            primaryExample: {
              title: 'Querying Active Students',
              singleLanguageCode: `-- Querying Active Students from Database
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(lp.lesson_id) AS completed_lessons
FROM users u
LEFT JOIN lesson_progress lp ON u.id = lp.user_id AND lp.status = 'completed'
WHERE u.role = 'student'
GROUP BY u.id, u.name, u.email
HAVING completed_lessons >= 5
ORDER BY completed_lessons DESC;`,
              language: 'sql',
            },
            keyTakeaways: [
              'SELECT picks columns, FROM specifies table, WHERE filters rows.',
              'ORDER BY sorts ascending (ASC) or descending (DESC).',
              'Use parameterized queries in backends to eliminate SQL injection.',
            ],
            published: true,
          }
        ]
      }
    ]
  },
  {
    id: 'course-git',
    title: 'Git & GitHub Collaboration Workflow',
    slug: 'git-github-collaboration',
    shortDescription: 'Learn version control: commits, branches, merges, rebasing, pull requests, and collaborative open-source workflows.',
    description: 'Every professional engineering team relies on Git for source code version management. Master git init, staging, commits, feature branch management, resolving merge conflicts, and publishing open-source repositories to GitHub.',
    category: 'DevOps and Deployment',
    difficulty: 'Beginner',
    estimatedDuration: '5 Hours',
    thumbnailIcon: 'GitBranch',
    color: '#EA580C',
    prerequisites: ['Terminal basics recommended'],
    isBeginnerFriendly: true,
    published: true,
    featured: false,
    chapters: [
      {
        id: 'git-ch-1',
        courseId: 'course-git',
        title: 'Git Fundamentals',
        order: 1,
        lessons: [
          {
            id: 'git-workflow',
            chapterId: 'git-ch-1',
            courseId: 'course-git',
            title: 'Staging, Committing, and Branching',
            slug: 'staging-committing-branching',
            order: 1,
            durationMinutes: 20,
            explanation: 'Git tracks changes across files over time. The basic cycle involves: modifying files in your working directory, staging files with git add, and saving an immutable checkpoint with git commit.',
            learningObjectives: [
              'Understand the 3 Git states: Working Directory, Staging Area, Repository',
              'Write descriptive, atomic commit messages',
              'Create and switch branches with git checkout -b',
            ],
            analogy: 'Staging is like placing items into a shipping box. Committing is sealing the box with shipping tape and stamping the date code on it.',
            syntaxGuide: `git checkout -b feature/login-page\ngit add .\ngit commit -m "feat: implement responsive login form"`,
            primaryExample: {
              title: 'Standard Terminal Commands',
              singleLanguageCode: `# 1. Check current status
git status

# 2. Stage specific changes
git add src/components/Navbar.tsx

# 3. Create descriptive commit
git commit -m "feat(nav): add mobile hamburger navigation menu"

# 4. Push to remote origin
git push origin feature/mobile-nav`,
              language: 'bash',
            },
            keyTakeaways: [
              'Git tracks snapshots of files, not mere differences.',
              'Keep commits small, frequent, and atomic.',
            ],
            published: true,
          }
        ]
      }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-portfolio',
    title: 'Responsive Developer Portfolio',
    slug: 'developer-portfolio',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    estimatedHours: '4-6 Hours',
    overview: 'Build an elegant personal developer portfolio website showcasing your bio, skills, featured projects, and an interactive contact modal with smooth scroll navigation.',
    objectives: [
      'Structure clean semantic HTML5 markup',
      'Implement responsive CSS grid and flexbox styling',
      'Add a light/dark mode theme switch with JavaScript',
      'Deploy live on GitHub Pages or Vercel',
    ],
    technologies: ['HTML5', 'CSS3 Flexbox/Grid', 'Vanilla JavaScript'],
    prerequisites: ['HTML basics', 'CSS box model', 'Basic JavaScript'],
    folderStructure: `my-portfolio/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── app.js
└── assets/
    ├── avatar.png
    └── icons/`,
    steps: [
      {
        stepNumber: 1,
        title: 'Project Scaffold & Semantic HTML',
        description: 'Set up index.html with meta tags, header, hero section, skills grid, projects container, and footer.',
        codeSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex River | Full Stack Developer</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <header>
    <nav class="nav-bar">
      <div class="logo">Alex.dev</div>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section class="hero" id="about">
      <h1>Hi, I'm Alex.</h1>
      <p>I build clean, accessible web applications.</p>
    </section>
  </main>
  <script src="scripts/app.js"></script>
</body>
</html>`,
        language: 'html',
        fileLocation: 'index.html',
      },
      {
        stepNumber: 2,
        title: 'Responsive CSS Grid & Clean Typography',
        description: 'Apply fluid styling, CSS custom properties for orange accents, and mobile media queries.',
        codeSnippet: `:root {
  --primary: #ff7a00;
  --bg: #fff9f3;
  --text: #171717;
}
body {
  font-family: system-ui, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  margin: 0;
}
.hero {
  padding: 60px 20px;
  text-align: center;
}
.hero h1 {
  color: var(--primary);
  font-size: 2.5rem;
}`,
        language: 'css',
        fileLocation: 'styles/main.css',
      },
      {
        stepNumber: 3,
        title: 'Add Interactive Theme Switcher in JS',
        description: 'Store theme preference in localStorage and toggle the body class.',
        codeSnippet: `const toggleBtn = document.querySelector("#theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}`,
        language: 'javascript',
        fileLocation: 'scripts/app.js',
      }
    ],
    testingChecklist: [
      'Page displays without horizontal scroll on 375px mobile screens',
      'All anchor navigation links scroll smoothly to their respective targets',
      'Images have alt text for screen reader accessibility',
      'W3C HTML validator returns zero syntax errors'
    ],
    commonErrors: [
      {
        error: 'Hero section overflows viewport on mobile devices',
        solution: 'Avoid fixed pixel widths like width: 900px; use max-width: 900px and width: 100% instead.'
      }
    ],
    deploymentGuide: 'Push your repository to GitHub, head to Repository Settings > Pages, select Branch: main and Folder: /root, and click Save. Your portfolio will be live in 60 seconds.',
    challenges: [
      'Add a filtered project tag system (e.g. Filter by React, JavaScript, CSS)',
      'Embed a contact form connected to Formspree or EmailJS',
    ],
    starterTemplate: {
      html: `<header class="header">
  <h2>Alex River</h2>
  <nav><a href="#work">Projects</a> | <a href="#contact">Contact</a></nav>
</header>
<main class="hero">
  <h1>Full-Stack Web Developer</h1>
  <p>Crafting performant web experiences.</p>
  <button class="cta-btn">View My Work</button>
</main>`,
      css: `body {
  font-family: sans-serif;
  background: #fff9f3;
  color: #171717;
  padding: 24px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ff7a00;
  padding-bottom: 12px;
}
.hero {
  padding: 40px 0;
}
.cta-btn {
  background: #ff7a00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}`,
      javascript: `document.querySelector(".cta-btn").addEventListener("click", () => {
  alert("Welcome to my portfolio!");
});`,
    }
  },
  {
    id: 'proj-calculator',
    title: 'Interactive Web Calculator',
    slug: 'interactive-calculator',
    category: 'Programming Fundamentals',
    difficulty: 'Beginner',
    estimatedHours: '3-4 Hours',
    overview: 'Build a fully operational arithmetic calculator with decimal support, clear/delete buttons, keyboard input handling, and calculation history.',
    objectives: [
      'Build a responsive keypad layout using CSS Grid',
      'Manage input buffer state and operator precedence in JavaScript',
      'Prevent common arithmetic bugs like divide-by-zero or multiple decimals',
    ],
    technologies: ['HTML5', 'CSS Grid', 'JavaScript'],
    prerequisites: ['JavaScript functions', 'DOM events'],
    folderStructure: `calculator-app/
├── index.html
├── styles.css
└── calculator.js`,
    steps: [
      {
        stepNumber: 1,
        title: 'Calculator Frame with CSS Grid',
        description: 'Set up display screen and 4x5 button matrix.',
        codeSnippet: `<div class="calculator">
  <div class="display" id="display">0</div>
  <div class="keypad">
    <button class="btn btn-clear">AC</button>
    <button class="btn btn-op">&divide;</button>
    <button class="btn btn-op">&times;</button>
    <button class="btn btn-op">&minus;</button>
    <button class="btn">7</button>
    <button class="btn">8</button>
    <button class="btn">9</button>
    <button class="btn btn-op">+</button>
    <button class="btn">4</button>
    <button class="btn">5</button>
    <button class="btn">6</button>
    <button class="btn btn-equals">=</button>
    <button class="btn">1</button>
    <button class="btn">2</button>
    <button class="btn">3</button>
    <button class="btn">0</button>
  </div>
</div>`,
        language: 'html',
      }
    ],
    testingChecklist: ['Basic arithmetic (8 + 5 = 13)', 'Division by zero handles gracefully'],
    commonErrors: [
      { error: 'Using eval() for calculations', solution: 'Never use eval() for safety; parse tokens or maintain an accumulator explicitly.' }
    ],
    deploymentGuide: 'Deploy for free on Vercel, Netlify, or GitHub Pages.',
    challenges: ['Add backspace / undo key', 'Store recent 10 calculations in a history drawer']
  },
  {
    id: 'proj-todo',
    title: 'Modern Task Manager with LocalStorage',
    slug: 'task-manager-localstorage',
    category: 'Frontend Development',
    difficulty: 'Intermediate',
    estimatedHours: '5-7 Hours',
    overview: 'Create a rich task management application featuring drag-and-drop or categorized tasks, filtering (All, Active, Completed), search, and persistent browser storage.',
    objectives: [
      'Model state transitions for todo items',
      'Persist application state to localStorage',
      'Render dynamic DOM lists efficiently',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript ES6+'],
    prerequisites: ['Array methods (map, filter)', 'DOM manipulation'],
    folderStructure: `todo-app/\n├── index.html\n├── app.js\n└── styles.css`,
    steps: [
      {
        stepNumber: 1,
        title: 'App State & Storage Handler',
        description: 'Create helper functions to load and save array of tasks to localStorage.',
        codeSnippet: `let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");\n\nfunction saveTasks() {\n  localStorage.setItem("tasks", JSON.stringify(tasks));\n}`,
        language: 'javascript',
      }
    ],
    testingChecklist: ['Tasks remain after browser page reload', 'Empty task submissions are rejected'],
    commonErrors: [{ error: 'JSON.parse crashing on empty storage', solution: 'Provide fallback default "[]" inside JSON.parse.' }],
    deploymentGuide: 'Push to GitHub and enable GitHub Pages.',
    challenges: ['Add priority badges (High, Medium, Low)', 'Add due dates with overdue indicator']
  }
];

export const INITIAL_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-web-dev',
    title: 'Web Development Beginner Path',
    slug: 'web-development-beginner',
    headline: 'Zero to Full-Stack Web Developer',
    description: 'The definitive end-to-end curriculum for aspiring web developers. Master page structure, visual design, client interactivity, and server communication step-by-step.',
    badge: 'Full-Stack Certified',
    estimatedMonths: '3-4 Months',
    difficulty: 'Beginner',
    careerRoles: ['Frontend Developer', 'Junior Web Developer', 'Full-Stack Engineer'],
    steps: [
      { courseId: 'course-html', title: 'HTML5 Modern Web Architecture', description: 'Semantic markup, accessible forms, and document structure.', roleInPath: 'Stage 1: Content Skeleton' },
      { courseId: 'course-css', title: 'CSS3 & Modern Responsive Design', description: 'Flexbox, CSS Grid, mobile styling, and design systems.', roleInPath: 'Stage 2: Aesthetics & Layout' },
      { courseId: 'course-js', title: 'JavaScript ES6+ & Dynamic Programming', description: 'Logic, data structures, DOM events, and APIs.', roleInPath: 'Stage 3: Interactivity' },
      { courseId: 'course-react', title: 'React 19 & Component Architecture', description: 'Component-driven UI, hooks, and scalable frontend state.', roleInPath: 'Stage 4: Modern Framework' },
      { courseId: 'course-sql', title: 'MySQL & Relational Database Design', description: 'Relational data modeling, queries, and schema architecture.', roleInPath: 'Stage 5: Data Persistence' },
      { courseId: 'course-git', title: 'Git & GitHub Collaboration Workflow', description: 'Version control, feature branching, and team collaboration.', roleInPath: 'Stage 6: Engineering Workflow' },
    ]
  },
  {
    id: 'path-frontend',
    title: 'Frontend Developer Path',
    slug: 'frontend-developer',
    headline: 'Master Client-Side Engineering',
    description: 'Focus deeply on crafting accessible, lightning-fast, and responsive user interfaces that delight millions of users.',
    badge: 'Frontend Specialist',
    estimatedMonths: '2-3 Months',
    difficulty: 'Beginner',
    careerRoles: ['Frontend Engineer', 'UI/UX Developer', 'React Developer'],
    steps: [
      { courseId: 'course-html', title: 'HTML5 Architecture', description: 'Accessibility and semantic standards.', roleInPath: 'Foundations' },
      { courseId: 'course-css', title: 'CSS3 & Responsive Design', description: 'Flexbox, Grid, transitions.', roleInPath: 'Visual Mastery' },
      { courseId: 'course-js', title: 'JavaScript ES6+', description: 'Modern syntax and DOM APIs.', roleInPath: 'Dynamic Logic' },
      { courseId: 'course-react', title: 'React 19 Ecosystem', description: 'State, props, custom hooks, and routing.', roleInPath: 'Application Architecture' },
    ]
  },
  {
    id: 'path-python-ai',
    title: 'Python & AI Foundations Path',
    slug: 'python-ai-foundations',
    headline: 'Learn Python and Algorithmic Thinking',
    description: 'Start your journey into modern programming, data science, automation, and artificial intelligence with Python.',
    badge: 'Pythonista',
    estimatedMonths: '2 Months',
    difficulty: 'Beginner',
    careerRoles: ['Python Developer', 'Data Analyst', 'AI Automation Specialist'],
    steps: [
      { courseId: 'course-python', title: 'Python for Beginners', description: 'Syntax, data structures, and algorithmic logic.', roleInPath: 'Core Language' },
      { courseId: 'course-sql', title: 'MySQL & Database Queries', description: 'Storing and querying datasets efficiently.', roleInPath: 'Data Storage' },
    ]
  }
];

export const INITIAL_EXERCISES = [
  ...INITIAL_COURSES.flatMap(c => c.chapters.flatMap(ch => ch.lessons.filter(l => l.exercise).map(l => l.exercise!)))
];

export const INITIAL_QUIZZES = [
  ...INITIAL_COURSES.flatMap(c => c.chapters.flatMap(ch => ch.lessons.filter(l => l.quiz).map(l => l.quiz!)))
];
