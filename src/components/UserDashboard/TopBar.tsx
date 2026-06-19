import { Search, MessageSquare, Bell, Plus, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-16 bg-black/95 border-b border-white/10 flex items-center px-6 gap-4 sticky top-0 z-10 shrink-0 backdrop-blur-xl">
      {/* Left: Page title + breadcrumb */}
      <div className="flex items-center">
        <span className="text-white/40 text-[13px] uppercase tracking-[0.24em]">Overview</span>
        <span className="text-white/15 text-[14px] mx-3">/</span>
        <span className="text-white font-semibold text-[14px] tracking-[-0.02em]">Dashboard</span>
      </div>

      {/* Center: Search bar */}
      <div className="ml-auto mr-auto w-85 h-10 rounded-2xl bg-white/3 border border-white/10 flex items-center px-4 gap-2.5 focus-within:ring-1 focus-within:ring-white/20 focus-within:border-white/20 transition-all duration-200">
        <Search size={15} className="text-white/45 shrink-0" />
        <input
          type="text"
          placeholder="Search projects, outputs, automations..."
          className="flex-1 bg-transparent text-[13px] text-white/85 placeholder:text-white/35 outline-none w-full"
        />
        <div className="text-[10px] font-medium text-white/55 bg-white/5 border border-white/10 rounded px-2 py-0.5 shrink-0">
          ⌘K
        </div>
      </div>

      {/* Right: Action icons + theme toggle + button */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="w-9 h-9 rounded-xl hover:bg-white/6 flex items-center justify-center transition-colors duration-150 active:scale-[0.98]">
          <MessageSquare size={18} className="text-white/60" />
        </button>
        <button className="w-9 h-9 rounded-xl hover:bg-white/6 flex items-center justify-center relative transition-colors duration-150 active:scale-[0.98]">
          <Bell size={18} className="text-white/60" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white ring-2 ring-black" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-9 h-9 rounded-xl hover:bg-white/6 flex items-center justify-center transition-all duration-150 active:scale-[0.98]"
        >
          {theme === 'dark'
            ? <Sun size={17} className="text-white/60" />
            : <Moon size={17} className="text-white/60" />
          }
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />
        <button className="group h-9 px-4 rounded-xl border border-white/10 bg-white/6 hover:bg-white/12 transition-all duration-200 active:scale-[0.98] flex items-center gap-2">
          <Plus size={14} className="text-white/85" />
          <span className="text-white font-semibold text-[13px] whitespace-nowrap">New Project</span>
        </button>
      </div>
    </div>
  );
}
