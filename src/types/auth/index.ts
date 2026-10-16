import { HeaderUser } from '../ui/header';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
  onLoginSuccess?: (user: HeaderUser) => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  studentId?: string;
  school: string;
  reputationRating: number;
  avatarInitial: string;
  role: 'STUDENT' | 'ADMIN';
}
