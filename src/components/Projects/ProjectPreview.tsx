import { X, Edit3, Trash2, Clock, TrendingUp, ExternalLink, Tag } from 'lucide-react';
import { type ProjectCard as ProjectCardType, STATUS_CONFIG, SOURCE_META } from './types';

interface ProjectPreviewProps {
  project: ProjectCardType | null;
  onClose: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectPreview({ project, onClose, onEdit, onDelete }: ProjectPreviewProps) {
  if (!project) return null;

  const status = STATUS_CONFIG[project.status];
  const source = SOURCE_META[project.source];
  const SourceIcon = source.icon;
  const outputPct =
    project.outputs.total > 0
      ? Math.round((project.outputs.done / project.outputs.total) * 100)
      : 0;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-[420px] z-50 flex flex-col bg-[#0c0c0c] border-l border-white/8 shadow-[−32px_0_80px_rgba(0,0,0,0.6)] overflow-hidden animate-in slide-in-from-right duration-300">

        <div
          className={`relative h-52 bg-gradient-to-br ${project.thumbnailGradient} shrink-0 overflow-hidden`}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${project.thumbnailAccent}, transparent 65%)`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.04),transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X size={14} className="text-white/70" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-1.5 rounded-xl bg-black/50 backdrop-blur-sm border border-white/8 px-2.5 py-1.5">
              <SourceIcon size={11} style={{ color: source.color }} />
              <span className="text-[10px] font-medium text-white/70">{project.source}</span>
              <span className="text-[10px] text-white/35">{project.duration}</span>
            </div>
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-sm ${status.cls}`}
            >
              <div className={`w-1 h-1 rounded-full ${status.dot}`} />
              {status.label}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          <div>
            <h2 className="text-[17px] font-semibold text-white/90 leading-snug tracking-[-0.025em] mb-2">
              {project.title}
            </h2>
            <p className="text-[13px] text-white/40 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="h-px bg-white/5" />

          <div>
            <span className="text-[10px] text-white/30 uppercase tracking-[0.18em] mb-3 block">
              Platforms
            </span>
            <div className="flex flex-wrap gap-2">
              {project.platforms.map((p) => {
                const PIcon = p.icon;
                return (
                  <div
                    key={p.label}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium"
                    style={{
                      backgroundColor: p.bgColor,
                      color: p.color,
                      border: `1px solid ${p.color}25`,
                    }}
                  >
                    <PIcon size={10} />
                    {p.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-white/30 uppercase tracking-[0.18em]">
                Output Progress
              </span>
              <span className="text-[11px] font-medium text-white/55">
                {project.outputs.done} / {project.outputs.total}
              </span>
            </div>
            <div className="h-2 bg-white/6 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${outputPct}%`,
                  background:
                    outputPct === 100
                      ? 'linear-gradient(90deg, rgba(52,211,153,0.6), rgba(52,211,153,0.9))'
                      : outputPct > 0
                      ? 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.6))'
                      : 'transparent',
                }}
              />
            </div>
            <p className="text-[10px] text-white/25 mt-1.5">{outputPct}% complete</p>
          </div>

          <div className="h-px bg-white/5" />

          <div>
            <span className="text-[10px] text-white/30 uppercase tracking-[0.18em] mb-3 block">
              Performance
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Views', value: project.stats.views },
                {
                  label: 'Engagement',
                  value: project.stats.engagement,
                  highlight: project.stats.engagement !== '—',
                },
                { label: 'Posts', value: String(project.stats.posts) },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] p-3 text-center"
                >
                  <div
                    className={`text-[14px] font-semibold mb-0.5 ${
                      highlight ? 'text-emerald-400' : 'text-white/75'
                    }`}
                  >
                    {value}
                  </div>
                  <div className="text-[10px] text-white/28">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {project.tags.length > 0 && (
            <div>
              <span className="text-[10px] text-white/30 uppercase tracking-[0.18em] mb-3 flex items-center gap-1.5">
                <Tag size={9} />
                Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-white/35 bg-white/4 border border-white/8 rounded-lg px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-white/25 pt-1">
            <Clock size={10} />
            <span className="text-[11px]">Updated {project.updatedAt}</span>
            {project.status === 'Active' && (
              <div className="ml-auto flex items-center gap-1">
                <TrendingUp size={10} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-400">Live</span>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 p-4 border-t border-white/6 flex items-center gap-2">
          <button
            onClick={() => onEdit(project.id)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/18 px-4 py-2.5 transition-all duration-200"
          >
            <Edit3 size={13} className="text-white/70" />
            <span className="text-[13px] font-medium text-white/80">Edit Project</span>
          </button>
          <button
            onClick={() => {}}
            className="flex items-center justify-center gap-2 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/18 px-3.5 py-2.5 transition-all duration-200"
          >
            <ExternalLink size={13} className="text-white/70" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-500/8 hover:bg-red-500/15 border border-red-500/15 hover:border-red-500/25 px-3.5 py-2.5 transition-all duration-200"
          >
            <Trash2 size={13} className="text-red-400/80" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectPreview;
