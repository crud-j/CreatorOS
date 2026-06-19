import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  BarChart2,
  FileText,
  Cpu,
  ArrowUpRight,
  Download,
  Sparkles,
  Zap,
  Clock,
  Star,
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

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type DateRange = '7D' | '30D' | '90D' | 'All Time';
type PlatformFilter =
  | 'All'
  | 'YouTube'
  | 'Instagram'
  | 'X'
  | 'LinkedIn'
  | 'Facebook'
  | 'Pinterest';

interface StatCardData {
  // TODO: GET /api/analytics/summary — fields: id, label, value, trend, trendPct, subtext
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down';
  trendPct: string;
  subtext: string;
  icon: React.ElementType;
}

interface ChartBar {
  // TODO: GET /api/analytics/timeseries — fields: week, reach, engagement
  week: string;
  reach: number; // normalised 0–100
  engagement: number; // normalised 0–100
}

interface PlatformStat {
  // TODO: GET /api/analytics/platforms — fields: id, name, reach, reachLabel, engagementRate, posts, trend, trendPct, color, bgColor
  id: PlatformFilter;
  name: string;
  reach: number;
  reachLabel: string;
  engagementRate: string;
  posts: number;
  trend: 'up' | 'down';
  trendPct: string;
  color: string;
  bgColor: string;
  icon: React.ElementType;
}

interface TopPost {
  // TODO: GET /api/analytics/top-posts — fields: id, platform, preview, reach, engagement, publishedAt, status
  id: string;
  platform: PlatformFilter;
  preview: string;
  reach: string;
  engagement: string;
  publishedAt: string;
  status: 'published' | 'scheduled' | 'draft';
}

interface QuickStat {
  label: string;
  value: string;
}

interface CoachChip {
  icon: React.ElementType;
  label: string;
  color: string;
}

// ─────────────────────────────────────────────────────────────
// MOCK DATA — replace each block with a real API call
// ─────────────────────────────────────────────────────────────

// TODO: GET /api/analytics/summary?range={dateRange}
const STAT_CARDS: StatCardData[] = [
  {
    id: 'total-reach',
    label: 'Total Reach',
    value: '284.7K',
    trend: 'up',
    trendPct: '+18.4%',
    subtext: 'vs previous period',
    icon: Users,
  },
  {
    id: 'avg-engagement',
    label: 'Avg Engagement',
    value: '7.2%',
    trend: 'up',
    trendPct: '+0.8pts',
    subtext: 'across all platforms',
    icon: TrendingUp,
  },
  {
    id: 'posts-published',
    label: 'Posts Published',
    value: '142',
    trend: 'up',
    trendPct: '+12',
    subtext: 'this period',
    icon: FileText,
  },
  {
    id: 'voice-fidelity',
    label: 'Voice Fidelity',
    value: '94.3%',
    trend: 'up',
    trendPct: '+1.2pts',
    subtext: 'AI voice match score',
    icon: Cpu,
  },
];

// TODO: GET /api/analytics/timeseries?range={dateRange}&platform={platformFilter}
const CHART_BARS: ChartBar[] = [
  { week: 'W1', reach: 62, engagement: 68 },
  { week: 'W2', reach: 78, engagement: 72 },
  { week: 'W3', reach: 55, engagement: 58 },
  { week: 'W4', reach: 91, engagement: 85 },
  { week: 'W5', reach: 74, engagement: 70 },
  { week: 'W6', reach: 83, engagement: 79 },
  { week: 'W7', reach: 100, engagement: 94 },
  { week: 'W8', reach: 88, engagement: 82 },
];

// TODO: GET /api/analytics/quick-stats?range={dateRange}
const QUICK_STATS: QuickStat[] = [
  { label: 'Peak Day', value: 'Tuesday' },
  { label: 'Best Platform', value: 'Instagram' },
  { label: 'Avg Daily Reach', value: '9.4K' },
];

// TODO: GET /api/analytics/platforms?range={dateRange}
const PLATFORM_STATS: PlatformStat[] = [
  {
    id: 'YouTube',
    name: 'YouTube',
    reach: 98400,
    reachLabel: '98.4K',
    engagementRate: '9.1%',
    posts: 24,
    trend: 'up',
    trendPct: '+22%',
    color: '#FF0000',
    bgColor: 'rgba(255,0,0,0.08)',
    icon: YouTubeIcon,
  },
  {
    id: 'Instagram',
    name: 'Instagram',
    reach: 112300,
    reachLabel: '112.3K',
    engagementRate: '8.4%',
    posts: 38,
    trend: 'up',
    trendPct: '+31%',
    color: '#E1306C',
    bgColor: 'rgba(225,48,108,0.08)',
    icon: InstagramIcon,
  },
  {
    id: 'X',
    name: 'X (Twitter)',
    reach: 41200,
    reachLabel: '41.2K',
    engagementRate: '5.8%',
    posts: 52,
    trend: 'down',
    trendPct: '-4%',
    color: '#ffffff',
    bgColor: 'rgba(255,255,255,0.06)',
    icon: TwitterXIcon,
  },
  {
    id: 'LinkedIn',
    name: 'LinkedIn',
    reach: 17800,
    reachLabel: '17.8K',
    engagementRate: '6.3%',
    posts: 14,
    trend: 'up',
    trendPct: '+9%',
    color: '#0077B5',
    bgColor: 'rgba(0,119,181,0.08)',
    icon: LinkedInIcon,
  },
  {
    id: 'Facebook',
    name: 'Facebook',
    reach: 9600,
    reachLabel: '9.6K',
    engagementRate: '3.9%',
    posts: 10,
    trend: 'down',
    trendPct: '-11%',
    color: '#1877F2',
    bgColor: 'rgba(24,119,242,0.08)',
    icon: FacebookIcon,
  },
  {
    id: 'Pinterest',
    name: 'Pinterest',
    reach: 5400,
    reachLabel: '5.4K',
    engagementRate: '4.2%',
    posts: 4,
    trend: 'up',
    trendPct: '+7%',
    color: '#E60023',
    bgColor: 'rgba(230,0,35,0.08)',
    icon: PinterestIcon,
  },
];

// TODO: GET /api/analytics/top-posts?range={dateRange}&limit=6
const TOP_POSTS: TopPost[] = [
  {
    id: 'p1',
    platform: 'Instagram',
    preview:
      'The single habit that grew my audience from 0 to 50K in 6 months — and it takes less than 20 minutes a day',
    reach: '84.2K',
    engagement: '11.3%',
    publishedAt: 'Jun 12, 2026',
    status: 'published',
  },
  {
    id: 'p2',
    platform: 'YouTube',
    preview:
      'How I batch 30 pieces of content from ONE video using AI — full workflow breakdown',
    reach: '62.8K',
    engagement: '9.7%',
    publishedAt: 'Jun 10, 2026',
    status: 'published',
  },
  {
    id: 'p3',
    platform: 'LinkedIn',
    preview:
      "I spent 90 days posting daily on LinkedIn. Here's what actually moved the needle (and what didn't)",
    reach: '17.1K',
    engagement: '8.2%',
    publishedAt: 'Jun 8, 2026',
    status: 'published',
  },
  {
    id: 'p4',
    platform: 'X',
    preview:
      'Thread: 7 content repurposing frameworks that every creator should know in 2026',
    reach: '24.5K',
    engagement: '6.8%',
    publishedAt: 'Jun 6, 2026',
    status: 'published',
  },
  {
    id: 'p5',
    platform: 'Instagram',
    preview:
      "POV: You just discovered that your \"worst\" video has the highest save rate on your entire account",
    reach: '39.1K',
    engagement: '10.1%',
    publishedAt: 'Jun 4, 2026',
    status: 'published',
  },
  {
    id: 'p6',
    platform: 'YouTube',
    preview:
      'The content calendar system I use to stay 3 weeks ahead — template included',
    reach: '31.6K',
    engagement: '7.4%',
    publishedAt: 'Jun 1, 2026',
    status: 'published',
  },
];

// TODO: GET /api/analytics/coach-report?range={dateRange}
const COACH_NARRATIVE =
  "Your Instagram Reels are carrying this period — 112K reach with an 8.4% engagement rate puts you in the top 5% of creators your size. LinkedIn is your highest-intent audience (6.3% ER on a professional feed is exceptional). Twitter shows a small dip; try shortening thread intros and posting between 7–9 PM. YouTube retention above 50% suggests your hooks are landing — lean into the \"workflow breakdown\" format, it's your highest-CPM content category.";

// TODO: GET /api/analytics/coach-chips?range={dateRange}
const COACH_CHIPS: CoachChip[] = [
  { icon: TrendingUp, label: 'Boost LinkedIn', color: 'text-blue-400' },
  { icon: Zap, label: 'Post more Reels', color: 'text-pink-400' },
  { icon: Clock, label: 'Best time: 7 PM', color: 'text-emerald-400' },
];

// ─────────────────────────────────────────────────────────────
// PLATFORM META MAPS
// ─────────────────────────────────────────────────────────────

const PLATFORM_ICON_MAP: Record<PlatformFilter, React.ElementType | null> = {
  All: null,
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
  X: TwitterXIcon,
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
  Pinterest: PinterestIcon,
};

const PLATFORM_COLOR_MAP: Record<PlatformFilter, string> = {
  All: 'rgba(255,255,255,0.65)',
  YouTube: '#FF0000',
  Instagram: '#E1306C',
  X: '#ffffff',
  LinkedIn: '#0077B5',
  Facebook: '#1877F2',
  Pinterest: '#E60023',
};

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

function TrendBadge({ trend, pct }: { trend: 'up' | 'down'; pct: string }) {
  if (trend === 'up') {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
        <TrendingUp size={9} />
        {pct}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-400">
      <TrendingDown size={9} />
      {pct}
    </span>
  );
}

function StatCardItem({ card }: { card: StatCardData }) {
  const Icon = card.icon;
  return (
    <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl p-5 overflow-hidden transition-all duration-300 hover:bg-white/[0.045] hover:border-white/15 hover:shadow-[0_0_60px_rgba(255,255,255,0.05)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] border border-white/8">
            <Icon size={14} className="text-white/55" />
          </div>
          <TrendBadge trend={card.trend} pct={card.trendPct} />
        </div>
        <div className="text-[22px] font-bold tracking-[-0.03em] text-white/90 mb-1">
          {card.value}
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-0.5">
          {card.label}
        </div>
        <div className="text-[11px] text-white/25">{card.subtext}</div>
      </div>
    </div>
  );
}

// Hand-rolled SVG bar chart — no charting library
function PerformanceChart({
  bars,
  accentColor,
}: {
  bars: ChartBar[];
  accentColor: string;
}) {
  const SVG_W = 800;
  const SVG_H = 148;
  const PAD_TOP = 10;
  const PAD_BOTTOM = 28;
  const CHART_H = SVG_H - PAD_TOP - PAD_BOTTOM;
  const N = bars.length;
  const BAR_GAP = 10;
  const BAR_W = Math.floor(SVG_W / N - BAR_GAP);
  const GRID_LINES = 4;

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto"
        aria-label="Weekly reach bar chart"
      >
        {/* Grid lines */}
        {Array.from({ length: GRID_LINES }).map((_, i) => {
          const y = PAD_TOP + (CHART_H / GRID_LINES) * i;
          return (
            <line
              key={i}
              x1={0}
              y1={y}
              x2={SVG_W}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}

        {/* Bars */}
        {bars.map((bar, i) => {
          const barH = Math.max(4, (bar.reach / 100) * CHART_H);
          const x = i * (BAR_W + BAR_GAP) + BAR_GAP / 2;
          const y = PAD_TOP + CHART_H - barH;
          const topCapH = Math.min(4, barH);

          return (
            <g key={bar.week} className="group">
              {/* Hover zone */}
              <rect
                x={x - 2}
                y={PAD_TOP}
                width={BAR_W + 4}
                height={CHART_H}
                fill="transparent"
                rx="6"
              />
              {/* Bar body */}
              <rect
                x={x}
                y={y}
                width={BAR_W}
                height={barH}
                rx="5"
                fill={accentColor}
                fillOpacity="0.35"
              />
              {/* Bar top highlight cap */}
              <rect
                x={x}
                y={y}
                width={BAR_W}
                height={topCapH}
                rx="5"
                fill={accentColor}
                fillOpacity="0.85"
              />
              {/* Week label */}
              <text
                x={x + BAR_W / 2}
                y={SVG_H - 6}
                textAnchor="middle"
                fontSize="9"
                fill="rgba(255,255,255,0.28)"
                fontFamily="system-ui, sans-serif"
              >
                {bar.week}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PlatformFilterPills({
  active,
  onChange,
}: {
  active: PlatformFilter;
  onChange: (p: PlatformFilter) => void;
}) {
  const filters: PlatformFilter[] = [
    'All',
    'YouTube',
    'Instagram',
    'X',
    'LinkedIn',
    'Facebook',
    'Pinterest',
  ];

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {filters.map((f) => {
        const isActive = active === f;
        const Icon = PLATFORM_ICON_MAP[f];
        const color = PLATFORM_COLOR_MAP[f];
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all duration-200 ${
              isActive
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-transparent border-white/8 text-white/45 hover:border-white/15 hover:text-white/70'
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
  );
}

function PlatformCard({
  stat,
  maxReach,
}: {
  stat: PlatformStat;
  maxReach: number;
}) {
  const Icon = stat.icon;
  const pct = Math.round((stat.reach / maxReach) * 100);
  return (
    <div className="rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl p-5 transition-all duration-300 hover:bg-white/[0.045] hover:border-white/15 hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: stat.bgColor,
              borderColor: `${stat.color}20`,
            }}
          >
            <Icon size={14} style={{ color: stat.color }} />
          </div>
          <span className="text-[13px] font-semibold text-white/85 tracking-[-0.01em]">
            {stat.name}
          </span>
        </div>
        <TrendBadge trend={stat.trend} pct={stat.trendPct} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-1">
            Reach
          </div>
          <div className="text-[15px] font-bold tracking-[-0.02em] text-white/88">
            {stat.reachLabel}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-1">
            Eng. Rate
          </div>
          <div className="text-[15px] font-bold tracking-[-0.02em] text-emerald-400">
            {stat.engagementRate}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-1">
            Posts
          </div>
          <div className="text-[15px] font-bold tracking-[-0.02em] text-white/88">
            {stat.posts}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-white/25">Reach share</span>
          <span className="text-[10px] font-medium text-white/40">{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              backgroundColor: stat.color,
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PostStatusBadge({ status }: { status: TopPost['status'] }) {
  if (status === 'published') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 whitespace-nowrap">
        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
        Published
      </span>
    );
  }
  if (status === 'scheduled') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-400 whitespace-nowrap">
        <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
        Scheduled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/6 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/40 whitespace-nowrap">
      <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
      Draft
    </span>
  );
}

function TopPostRow({ post }: { post: TopPost }) {
  const Icon = PLATFORM_ICON_MAP[post.platform];
  const color = PLATFORM_COLOR_MAP[post.platform];
  return (
    <tr className="border-b border-white/[0.04] transition-colors duration-150 hover:bg-white/[0.03] group">
      <td className="py-3 px-4">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg border shrink-0"
          style={{
            color,
            borderColor: `${color}25`,
            backgroundColor: `${color}10`,
          }}
        >
          {Icon && <Icon size={12} />}
        </div>
      </td>
      <td className="py-3 px-4 max-w-xs">
        <p className="text-[12px] text-white/65 leading-relaxed line-clamp-1 group-hover:text-white/85 transition-colors duration-150">
          {post.preview}
        </p>
      </td>
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="text-[13px] font-semibold text-white/85 tracking-[-0.01em]">
          {post.reach}
        </span>
      </td>
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="text-[13px] font-semibold text-emerald-400">
          {post.engagement}
        </span>
      </td>
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="text-[11px] text-white/35">{post.publishedAt}</span>
      </td>
      <td className="py-3 px-4">
        <PostStatusBadge status={post.status} />
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30D');
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('All');

  const DATE_RANGES: DateRange[] = ['7D', '30D', '90D', 'All Time'];
  const maxReach = Math.max(...PLATFORM_STATS.map((p) => p.reach));
  const chartAccentColor =
    platformFilter === 'All'
      ? 'rgba(255,255,255,0.75)'
      : PLATFORM_COLOR_MAP[platformFilter];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060606]">
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
                  <BarChart2 size={18} className="text-white/40" />
                  <h1 className="text-[22px] font-bold tracking-[-0.03em] text-white/90">
                    Analytics
                  </h1>
                </div>
                <p className="text-[13px] text-white/35 ml-[26px]">
                  Track performance across all platforms
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Date range pill tabs */}
                <div className="flex items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.025] p-1">
                  {DATE_RANGES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setDateRange(r)}
                      className={`px-3.5 py-1.5 rounded-xl text-[11px] font-medium transition-all duration-200 ${
                        dateRange === r
                          ? 'bg-white/10 text-white border border-white/12'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                {/* Export button */}
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-[12px] font-medium text-white/55 hover:bg-white/[0.07] hover:border-white/18 hover:text-white/80 transition-all duration-200">
                  <Download size={13} />
                  Export Report
                </button>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 2. TOP STAT CARDS                                        */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {STAT_CARDS.map((card) => (
                <StatCardItem key={card.id} card={card} />
              ))}
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 3. MAIN CHART CARD                                       */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.025),transparent_65%)] pointer-events-none" />
              <div className="relative p-5">
                <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                  <div>
                    <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em] mb-0.5">
                      Performance Over Time
                    </h2>
                    <p className="text-[11px] text-white/30">
                      Weekly reach — {dateRange} period
                    </p>
                  </div>
                  <PlatformFilterPills
                    active={platformFilter}
                    onChange={setPlatformFilter}
                  />
                </div>

                <PerformanceChart bars={CHART_BARS} accentColor={chartAccentColor} />

                <div className="h-px bg-white/[0.05] mt-4 mb-4" />

                {/* Quick stat chips */}
                <div className="flex items-center gap-3 flex-wrap">
                  {QUICK_STATS.map((qs) => (
                    <div
                      key={qs.label}
                      className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/8 px-3.5 py-2"
                    >
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                        {qs.label}
                      </span>
                      <span className="text-[12px] font-semibold text-white/75">
                        {qs.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 4. PLATFORM BREAKDOWN                                    */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                  Platform Breakdown
                </h2>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  {dateRange} period
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {PLATFORM_STATS.map((stat) => (
                  <PlatformCard key={stat.id} stat={stat} maxReach={maxReach} />
                ))}
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 5. TOP PERFORMING POSTS TABLE                            */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.02),transparent_65%)] pointer-events-none" />
              <div className="relative">
                {/* Table card header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-white/30" />
                    <h2 className="text-[14px] font-semibold text-white/85 tracking-[-0.02em]">
                      Top Posts
                    </h2>
                    <span className="ml-1 rounded-full bg-white/[0.06] border border-white/8 px-2 py-0.5 text-[10px] font-medium text-white/40">
                      {TOP_POSTS.length}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-[11px] text-white/35 hover:text-white/65 transition-colors duration-200">
                    View All
                    <ArrowUpRight size={11} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px]">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        {['Platform', 'Post Preview', 'Reach', 'Eng. Rate', 'Published', 'Status'].map(
                          (h) => (
                            <th key={h} className="py-2.5 px-4 text-left">
                              <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-medium">
                                {h}
                              </span>
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {TOP_POSTS.map((post) => (
                        <TopPostRow key={post.id} post={post} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* 6. AI COACH CARD                                         */}
            {/* ──────────────────────────────────────────────────────── */}
            <div
              className="relative rounded-3xl border backdrop-blur-xl p-6 overflow-hidden"
              style={{
                borderColor: 'rgba(147,51,234,0.28)',
                backgroundColor: 'rgba(147,51,234,0.04)',
              }}
            >
              {/* Purple glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(147,51,234,0.09),transparent_65%)] pointer-events-none rounded-3xl" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Left: label + narrative + chips */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-500/25">
                      <Sparkles size={13} className="text-purple-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-purple-400/80 font-medium">
                      AI Coach
                    </span>
                  </div>
                  <p className="text-[13px] text-white/58 leading-relaxed">
                    {COACH_NARRATIVE}
                  </p>

                  {/* Action chips */}
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    {COACH_CHIPS.map((chip) => {
                      const ChipIcon = chip.icon;
                      return (
                        <button
                          key={chip.label}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/8 px-3.5 py-2 text-[11px] font-medium text-white/50 hover:bg-white/[0.07] hover:border-white/15 hover:text-white/80 transition-all duration-200"
                        >
                          <ChipIcon size={11} className={chip.color} />
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: last generated + CTA */}
                <div className="shrink-0 flex flex-col items-start lg:items-end gap-3">
                  <div className="lg:text-right">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/22 mb-1">
                      Last generated
                    </div>
                    <div className="text-[12px] text-white/40">Jun 19, 2026</div>
                  </div>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/35 bg-purple-500/10 text-[12px] font-semibold text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/55 transition-all duration-200">
                    <Sparkles size={13} />
                    Generate New Report
                  </button>
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
