import { Edit3, Eye, Clock, TrendingUp } from 'lucide-react';
import { type ProjectCard as ProjectCardType, STATUS_CONFIG, SOURCE_META } from './types';
import { ProjectCardMenu } from './ProjectCardMenu';

interface ProjectCardProps {
  project: ProjectCardType;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, onEdit, onView, onDelete }: ProjectCardProps) {
  const status = STATUS_CONFIG[project.status];
  const source = SOURCE_META[project.source];
  const SourceIcon = source.icon;
  const outputPct = project.outputs.total > 0 ? Math.round((project.outputs.done / project.outputs.total) * 100) : 0;

  return (
    <div className="group relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.045] hover:border-white/15 hover:shadow-[0_0_60px_rgba(255,255,255,0.06)] hover:-translate-y-0.5">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

      <div className={`relative h-40 bg-gradient-to-br ${project.thumbnailGradient} overflow-hidden`}>

        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.thumbnailAccent}, transparent 65%)` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.04),transparent_55%)]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-black/50 backdrop-blur-sm border border-white/8 px-2.5 py-1.5">
          <SourceIcon size={11} style={{ color: source.color }} />
          <span className="text-[10px] font-medium text-white/70">{project.source}</span>
          <span className="text-[10px] text-white/35">{project.duration}</span>
        </div>

        <div className="absolute top-3 right-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-sm ${status.cls}`}>
            <div className={`w-1 h-1 rounded-full ${status.dot}`} />
            {status.label}
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onEdit?.(project.id)}
            className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-2 transition-all duration-200"
          >
            <Edit3 size={13} className="text-white" />
            <span className="text-[12px] font-medium text-white">Edit</span>
          </button>
          <button
            onClick={() => onView?.(project.id)}
            className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-2 transition-all duration-200"
          >
            <Eye size={13} className="text-white" />
            <span className="text-[12px] font-medium text-white">View</span>
          </button>
          <ProjectCardMenu
            projectId={project.id}
            onEdit={onEdit ?? (() => {})}
            onView={onView ?? (() => {})}
            onDelete={onDelete ?? (() => {})}
            triggerClassName="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200"
          />
        </div>
      </div>

      <div className="p-5">

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-[14px] font-semibold text-white/88 leading-snug tracking-[-0.02em] line-clamp-2 flex-1">
            {project.title}
          </h3>
          <div className="mt-0.5">
            <ProjectCardMenu
              projectId={project.id}
              onEdit={onEdit ?? (() => {})}
              onView={onView ?? (() => {})}
              onDelete={onDelete ?? (() => {})}
            />
          </div>
        </div>

        <p className="text-[12px] text-white/38 leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex items-center flex-wrap gap-1.5 mb-4">
          {project.platforms.slice(0, 4).map((p) => {
            const PIcon = p.icon;
            return (
              <div
                key={p.label}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium"
                style={{ backgroundColor: p.bgColor, color: p.color, border: `1px solid ${p.color}25` }}
              >
                <PIcon size={9} />
                <span className="hidden sm:inline">{p.label.split('/')[0].trim()}</span>
              </div>
            );
          })}
          {project.platforms.length > 4 && (
            <div className="rounded-lg px-2 py-1 text-[10px] text-white/35 bg-white/5 border border-white/8">
              +{project.platforms.length - 4}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-white/30 bg-white/4 border border-white/6 rounded-lg px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.18em]">Outputs</span>
            <span className="text-[11px] font-medium text-white/55">
              {project.outputs.done} / {project.outputs.total}
            </span>
          </div>
          <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${outputPct}%`,
                background: outputPct === 100
                  ? 'linear-gradient(90deg, rgba(52,211,153,0.6), rgba(52,211,153,0.9))'
                  : outputPct > 0
                  ? 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.6))'
                  : 'transparent',
              }}
            />
          </div>
        </div>

        <div className="h-px bg-white/5 mb-4" />
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <div className="text-[11px] font-semibold text-white/75">{project.stats.views}</div>
            <div className="text-[10px] text-white/28 mt-0.5">Views</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white/75">
              {project.stats.engagement !== '—' ? (
                <span className="text-emerald-400">{project.stats.engagement}</span>
              ) : '—'}
            </div>
            <div className="text-[10px] text-white/28 mt-0.5">Engagement</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white/75">{project.stats.posts}</div>
            <div className="text-[10px] text-white/28 mt-0.5">Posts</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock size={10} className="text-white/22" />
          <span className="text-[11px] text-white/28">Updated {project.updatedAt}</span>
          {project.status === 'Active' && (
            <div className="ml-auto flex items-center gap-1">
              <TrendingUp size={10} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400">Live</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
