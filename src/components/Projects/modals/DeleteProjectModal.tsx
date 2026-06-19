import { Trash2, X, AlertTriangle } from 'lucide-react';
import { type ProjectCard as ProjectCardData } from '../types';

interface DeleteProjectModalProps {
  project: ProjectCardData | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteProjectModal({ project, onClose, onConfirm }: DeleteProjectModalProps) {
  if (!project) return null;

  const handleConfirm = () => {
    onConfirm(project.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[400px] rounded-3xl border border-white/8 bg-[#0c0c0c] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">

        <div className="flex items-center justify-end px-5 pt-5">
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-white/8 bg-white/3 hover:bg-white/8 flex items-center justify-center transition-colors">
            <X size={14} className="text-white/50" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-2 text-center">

          <div className="w-14 h-14 rounded-2xl border border-red-500/15 bg-red-500/8 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={22} className="text-red-400/80" />
          </div>

          <h2 className="text-[16px] font-semibold text-white/90 tracking-[-0.025em] mb-2">
            Delete Project
          </h2>
          <p className="text-[13px] text-white/40 leading-relaxed mb-1">
            Are you sure you want to delete
          </p>
          <p className="text-[13px] font-medium text-white/70 line-clamp-2 mb-5 px-4">
            "{project.title}"
          </p>

          <div className="rounded-2xl border border-red-500/10 bg-red-500/5 px-4 py-3 mb-6 text-left">
            <ul className="space-y-1.5">
              {[
                'All generated outputs will be permanently removed',
                'Scheduled posts will be cancelled',
                'Analytics data will be lost',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[11px] text-red-400/65">
                  <span className="mt-0.5 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 text-[13px] font-medium py-2.5 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/18 hover:border-red-500/30 text-red-400 text-[13px] font-medium py-2.5 transition-all duration-200"
            >
              <Trash2 size={13} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
