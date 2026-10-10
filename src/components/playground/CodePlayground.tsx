import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Terminal, 
  Sun, 
  Moon, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sparkles,
  ExternalLink,
  Code,
  FileCode,
  Layers,
  Trash2
} from 'lucide-react';
import { triggerConfetti } from '../../db/storage';

export interface PlaygroundCode {
  html: string;
  css: string;
  javascript: string;
}

interface CodePlaygroundProps {
  initialCode?: PlaygroundCode;
  onCodeChange?: (code: PlaygroundCode) => void;
  title?: string;
}

interface ConsoleEntry {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: string;
}

const TEMPLATES: { name: string; description: string; code: PlaygroundCode }[] = [
  {
    name: 'Interactive Counter Button',
    description: 'Clean HTML, CSS styled button with JS click counter logic',
    code: {
      html: `<div class="card">
  <h2>Interactive Counter</h2>
  <p>Click the button below to increment count.</p>
  <div class="counter-display" id="count-value">0</div>
  <div class="btn-group">
    <button id="dec-btn" class="btn btn-secondary">-</button>
    <button id="inc-btn" class="btn btn-primary">+</button>
    <button id="reset-btn" class="btn btn-outline">Reset</button>
  </div>
</div>`,
      css: `body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #FFF9F3;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.card {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  border: 1px solid #E5E5E5;
  text-align: center;
  width: 320px;
}
h2 {
  color: #171717;
  margin-top: 0;
}
p {
  color: #64748b;
  font-size: 0.9rem;
}
.counter-display {
  font-size: 3.5rem;
  font-weight: 800;
  color: #FF7A00;
  margin: 20px 0;
  font-family: monospace;
}
.btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.btn {
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}
.btn:hover {
  transform: translateY(-2px);
}
.btn-primary {
  background: #FF7A00;
  color: white;
}
.btn-secondary {
  background: #171717;
  color: white;
}
.btn-outline {
  background: #f1f5f9;
  color: #475569;
}`,
      javascript: `let count = 0;
const display = document.getElementById('count-value');
const incBtn = document.getElementById('inc-btn');
const decBtn = document.getElementById('dec-btn');
const resetBtn = document.getElementById('reset-btn');

incBtn.addEventListener('click', () => {
  count++;
  updateDisplay();
  console.log("Count increased to:", count);
});

decBtn.addEventListener('click', () => {
  count--;
  updateDisplay();
  console.log("Count decreased to:", count);
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateDisplay();
  console.log("Counter reset to 0");
});

function updateDisplay() {
  display.innerText = count;
  display.style.transform = "scale(1.2)";
  setTimeout(() => {
    display.style.transform = "scale(1)";
  }, 150);
}

console.log("Interactive Counter initialized successfully!");`,
    }
  },
  {
    name: 'Modern Gradient Card',
    description: 'Polished modern UI component with hover effects',
    code: {
      html: `<div class="card">
  <div class="badge">Trending Course</div>
  <h3>Full-Stack Mastery</h3>
  <p>Learn end-to-end web engineering with HTML5, CSS Grid, React, and MySQL databases.</p>
  <div class="metrics">
    <span>★ 4.9 (1.2k reviews)</span>
    <span>• 12 Lessons</span>
  </div>
  <button class="enroll-btn">Enroll Now &rarr;</button>
</div>`,
      css: `body {
  font-family: system-ui, sans-serif;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.card {
  background: #ffffff;
  padding: 28px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  max-width: 320px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px -5px rgba(255, 122, 0, 0.15);
  border-color: #fed7aa;
}
.badge {
  display: inline-block;
  background: #fff7ed;
  color: #ea580c;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid #ffedd5;
}
h3 {
  margin: 14px 0 8px;
  color: #0f172a;
}
p {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
}
.metrics {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 16px 0;
}
.enroll-btn {
  width: 100%;
  background: #FF7A00;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.enroll-btn:hover {
  background: #e66e00;
}`,
      javascript: `document.querySelector('.enroll-btn').addEventListener('click', () => {
  console.log("Enrollment button triggered!");
  alert("Ready to start learning!");
});`,
    }
  },
  {
    name: 'Canvas Bouncing Physics Ball',
    description: 'HTML5 2D Canvas animation running in real time',
    code: {
      html: `<div class="canvas-container">
  <h3>Interactive HTML5 Canvas</h3>
  <canvas id="simCanvas" width="360" height="260"></canvas>
  <p>Click inside the canvas to spawn velocity bursts!</p>
</div>`,
      css: `body {
  font-family: sans-serif;
  background: #171717;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.canvas-container {
  text-align: center;
}
canvas {
  background: #0f172a;
  border-radius: 12px;
  border: 2px solid #FF7A00;
  box-shadow: 0 0 20px rgba(255,122,0,0.3);
  cursor: crosshair;
}
h3 { margin-bottom: 12px; }
p { font-size: 0.85rem; color: #94a3b8; }`,
      javascript: `const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

let x = 180;
let y = 50;
let vx = 4;
let vy = 2;
const radius = 16;
const gravity = 0.25;
const bounce = -0.8;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  vy += gravity;
  x += vx;
  y += vy;

  // Floor bounce
  if (y + radius > canvas.height) {
    y = canvas.height - radius;
    vy *= bounce;
  }
  // Wall bounce
  if (x + radius > canvas.width || x - radius < 0) {
    vx = -vx;
  }

  // Draw ball
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#FF7A00';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  requestAnimationFrame(animate);
}

canvas.addEventListener('click', () => {
  vy = -9;
  vx = (Math.random() - 0.5) * 8;
  console.log("Canvas pulse injected! New vy:", vy);
});

animate();
console.log("Physics loop started on 2D canvas.");`,
    }
  }
];

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  onCodeChange,
  title = 'Interactive Code Playground',
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript' | 'console'>('html');
  const [code, setCode] = useState<PlaygroundCode>(
    initialCode || TEMPLATES[0].code
  );
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const [srcDoc, setSrcDoc] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update when initialCode changes externally (e.g. from lesson try-it)
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const compileAndRun = () => {
    setConsoleLogs([]);

    // Custom console script interceptor for sandboxed preview
    const consoleInterceptor = `
      <script>
        (function() {
          function sendLog(type, args) {
            try {
              var msg = Array.from(args).map(function(arg) {
                if (typeof arg === 'object') {
                  try { return JSON.stringify(arg); } catch(e) { return String(arg); }
                }
                return String(arg);
              }).join(' ');
              window.parent.postMessage({ type: 'CONSOLE_LOG', level: type, message: msg }, '*');
            } catch(e) {}
          }
          var _log = console.log;
          var _error = console.error;
          var _warn = console.warn;
          var _info = console.info;
          console.log = function() { sendLog('log', arguments); _log.apply(console, arguments); };
          console.error = function() { sendLog('error', arguments); _error.apply(console, arguments); };
          console.warn = function() { sendLog('warn', arguments); _warn.apply(console, arguments); };
          console.info = function() { sendLog('info', arguments); _info.apply(console, arguments); };

          window.onerror = function(msg, url, line) {
            sendLog('error', ['Uncaught Error on line ' + line + ': ' + msg]);
            return false;
          };
        })();
      <\/script>
    `;

    const fullDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${code.css}
          </style>
          ${consoleInterceptor}
        </head>
        <body>
          ${code.html}
          <script>
            try {
              ${code.javascript}
            } catch(err) {
              console.error(err.message);
            }
          <\/script>
        </body>
      </html>
    `;

    setSrcDoc(fullDocument);
  };

  // Compile initially on mount or template change
  useEffect(() => {
    compileAndRun();
  }, [code.html, code.css, code.javascript]);

  // Handle postMessage logs from iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'CONSOLE_LOG') {
        const time = new Date().toLocaleTimeString();
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: e.data.level || 'log',
            message: e.data.message || '',
            timestamp: time,
          },
        ]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleCodeEdit = (tab: 'html' | 'css' | 'javascript', val: string) => {
    const updated = { ...code, [tab]: val };
    setCode(updated);
    if (onCodeChange) onCodeChange(updated);
  };

  const handleCopyCode = () => {
    const activeText = activeTab === 'console' ? '' : code[activeTab];
    navigator.clipboard.writeText(activeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (initialCode) {
      setCode(initialCode);
    } else {
      setCode(TEMPLATES[0].code);
    }
  };

  const handleSelectTemplate = (templateName: string) => {
    const t = TEMPLATES.find((tpl) => tpl.name === templateName);
    if (t) {
      setCode(t.code);
    }
  };

  const getViewportWidth = () => {
    if (viewportMode === 'mobile') return 'max-w-[375px]';
    if (viewportMode === 'tablet') return 'max-w-[768px]';
    return 'w-full';
  };

  return (
    <div className={`flex flex-col bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[640px]'
    }`}>
      
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-white gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-bold text-sm text-neutral-200 flex items-center gap-2">
            <Code className="w-4 h-4 text-[#FF7A00]" />
            {title}
          </span>

          {/* Starter Template Selector */}
          <select
            onChange={(e) => handleSelectTemplate(e.target.value)}
            className="text-xs bg-neutral-800 border border-neutral-700 rounded-md px-2.5 py-1 text-neutral-300 hover:text-white focus:outline-none focus:border-[#FF7A00]"
          >
          
            {TEMPLATES.map((tpl) => (
              <option key={tpl.name} value={tpl.name}>{tpl.name}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Run Code Button */}
          <button
            onClick={() => {
              compileAndRun();
              triggerConfetti();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold transition-transform active:scale-95 shadow-sm shadow-[#FF7A00]/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Reset to default code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopyCode}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Copy current tab code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Editor Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Toggle editor theme (Light / Dark)"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Viewport size switcher */}
          <div className="hidden sm:flex items-center bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`p-1 rounded ${viewportMode === 'desktop' ? 'bg-[#FF7A00] text-white' : 'text-neutral-400 hover:text-white'}`}
              title="Desktop preview"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`p-1 rounded ${viewportMode === 'tablet' ? 'bg-[#FF7A00] text-white' : 'text-neutral-400 hover:text-white'}`}
              title="Tablet preview (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`p-1 rounded ${viewportMode === 'mobile' ? 'bg-[#FF7A00] text-white' : 'text-neutral-400 hover:text-white'}`}
              title="Mobile preview (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Editor on left, Preview on right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E5E5] overflow-hidden">
        
        {/* Left Side: Code Editor with Tabs */}
        <div className={`flex flex-col h-full ${theme === 'dark' ? 'bg-[#1E1E1E] text-neutral-200' : 'bg-[#FAFAFA] text-[#171717]'}`}>
          
          {/* Tab Navigation */}
          <div className={`flex items-center justify-between border-b px-2 py-1 ${theme === 'dark' ? 'bg-[#181818] border-neutral-800' : 'bg-[#F0F0F0] border-neutral-300'}`}>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-md flex items-center gap-1.5 transition-colors ${
                  activeTab === 'html'
                    ? theme === 'dark' ? 'bg-[#1E1E1E] text-[#FF7A00] border-t-2 border-[#FF7A00]' : 'bg-white text-[#FF7A00] border-t-2 border-[#FF7A00]'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                HTML
              </button>
              
              <button
                onClick={() => setActiveTab('css')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-md flex items-center gap-1.5 transition-colors ${
                  activeTab === 'css'
                    ? theme === 'dark' ? 'bg-[#1E1E1E] text-[#2563EB] border-t-2 border-[#2563EB]' : 'bg-white text-[#2563EB] border-t-2 border-[#2563EB]'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                CSS
              </button>

              <button
                onClick={() => setActiveTab('javascript')}
                className={`px-3 py-1.5 text-xs font-bold rounded-t-md flex items-center gap-1.5 transition-colors ${
                  activeTab === 'javascript'
                    ? theme === 'dark' ? 'bg-[#1E1E1E] text-yellow-400 border-t-2 border-yellow-400]' : 'bg-white text-yellow-600 border-t-2 border-yellow-500'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                JavaScript
              </button>
            </div>

            {/* Console Tab Indicator */}
            <button
              onClick={() => setActiveTab('console')}
              className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1.5 ${
                activeTab === 'console'
                  ? 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>Console</span>
              {consoleLogs.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#FF7A00] text-white text-[10px] font-bold flex items-center justify-center">
                  {consoleLogs.length}
                </span>
              )}
            </button>
          </div>

          {/* Active Code Input / Console Area */}
          <div className="flex-1 relative overflow-auto p-2">
            {activeTab !== 'console' ? (
              <textarea
                value={code[activeTab]}
                onChange={(e) => handleCodeEdit(activeTab, e.target.value)}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                className={`w-full h-full resize-none p-3 font-mono text-sm leading-relaxed border-0 focus:outline-none focus:ring-0 ${
                  theme === 'dark' ? 'bg-transparent text-[#E0E0E0] placeholder-neutral-600' : 'bg-transparent text-neutral-800 placeholder-neutral-400'
                }`}
                placeholder={`Write ${activeTab.toUpperCase()} code here...`}
              />
            ) : (
              <div className="h-full font-mono text-xs space-y-1.5 p-2 bg-neutral-950 text-neutral-300 rounded overflow-y-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
                  <span className="text-neutral-400 text-[11px]">Console Log Feed</span>
                  <button 
                    onClick={() => setConsoleLogs([])}
                    className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>

                {consoleLogs.length === 0 ? (
                  <p className="text-neutral-600 italic">No output logs yet. Use console.log(...) in the JavaScript tab to see output here.</p>
                ) : (
                  consoleLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start gap-2 py-1 px-1.5 rounded ${
                        log.type === 'error' 
                          ? 'bg-red-950/40 text-red-300 border-l-2 border-red-500' 
                          : log.type === 'warn'
                          ? 'bg-yellow-950/40 text-yellow-300 border-l-2 border-yellow-500'
                          : 'text-neutral-200'
                      }`}
                    >
                      <span className="text-[10px] text-neutral-600 shrink-0">{log.timestamp}</span>
                      <span className="font-semibold text-neutral-400 shrink-0">[{log.type.toUpperCase()}]</span>
                      <pre className="whitespace-pre-wrap break-all flex-1 m-0">{log.message}</pre>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Editor Footer Status */}
          <div className={`px-4 py-1.5 text-[11px] border-t flex items-center justify-between font-mono ${
            theme === 'dark' ? 'bg-[#181818] border-neutral-800 text-neutral-500' : 'bg-[#F5F5F5] border-neutral-200 text-neutral-500'
          }`}>
            <span>Tab: {activeTab.toUpperCase()}</span>
            <span>Sandboxed IFrame Execution</span>
          </div>
        </div>

        {/* Right Side: Live Browser Preview */}
        <div className="flex flex-col h-full bg-[#F5F5F5]">
          <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-200 border-b border-neutral-300 text-xs text-neutral-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="font-semibold">Live Sandbox Output</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              Viewport: {viewportMode}
            </span>
          </div>

          <div className="flex-1 flex justify-center items-center p-3 bg-neutral-100 overflow-auto">
            <div className={`h-full w-full bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-300 transition-all ${getViewportWidth()}`}>
              <iframe
                ref={iframeRef}
                title="CodeNexus Playground Sandbox"
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-modals"
                className="w-full h-full border-0 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
