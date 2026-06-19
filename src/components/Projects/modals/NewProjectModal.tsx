import { useState, useRef } from 'react';
import { X, Link2, Upload, CloudUpload } from 'lucide-react';
import { type SourceType, PLATFORM_META, SOURCE_META } from '../types';

export interface NewProjectFormData {
  sourceType: SourceType;
  sourceUrl: string;
  title: string;
  tags: string[];
  platformKeys: string[];
}

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewProjectFormData) => void;
}

const SOURCE_TABS: { type: SourceType; label: string }[] = [
  { type: 'YouTube', label: 'YouTube URL' },
  { type: 'Loom',    label: 'Loom URL' },
  { type: 'Upload',  label: 'File Upload' },
  { type: 'Podcast', label: 'Podcast' },
];

const URL_SOURCES: SourceType[] = ['YouTube', 'Loom'];

const PLATFORM_KEYS = Object.keys(PLATFORM_META) as (keyof typeof PLATFORM_META)[];

export function NewProjectModal({ open, onClose, onSubmit }: NewProjectModalProps) {
  const [sourceType, setSourceType] = useState<SourceType>('YouTube');
  const [sourceUrl, setSourceUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [platformKeys, setPlatformKeys] = useState<string[]>(['instagram', 'linkedin', 'twitter']);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const isUrlSource = URL_SOURCES.includes(sourceType);
  const sourceMeta = SOURCE_META[sourceType];
  const SourceIcon = sourceMeta.icon;

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
    if (!sourceUrl && isUrlSource) return;
    onSubmit({ sourceType, sourceUrl, title, tags, platformKeys });
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setSourceType('YouTube');
    setSourceUrl('');
    setTitle('');
    setTags([]);
    setTagInput('');
    setPlatformKeys(['instagram', 'linkedin', 'twitter']);
  };

  const handleClose = () => { handleReset(); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-[500px] rounded-3xl border border-white/8 bg-[#0c0c0c] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">

        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/5">
          <div>
            <h2 className="text-[16px] font-semibold text-white/90 tracking-[-0.025em]">New Project</h2>
            <p className="text-[12px] text-white/35 mt-0.5">Upload or paste a link to get started</p>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-xl border border-white/8 bg-white/3 hover:bg-white/8 flex items-center justify-center transition-colors">
            <X size={14} className="text-white/50" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Source type tabs */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2.5 block">Source</label>
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/5">
              {SOURCE_TABS.map(({ type, label }) => {
                const meta = SOURCE_META[type];
                const Icon = meta.icon;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setSourceType(type); setSourceUrl(''); }}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-lg text-[10px] font-medium transition-all duration-200 ${
                      sourceType === type
                        ? 'bg-white/8 border border-white/12 text-white/80'
                        : 'text-white/35 hover:text-white/55 hover:bg-white/4'
                    }`}
                  >
                    <Icon size={13} style={{ color: sourceType === type ? meta.color : undefined }} />
                    {label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* URL or file input */}
          {isUrlSource ? (
            <div>
              <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2 block">
                {sourceType} URL
              </label>
              <div className="relative">
                <Link2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder={sourceType === 'YouTube' ? 'https://youtube.com/watch?v=...' : 'https://loom.com/share/...'}
                  required
                  className="w-full rounded-xl border border-white/8 bg-white/[0.04] text-white/80 text-[13px] pl-9 pr-4 py-2.5 placeholder:text-white/20 focus:outline-none focus:border-white/18 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2 block">File</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); setSourceUrl(e.dataTransfer.files[0]?.name ?? ''); }}
                onClick={() => fileRef.current?.click()}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed py-8 cursor-pointer transition-all duration-200 ${
                  dragging
                    ? 'border-white/25 bg-white/5'
                    : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.035]'
                }`}
              >
                <CloudUpload size={22} className="text-white/25" />
                <div className="text-center">
                  {sourceUrl
                    ? <p className="text-[12px] text-white/60 font-medium">{sourceUrl}</p>
                    : <>
                        <p className="text-[12px] text-white/40 font-medium">Drop file here or click to browse</p>
                        <p className="text-[11px] text-white/22 mt-0.5">{sourceType === 'Upload' ? 'MP4, MOV, MKV up to 2GB' : 'MP3, WAV, M4A up to 500MB'}</p>
                      </>
                  }
                </div>
              </div>
              <input ref={fileRef} type="file" className="hidden"
                accept={sourceType === 'Upload' ? 'video/*' : 'audio/*'}
                onChange={(e) => setSourceUrl(e.target.files?.[0]?.name ?? '')}
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2 block">
              Title <span className="text-white/18 normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Leave blank to auto-generate from content"
              className="w-full rounded-xl border border-white/8 bg-white/[0.04] text-white/80 text-[13px] px-3.5 py-2.5 placeholder:text-white/20 focus:outline-none focus:border-white/18 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Platform selection */}
          <div>
            <label className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2.5 block">Publish to</label>
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
            <div className="flex flex-wrap gap-1.5 items-center min-h-[40px] rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2 focus-within:border-white/18 focus-within:bg-white/[0.06] transition-all">
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
                placeholder={tags.length === 0 ? 'Add tags (Enter or comma to add)' : ''}
                className="flex-1 min-w-[120px] bg-transparent text-[12px] text-white/70 placeholder:text-white/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 pt-1">
            <button type="button" onClick={handleClose} className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 text-[13px] font-medium py-2.5 transition-all duration-200">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl border border-white/12 bg-white/10 hover:bg-white/15 text-white/90 text-[13px] font-medium py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <SourceIcon size={13} style={{ color: sourceMeta.color }} />
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
