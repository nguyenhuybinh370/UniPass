import { HeaderCategory } from '@/types/ui/header';

export const headerCategories: HeaderCategory[] = [
  { id: 'cat-books', label: '📚 Giáo trình & Sách ôn thi' },
  { id: 'cat-arch', label: '📐 Dụng cụ vẽ & Kiến trúc' },
  { id: 'cat-lab', label: '🔌 Linh kiện & Kit thí nghiệm' },
  { id: 'cat-casio', label: '📟 Máy tính Casio & Thiết bị' },
  { id: 'cat-dorm', label: '🛏️ Đồ dùng phòng trọ & KTX' },
  { id: 'cat-urgent', label: '⚡ Pass gấp 24h', isHot: true },
];
