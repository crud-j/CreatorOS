import { useState } from 'react';
import {
  Bot,
  Play,
  Pause,
  AlertCircle,
  Clock,
  CheckCircle2,
  Pencil,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  FileText,
  AlertTriangle,
  Info,
  Plus,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Activity,
} from 'lucide-react';
import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';
import {
  YouTubeIcon,
  TwitterXIcon,
  LinkedInIcon,
  InstagramIcon,
  PinterestIcon,
} from '../assets/SocialLogos';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type RobotStatus = 'Running' | 'Idle' | 'Error' | 'Paused';

interface Robot {
  // TODO: GET /api/automation/robots — fields match UiPath Orchestrator job schema
  id: string;
  name: string;
  description: string;
  schedule: string;
  status: RobotStatus;
  lastRunAt: string;
  nextRunAt: string;
  jobsToday: number;
  jobsThisWeek: number;
  sparklinePoints: number[]; // normalised 0–100, last 10 data points
}

type QueueStatus = 'Queued' | 'Processing' | 'Published' | 'Failed';
type QueuePlatform = 'Instagram' | 'LinkedIn' | 'X' | 'YouTube' | 'Pinterest';

interface QueueItem {
  // TODO: GET /api/automation/queue — fields match outputs table
  id: string;
  platform: QueuePlatform;
  contentPreview: string;
  scheduledAt: string;
  scheduledRelative: string;
  status: QueueStatus;
}

interface AutomationRule {
  // TODO: GET /api/automation/rules — custom rules table
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  lastTriggeredAt: string;
  runCount: number;
}

type LogLevel = 'success' | 'error' | 'info' | 'warning';

interface ActivityLogEntry {
  // TODO: GET /api/automation/activity — robot event log
  id: string;
  message: string;
  robot: string;
  level: LogLevel;
  timestamp: string;
}

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────

// TODO: GET /api/automation/robots
const ROBOTS_MOCK: Robot[] = [
  {
    id: 'robot-1',
    name: 'SocialPublishBot',
    description: 'Posts approved content to all connected platforms every 15 minutes.',
    schedule: 'Every 15 min',
    status: 'Running',
    lastRunAt: '2 min ago',
    nextRunAt: 'in 13 min',
    jobsToday: 24,
    jobsThisWeek: 142,
    sparklinePoints: [40, 55, 48, 70, 62, 80, 75, 88, 72, 91],
  },
  {
    id: 'robot-2',
    name: 'EngagementScraper',
    description: 'Scrapes likes, reach, and engagement metrics every 6 hours.',
    schedule: 'Every 6 hours',
    status: 'Running',
    lastRunAt: '1h 12m ago',
    nextRunAt: 'in 4h 48m',
    jobsToday: 4,
    jobsThisWeek: 28,
    sparklinePoints: [30, 35, 28, 42, 38, 45, 40, 50, 44, 52],
  },
  {
    id: 'robot-3',
    name: 'YouTubeMonitor',
    description: 'Checks for new YouTube uploads daily at 06:00 UTC and triggers the AI pipeline.',
    schedule: 'Daily 06:00 UTC',
    status: 'Idle',
    lastRunAt: '18h ago',
    nextRunAt: 'in 5h 47m',
    jobsToday: 1,
    jobsThisWeek: 7,
    sparklinePoints: [10, 8, 12, 9, 11, 10, 13, 9, 11, 10],
  },
  {
    id: 'robot-4',
    name: 'WeeklyReportBot',
    description: 'Generates and emails the weekly performance digest every Sunday at 19:00 UTC.',
    schedule: 'Sunday 19:00 UTC',
    status: 'Idle',
    lastRunAt: '5 days ago',
    nextRunAt: 'in 2 days',
    jobsToday: 0,
    jobsThisWeek: 1,
    sparklinePoints: [5, 4, 6, 5, 4, 7, 5, 6, 4, 5],
  },
];

// TODO: GET /api/automation/queue?status=all&limit=20
const QUEUE_ITEMS_MOCK: QueueItem[] = [
  {
    id: 'q1',
    platform: 'Instagram',
    contentPreview: 'The single habit that grew my audience from 0 to 50K — it takes less than 20 minutes a day',
    scheduledAt: 'Jun 19, 2026 · 2:00 PM',
    scheduledRelative: 'in 23 min',
    status: 'Processing',
  },
  {
    id: 'q2',
    platform: 'LinkedIn',
    contentPreview: 'I spent 90 days posting daily on LinkedIn. Here is what actually moved the needle.',
    scheduledAt: 'Jun 19, 2026 · 2:30 PM',
    scheduledRelative: 'in 53 min',
    status: 'Queued',
  },
  {
    id: 'q3',
    platform: 'X',
    contentPreview: 'Thread: 7 content repurposing frameworks every creator should know in 2026',
    scheduledAt: 'Jun 19, 2026 · 3:00 PM',
    scheduledRelative: 'in 1h 23m',
    status: 'Queued',
  },
  {
    id: 'q4',
    platform: 'YouTube',
    contentPreview: 'How I batch 30 pieces of content from ONE video using AI — full workflow breakdown',
    scheduledAt: 'Jun 19, 2026 · 4:00 PM',
    scheduledRelative: 'in 2h 23m',
    status: 'Queued',
  },
  {
    id: 'q5',
    platform: 'Pinterest',
    contentPreview: 'The content calendar system I use to stay 3 weeks ahead — template included',
    scheduledAt: 'Jun 19, 2026 · 5:00 PM',
    scheduledRelative: 'in 3h 23m',
    status: 'Queued',
  },
  {
    id: 'q6',
    platform: 'Instagram',
    contentPreview: 'POV: You just discovered that your worst video has the highest save rate on your account',
    scheduledAt: 'Jun 19, 2026 · 6:00 PM',
    scheduledRelative: 'in 4h 23m',
    status: 'Queued',
  },
  {
    id: 'q7',
    platform: 'LinkedIn',
    contentPreview: 'Why most creators plateau at 10K followers — and the one mindset shift that breaks it',
    scheduledAt: 'Jun 18, 2026 · 11:00 AM',
    scheduledRelative: '27h ago',
    status: 'Published',
  },
  {
    id: 'q8',
    platform: 'X',
    contentPreview: 'Tried posting at 7 different times this week. Here are the results with data.',
    scheduledAt: 'Jun 18, 2026 · 9:00 AM',
    scheduledRelative: '29h ago',
    status: 'Failed',
  },
];

// TODO: GET /api/automation/rules
const RULES_MOCK: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-Ingest New YouTube Videos',
    description: 'Automatically starts the full AI pipeline when a new video is detected on your channel.',
    trigger: 'YouTubeMonitor detects new upload',
    action: 'POST /api/projects — fire video.uploaded Inngest event',
    enabled: true,
    lastTriggeredAt: '18 hours ago',
    runCount: 47,
  },
  {
    id: 'rule-2',
    name: 'Auto-Publish Approved Posts',
    description: 'Queues any approved output for UiPath publishing when its scheduled time is reached.',
    trigger: 'output.status = approved AND scheduled_at reached',
    action: 'Add to PublishQueue in UiPath Orchestrator',
    enabled: true,
    lastTriggeredAt: '2 minutes ago',
    runCount: 312,
  },
  {
    id: 'rule-3',
    name: 'Scrape Engagement After 48h',
    description: 'Triggers EngagementScraper for any post published more than 48 hours ago with no recent analytics row.',
    trigger: 'output.published_at > 48h ago AND no recent analytics row',
    action: 'POST /api/analytics — EngagementScraper job',
    enabled: true,
    lastTriggeredAt: '6 hours ago',
    runCount: 184,
  },
  {
    id: 'rule-4',
    name: 'Send Weekly Digest Email',
    description: 'Fires WeeklyReportBot to generate and deliver the creator performance report.',
    trigger: 'Sunday 19:00 UTC (cron)',
    action: 'WeeklyReportBot → SendGrid email + store in analytics.reports',
    enabled: true,
    lastTriggeredAt: '5 days ago',
    runCount: 12,
  },
  {
    id: 'rule-5',
    name: 'Voice Drift Alert',
    description: 'Flags outputs that fail voice guard after 2 revision attempts for manual review.',
    trigger: 'output.voice_score < 0.72 AND revision_count >= 2',
    action: 'PATCH output status → flagged · Send in-app notification',
    enabled: false,
    lastTriggeredAt: '3 days ago',
    runCount: 8,
  },
  {
    id: 'rule-6',
    name: 'Engagement Spike Detection',
    description: 'Sends an alert when a post performs 3x above your 30-day average engagement rate.',
    trigger: 'engagement_rate > (user 30-day avg × 3)',
    action: 'PATCH output flagged_spike: true · Push notification',
    enabled: true,
    lastTriggeredAt: '1 week ago',
    runCount: 5,
  },
];

// TODO: GET /api/automation/activity?limit=20
const ACTIVITY_LOG_MOCK: ActivityLogEntry[] = [
  {
    id: 'log-1',
    message: 'SocialPublishBot published Instagram post #ig_4829 successfully',
    robot: 'SocialPublishBot',
    level: 'success',
    timestamp: '2 min ago',
  },
  {
    id: 'log-2',
    message: 'SocialPublishBot published LinkedIn post #li_1203 successfully',
    robot: 'SocialPublishBot',
    level: 'success',
    timestamp: '17 min ago',
  },
  {
    id: 'log-3',
    message: 'SocialPublishBot failed to publish X post #tw_8812 — rate limit exceeded',
    robot: 'SocialPublishBot',
    level: 'error',
    timestamp: '29h ago',
  },
  {
    id: 'log-4',
    message: 'EngagementScraper completed metrics run — 18 outputs updated',
    robot: 'EngagementScraper',
    level: 'success',
    timestamp: '1h 12m ago',
  },
  {
    id: 'log-5',
    message: 'Engagement spike detected on Instagram post #ig_4801 — 4.2x above 30-day average',
    robot: 'EngagementScraper',
    level: 'warning',
    timestamp: '2h 45m ago',
  },
  {
    id: 'log-6',
    message: 'YouTubeMonitor detected new video "How I use AI to batch content" — pipeline started',
    robot: 'YouTubeMonitor',
    level: 'info',
    timestamp: '18h ago',
  },
  {
    id: 'log-7',
    message: 'Voice drift alert: LinkedIn essay #li_1198 scored 0.68 after 2 revisions — flagged for review',
    robot: 'SocialPublishBot',
    level: 'warning',
    timestamp: '22h ago',
  },
  {
    id: 'log-8',
    message: 'WeeklyReportBot delivered digest email to jake@creatoros.app',
    robot: 'WeeklyReportBot',
    level: 'success',
    timestamp: '5 days ago',
  },
  {
    id: 'log-9',
    message: 'EngagementScraper completed metrics run — 31 outputs updated',
    robot: 'EngagementScraper',
    level: 'success',
    timestamp: '7h ago',
  },
  {
    id: 'log-10',
    message: 'SocialPublishBot retry succeeded for Pinterest post #pi_0042 on attempt 2',
    robot: 'SocialPublishBot',
    level: 'info',
    timestamp: '3h ago',
  },
];

// ─────────────────────────────────────────────────────────────
// PLATFORM METADATA
// ─────────────────────────────────────────────────────────────

interface PlatformMeta {
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
}

const PLATFORM_META: Record<QueuePlatform, PlatformMeta> = {
  Instagram: { icon: InstagramIcon, color: '#E1306C', bg: 'rgba(225,48,108,0.10)',  border: 'rgba(225,48,108,0.20)'  },
  LinkedIn:  { icon: LinkedInIcon,  color: '#0077B5', bg: 'rgba(0,119,181,0.10)',   border: 'rgba(0,119,181,0.20)'   },
  X:         { icon: TwitterXIcon,  color: '#ffffff', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' },
  YouTube:   { icon: YouTubeIcon,   color: '#FF0000', bg: 'rgba(255,0,0,0.10)',     border: 'rgba(255,0,0,0.20)'     },
  Pinterest: { icon: PinterestIcon, color: '#E60023', bg: 'rgba(230,0,35,0.10)',    border: 'rgba(230,0,35,0.20)'    },
};

// ─────────────────────────────────────────────────────────────
// SPARKLINE SVG (hand-rolled)
// ─────────────────────────────────────────────────────────────

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const W = 80;
  const H = 28;
  const PAD = 2;
  const n = points.length;
  const step = (W - PAD * 2) / (n - 1);
  const minP = Math.min(...points);
  const maxP = Math.max(...points);
  const range = maxP - minP || 1;

  const coordPairs = points.map((p, i) => ({
    x: PAD + i * step,
    y: H - PAD - ((p - minP) / range) * (H - PAD * 2),
  }));

  const polylineStr = coordPairs.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

  const lastC = coordPairs[n - 1];
  const firstC = coordPairs[0];
  const fillPath = [
    `M ${firstC.x.toFixed(1)},${firstC.y.toFixed(1)}`,
    ...coordPairs.slice(1).map((c) => `L ${c.x.toFixed(1)},${c.y.toFixed(1)}`),
    `L ${lastC.x.toFixed(1)},${H}`,
    `L ${firstC.x.toFixed(1)},${H}`,
    'Z',
  ].join(' ');

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <path d={fillPath} fill={color} fillOpacity="0.08" />
      <polyline
        points={polylineStr}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <circle
        cx={lastC.x.toFixed(1)}
        cy={lastC.y.toFixed(1)}
        r="2.5"
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// ROBOT STATUS BADGE
// ─────────────────────────────────────────────────────────────

interface StatusCfg {
  dot: string;
  text: string;
  cls: string;
}

function RobotStatusPill({ status }: { status: RobotStatus }) {
  const cfg: Record<RobotStatus, StatusCfg> = {
    Running: { dot: 'bg-emerald-400', text: 'text-emerald-400', cls: 'bg-emerald-500/10 border-emerald-500/20' },
    Idle:    { dot: 'bg-white/40',    text: 'text-white/50',    cls: 'bg-white/[0.04] border-white/10'         },
    Error:   { dot: 'bg-red-400',     text: 'text-red-400',     cls: 'bg-red-500/10 border-red-500/20'         },
    Paused:  { dot: 'bg-purple-400',  text: 'text-purple-400',  cls: 'bg-purple-500/10 border-purple-500/20'   },
  };
  const c = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${c.cls} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'Running' ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — ROBOT CARD
// ─────────────────────────────────────────────────────────────

interface RobotCardProps {
  robot: Robot;
  onTogglePause: (id: string) => void;
}

function RobotCard({ robot, onTogglePause }: RobotCardProps) {
  const sparkColor =
    robot.status === 'Running' ? '#34d399'
    : robot.status === 'Error' ? '#f87171'
    : robot.status === 'Paused' ? '#a78bfa'
    : 'rgba(255,255,255,0.35)';

  function handlePauseResume() {
    // TODO: PATCH /api/automation/robots/:id { status: 'Paused' | 'Running' }
    onTogglePause(robot.id);
  }

  function handleViewLogs() {
    // TODO: GET /api/automation/robots/:id/logs — open logs drawer
    console.log('view logs', robot.id);
  }

  return (
    <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl p-5 overflow-hidden transition-all duration-300 hover:bg-white/[0.045] hover:border-white/15 hover:shadow-[0_0_60px_rgba(255,255,255,0.05)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.025),transparent_65%)] pointer-events-none" />
      <div className="relative">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/8 shrink-0">
              <Bot size={16} className="text-white/55" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white/90 tracking-[-0.02em] leading-tight mb-0.5 truncate">
                {robot.name}
              </p>
              <span className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/8 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-white/30">
                Unattended
              </span>
            </div>
          </div>
          <RobotStatusPill status={robot.status} />
        </div>

        {/* Description */}
        <p className="text-[11px] text-white/40 leading-relaxed mb-4 line-clamp-2">
          {robot.description}
        </p>

        {/* Timing row */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-0.5">Last Run</p>
            <p className="text-[11px] font-medium text-white/55">{robot.lastRunAt}</p>
          </div>
          <div className="w-px h-6 bg-white/8 shrink-0" />
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-0.5">Next Run</p>
            <p className="text-[11px] font-medium text-white/55">{robot.nextRunAt}</p>
          </div>
          <div className="w-px h-6 bg-white/8 shrink-0" />
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-0.5">Schedule</p>
            <p className="text-[11px] font-medium text-white/55">{robot.schedule}</p>
          </div>
        </div>

        {/* Stats + sparkline */}
        <div className="flex items-end justify-between mb-4">
          <div className="flex gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-0.5">Today</p>
              <p className="text-[18px] font-bold tracking-[-0.03em] text-white/85">{robot.jobsToday}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-0.5">This Week</p>
              <p className="text-[18px] font-bold tracking-[-0.03em] text-white/85">{robot.jobsThisWeek}</p>
            </div>
          </div>
          <Sparkline points={robot.sparklinePoints} color={sparkColor} />
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05] mb-3" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleViewLogs}
            className="inline-flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/65 transition-colors duration-200"
          >
            <ExternalLink size={11} />
            View Logs
          </button>
          <button
            onClick={handlePauseResume}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-medium transition-all duration-200 ${
              robot.status === 'Running'
                ? 'bg-white/[0.04] border-white/10 text-white/50 hover:bg-white/[0.08] hover:text-white/80'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            {robot.status === 'Running' ? (
              <><Pause size={10} /> Pause</>
            ) : (
              <><Play size={10} /> Resume</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QUEUE STATUS BADGE
// ─────────────────────────────────────────────────────────────

interface QueueStatusCfg {
  dot: string;
  text: string;
  cls: string;
  label: string;
}

function QueueStatusBadge({ status }: { status: QueueStatus }) {
  const cfg: Record<QueueStatus, QueueStatusCfg> = {
    Queued:     { dot: 'bg-blue-400',    text: 'text-blue-400',    cls: 'bg-blue-500/10 border-blue-500/20',       label: 'Queued'     },
    Processing: { dot: 'bg-purple-400',  text: 'text-purple-400',  cls: 'bg-purple-500/10 border-purple-500/20',   label: 'Processing' },
    Published:  { dot: 'bg-emerald-400', text: 'text-emerald-400', cls: 'bg-emerald-500/10 border-emerald-500/20', label: 'Published'  },
    Failed:     { dot: 'bg-red-400',     text: 'text-red-400',     cls: 'bg-red-500/10 border-red-500/20',         label: 'Failed'     },
  };
  const c = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${c.cls} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 3 — PUBLISHING QUEUE
// ─────────────────────────────────────────────────────────────

type QueueFilter = 'All' | QueueStatus;

interface PublishingQueueProps {
  items: QueueItem[];
}

function PublishingQueue({ items }: PublishingQueueProps) {
  const [filter, setFilter] = useState<QueueFilter>('All');

  const filters: QueueFilter[] = ['All', 'Queued', 'Processing', 'Published', 'Failed'];

  const queuedCount     = items.filter((i) => i.status === 'Queued').length;
  const processingCount = items.filter((i) => i.status === 'Processing').length;
  const failedCount     = items.filter((i) => i.status === 'Failed').length;

  const visible = filter === 'All' ? items : items.filter((i) => i.status === filter);

  function handleEditSchedule(id: string) {
    // TODO: PATCH /api/schedule/:id — open reschedule modal with new scheduledAt
    console.log('edit schedule', id);
  }

  function handleRemoveFromQueue(id: string) {
    // TODO: DELETE /api/schedule/:id — resets output.status to 'approved'
    console.log('remove from queue', id);
  }

  return (
    <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden mb-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.02),transparent_65%)] pointer-events-none" />
      <div className="relative">

        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/[0.05] border border-white/8">
              <Clock size={13} className="text-white/45" />
            </div>
            <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">Publishing Queue</h2>
          </div>
          {/* Summary chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[10px] font-semibold text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              Queued: {queuedCount}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-[10px] font-semibold text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 animate-pulse" />
              Processing: {processingCount}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-[10px] font-semibold text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              Failed: {failedCount}
            </span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/[0.04] flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all duration-200 ${
                filter === f
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-transparent border-white/8 text-white/40 hover:border-white/15 hover:text-white/70'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['Platform', 'Content Preview', 'Scheduled', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="py-2.5 px-4 text-left">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-medium">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => {
                const meta = PLATFORM_META[item.platform];
                const PIcon = meta.icon;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-white/[0.04] transition-colors duration-150 hover:bg-white/[0.025] group"
                  >
                    {/* Platform */}
                    <td className="py-3 px-4">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg border shrink-0"
                        style={{ backgroundColor: meta.bg, borderColor: meta.border }}
                      >
                        <PIcon size={12} style={{ color: meta.color }} />
                      </div>
                    </td>
                    {/* Preview */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="text-[12px] text-white/60 leading-relaxed line-clamp-1 group-hover:text-white/80 transition-colors duration-150">
                        {item.contentPreview}
                      </p>
                    </td>
                    {/* Scheduled */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <p className="text-[12px] font-medium text-white/70">{item.scheduledRelative}</p>
                      <p className="text-[10px] text-white/28 mt-0.5">{item.scheduledAt}</p>
                    </td>
                    {/* Status */}
                    <td className="py-3 px-4">
                      <QueueStatusBadge status={item.status} />
                    </td>
                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditSchedule(item.id)}
                          title="Edit schedule"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150"
                        >
                          <Pencil size={11} />
                        </button>
                        <button
                          onClick={() => handleRemoveFromQueue(item.id)}
                          title="Remove from queue"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-white/25">
            <Clock size={28} className="mb-2 opacity-40" />
            <p className="text-[12px]">No items match this filter.</p>
          </div>
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — AUTOMATION RULE CARD
// ─────────────────────────────────────────────────────────────

interface RuleCardProps {
  rule: AutomationRule;
  enabled: boolean;
  onToggle: (id: string) => void;
}

function RuleCard({ rule, enabled, onToggle }: RuleCardProps) {
  function handleToggle() {
    // TODO: PATCH /api/automation/rules/:id { enabled: !enabled }
    onToggle(rule.id);
  }

  return (
    <div className={`relative rounded-3xl border bg-white/[0.025] backdrop-blur-xl p-5 overflow-hidden transition-all duration-300 hover:bg-white/[0.045] hover:shadow-[0_0_40px_rgba(255,255,255,0.04)] ${
      enabled ? 'border-white/8 hover:border-white/15' : 'border-white/[0.04] opacity-60 hover:opacity-80'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(255,255,255,0.02),transparent_55%)] pointer-events-none" />
      <div className="relative">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`flex h-7 w-7 items-center justify-center rounded-xl border shrink-0 ${
              enabled
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'bg-white/[0.03] border-white/8'
            }`}>
              <Zap size={12} className={enabled ? 'text-emerald-400' : 'text-white/30'} />
            </div>
            <p className="text-[13px] font-semibold text-white/85 tracking-[-0.01em] leading-tight">
              {rule.name}
            </p>
          </div>
          <button
            onClick={handleToggle}
            title={enabled ? 'Disable rule' : 'Enable rule'}
            className="shrink-0 transition-colors duration-200"
          >
            {enabled
              ? <ToggleRight size={22} className="text-emerald-400" />
              : <ToggleLeft size={22} className="text-white/25" />
            }
          </button>
        </div>

        {/* Description */}
        <p className="text-[11px] text-white/40 leading-relaxed mb-3">{rule.description}</p>

        {/* Trigger → Action block */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 mb-3 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-[9px] uppercase tracking-[0.18em] text-white/25 font-medium mt-0.5 shrink-0 w-10">If</span>
            <p className="text-[11px] text-white/55 leading-relaxed">{rule.trigger}</p>
          </div>
          <div className="h-px bg-white/[0.05]" />
          <div className="flex items-start gap-2">
            <span className="text-[9px] uppercase tracking-[0.18em] text-white/25 font-medium mt-0.5 shrink-0 w-10">Then</span>
            <p className="text-[11px] text-white/55 leading-relaxed">{rule.action}</p>
          </div>
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/22">Last triggered</p>
              <p className="text-[11px] text-white/45">{rule.lastTriggeredAt}</p>
            </div>
            <div className="w-px h-5 bg-white/8" />
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/22">Runs</p>
              <p className="text-[11px] font-semibold text-white/65">{rule.runCount.toLocaleString()}</p>
            </div>
          </div>
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold ${
            enabled
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-white/[0.04] border-white/10 text-white/30'
          }`}>
            {enabled ? 'Active' : 'Disabled'}
          </span>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5 — ACTIVITY LOG
// ─────────────────────────────────────────────────────────────

function LogLevelIcon({ level }: { level: LogLevel }) {
  if (level === 'success') return <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />;
  if (level === 'error')   return <AlertCircle size={13} className="text-red-400 shrink-0" />;
  if (level === 'warning') return <AlertTriangle size={13} className="text-amber-400 shrink-0" />;
  return <Info size={13} className="text-blue-400 shrink-0" />;
}

const LOG_DOT_CLASS: Record<LogLevel, string> = {
  success: 'bg-emerald-400',
  error:   'bg-red-400',
  warning: 'bg-amber-400',
  info:    'bg-blue-400',
};

const ROBOT_BADGE_CLS: Record<string, string> = {
  SocialPublishBot:  'bg-purple-500/10 border-purple-500/20 text-purple-400',
  EngagementScraper: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  YouTubeMonitor:    'bg-red-500/10 border-red-500/20 text-red-400',
  WeeklyReportBot:   'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
};

interface ActivityFeedProps {
  entries: ActivityLogEntry[];
}

function ActivityFeed({ entries }: ActivityFeedProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.02),transparent_65%)] pointer-events-none" />
      <div className="relative">

        {/* Collapsible header */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full flex items-center justify-between px-5 py-4 border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/[0.05] border border-white/8">
              <Activity size={13} className="text-white/45" />
            </div>
            <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">Activity Log</h2>
            <span className="rounded-full bg-white/[0.06] border border-white/8 px-2 py-0.5 text-[10px] font-medium text-white/40">
              {entries.length}
            </span>
          </div>
          {expanded
            ? <ChevronUp size={14} className="text-white/30" />
            : <ChevronDown size={14} className="text-white/30" />
          }
        </button>

        {expanded && (
          <>
            <div className="divide-y divide-white/[0.04]">
              {entries.map((entry) => {
                const robotCls = ROBOT_BADGE_CLS[entry.robot] ?? 'bg-white/[0.04] border-white/10 text-white/35';
                const dotCls   = LOG_DOT_CLASS[entry.level];
                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.025] transition-colors duration-150 group"
                  >
                    <div className="mt-0.5">
                      <LogLevelIcon level={entry.level} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-150">
                        {entry.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-white/25 whitespace-nowrap">{entry.timestamp}</span>
                      <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${robotCls}`}>
                        <span className={`w-1 h-1 rounded-full shrink-0 ${dotCls}`} />
                        {entry.robot}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load more */}
            <div className="px-5 py-4 border-t border-white/[0.04]">
              <button
                onClick={() => {
                  // TODO: GET /api/automation/activity?offset=10 — append next page
                  console.log('load more activity');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/8 text-[11px] text-white/35 hover:text-white/65 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-200"
              >
                <FileText size={11} />
                Load More
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────

export default function AutomationPage() {
  const [robots, setRobots] = useState<Robot[]>(ROBOTS_MOCK);
  const [rules] = useState<AutomationRule[]>(RULES_MOCK);
  const [ruleEnabled, setRuleEnabled] = useState<boolean[]>(
    RULES_MOCK.map((r) => r.enabled)
  );

  function handleTogglePause(robotId: string) {
    // TODO: PATCH /api/automation/robots/:id { status: 'Paused' | 'Running' }
    setRobots((prev) =>
      prev.map((r) => {
        if (r.id !== robotId) return r;
        const nextStatus: RobotStatus = r.status === 'Running' ? 'Paused' : 'Running';
        return { ...r, status: nextStatus };
      })
    );
  }

  function handleToggleRule(ruleId: string) {
    // TODO: PATCH /api/automation/rules/:id { enabled: <boolean> }
    const idx = rules.findIndex((r) => r.id === ruleId);
    if (idx === -1) return;
    setRuleEnabled((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }

  function handleNewAutomation() {
    // TODO: POST /api/automation/rules — open new automation wizard modal
    console.log('new automation');
  }

  const activeRobotCount = robots.filter((r) => r.status === 'Running').length;
  const activeRuleCount  = ruleEnabled.filter(Boolean).length;

  return (
    <div className="dashboard-layout flex h-screen w-screen overflow-hidden bg-[#060606]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-none">

            {/* ──────────────────────────────────────────────────────── */}
            {/* 1. PAGE HEADER                                           */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="flex items-start justify-between mb-7 gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={18} className="text-white/40" />
                  <h1 className="text-[22px] font-bold tracking-[-0.03em] text-white/90">
                    Automation
                  </h1>
                </div>
                <p className="text-[13px] text-white/35 ml-[26px]">
                  Manage your publishing robots and scheduled workflows
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Active robots indicator */}
                <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] px-3.5 py-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[12px] font-semibold text-emerald-400">
                    {activeRobotCount} Robot{activeRobotCount !== 1 ? 's' : ''} Active
                  </span>
                </div>
                {/* New Automation button */}
                <button
                  onClick={handleNewAutomation}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.06] text-[12px] font-semibold text-white/75 hover:bg-white/[0.10] hover:border-white/20 hover:text-white/95 transition-all duration-200"
                >
                  <Plus size={13} />
                  New Automation
                </button>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 2. ROBOT STATUS CARDS                                    */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">UiPath Robots</h2>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Unattended · Orchestrator Cloud
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {robots.map((robot) => (
                  <RobotCard
                    key={robot.id}
                    robot={robot}
                    onTogglePause={handleTogglePause}
                  />
                ))}
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 3. PUBLISHING QUEUE                                      */}
            {/* ──────────────────────────────────────────────────────── */}
            <PublishingQueue items={QUEUE_ITEMS_MOCK} />

            {/* ──────────────────────────────────────────────────────── */}
            {/* 4. AUTOMATION RULES                                      */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">Automation Rules</h2>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    {activeRuleCount} of {rules.length} active
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">Trigger → Action</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rules.map((rule, idx) => (
                  <RuleCard
                    key={rule.id}
                    rule={rule}
                    enabled={ruleEnabled[idx] ?? rule.enabled}
                    onToggle={handleToggleRule}
                  />
                ))}
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 5. ACTIVITY LOG                                          */}
            {/* ──────────────────────────────────────────────────────── */}
            <ActivityFeed entries={ACTIVITY_LOG_MOCK} />

            {/* Bottom spacer */}
            <div className="h-8" />

          </div>
        </main>
      </div>
    </div>
  );
}
