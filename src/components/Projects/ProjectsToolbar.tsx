import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import type { FilterTab } from './types';
import { projects } from './mockData';

interface ProjectsToolbarProps {
  activeFilter: FilterTab;
  onFilterChange: (f: FilterTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const filters: FilterTab[] = ['All', 'Active', 'Draft', 'Archived'];

export function ProjectsToolbar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: ProjectsToolbarProps) {
  return (
    <div className="flex items-center gap-4 mb-6 flex-wrap">

      <div className="flex items-center bg-white/[0.03] border border-white/8 rounded-2xl p-1 gap-0.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200 ${
              activeFilter === f
                ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {f}
            {f === 'All' && (
              <span className="ml-2 text-[10px] text-white/25">{projects.length}</span>
            )}
            {f === 'Active' && (
              <span className="ml-2 text-[10px] text-emerald-400/60">
                {projects.filter((p) => p.status === 'Active').length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 min-w-[200px] max-w-sm h-10 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center px-4 gap-2.5 focus-within:border-white/18 focus-within:bg-white/5 transition-all duration-200">
        <Search size={14} className="text-white/35 shrink-0" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent text-[13px] text-white/80 placeholder:text-white/28 outline-none"
        />
      </div>

      <button className="ml-auto flex items-center gap-2 h-10 px-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] hover:border-white/14 transition-all duration-200">
        <SlidersHorizontal size={13} className="text-white/40" />
        <span className="text-[12px] text-white/45">Sort</span>
      </button>

      <button className="flex items-center gap-1.5 text-[12px] text-white/35 hover:text-white/65 transition-colors duration-200">
        <span>All outputs</span>
        <ArrowUpRight size={12} />
      </button>
    </div>
  );
}
