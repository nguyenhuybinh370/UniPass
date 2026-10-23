import { PostStatus } from '@/features/profile/types';

/**
 * Danh mục bài đăng sản phẩm trên UniPass
 */
export const POST_CATEGORIES = [
  'Tất cả danh mục',
  'CNTT & Phần mềm',
  'Sách & Giáo trình',
  'Đồ dùng phòng KTX',
  'Thiết bị học tập',
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

/**
 * Số lượng bài đăng hiển thị trên một trang ở tab quản lý
 */
export const POST_ITEMS_PER_PAGE = 3;

/**
 * Cấu hình các tab lọc trạng thái bài đăng
 */
export interface PostStatusTabItem {
  key: PostStatus;
  label: string;
}

export const POST_STATUS_TABS: readonly PostStatusTabItem[] = [
  { key: 'all', label: 'Tất cả bài đăng' },
  { key: 'active', label: 'Đang hiển thị' },
  { key: 'completed', label: 'Đã trao đổi / Đã pass' },
  { key: 'hidden', label: 'Tin tạm ẩn' },
] as const;
