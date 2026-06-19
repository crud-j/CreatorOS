import { Plus } from 'lucide-react';

interface ProjectsHeaderProps {
  totalCount: number;
  activeCount: number;
  onNewProject: () => void;
}

export function ProjectsHeader({ totalCount, activeCount, onNewProject }: ProjectsHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/8 mb-6"
      style={{ background: 'linear-gradient(160deg, #0d0d0d 0%, #080808 100%)' }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      <div className="relative z-10 px-8 py-7 flex items-center gap-6">
        <div className="flex-1">
          <p className="text-[9px] uppercase tracking-[0.32em] text-white/28 mb-2">
            Workspace · Projects
          </p>
          <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-white leading-tight">
            Projects
          </h1>
          <p className="text-[13px] text-white/38 mt-1">
            {totalCount} projects · {activeCount} active
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-8 border-l border-white/6 pl-8">
          {[
            { value: '847',  label: 'Total Outputs', color: 'text-white' },
            { value: '98%',  label: 'Avg Fidelity',  color: 'text-emerald-300' },
            { value: '+24%', label: 'Growth',         color: 'text-emerald-300' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-[22px] font-semibold tracking-[-0.04em] ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-white/28 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onNewProject}
          className="shrink-0 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/6 hover:bg-white/10 hover:border-white/25 px-5 py-3 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.06)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          <Plus size={15} className="text-white" />
          <span className="text-[13px] font-semibold text-white">New Project</span>
        </button>
      </div>
    </div>
  );
}
