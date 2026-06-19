import { useState } from 'react';
import {
  Cpu,
  Zap,
  Clock,
  Activity,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Loader2,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Edit3,
  Shield,
  Layers,
  BarChart2,
  FileText,
  MessageSquare,
} from 'lucide-react';
import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';
import {
  YouTubeIcon,
  TwitterXIcon,
  LinkedInIcon,
  FacebookIcon,
  PinterestIcon,
  InstagramIcon,
} from '../assets/SocialLogos';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type PipelineStageStatus = 'complete' | 'active' | 'pending';
type OutputStatus = 'ready' | 'approved' | 'rejected' | 'generating';
type PlatformFilter =
  | 'All'
  | 'YouTube'
  | 'Instagram'
  | 'X'
  | 'LinkedIn'
  | 'Facebook'
  | 'Pinterest';
type StatAccent = 'emerald' | 'purple' | 'blue' | 'amber';

interface PipelineStat {
  // TODO: GET /api/ai-engine/stats
  id: string;
  label: string;
  value: string;
  subtext: string;
  accent: StatAccent;
}

interface PipelineStage {
  // TODO: GET /api/ai-engine/pipeline-stages
  num: number;
  label: string;
  avgTime: string;
  status: PipelineStageStatus;
}

interface LastRunInfo {
  // TODO: GET /api/ai-engine/last-run
  projectTitle: string;
  totalTime: string;
  outputsGenerated: number;
  voiceScoreAvg: number;
  completedAt: string;
}

interface VoiceDimension {
  // TODO: GET /api/ai-engine/voice-profile
  label: string;
  displayValue: string;
  numericValue: number; // 0–1 for bar fill
}

interface VoiceGuardBucket {
  // TODO: GET /api/ai-engine/voice-guard-distribution
  range: string;
  count: number;
  color: string;
}

interface ModelUsageRow {
  // TODO: GET /api/ai-engine/model-usage
  model: string;
  purpose: string;
  callsThisMonth: number;
  avgLatency: string;
  avgTokensPerCall: string;
  estCost: string;
}

interface GenerationFeedItem {
  // TODO: GET /api/ai-engine/recent-generations?platform={platform}
  id: string;
  projectTitle: string;
  thumbnailGradient: string;
  platform: PlatformFilter;
  contentType: string;
  voiceScore: number;
  generationTime: string;
  status: OutputStatus;
  timestamp: string;
}

interface LangfuseTrace {
  // TODO: GET /api/ai-engine/langfuse-traces
  id: string;
  traceId: string;
  model: string;
  durationMs: number;
  maxDurationMs: number;
  status: 'success' | 'error';
}

interface LangfuseMetric {
  label: string;
  value: string;
  sub: string;
  accent: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

// TODO: GET /api/ai-engine/stats
const PIPELINE_STATS: PipelineStat[] = [
  {
    id: 'total-generations',
    label: 'Total Generations',
    value: '3,847',
    subtext: '+142 this week',
    accent: 'emerald',
  },
  {
    id: 'avg-voice-score',
    label: 'Avg Voice Score',
    value: '0.86',
    subtext: 'cosine similarity',
    accent: 'purple',
  },
  {
    id: 'avg-gen-time',
    label: 'Avg Generation Time',
    value: '4.2s',
    subtext: 'per output',
    accent: 'blue',
  },
  {
    id: 'token-usage',
    label: 'Token Usage',
    value: '2.4M',
    subtext: 'of 5M quota used',
    accent: 'amber',
  },
];

// TODO: GET /api/ai-engine/pipeline-stages
const PIPELINE_STAGES: PipelineStage[] = [
  { num: 1,  label: 'Ingest',        avgTime: '0.3s',  status: 'complete' },
  { num: 2,  label: 'Audio Extract', avgTime: '8.1s',  status: 'complete' },
  { num: 3,  label: 'Transcription', avgTime: '18.4s', status: 'complete' },
  { num: 4,  label: 'Segmentation',  avgTime: '2.2s',  status: 'complete' },
  { num: 5,  label: 'Viral Scoring', avgTime: '1.4s',  status: 'active'   },
  { num: 6,  label: 'Voice Load',    avgTime: '0.2s',  status: 'pending'  },
  { num: 7,  label: 'Gen ×6',        avgTime: '22.8s', status: 'pending'  },
  { num: 8,  label: 'Voice Guard',   avgTime: '3.1s',  status: 'pending'  },
  { num: 9,  label: 'RT Delivery',   avgTime: '0.4s',  status: 'pending'  },
  { num: 10, label: 'Publish',       avgTime: '—',     status: 'pending'  },
];

// TODO: GET /api/ai-engine/last-run
const LAST_RUN: LastRunInfo = {
  projectTitle: 'How I batch 30 pieces of content from ONE video using AI',
  totalTime: '4m 12s',
  outputsGenerated: 30,
  voiceScoreAvg: 0.88,
  completedAt: 'Jun 19, 2026 · 2:34 PM',
};

// TODO: GET /api/ai-engine/voice-profile
const VOICE_DIMENSIONS: VoiceDimension[] = [
  { label: 'Formality',       displayValue: '3 / 5',    numericValue: 0.60 },
  { label: 'Humor',           displayValue: 'Dry',      numericValue: 0.45 },
  { label: 'CTA Style',       displayValue: 'Question', numericValue: 0.70 },
  { label: 'Sentence Length', displayValue: 'Medium',   numericValue: 0.55 },
  { label: 'Anecdote Use',    displayValue: 'High',     numericValue: 0.85 },
  { label: 'Vocab Density',   displayValue: '4 / 5',   numericValue: 0.80 },
];

// TODO: GET /api/ai-engine/voice-guard-distribution
const VOICE_GUARD_BUCKETS: VoiceGuardBucket[] = [
  { range: '< 0.60',    count: 12,  color: '#ef4444' },
  { range: '0.60–0.72', count: 38,  color: '#f59e0b' },
  { range: '0.72–0.85', count: 182, color: '#34d399' },
  { range: '> 0.85',    count: 247, color: '#10b981' },
];

// TODO: GET /api/ai-engine/model-usage
const MODEL_USAGE: ModelUsageRow[] = [
  { model: 'gpt-4o',                 purpose: 'Content generation',   callsThisMonth: 3421, avgLatency: '3.8s',  avgTokensPerCall: '680 tokens', estCost: '$47.20' },
  { model: 'gpt-4o',                 purpose: 'Viral scoring',        callsThisMonth: 892,  avgLatency: '1.2s',  avgTokensPerCall: '240 tokens', estCost: '$5.10'  },
  { model: 'gpt-4o',                 purpose: 'Voice guard revision', callsThisMonth: 234,  avgLatency: '2.1s',  avgTokensPerCall: '420 tokens', estCost: '$3.40'  },
  { model: 'text-embedding-3-large', purpose: 'Voice embeddings',     callsThisMonth: 1205, avgLatency: '0.3s',  avgTokensPerCall: '1,536 dims', estCost: '$1.80'  },
  { model: 'whisper-1',              purpose: 'Transcription',        callsThisMonth: 127,  avgLatency: '18.4s', avgTokensPerCall: '—',          estCost: '$12.70' },
];

// TODO: GET /api/ai-engine/recent-generations
const GENERATION_FEED: GenerationFeedItem[] = [
  { id: 'g1', projectTitle: 'How I batch 30 pieces of content from ONE video', thumbnailGradient: 'from-violet-500 to-purple-700', platform: 'YouTube',   contentType: 'youtube_community',     voiceScore: 0.91, generationTime: '3.8s', status: 'approved',   timestamp: '2m ago'   },
  { id: 'g2', projectTitle: 'How I batch 30 pieces of content from ONE video', thumbnailGradient: 'from-pink-500 to-rose-700',    platform: 'Instagram',  contentType: 'reel_script',           voiceScore: 0.87, generationTime: '4.1s', status: 'ready',      timestamp: '2m ago'   },
  { id: 'g3', projectTitle: 'How I batch 30 pieces of content from ONE video', thumbnailGradient: 'from-sky-500 to-blue-700',     platform: 'LinkedIn',   contentType: 'linkedin_essay',        voiceScore: 0.83, generationTime: '4.9s', status: 'ready',      timestamp: '3m ago'   },
  { id: 'g4', projectTitle: 'How I batch 30 pieces of content from ONE video', thumbnailGradient: 'from-slate-500 to-zinc-700',   platform: 'X',          contentType: 'twitter_thread',        voiceScore: 0.79, generationTime: '3.2s', status: 'ready',      timestamp: '3m ago'   },
  { id: 'g5', projectTitle: 'The content calendar system I use',               thumbnailGradient: 'from-amber-500 to-orange-700', platform: 'Instagram',  contentType: 'instagram_caption',     voiceScore: 0.68, generationTime: '3.5s', status: 'rejected',   timestamp: '1h ago'   },
  { id: 'g6', projectTitle: 'The content calendar system I use',               thumbnailGradient: 'from-amber-500 to-orange-700', platform: 'YouTube',    contentType: 'youtube_shorts_script', voiceScore: 0.92, generationTime: '2.9s', status: 'approved',   timestamp: '1h ago'   },
  { id: 'g7', projectTitle: '7 frameworks every creator should know in 2026',  thumbnailGradient: 'from-teal-500 to-cyan-700',    platform: 'LinkedIn',   contentType: 'linkedin_short',        voiceScore: 0.55, generationTime: '4.0s', status: 'generating', timestamp: 'just now' },
  { id: 'g8', projectTitle: '7 frameworks every creator should know in 2026',  thumbnailGradient: 'from-teal-500 to-cyan-700',    platform: 'Pinterest',  contentType: 'pinterest_caption',     voiceScore: 0.88, generationTime: '3.6s', status: 'ready',      timestamp: 'just now' },
];

// TODO: GET /api/ai-engine/langfuse-traces
const LANGFUSE_TRACES: LangfuseTrace[] = [
  { id: 't1', traceId: 'trace_4a8f2b1c9e3d', model: 'gpt-4o',                  durationMs: 3820,  maxDurationMs: 20000, status: 'success' },
  { id: 't2', traceId: 'trace_7c1d5a0b8f2e', model: 'text-embedding-3-large',  durationMs: 290,   maxDurationMs: 20000, status: 'success' },
  { id: 't3', traceId: 'trace_2e9b4f7c0d1a', model: 'gpt-4o',                  durationMs: 4910,  maxDurationMs: 20000, status: 'success' },
  { id: 't4', traceId: 'trace_0d3c8e5a1f9b', model: 'whisper-1',               durationMs: 18400, maxDurationMs: 20000, status: 'success' },
  { id: 't5', traceId: 'trace_6f1a3d0b7e4c', model: 'gpt-4o',                  durationMs: 2100,  maxDurationMs: 20000, status: 'error'   },
];

const LANGFUSE_METRICS: LangfuseMetric[] = [
  { label: 'Total Traces', value: '3,847', sub: 'all time',  accent: 'text-indigo-400'  },
  { label: 'P95 Latency',  value: '6.2s',  sub: 'last 24h', accent: 'text-amber-400'   },
  { label: 'Error Rate',   value: '0.3%',  sub: 'last 24h', accent: 'text-emerald-400' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM META
// ─────────────────────────────────────────────────────────────────────────────

const PLATFORM_ICON_MAP: Record<PlatformFilter, React.ElementType | null> = {
  All:       null,
  YouTube:   YouTubeIcon,
  Instagram: InstagramIcon,
  X:         TwitterXIcon,
  LinkedIn:  LinkedInIcon,
  Facebook:  FacebookIcon,
  Pinterest: PinterestIcon,
};

const PLATFORM_COLOR_MAP: Record<PlatformFilter, string> = {
  All:       'rgba(255,255,255,0.65)',
  YouTube:   '#FF0000',
  Instagram: '#E1306C',
  X:         '#ffffff',
  LinkedIn:  '#0077B5',
  Facebook:  '#1877F2',
  Pinterest: '#E60023',
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getAccentClasses(accent: StatAccent): {
  text: string;
  bg: string;
  border: string;
  bar: string;
} {
  switch (accent) {
    case 'emerald': return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', bar: 'bg-emerald-400' };
    case 'purple':  return { text: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  bar: 'bg-purple-400'  };
    case 'blue':    return { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    bar: 'bg-blue-400'    };
    case 'amber':   return { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   bar: 'bg-amber-400'   };
  }
}

function voiceScoreColors(score: number): { text: string; bg: string; border: string } {
  if (score >= 0.72) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  if (score >= 0.60) return { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   };
  return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
}

function formatContentType(ct: string): string {
  return ct.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// SECTION 2 — Stat card
function StatCard({ stat }: { stat: PipelineStat }) {
  const ac = getAccentClasses(stat.accent);
  const isVoiceScore = stat.id === 'avg-voice-score';
  const isTokens = stat.id === 'token-usage';
  const tokenPct = 48; // 2.4M of 5M = 48%

  return (
    <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl p-5 overflow-hidden transition-all duration-300 hover:bg-white/[0.045] hover:border-white/15 hover:shadow-[0_0_60px_rgba(255,255,255,0.04)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />
      <div className="relative">
        {/* Icon chip */}
        <div className={`inline-flex items-center justify-center h-8 w-8 rounded-xl border mb-4 ${ac.bg} ${ac.border}`}>
          {stat.accent === 'emerald' && <Zap       size={13} className={ac.text} />}
          {stat.accent === 'purple'  && <Activity  size={13} className={ac.text} />}
          {stat.accent === 'blue'    && <Clock     size={13} className={ac.text} />}
          {stat.accent === 'amber'   && <Layers    size={13} className={ac.text} />}
        </div>

        <div className={`text-[22px] font-bold tracking-[-0.03em] mb-1 ${ac.text}`}>
          {stat.value}
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-0.5">
          {stat.label}
        </div>
        <div className="text-[11px] text-white/25">{stat.subtext}</div>

        {/* Voice score bar */}
        {isVoiceScore && (
          <div className="mt-3">
            <div className="h-1 bg-white/6 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-purple-400" style={{ width: '86%' }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-white/20">0.60 threshold</span>
              <span className="text-[9px] text-purple-400/60">86%</span>
            </div>
          </div>
        )}

        {/* Token usage bar */}
        {isTokens && (
          <div className="mt-3">
            <div className="h-1 bg-white/6 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${ac.bar}`} style={{ width: `${tokenPct}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-white/20">of 5M quota</span>
              <span className={`text-[9px] ${ac.text} opacity-60`}>{tokenPct}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SECTION 3 — Pipeline visualizer (hand-rolled SVG)
function PipelineVisualizer() {
  const NODE_R = 22;
  const NODE_SPACING = 120;
  const SVG_H = 130;
  const PAD_X = 40;
  const CENTER_Y = 52;
  const n = PIPELINE_STAGES.length;
  const SVG_W = PAD_X * 2 + (n - 1) * NODE_SPACING;

  function nodeX(i: number): number {
    return PAD_X + i * NODE_SPACING;
  }

  function stageColor(status: PipelineStageStatus): string {
    if (status === 'complete') return '#34d399';
    if (status === 'active')   return '#60a5fa';
    return 'rgba(255,255,255,0.15)';
  }

  function lineColor(fromStatus: PipelineStageStatus, toStatus: PipelineStageStatus): string {
    if (fromStatus === 'complete' && toStatus === 'complete') return '#34d399';
    if (fromStatus === 'complete' && toStatus === 'active')   return '#60a5fa';
    return 'rgba(255,255,255,0.08)';
  }

  return (
    <div className="w-full overflow-x-auto">
      <div style={{ minWidth: `${SVG_W}px` }}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width={SVG_W}
          height={SVG_H}
          aria-label="10-stage AI pipeline"
          style={{ display: 'block', width: '100%' }}
        >
          {/* Connecting lines */}
          {PIPELINE_STAGES.slice(0, -1).map((stage, i) => {
            const x1 = nodeX(i) + NODE_R;
            const x2 = nodeX(i + 1) - NODE_R;
            const color = lineColor(stage.status, PIPELINE_STAGES[i + 1].status);
            const isDashed =
              stage.status === 'active' ||
              PIPELINE_STAGES[i + 1].status === 'active';
            return (
              <line
                key={`line-${i}`}
                x1={x1}
                y1={CENTER_Y}
                x2={x2}
                y2={CENTER_Y}
                stroke={color}
                strokeWidth="2"
                strokeDasharray={isDashed ? '4 4' : undefined}
                strokeOpacity="0.9"
              />
            );
          })}

          {/* Nodes */}
          {PIPELINE_STAGES.map((stage, i) => {
            const cx = nodeX(i);
            const cy = CENTER_Y;
            const color = stageColor(stage.status);
            const isActive = stage.status === 'active';
            const isComplete = stage.status === 'complete';

            return (
              <g key={stage.num}>
                {/* Outer pulse ring for active */}
                {isActive && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={NODE_R + 8}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={NODE_R}
                  fill={
                    isComplete
                      ? 'rgba(52,211,153,0.12)'
                      : isActive
                      ? 'rgba(96,165,250,0.12)'
                      : 'rgba(255,255,255,0.04)'
                  }
                  stroke={color}
                  strokeWidth={isComplete || isActive ? 1.5 : 1}
                />

                {/* Checkmark for complete, number otherwise */}
                {isComplete ? (
                  <text
                    x={cx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="13"
                    fill="#34d399"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                  >
                    ✓
                  </text>
                ) : (
                  <text
                    x={cx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fill={isActive ? '#60a5fa' : 'rgba(255,255,255,0.25)'}
                    fontWeight={isActive ? '700' : '500'}
                    fontFamily="system-ui, sans-serif"
                  >
                    {stage.num}
                  </text>
                )}

                {/* Stage label */}
                <text
                  x={cx}
                  y={cy + NODE_R + 13}
                  textAnchor="middle"
                  fontSize="9"
                  fill={
                    isComplete
                      ? 'rgba(255,255,255,0.55)'
                      : isActive
                      ? 'rgba(96,165,250,0.85)'
                      : 'rgba(255,255,255,0.2)'
                  }
                  fontFamily="system-ui, sans-serif"
                  fontWeight={isActive ? '600' : '400'}
                >
                  {stage.label}
                </text>

                {/* Avg time */}
                <text
                  x={cx}
                  y={cy + NODE_R + 25}
                  textAnchor="middle"
                  fontSize="8"
                  fill={
                    isComplete
                      ? 'rgba(52,211,153,0.6)'
                      : isActive
                      ? 'rgba(96,165,250,0.5)'
                      : 'rgba(255,255,255,0.12)'
                  }
                  fontFamily="system-ui, sans-serif"
                >
                  {stage.avgTime}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// SECTION 4 — Voice dimensions bars
function VoiceDimensionBars() {
  return (
    <div className="space-y-4">
      {VOICE_DIMENSIONS.map((dim) => (
        <div key={dim.label} className="group">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors duration-150">
              {dim.label}
            </span>
            <span className="text-[11px] font-semibold text-purple-400">
              {dim.displayValue}
            </span>
          </div>
          <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-700"
              style={{ width: `${dim.numericValue * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// SECTION 4 — Voice guard distribution (hand-rolled SVG bar chart)
function VoiceGuardChart() {
  const maxCount = Math.max(...VOICE_GUARD_BUCKETS.map((b) => b.count));
  const SVG_W = 340;
  const SVG_H = 110;
  const PAD_TOP = 8;
  const PAD_BOTTOM = 28;
  const CHART_H = SVG_H - PAD_TOP - PAD_BOTTOM;
  const n = VOICE_GUARD_BUCKETS.length;
  const BAR_GAP = 12;
  const BAR_W = Math.floor((SVG_W - BAR_GAP * (n + 1)) / n);

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full h-auto"
      aria-label="Voice score distribution"
    >
      {VOICE_GUARD_BUCKETS.map((bucket, i) => {
        const barH = Math.max(4, (bucket.count / maxCount) * CHART_H);
        const x = BAR_GAP + i * (BAR_W + BAR_GAP);
        const y = PAD_TOP + CHART_H - barH;
        return (
          <g key={bucket.range}>
            <rect x={x} y={y} width={BAR_W} height={barH} rx="4" fill={bucket.color} fillOpacity="0.25" />
            <rect x={x} y={y} width={BAR_W} height={Math.min(4, barH)} rx="4" fill={bucket.color} fillOpacity="0.85" />
            <text x={x + BAR_W / 2} y={SVG_H - 14} textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.35)" fontFamily="system-ui, sans-serif">
              {bucket.range}
            </text>
            <text x={x + BAR_W / 2} y={y - 4} textAnchor="middle" fontSize="9" fill={bucket.color} fontFamily="system-ui, sans-serif" fontWeight="600">
              {bucket.count}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// SECTION 5 — Model usage table row
function ModelRow({ row, isTotal }: { row: ModelUsageRow; isTotal?: boolean }) {
  return (
    <tr className={`border-b border-white/[0.04] transition-colors duration-150 ${isTotal ? '' : 'hover:bg-white/[0.025] group'}`}>
      <td className="py-3 px-5">
        <span className={`text-[12px] font-mono ${isTotal ? 'text-white/90 font-bold' : 'text-white/60 group-hover:text-white/80 transition-colors'}`}>
          {row.model}
        </span>
      </td>
      <td className="py-3 px-5">
        <span className="text-[12px] text-white/40">{row.purpose}</span>
      </td>
      <td className="py-3 px-5 text-right">
        <span className={`text-[12px] font-semibold tabular-nums ${isTotal ? 'text-white/90' : 'text-white/75'}`}>
          {row.callsThisMonth.toLocaleString()}
        </span>
      </td>
      <td className="py-3 px-5 text-right">
        <span className="text-[12px] text-white/45 tabular-nums">{row.avgLatency}</span>
      </td>
      <td className="py-3 px-5 text-right">
        <span className="text-[12px] text-white/40 tabular-nums">{row.avgTokensPerCall}</span>
      </td>
      <td className="py-3 px-5 text-right">
        <span className={`text-[12px] font-semibold tabular-nums ${isTotal ? 'text-emerald-400' : 'text-white/65'}`}>
          {row.estCost}
        </span>
      </td>
    </tr>
  );
}

// SECTION 6 — Output status badge
function OutputStatusBadge({ status }: { status: OutputStatus }) {
  switch (status) {
    case 'approved':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 whitespace-nowrap">
          <CheckCircle2 size={9} />
          Approved
        </span>
      );
    case 'ready':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-400 whitespace-nowrap">
          <Circle size={9} />
          Ready
        </span>
      );
    case 'rejected':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-400 whitespace-nowrap">
          <AlertTriangle size={9} />
          Rejected
        </span>
      );
    case 'generating':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400 whitespace-nowrap">
          <Loader2 size={9} className="animate-spin" />
          Generating
        </span>
      );
  }
}

// SECTION 6 — Generation feed row
function GenerationFeedRow({ item }: { item: GenerationFeedItem }) {
  const PlatformIcon = PLATFORM_ICON_MAP[item.platform];
  const platformColor = PLATFORM_COLOR_MAP[item.platform];
  const vc = voiceScoreColors(item.voiceScore);

  return (
    <tr className="border-b border-white/[0.04] transition-colors duration-150 hover:bg-white/[0.025] group">
      {/* Thumbnail swatch */}
      <td className="py-3 px-5">
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.thumbnailGradient} shrink-0`} />
      </td>

      {/* Project title */}
      <td className="py-3 px-4 max-w-[200px]">
        <p className="text-[12px] text-white/55 line-clamp-1 group-hover:text-white/80 transition-colors duration-150">
          {item.projectTitle}
        </p>
      </td>

      {/* Platform + content type */}
      <td className="py-3 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-lg border shrink-0"
            style={{ color: platformColor, borderColor: `${platformColor}25`, backgroundColor: `${platformColor}10` }}
          >
            {PlatformIcon && <PlatformIcon size={10} />}
          </div>
          <span className="text-[10px] text-white/35 max-w-[120px] truncate">
            {formatContentType(item.contentType)}
          </span>
        </div>
      </td>

      {/* Voice score */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tabular-nums ${vc.text} ${vc.bg} ${vc.border}`}>
          {item.voiceScore.toFixed(2)}
        </span>
      </td>

      {/* Gen time */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="text-[11px] text-white/35 tabular-nums">{item.generationTime}</span>
      </td>

      {/* Status */}
      <td className="py-3 px-4 whitespace-nowrap">
        <OutputStatusBadge status={item.status} />
      </td>

      {/* Timestamp */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="text-[11px] text-white/25">{item.timestamp}</span>
      </td>
    </tr>
  );
}

// SECTION 7 — Langfuse trace row
function LangfuseTraceRow({ trace }: { trace: LangfuseTrace }) {
  const pct = Math.min(100, Math.round((trace.durationMs / trace.maxDurationMs) * 100));
  const barColor =
    trace.status === 'error'
      ? '#ef4444'
      : trace.durationMs > 10000
      ? '#f59e0b'
      : '#34d399';
  const durationLabel =
    trace.durationMs >= 1000
      ? `${(trace.durationMs / 1000).toFixed(1)}s`
      : `${trace.durationMs}ms`;

  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-white/[0.04] last:border-0 group hover:bg-white/[0.02] rounded-xl px-2 transition-colors duration-150 -mx-2">
      {/* Status dot */}
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: trace.status === 'error' ? '#ef4444' : '#34d399' }}
      />

      {/* Trace ID */}
      <span className="text-[11px] font-mono text-white/40 shrink-0 w-36 truncate">
        {trace.traceId}
      </span>

      {/* Model */}
      <span className="text-[11px] text-white/35 shrink-0 w-40 truncate">{trace.model}</span>

      {/* Duration bar */}
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-white/6 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: barColor, opacity: 0.7 }}
          />
        </div>
        <span className="text-[10px] tabular-nums text-white/30 shrink-0 w-12 text-right">
          {durationLabel}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

const GEN_FILTERS: PlatformFilter[] = [
  'All', 'YouTube', 'Instagram', 'X', 'LinkedIn', 'Facebook', 'Pinterest',
];

export default function AIEnginePage() {
  const [genFilter, setGenFilter] = useState<PlatformFilter>('All');

  // TODO: POST /api/ai-engine/diagnostics
  function handleRunDiagnostics(): void {
    console.log('TODO: POST /api/ai-engine/diagnostics');
  }

  // TODO: PATCH /api/voice — open voice profile editor
  function handleEditVoiceProfile(): void {
    console.log('TODO: navigate to /dashboard/voice for PATCH /api/voice');
  }

  const filteredFeed =
    genFilter === 'All'
      ? GENERATION_FEED
      : GENERATION_FEED.filter((item) => item.platform === genFilter);

  const modelTotalCost = MODEL_USAGE.reduce(
    (s, r) => s + parseFloat(r.estCost.replace('$', '')),
    0
  ).toFixed(2);

  const MODEL_TOTAL: ModelUsageRow = {
    model: 'Total',
    purpose: '—',
    callsThisMonth: MODEL_USAGE.reduce((s, r) => s + r.callsThisMonth, 0),
    avgLatency: '—',
    avgTokensPerCall: '—',
    estCost: `$${modelTotalCost}`,
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060606]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-none">

            {/* ──────────────────────────────────────────────────────── */}
            {/* SECTION 1 — PAGE HEADER                                 */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="flex items-start justify-between mb-7 gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Cpu size={18} className="text-white/40" />
                  <h1 className="text-[22px] font-bold tracking-[-0.03em] text-white/90">
                    AI Engine
                  </h1>
                </div>
                <p className="text-[13px] text-white/35 ml-[26px]">
                  Monitor your AI pipeline, voice profile, and model performance
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Pipeline health badge */}
                <div className="inline-flex items-center gap-2.5 rounded-2xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-400 font-semibold">
                    Pipeline Health
                  </span>
                  <span className="text-[12px] font-bold text-emerald-300">Healthy</span>
                </div>

                {/* Run diagnostics */}
                <button
                  onClick={handleRunDiagnostics}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-[12px] font-medium text-white/55 hover:bg-white/[0.07] hover:border-white/18 hover:text-white/80 transition-all duration-200 active:scale-[0.98]"
                >
                  <RefreshCw size={13} />
                  Run Diagnostics
                </button>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* SECTION 2 — PIPELINE OVERVIEW STATS                     */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {PIPELINE_STATS.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* SECTION 3 — 10-STAGE PIPELINE VISUALIZER                */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(96,165,250,0.04),transparent_60%)] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent pointer-events-none" />

              <div className="relative p-5">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <Zap size={13} className="text-blue-400" />
                    </div>
                    <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                      Generation Pipeline
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-white/30">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      Complete
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                      Active
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                      Pending
                    </span>
                  </div>
                </div>

                {/* Pipeline SVG */}
                <PipelineVisualizer />

                {/* Divider */}
                <div className="h-px bg-white/[0.05] my-4" />

                {/* Last run summary */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-wrap">
                  <div className="shrink-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">Last Run</div>
                    <div className="text-[11px] text-white/40">{LAST_RUN.completedAt}</div>
                  </div>

                  <div className="hidden sm:block h-8 w-px bg-white/[0.06]" />

                  <p className="text-[12px] text-white/55 flex-1 min-w-0 line-clamp-1">
                    {LAST_RUN.projectTitle}
                  </p>

                  <div className="flex items-center gap-5 shrink-0 flex-wrap">
                    <div className="text-center">
                      <div className="text-[15px] font-bold tracking-[-0.02em] text-white/80">{LAST_RUN.totalTime}</div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-white/25">Total Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[15px] font-bold tracking-[-0.02em] text-white/80">{LAST_RUN.outputsGenerated}</div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-white/25">Outputs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[15px] font-bold tracking-[-0.02em] text-emerald-400">
                        {LAST_RUN.voiceScoreAvg.toFixed(2)}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-white/25">Avg Voice</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* SECTION 4 — BRAND VOICE PROFILE (2-col)                 */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

              {/* Left — Voice dimensions */}
              <div
                className="relative rounded-3xl border backdrop-blur-xl p-5 overflow-hidden"
                style={{ borderColor: 'rgba(147,51,234,0.22)', backgroundColor: 'rgba(147,51,234,0.03)' }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(147,51,234,0.07),transparent_65%)] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent pointer-events-none" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/12 border border-purple-500/22">
                      <MessageSquare size={13} className="text-purple-400" />
                    </div>
                    <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                      Brand Voice Dimensions
                    </h2>
                  </div>

                  <VoiceDimensionBars />
                </div>
              </div>

              {/* Right — Voice guard stats */}
              <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl p-5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <Shield size={13} className="text-emerald-400" />
                      </div>
                      <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                        Voice Guard
                      </h2>
                    </div>
                    <button
                      onClick={handleEditVoiceProfile}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-[11px] font-medium text-white/45 hover:bg-white/[0.07] hover:border-white/18 hover:text-white/75 transition-all duration-200"
                    >
                      <Edit3 size={11} />
                      Edit Profile
                    </button>
                  </div>

                  {/* Distribution chart */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-2">
                      Score Distribution
                    </div>
                    <VoiceGuardChart />
                  </div>

                  {/* Quick stats */}
                  <div className="h-px bg-white/[0.05] mb-4" />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">Avg Revisions</div>
                      <div className="text-[16px] font-bold tracking-[-0.02em] text-white/80">1.2</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">Auto-Approved</div>
                      <div className="text-[16px] font-bold tracking-[-0.02em] text-emerald-400">78%</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1">Flagged</div>
                      <div className="text-[16px] font-bold tracking-[-0.02em] text-amber-400">22%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* SECTION 5 — MODEL USAGE TABLE                           */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
              <div className="relative">
                {/* Table header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={14} className="text-white/30" />
                    <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                      Model Usage
                    </h2>
                    <span className="ml-1 rounded-full bg-white/[0.06] border border-white/8 px-2 py-0.5 text-[10px] font-medium text-white/40">
                      This Month
                    </span>
                  </div>
                  <div className="text-[11px] text-white/30">
                    Total est. cost:{' '}
                    <span className="text-emerald-400 font-semibold">{MODEL_TOTAL.estCost}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        {[
                          { label: 'Model',              align: 'left'  },
                          { label: 'Purpose',            align: 'left'  },
                          { label: 'Calls',              align: 'right' },
                          { label: 'Avg Latency',        align: 'right' },
                          { label: 'Avg Tokens / Dims',  align: 'right' },
                          { label: 'Est. Cost',          align: 'right' },
                        ].map((h) => (
                          <th key={h.label} className={`py-2.5 px-5 text-${h.align}`}>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-medium">
                              {h.label}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MODEL_USAGE.map((row, i) => (
                        <ModelRow key={i} row={row} />
                      ))}
                      {/* Divider before total */}
                      <tr>
                        <td colSpan={6} className="px-5 py-0">
                          <div className="h-px bg-white/[0.08]" />
                        </td>
                      </tr>
                      <ModelRow row={MODEL_TOTAL} isTotal />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* SECTION 6 — RECENT GENERATIONS FEED                     */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.015),transparent_60%)] pointer-events-none" />
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-white/[0.05] flex-wrap">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-white/30" />
                    <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                      Recent Generations
                    </h2>
                  </div>

                  {/* Platform filter pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {GEN_FILTERS.map((f) => {
                      const isActive = genFilter === f;
                      const Icon = PLATFORM_ICON_MAP[f];
                      const color = PLATFORM_COLOR_MAP[f];
                      return (
                        <button
                          key={f}
                          onClick={() => setGenFilter(f)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all duration-200 ${
                            isActive
                              ? 'bg-white/10 border-white/20 text-white'
                              : 'bg-transparent border-white/8 text-white/40 hover:border-white/15 hover:text-white/65'
                          }`}
                        >
                          {Icon && (
                            <Icon
                              size={10}
                              className="shrink-0"
                              style={{ color: isActive ? color : undefined }}
                            />
                          )}
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[780px]">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        {['', 'Project', 'Platform & Type', 'Voice Score', 'Gen Time', 'Status', 'When'].map((h) => (
                          <th key={h} className="py-2.5 px-4 text-left">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-medium">
                              {h}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFeed.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-[12px] text-white/25">
                            No generations for this platform yet.
                          </td>
                        </tr>
                      ) : (
                        filteredFeed.map((item) => (
                          <GenerationFeedRow key={item.id} item={item} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* SECTION 7 — LANGFUSE OBSERVABILITY                      */}
            {/* ──────────────────────────────────────────────────────── */}
            <div
              className="relative rounded-3xl border backdrop-blur-xl overflow-hidden"
              style={{ borderColor: 'rgba(99,102,241,0.22)', backgroundColor: 'rgba(99,102,241,0.03)' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(99,102,241,0.07),transparent_65%)] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent pointer-events-none" />

              <div className="relative p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/12 border border-indigo-500/22">
                      <Activity size={13} className="text-indigo-400" />
                    </div>
                    <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                      LLM Observability
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-[10px] font-semibold text-indigo-400">
                      <Sparkles size={9} />
                      Powered by Langfuse
                    </span>
                  </div>

                  <a
                    href="https://cloud.langfuse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-500/25 bg-indigo-500/8 text-[11px] font-medium text-indigo-300 hover:bg-indigo-500/15 hover:border-indigo-500/40 transition-all duration-200"
                  >
                    Open Langfuse Dashboard
                    <ExternalLink size={11} />
                  </a>
                </div>

                {/* 3 metric tiles */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {LANGFUSE_METRICS.map((tile) => (
                    <div
                      key={tile.label}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3"
                    >
                      <div className={`text-[20px] font-bold tracking-[-0.03em] ${tile.accent} mb-0.5`}>
                        {tile.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">{tile.label}</div>
                      <div className="text-[10px] text-white/20 mt-0.5">{tile.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Trace timeline */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronRight size={12} className="text-white/25" />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-medium">
                      Recent Traces
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-white/20">
                      <ArrowUpRight size={9} />
                      view all in Langfuse
                    </span>
                  </div>
                  <div>
                    {LANGFUSE_TRACES.map((trace) => (
                      <LangfuseTraceRow key={trace.id} trace={trace} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-8" />

          </div>
        </main>
      </div>
    </div>
  );
}
