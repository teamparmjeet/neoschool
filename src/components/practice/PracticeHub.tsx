import React, { useState } from 'react';
import { Exercise, User } from '../../types';
import { INITIAL_EXERCISES } from '../../db/initialData';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Play, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  Code,
  Flame,
  Check,
  ChevronRight
} from 'lucide-react';
import { awardXp, triggerConfetti } from '../../db/storage';

interface PracticeHubProps {
  currentUser: User;
  onUserUpdate: () => void;
}

const ADDITIONAL_PRACTICE_CHALLENGES: Exercise[] = [
  ...INITIAL_EXERCISES,
  {
    id: 'ex-predict-js-scope',
    title: 'Predict Output: Closure & Block Scope',
    lessonId: 'js-variables',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    type: 'predict_output',
    problemStatement: 'What will be logged to the console by the following code snippet?',
    instructions: [
      'Read the code carefully regarding let vs var scoping in loops',
      'Enter the exact console output in the text box'
    ],
    starterCode: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
}`,
    solutionCode: `0 1 2`,
    expectedOutput: `0 1 2`,
    language: 'javascript',
    hints: [
      'let creates a new lexical binding for each loop iteration.',
      'Unlike var, closures over let capture each distinct number value.'
    ],
    explanation: 'Because let is block-scoped, each iteration receives its own binding of i. The output will be 0 1 2.',
    xpReward: 30,
  },
  {
    id: 'ex-find-css-centering',
    title: 'Find & Fix the Error: Perfect Centering',
    lessonId: 'css-flexbox',
    category: 'CSS',
    difficulty: 'Beginner',
    type: 'find_error',
    problemStatement: 'The button is supposed to be vertically and horizontally centered in its parent box, but it is currently pinned to the top left. Fix the CSS error.',
    instructions: [
      'The developer forgot the flex display mode and align properties',
      'Replace the buggy declaration with proper Flexbox centering'
    ],
    starterCode: `.box {
  /* BUGGY: items won't center without display: flex */
  justify-items: center;
  align-self: center;
}`,
    solutionCode: `.box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
    language: 'css',
    hints: [
      'Flexbox requires display: flex;',
      'Use justify-content: center; and align-items: center;'
    ],
    explanation: 'justify-content centers along the main axis, and align-items centers along the cross axis when display: flex is set.',
    xpReward: 30,
  },
  {
    id: 'ex-write-palindrome',
    title: 'Write a Function: Check Palindrome String',
    lessonId: 'js-variables',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    type: 'write_function',
    problemStatement: 'Write a function isPalindrome(str) that returns true if the string reads the same forwards and backwards, and false otherwise.',
    instructions: [
      'Function name must be isPalindrome(str)',
      'Ignore case: convert to lowercase first',
      'Compare original to reversed string'
    ],
    starterCode: `function isPalindrome(str) {
  // Write your code here
}`,
    solutionCode: `function isPalindrome(str) {\n  const clean = str.toLowerCase();\n  return clean === clean.split('').reverse().join('');\n}`,
    language: 'javascript',
    hints: [
      'Use str.toLowerCase() to handle case',
      'Reverse by using .split("").reverse().join("")'
    ],
    explanation: 'Splitting into an array of characters, reversing it, and joining it back gives the reversed string for direct equality comparison.',
    xpReward: 35,
  }
];

export const PracticeHub: React.FC<PracticeHubProps> = ({ currentUser, onUserUpdate }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeExercise, setActiveExercise] = useState<Exercise>(ADDITIONAL_PRACTICE_CHALLENGES[0]);

  const [codeAnswer, setCodeAnswer] = useState(activeExercise.starterCode);
  const [evalResult, setEvalResult] = useState<'idle' | 'success' | 'failed'>('idle');
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const filteredExercises = ADDITIONAL_PRACTICE_CHALLENGES.filter((ex) => {
    const langMatch = selectedLanguage === 'All' || ex.category.toLowerCase() === selectedLanguage.toLowerCase();
    const diffMatch = selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;
    const typeMatch = selectedType === 'All' || ex.type === selectedType;
    return langMatch && diffMatch && typeMatch;
  });

  const handleSelectExercise = (ex: Exercise) => {
    setActiveExercise(ex);
    setCodeAnswer(ex.starterCode);
    setEvalResult('idle');
    setHintIndex(0);
    setShowSolution(false);
  };

  const handleCheckSolution = () => {
    const cleanUser = codeAnswer.trim().replace(/\s+/g, ' ').toLowerCase();
    const cleanSol = activeExercise.solutionCode.trim().replace(/\s+/g, ' ').toLowerCase();

    // Tolerant matching for keywords
    const isClose = cleanUser === cleanSol ||
      (activeExercise.expectedOutput && cleanUser.includes(activeExercise.expectedOutput.toLowerCase())) ||
      (activeExercise.type === 'write_function' && cleanUser.includes('return') && cleanUser.includes('reverse'));

    if (isClose) {
      setEvalResult('success');
      awardXp(activeExercise.xpReward, 'Solved Challenge');
      triggerConfetti();
      onUserUpdate();
    } else {
      setEvalResult('failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] bg-orange-100/60 px-3 py-1 rounded-full">
          Hands-On Code Drills
        </span>
        <h1 className="text-3xl font-extrabold text-[#171717] mt-3">
          Interactive Practice Challenges
        </h1>
        <p className="text-sm text-neutral-600 mt-2">
          Sharpen your programming skills with real problems: predict outputs, find bugs, fill in missing code, and write automated functions.
        </p>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-xl border border-[#E5E5E5] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-400 uppercase">Topic:</span>
          {['All', 'HTML', 'CSS', 'JavaScript'].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedLanguage === lang ? 'bg-[#FF7A00] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-400 uppercase">Type:</span>
          {[
            { id: 'All', label: 'All Types' },
            { id: 'predict_output', label: 'Predict Output' },
            { id: 'find_error', label: 'Find Error' },
            { id: 'complete_code', label: 'Complete Code' },
            { id: 'write_function', label: 'Write Function' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedType === t.id ? 'bg-[#171717] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split View: Challenge Selector on Left, Workspace on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Challenges */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Available Drills ({filteredExercises.length})
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredExercises.map((ex) => {
              const isSelected = activeExercise.id === ex.id;
              const isSolved = currentUser.completedExerciseIds.includes(ex.id) || evalResult === 'success' && activeExercise.id === ex.id;

              return (
                <button
                  key={ex.id}
                  onClick={() => handleSelectExercise(ex)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/70 border-[#FF7A00] shadow-xs'
                      : 'bg-white border-[#E5E5E5] hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                      {ex.category} • {ex.difficulty}
                    </span>
                    <span className="text-xs font-bold text-[#FF7A00]">+{ex.xpReward} XP</span>
                  </div>

                  <h4 className="text-xs font-bold text-[#171717] flex items-center gap-1.5">
                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    ) : (
                      <Terminal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    )}
                    <span className="truncate">{ex.title}</span>
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Exercise Canvas */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm flex flex-col">
          
          {/* Header of Active Exercise */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E5E5E5]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-100 text-[#FF7A00]">
                  {activeExercise.type.replace('_', ' ')}
                </span>
                <span className="text-xs text-neutral-500 font-medium">{activeExercise.category}</span>
              </div>
              <h2 className="text-lg font-bold text-[#171717]">{activeExercise.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#FF7A00] bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
                Reward: {activeExercise.xpReward} XP
              </span>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="my-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Problem Statement</h4>
            <p className="text-sm text-neutral-800 leading-relaxed bg-[#FFF9F3] p-3.5 rounded-xl border border-orange-100">
              {activeExercise.problemStatement}
            </p>
          </div>

          {/* Instructions List */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Instructions</h4>
            <ul className="text-xs text-neutral-700 space-y-1 pl-4 list-disc">
              {activeExercise.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col rounded-xl border border-neutral-800 bg-[#171717] overflow-hidden mb-4">
            <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 text-[11px] font-mono text-neutral-400">
              <span>Editor ({activeExercise.language})</span>
              <button
                onClick={() => setCodeAnswer(activeExercise.starterCode)}
                className="flex items-center gap-1 hover:text-white"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <textarea
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              spellCheck={false}
              rows={8}
              className="w-full flex-1 p-3 text-xs font-mono bg-transparent text-neutral-100 focus:outline-none"
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckSolution}
                className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-xl cursor-pointer transition-transform active:scale-95 shadow-sm shadow-[#FF7A00]/20 flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Submit & Run Tests</span>
              </button>

              {activeExercise.hints.length > 0 && (
                <button
                  onClick={() => setHintIndex((prev) => Math.min(prev + 1, activeExercise.hints.length))}
                  className="px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Need Hint ({hintIndex}/{activeExercise.hints.length})
                </button>
              )}

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 underline cursor-pointer ml-1"
              >
                {showSolution ? 'Hide Solution' : 'Reveal Solution'}
              </button>
            </div>

            {/* Status indicator */}
            {evalResult === 'success' && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3.5 py-2 rounded-xl border border-green-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>Passed! +{activeExercise.xpReward} XP awarded</span>
              </div>
            )}

            {evalResult === 'failed' && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-3.5 py-2 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4" />
                <span>Incorrect output. Check hint or retry!</span>
              </div>
            )}
          </div>

          {/* Hint Disclosure Box */}
          {hintIndex > 0 && (
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
              {activeExercise.hints.slice(0, hintIndex).map((h, i) => (
                <p key={i} className="text-xs text-amber-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Hint {i + 1}:</strong> {h}</span>
                </p>
              ))}
            </div>
          )}

          {/* Solution Disclosure Box */}
          {showSolution && (
            <div className="mt-4 p-4 bg-neutral-50 rounded-xl border border-neutral-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-700">Official Solution:</span>
              </div>
              <pre className="bg-[#171717] text-[#FF7A00] p-3 rounded-lg text-xs font-mono overflow-x-auto">
                <code>{activeExercise.solutionCode}</code>
              </pre>
              <p className="text-xs text-neutral-600 mt-2">
                <strong>Explanation:</strong> {activeExercise.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
