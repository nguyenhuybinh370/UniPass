import { OverviewStats, RecentPostItem } from '@/features/profile/types';

export const mockOverviewStats: OverviewStats = {
  posts: {
    total: 6,
    active: 4,
    completed: 2,
  },
  exchanges: {
    total: 14,
    locations: 'Sảnh KTX Khu A & Khu B',
  },
  rating: {
    score: 4.9,
    reviewCount: 18,
  },
};

export const mockRecentPosts: RecentPostItem[] = [
  {
    id: 'recent-post-01',
    title: 'Giáo trình Cấu trúc dữ liệu & Giải thuật',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300',
    condition: 'Mới 90%',
    category: 'Sách & Giáo trình',
    timeAgo: '2 giờ trước',
    location: 'KTX Khu B',
    type: 'pass',
    price: 45000,
    statusText: 'Đang pass',
    actionLabel: 'Chi tiết',
  },
  {
    id: 'recent-post-02',
    title: 'Bàn học gấp gọn chân sắt KTX',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=300',
    condition: 'Mới 85%',
    category: 'Đồ dùng phòng trọ',
    timeAgo: '1 ngày trước',
    location: 'Sảnh Tòa BA1',
    type: 'gift',
    price: 0,
    statusText: 'Tặng 0đ',
    actionLabel: 'Đã có 3 bạn hẹn',
  },
];
