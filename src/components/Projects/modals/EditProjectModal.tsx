import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { type ProjectCard as ProjectCardData, type ProjectStatus, PLATFORM_META, STATUS_CONFIG } from '../types';

export interface EditProjectFormData {
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  platformKeys: string[];
}

interface EditProjectModalProps {
  project: ProjectCardData | null;
  onClose: () => void;
  onSubmit: (id: string, data: EditProjectFormData) => void;
}

const STATUS_OPTIONS: ProjectStatus[] = ['Active', 'Draft', 'Archived', 'Scheduled'];
const PLATFORM_KEYS = Object.keys(PLATFORM_META) as (keyof typeof PLATFORM_META)[];

export function EditProjectModal({ project, onClose, onSubmit }: EditProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('Active');
  const [platformKeys, setPlatformKeys] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (!project) return;
    setTitle(project.title);
    setDescription(project.description);
    setStatus(project.status);
    setTags([...project.tags]);
    const keys = project.platforms
      .map((p) => Object.entries(PLATFORM_META).find(([, v]) => v.label === p.label || v.color === p.color)?.[0])
      .filter((k): k is string => k !== undefined);
    setPlatformKeys(keys);
  }, [project]);

  if (!project) return null;

  const addTag = (raw: string) => {
    const value = raw.trim().replace(/,+$/, '');
    if (value && !tags.includes(value)) setTags((t) => [...t, value]);
    setTagInput('');
  };

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); }
    if (e.key === 'Backspace' && tagInput === '') setTags((t) => t.slice(0, -1));
  };

  const togglePlatform = (key: string) => {
    setPlatformKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project.id, { title, description, status, tags, platformKeys });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[500px] rounded-3xl border border-white/8 bg-[#0c0c0c] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">

        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/5">
          <div>
            <h2 className="text-[16px] font-semibold text-white/90 tracking-[-0.025em]">Edit Project</h2>
            <p className="text-[12px] text-white/35 mt-0.5 line-clamp-1 max-w-[320px]">{project.title}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-white/8 bg-white/3 hover:bg-white/8 flex items-center justify-center transition-colors">
            <X size={14} className="text-white/50" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Title */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-white/8 bg-white/[0.04] text-white/80 text-[13px] px-3.5 py-2.5 placeholder:text-white/20 focus:outline-none focus:border-white/18 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/8 bg-white/[0.04] text-white/80 text-[13px] px-3.5 py-2.5 placeholder:text-white/20 focus:outline-none focus:border-white/18 focus:bg-white/[0.06] transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2.5 block">Status</label>
            <div className="flex items-center flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => {
                const cfg = STATUS_CONFIG[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-150 ${
                      active ? cfg.cls : 'bg-white/3 text-white/30 border-white/6 hover:border-white/12 hover:text-white/45'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${active ? cfg.dot : 'bg-white/20'}`} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2.5 block">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_KEYS.map((key) => {
                const p = PLATFORM_META[key];
                const PIcon = p.icon;
                const active = platformKeys.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => togglePlatform(key)}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all duration-150 border"
                    style={active
                      ? { backgroundColor: p.bgColor, color: p.color, borderColor: `${p.color}30` }
                      : { backgroundColor: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.08)' }
                    }
                  >
                    <PIcon size={10} />
                    {p.label.split('/')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-1.5 items-center min-h-[40px] rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2 focus-within:border-white/18 transition-all">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[11px] text-white/55 bg-white/8 border border-white/8 rounded-lg px-2 py-0.5">
                  {tag}
                  <button type="button" onClick={() => setTags((t) => t.filter((x) => x !== tag))} className="text-white/30 hover:text-white/70 ml-0.5">
                    <X size={9} />
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
                onBlur={() => tagInput && addTag(tagInput)}
                placeholder={tags.length === 0 ? 'Add tags (Enter or comma)' : ''}
                className="flex-1 min-w-[120px] bg-transparent text-[12px] text-white/70 placeholder:text-white/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 text-[13px] font-medium py-2.5 transition-all duration-200">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl border border-white/12 bg-white/10 hover:bg-white/15 text-white/90 text-[13px] font-medium py-2.5 transition-all duration-200">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
