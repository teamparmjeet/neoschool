import React from 'react';
import { LearningPath, Course } from '../../types';
import { INITIAL_LEARNING_PATHS } from '../../db/initialData';
import { 
  Compass, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Briefcase 
} from 'lucide-react';

interface LearningPathsViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({ courses, onSelectCourse }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] bg-orange-100/60 px-3 py-1 rounded-full">
          Guided Developer Roadmaps
        </span>
        <h1 className="text-3xl font-extrabold text-[#171717] mt-3">
          Step-by-Step Learning Paths
        </h1>
        <p className="text-sm text-neutral-600 mt-2">
          Structured curricula engineered to take you from your first line of code to job-ready developer proficiency without getting lost in tutorial purgatory.
        </p>
      </div>

      {/* Learning Path Cards */}
      <div className="space-y-12">
        {INITIAL_LEARNING_PATHS.map((path) => (
          <div
            key={path.id}
            className="bg-white rounded-3xl border border-[#E5E5E5] p-6 sm:p-8 shadow-sm"
          >
            {/* Path Top Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF7A00]">
                    {path.badge}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {path.estimatedMonths}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#171717]">{path.title}</h2>
                <p className="text-sm text-neutral-600 mt-1 max-w-2xl">{path.description}</p>
              </div>

              {/* Career roles */}
              <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF7A00]" /> Target Careers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {path.careerRoles.map((role, i) => (
                    <span key={i} className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-neutral-800 border border-neutral-200">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Path Roadmap Stages */}
            <div className="mt-8">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
                Curriculum Progression Stages ({path.steps.length} Milestones)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {path.steps.map((step, idx) => {
                  const targetCourse = courses.find((c) => c.id === step.courseId);

                  return (
                    <div
                      key={idx}
                      className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 flex flex-col justify-between hover:border-[#FF7A00] transition-colors group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-6 h-6 rounded-full bg-[#171717] text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-[10px] font-bold text-[#FF7A00] uppercase">
                            {step.roleInPath}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-[#171717] group-hover:text-[#FF7A00] transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">{step.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400">
                          {targetCourse ? `${targetCourse.estimatedDuration}` : 'Included'}
                        </span>

                        {targetCourse && (
                          <button
                            onClick={() => onSelectCourse(targetCourse)}
                            className="text-xs font-bold text-[#FF7A00] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Course</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
