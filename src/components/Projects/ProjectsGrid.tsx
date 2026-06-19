import { Plus, FileText } from 'lucide-react';
import { type ProjectCard as ProjectCardType } from './types';
import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  projects: ProjectCardType[];
  searchQuery: string;
  onNewProject: () => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProjectsGrid({ projects, searchQuery, onNewProject, onEdit, onView, onDelete }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-3xl border border-white/8 bg-white/3 flex items-center justify-center mb-5">
          <FileText size={24} className="text-white/20" />
        </div>
        <p className="text-[15px] font-medium text-white/40 mb-2">No projects found</p>
        <p className="text-[13px] text-white/22">
          {searchQuery ? `No results for "${searchQuery}"` : 'Create your first project to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
        />
      ))}

      <button
        onClick={onNewProject}
        className="group relative rounded-3xl border border-dashed border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-300 min-h-[420px] flex flex-col items-center justify-center gap-3"
      >
        <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/4 group-hover:bg-white/8 group-hover:border-white/18 flex items-center justify-center transition-all duration-300">
          <Plus size={20} className="text-white/35 group-hover:text-white/65 transition-colors" />
        </div>
        <div className="text-center">
          <p className="text-[13px] font-medium text-white/35 group-hover:text-white/60 transition-colors">
            New Project
          </p>
          <p className="text-[11px] text-white/20 mt-1">
            Upload or paste a URL
          </p>
        </div>
      </button>
    </div>
  );
}
