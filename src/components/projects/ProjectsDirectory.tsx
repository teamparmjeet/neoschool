import React, { useState } from 'react';
import { Project, Difficulty } from '../../types';
import { INITIAL_PROJECTS } from '../../db/initialData';
import { 
  FolderGit2, 
  Clock, 
  Layers, 
  CheckSquare, 
  ExternalLink, 
  Terminal, 
  AlertTriangle, 
  Rocket, 
  Sparkles, 
  ChevronRight, 
  Play, 
  Code2 
} from 'lucide-react';

interface ProjectsDirectoryProps {
  onOpenPlayground: (code?: any) => void;
}

export const ProjectsDirectory: React.FC<ProjectsDirectoryProps> = ({ onOpenPlayground }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project>(INITIAL_PROJECTS[0]);

  const filteredProjects = INITIAL_PROJECTS.filter((p) => {
    return selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] bg-orange-100/60 px-3 py-1 rounded-full">
          Portfolio Builders
        </span>
        <h1 className="text-3xl font-extrabold text-[#171717] mt-3">
          Practical Real-World Projects
        </h1>
        <p className="text-sm text-neutral-600 mt-2">
          Apply what you have learned by building complete applications from scratch with step-by-step guides, architecture trees, testing checklists, and deployment instructions.
        </p>

        {/* Difficulty switcher */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-[#FF7A00] text-white'
                  : 'bg-white border border-[#E5E5E5] text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Project Cards List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Projects Catalog ({filteredProjects.length})
          </div>

          {filteredProjects.map((proj) => {
            const isSelected = activeProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#FF7A00] shadow-md ring-1 ring-[#FF7A00]'
                    : 'bg-white border-[#E5E5E5] hover:border-neutral-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 text-[#FF7A00] border border-orange-200">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {proj.estimatedHours}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#171717]">{proj.title}</h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{proj.overview}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Project Blueprint */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* Project Title & Overview Banner */}
          <div className="border-b border-[#E5E5E5] pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
                {activeProject.category} • {activeProject.difficulty}
              </span>

              {activeProject.starterTemplate && (
                <button
                  onClick={() => onOpenPlayground(activeProject.starterTemplate)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-xl cursor-pointer transition-transform active:scale-95 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open Starter in Playground</span>
                </button>
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-[#171717]">{activeProject.title}</h2>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{activeProject.overview}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500">Tech Stack:</span>
              {activeProject.technologies.map((tech, i) => (
                <span key={i} className="text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div>
            <h3 className="text-sm font-bold text-[#171717] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF7A00]" /> Project Learning Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeProject.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                  <CheckSquare className="w-3.5 h-3.5 text-[#FF7A00] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Folder Structure */}
          <div>
            <h3 className="text-sm font-bold text-[#171717] mb-2 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#FF7A00]" /> Recommended Folder Structure
            </h3>
            <pre className="bg-[#171717] text-neutral-200 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-neutral-800">
              <code>{activeProject.folderStructure}</code>
            </pre>
          </div>

          {/* Step-by-Step Walkthrough */}
          <div>
            <h3 className="text-sm font-bold text-[#171717] mb-4">Step-by-Step Implementation Guide</h3>
            <div className="space-y-4">
              {activeProject.steps.map((step) => (
                <div key={step.stepNumber} className="border border-[#E5E5E5] rounded-xl p-4 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#FF7A00] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-xs font-bold text-[#171717]">{step.title}</h4>
                    {step.fileLocation && (
                      <span className="text-[10px] text-neutral-400 font-mono ml-auto">
                        {step.fileLocation}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 mb-3">{step.description}</p>

                  {step.codeSnippet && (
                    <pre className="bg-[#171717] text-neutral-200 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Testing Checklist */}
          <div>
            <h3 className="text-sm font-bold text-[#171717] mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-green-600" /> Quality & Testing Checklist
            </h3>
            <div className="space-y-2">
              {activeProject.testingChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 bg-green-50/50 p-2.5 rounded-lg border border-green-200">
                  <span className="text-green-600 font-bold">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Errors & Solutions */}
          {activeProject.commonErrors?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#171717] mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Common Pitfalls to Avoid
              </h3>
              <div className="space-y-2">
                {activeProject.commonErrors.map((err, i) => (
                  <div key={i} className="bg-red-50/50 p-3 rounded-lg border border-red-200 text-xs">
                    <span className="font-bold text-red-700 block mb-0.5">⚠️ {err.error}</span>
                    <span className="text-neutral-600">{err.solution}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployment Guide */}
          <div className="bg-[#FFF9F3] border border-orange-200 rounded-xl p-4">
            <h3 className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider mb-1 flex items-center gap-2">
              <Rocket className="w-4 h-4" /> Production Deployment Guide
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed">
              {activeProject.deploymentGuide}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
