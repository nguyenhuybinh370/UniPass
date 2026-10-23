import { UserProfile } from '@/features/profile/types';

export interface HeaderCategory {
  id: string;
  label: string;
  isHot?: boolean;
}

export interface HeaderQuickLink {
  id: string;
  label: string;
  href: string;
}

export interface HeaderUser {
  id?: string;
  email?: string;
  name: string;
  school: string;
  reputationRating: number;
  avatarInitial: string;
  role?: 'STUDENT' | 'ADMIN';
  studentId?: string;
}

export interface HeaderProps {
  categories?: HeaderCategory[];
  user?: HeaderUser | null;
  onSearch?: (query: string) => void;
  onPostClick?: () => void;
  onLoginClick?: () => void;
  onLoginSuccess?: (user: HeaderUser) => void;
}

export interface AccountDropdownProps {
  user: UserProfile;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  className?: string;
}

export type UserMenuDropdownProps = AccountDropdownProps;
