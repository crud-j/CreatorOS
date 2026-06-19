import type { ElementType } from 'react';
import { Video, Play, Mic } from 'lucide-react';
import {
  YouTubeIcon,
  TwitterXIcon,
  LinkedInIcon,
  FacebookIcon,
  PinterestIcon,
  InstagramIcon,
} from '../../assets/SocialLogos';

export type FilterTab = 'All' | 'Active' | 'Draft' | 'Archived';
export type ProjectStatus = 'Active' | 'Draft' | 'Archived' | 'Processing' | 'Scheduled';
export type SourceType = 'YouTube' | 'Upload' | 'Loom' | 'Podcast';

export interface Platform {
  label: string;
  color: string;
  bgColor: string;
  icon: ElementType;
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  source: SourceType;
  duration: string;
  platforms: Platform[];
  thumbnailGradient: string;
  thumbnailAccent: string;
  stats: {
    views: string;
    engagement: string;
    posts: number;
  };
  outputs: { done: number; total: number };
  updatedAt: string;
  tags: string[];
}

export const PLATFORM_META: Record<string, Platform> = {
  youtube:   { label: 'YouTube',   color: '#FF0000', bgColor: 'rgba(255,0,0,0.10)',       icon: YouTubeIcon },
  instagram: { label: 'Instagram', color: '#E1306C', bgColor: 'rgba(225,48,108,0.12)',    icon: InstagramIcon },
  twitter:   { label: 'X',        color: '#ffffff', bgColor: 'rgba(255,255,255,0.08)',    icon: TwitterXIcon },
  linkedin:  { label: 'LinkedIn',  color: '#0A66C2', bgColor: 'rgba(10,102,194,0.12)',    icon: LinkedInIcon },
  facebook:  { label: 'Facebook',  color: '#1877F2', bgColor: 'rgba(24,119,242,0.12)',    icon: FacebookIcon },
  pinterest: { label: 'Pinterest', color: '#E60023', bgColor: 'rgba(230,0,35,0.10)',      icon: PinterestIcon },
};

export const SOURCE_META: Record<SourceType, { icon: ElementType; color: string }> = {
  YouTube: { icon: YouTubeIcon, color: '#FF0000' },
  Upload:  { icon: Video,       color: 'rgba(255,255,255,0.45)' },
  Loom:    { icon: Play,        color: '#a78bfa' },
  Podcast: { icon: Mic,         color: '#34d399' },
};

export const STATUS_CONFIG: Record<ProjectStatus, { label: string; cls: string; dot: string }> = {
  Active:     { label: 'Active',     cls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', dot: 'bg-emerald-400' },
  Draft:      { label: 'Draft',      cls: 'bg-white/5 text-white/45 border-white/10',                dot: 'bg-white/30' },
  Archived:   { label: 'Archived',   cls: 'bg-white/4 text-white/30 border-white/8',                 dot: 'bg-white/20' },
  Processing: { label: 'Processing', cls: 'bg-blue-500/10 text-blue-300 border-blue-500/20',         dot: 'bg-blue-400 animate-pulse' },
  Scheduled:  { label: 'Scheduled',  cls: 'bg-purple-500/10 text-purple-300 border-purple-500/20',   dot: 'bg-purple-400' },
};
