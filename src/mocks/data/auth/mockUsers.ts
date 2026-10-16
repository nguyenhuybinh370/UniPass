import { AuthUser } from '@/types/auth';

export const mockUsers: AuthUser[] = [
  {
    id: 'user-uit-01',
    email: 'anly@uit.edu.vn',
    name: 'An Lý',
    studentId: '21520123',
    school: 'UIT',
    reputationRating: 4.9,
    avatarInitial: 'A',
    role: 'STUDENT',
  },
  {
    id: 'user-bk-02',
    email: 'khanhduy@hcmut.edu.vn',
    name: 'Khánh Duy',
    studentId: '2010892',
    school: 'Bách Khoa',
    reputationRating: 4.8,
    avatarInitial: 'K',
    role: 'STUDENT',
  },
  {
    id: 'user-khtn-03',
    email: 'hoanglong@hcmus.edu.vn',
    name: 'Hoàng Long',
    studentId: '22120045',
    school: 'KHTN',
    reputationRating: 4.9,
    avatarInitial: 'H',
    role: 'STUDENT',
  },
  {
    id: 'user-admin-01',
    email: 'admin@unipass.edu.vn',
    name: 'Quản trị viên ĐHQG',
    school: 'ĐHQG-HCM',
    reputationRating: 5.0,
    avatarInitial: 'Q',
    role: 'ADMIN',
  },
];

export const defaultMockUser = mockUsers[0];
