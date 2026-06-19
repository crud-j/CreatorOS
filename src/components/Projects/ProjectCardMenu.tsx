import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Edit3, Eye, Trash2 } from 'lucide-react';

interface ProjectCardMenuProps {
  projectId: string;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  triggerClassName?: string;
}

export function ProjectCardMenu({ projectId, onEdit, onView, onDelete, triggerClassName }: ProjectCardMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className={triggerClassName ?? 'w-7 h-7 rounded-lg hover:bg-white/8 flex items-center justify-center transition-colors duration-200'}
      >
        <MoreHorizontal size={14} className="text-white/30 transition-colors group-hover:text-white/55" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[168px] rounded-2xl border border-white/8 bg-[#111111] backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="p-1">
            <MenuItem icon={Edit3} label="Edit Project" onClick={() => { onEdit(projectId); setOpen(false); }} />
            <MenuItem icon={Eye} label="View Details" onClick={() => { onView(projectId); setOpen(false); }} />
          </div>
          <div className="h-px bg-white/5 mx-2" />
          <div className="p-1">
            <MenuItem
              icon={Trash2}
              label="Delete"
              onClick={() => { onDelete(projectId); setOpen(false); }}
              destructive
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  destructive,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium transition-colors duration-150 ${
        destructive
          ? 'text-red-400/80 hover:text-red-400 hover:bg-red-500/8'
          : 'text-white/55 hover:text-white/90 hover:bg-white/5'
      }`}
    >
      <Icon size={12} />
      {label}
    </button>
  );
}
