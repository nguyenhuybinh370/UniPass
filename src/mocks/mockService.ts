import { ApiResponse, PaginatedResponse } from '@/types/api';
import { MyPostDetailData, PostStatus } from '@/features/posts/types';
import { mockMyPostDetail } from './data/mockPosts';

export const delay = (ms = 400): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createMockSuccessResponse = <T>(data: T, message = 'Thành công'): ApiResponse<T> => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
});

export const createMockPaginatedResponse = <T>(
  data: T[],
  page = 1,
  limit = 10,
  message = 'Thành công'
): PaginatedResponse<T> => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedData = data.slice(startIndex, startIndex + limit);

  return {
    success: true,
    message,
    data: paginatedData,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    timestamp: new Date().toISOString(),
  };
};

// In-memory store for post manage detail to simulate mutations
let inMemoryPostManageDetail: MyPostDetailData = { ...mockMyPostDetail };

export const mockPostService = {
  getMyPostManageDetail: async (id: string | number): Promise<ApiResponse<MyPostDetailData>> => {
    await delay(350);
    // Return post detail with matched id or default mock
    const postData: MyPostDetailData = {
      ...inMemoryPostManageDetail,
      id: String(id),
    };
    return createMockSuccessResponse(postData, 'Lấy chi tiết quản lý bài đăng thành công');
  },

  updatePostStatus: async (
    id: string | number,
    status: PostStatus
  ): Promise<ApiResponse<{ id: string; status: PostStatus }>> => {
    await delay(400);
    let badgeText = 'ĐANG HIỂN THỊ • PASS GẤP';
    if (status === 'COMPLETED') {
      badgeText = 'HOÀN TẤT • ĐÃ PASS';
    } else if (status === 'HIDDEN') {
      badgeText = 'TẠM ẨN TIN';
    } else if (status === 'AVAILABLE') {
      badgeText = 'ĐANG HIỂN THỊ • PASS GẤP';
    }

    inMemoryPostManageDetail = {
      ...inMemoryPostManageDetail,
      id: String(id),
      status,
      statusBadgeText: badgeText,
    };

    return createMockSuccessResponse(
      { id: String(id), status },
      status === 'COMPLETED'
        ? 'Đã đánh dấu bài đăng hoàn tất thành công!'
        : status === 'HIDDEN'
        ? 'Đã tạm ẩn bài đăng thành công!'
        : 'Đã mở hiển thị lại bài đăng thành công!'
    );
  },

  deletePost: async (id: string | number): Promise<ApiResponse<null>> => {
    await delay(400);
    return createMockSuccessResponse(null, `Đã xóa bài đăng #${id} thành công!`);
  },
};
