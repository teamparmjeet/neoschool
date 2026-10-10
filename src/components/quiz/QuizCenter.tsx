import React, { useState, useEffect } from 'react';
import { Quiz, User } from '../../types';
import { INITIAL_QUIZZES } from '../../db/initialData';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Check, 
  HelpCircle,
  FileText,
  Download,
  Share2
} from 'lucide-react';
import { awardXp, triggerConfetti } from '../../db/storage';

interface QuizCenterProps {
  currentUser: User;
  onUserUpdate: () => void;
}

const FULL_ASSESSMENTS: Quiz[] = [
  ...INITIAL_QUIZZES,
  {
    id: 'quiz-full-web-fundamentals',
    title: 'Web Engineering Fundamentals Comprehensive Exam',
    courseId: 'course-html',
    durationMinutes: 8,
    passingScore: 75,
    xpReward: 60,
    questions: [
      {
        id: 'q-f1',
        question: 'Which CSS display mode allows 1-dimensional alignment along either a row or column?',
        type: 'multiple_choice',
        explanation: 'Flexbox is designed for one-dimensional layouts, whereas CSS Grid is two-dimensional.',
        options: [
          { id: 'opt-f1-1', text: 'display: grid', isCorrect: false, explanation: 'Grid is 2D.' },
          { id: 'opt-f1-2', text: 'display: flex', isCorrect: true, explanation: 'Flexbox provides 1D flow along main and cross axis.' },
          { id: 'opt-f1-3', text: 'display: inline-block', isCorrect: false, explanation: 'Legacy layout.' },
          { id: 'opt-f1-4', text: 'display: table', isCorrect: false, explanation: 'Table layout.' },
        ]
      },
      {
        id: 'q-f2',
        question: 'What is the evaluated output of typeof null in JavaScript?',
        codeSnippet: `console.log(typeof null);`,
        type: 'predict_output',
        explanation: 'Due to a historical bug in the first implementation of JavaScript, typeof null evaluates to "object".',
        options: [
          { id: 'opt-f2-1', text: '"null"', isCorrect: false, explanation: 'Incorrect.' },
          { id: 'opt-f2-2', text: '"undefined"', isCorrect: false, explanation: 'Incorrect.' },
          { id: 'opt-f2-3', text: '"object"', isCorrect: true, explanation: 'Correct! typeof null returns "object" in JavaScript.' },
          { id: 'opt-f2-4', text: '"boolean"', isCorrect: false, explanation: 'Incorrect.' },
        ]
      },
      {
        id: 'q-f3',
        question: 'True or False: The <article> tag must only be used for newspaper articles and blog posts.',
        type: 'true_false',
        explanation: '<article> can be used for any self-contained reusable component like comment cards, product widgets, or forum posts.',
        options: [
          { id: 'opt-f3-1', text: 'True', isCorrect: false, explanation: 'False.' },
          { id: 'opt-f3-2', text: 'False', isCorrect: true, explanation: 'Correct! <article> is suitable for any self-contained, distributable composition.' },
        ]
      },
      {
        id: 'q-f4',
        question: 'Which method should you use on an array to transform every element into a new array?',
        type: 'multiple_choice',
        explanation: 'Array.prototype.map creates a new array populated with the results of calling a provided function on every element.',
        options: [
          { id: 'opt-f4-1', text: 'arr.filter()', isCorrect: false, explanation: 'Filter extracts subsets matching criteria.' },
          { id: 'opt-f4-2', text: 'arr.map()', isCorrect: true, explanation: 'Map applies a transform to each element and returns the new array.' },
          { id: 'opt-f4-3', text: 'arr.forEach()', isCorrect: false, explanation: 'forEach returns undefined.' },
          { id: 'opt-f4-4', text: 'arr.reduce()', isCorrect: false, explanation: 'Reduce accumulates into single value.' },
        ]
      }
    ]
  }
];

export const QuizCenter: React.FC<QuizCenterProps> = ({ currentUser, onUserUpdate }) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!activeQuiz || quizFinished || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQuiz, quizFinished, secondsRemaining]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setShowCertificate(false);
    setSecondsRemaining(quiz.durationMinutes * 60);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (quizFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleFinishQuiz = () => {
    if (!activeQuiz) return;
    setQuizFinished(true);

    const score = calculateScore();
    const passed = score >= activeQuiz.passingScore;
    if (passed) {
      awardXp(activeQuiz.xpReward, 'Passed Quiz');
      triggerConfetti();
      onUserUpdate();
    }
  };

  const calculateScore = () => {
    if (!activeQuiz) return 0;
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.id === selected);
      if (opt?.isCorrect) correctCount++;
    });
    return Math.round((correctCount / activeQuiz.questions.length) * 100);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* If No Quiz Active: Catalog of Quizzes */}
      {!activeQuiz ? (
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] bg-orange-100/60 px-3 py-1 rounded-full">
              Assessments & Knowledge Checks
            </span>
            <h1 className="text-3xl font-extrabold text-[#171717] mt-3">
              Developer Quiz Center
            </h1>
            <p className="text-sm text-neutral-600 mt-2">
              Test your understanding, earn XP badges, and evaluate your readiness with timed assessments and code output challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FULL_ASSESSMENTS.map((quiz) => {
              const isPassed = currentUser.passedQuizIds.includes(quiz.id);

              return (
                <div
                  key={quiz.id}
                  className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 text-[#FF7A00] border border-orange-200">
                        {quiz.questions.length} Questions
                      </span>
                      <span className="text-xs font-bold text-[#FF7A00]">
                        +{quiz.xpReward} XP
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#171717] mb-2">{quiz.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {quiz.durationMinutes} mins
                      </span>
                      <span>Passing score: {quiz.passingScore}%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    {isPassed ? (
                      <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Passed
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-400">Not taken yet</span>
                    )}

                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      className="px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-transform active:scale-95 shadow-xs"
                    >
                      {isPassed ? 'Retake Quiz' : 'Start Assessment'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Quiz View */
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
            <div>
              <span className="text-xs text-neutral-400">Assessment</span>
              <h2 className="text-lg font-bold text-[#171717]">{activeQuiz.title}</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-lg text-xs font-mono font-bold text-neutral-800">
                <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
              <button
                onClick={() => setActiveQuiz(null)}
                className="text-xs text-neutral-500 hover:text-neutral-800"
              >
                Quit ✕
              </button>
            </div>
          </div>

          {!quizFinished ? (
            /* Questions Flow */
            <div className="py-6">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                <span>Pass mark: {activeQuiz.passingScore}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-neutral-100 rounded-full mb-6">
                <div 
                  className="h-full bg-[#FF7A00] rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                />
              </div>

              {(() => {
                const q = activeQuiz.questions[currentQuestionIndex];
                const selectedOpt = selectedAnswers[q.id];

                return (
                  <div>
                    <h3 className="text-base font-bold text-[#171717] mb-3">{q.question}</h3>

                    {q.codeSnippet && (
                      <pre className="bg-[#171717] text-[#FF7A00] p-3 rounded-xl text-xs font-mono mb-4 overflow-x-auto">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    <div className="space-y-2.5">
                      {q.options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`w-full p-3.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                            selectedOpt === opt.id
                              ? 'bg-orange-50 border-[#FF7A00] text-[#171717] font-bold shadow-2xs'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <span>{opt.text}</span>
                          {selectedOpt === opt.id && <Check className="w-4 h-4 text-[#FF7A00]" />}
                        </button>
                      ))}
                    </div>

                    {/* Step buttons */}
                    <div className="mt-8 flex items-center justify-between pt-4 border-t border-neutral-100">
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-600 disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                          className="px-5 py-2 bg-[#171717] hover:bg-neutral-800 text-white rounded-lg text-xs font-bold"
                        >
                          Next Question &rarr;
                        </button>
                      ) : (
                        <button
                          onClick={handleFinishQuiz}
                          className="px-6 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white rounded-lg text-xs font-bold shadow-sm"
                        >
                          Finish & Submit Quiz
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Results Screen */
            <div className="py-8 text-center">
              {(() => {
                const score = calculateScore();
                const passed = score >= activeQuiz.passingScore;

                return (
                  <div>
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 bg-orange-50 border-2 border-[#FF7A00]">
                      <Award className="w-8 h-8 text-[#FF7A00]" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#171717]">
                      {passed ? 'Congratulations! You Passed!' : 'Nice Attempt! Try Again.'}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      You scored <strong className="text-[#FF7A00]">{score}%</strong> (Passing score: {activeQuiz.passingScore}%)
                    </p>

                    {passed && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                        <Sparkles className="w-3.5 h-3.5" /> +{activeQuiz.xpReward} XP Added to Profile
                      </div>
                    )}

                    {/* Question breakdown review */}
                    <div className="mt-8 text-left space-y-4 max-h-80 overflow-y-auto p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                      <h4 className="text-xs font-bold text-neutral-500 uppercase">Question Review</h4>
                      {activeQuiz.questions.map((q, i) => {
                        const userOptId = selectedAnswers[q.id];
                        const userOpt = q.options.find((o) => o.id === userOptId);
                        const correctOpt = q.options.find((o) => o.isCorrect);
                        const isCorrect = userOpt?.isCorrect;

                        return (
                          <div key={q.id} className="p-3 bg-white rounded-lg border border-neutral-200 text-xs">
                            <p className="font-bold text-[#171717] mb-1">{i + 1}. {q.question}</p>
                            <div className="flex items-center gap-2 mb-1">
                              {isCorrect ? (
                                <span className="text-green-600 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct: {userOpt?.text}
                                </span>
                              ) : (
                                <span className="text-red-600 font-bold flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" /> Selected: {userOpt?.text || 'None'} (Correct: {correctOpt?.text})
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-500">{q.explanation}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleStartQuiz(activeQuiz)}
                        className="px-4 py-2 border border-neutral-300 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Retake
                      </button>

                      {passed && (
                        <button
                          onClick={() => setShowCertificate(true)}
                          className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#FF7A00]" /> View Certificate
                        </button>
                      )}

                      <button
                        onClick={() => setActiveQuiz(null)}
                        className="px-5 py-2 bg-[#FF7A00] text-white rounded-xl text-xs font-bold hover:bg-[#e66e00] cursor-pointer"
                      >
                        Back to Quizzes
                      </button>
                    </div>

                    {/* Certificate Modal / View */}
                    {showCertificate && (
                      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-lg w-full p-8 border-4 border-double border-[#FF7A00] shadow-2xl relative text-center">
                          <button
                            onClick={() => setShowCertificate(false)}
                            className="absolute top-3 right-3 text-neutral-400 hover:text-black font-bold text-sm"
                          >
                            ✕
                          </button>

                          <div className="w-12 h-12 rounded-xl bg-[#FF7A00] mx-auto flex items-center justify-center text-white mb-2 shadow-sm">
                            <Award className="w-6 h-6" />
                          </div>

                          <h2 className="text-xs font-bold tracking-widest text-[#FF7A00] uppercase">
                            Certificate of Achievement
                          </h2>

                          <h3 className="text-xl font-extrabold text-[#171717] mt-3">
                            {currentUser.name}
                          </h3>

                          <p className="text-xs text-neutral-600 mt-2">
                            has demonstrated proficiency and successfully passed the examination:
                          </p>

                          <p className="text-sm font-bold text-neutral-900 mt-1">
                            {activeQuiz.title}
                          </p>

                          <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
                            <span>Score: {score}%</span>
                            <span>Issued: {new Date().toLocaleDateString()}</span>
                            <span>CodeNexus Verified</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
