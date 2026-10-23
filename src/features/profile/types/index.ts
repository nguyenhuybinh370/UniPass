export interface UserProfileStats {
  activePostsCount: number;
  giftedCount: number;
  reputationScore: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  avatarUrl?: string;
  campusLocation?: string; // vd: "KTX Khu B, ĐHQG"
  isVerifiedStudent: boolean;
  stats?: UserProfileStats;
}

export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  images: string[];
  conditionPercent: number;
  isAvailableForExchange: boolean;
  createdAt: string;
}

export interface OverviewStats {
  posts: { total: number; active: number; completed: number };
  exchanges: { total: number; locations: string };
  rating: { score: number; reviewCount: number };
}

export interface RecentPostItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  condition: string; // vd: "Mới 90%"
  category: string;
  timeAgo: string;
  location: string;
  type: 'pass' | 'gift';
  price?: number;
  statusText: string;
  actionLabel: string;
}

export type PostStatus = 'all' | 'active' | 'completed' | 'hidden';

export interface PostItem {
  id: string;
  title: string;
  imageUrl: string;
  condition: string; // vd: "Mới 90%", "Mới 95%"
  category: string;
  createdAtText: string;
  price: number;
  type: 'pass' | 'gift' | 'completed';
  location: string;
  completedNote?: string;
  courseCode?: string;
}
