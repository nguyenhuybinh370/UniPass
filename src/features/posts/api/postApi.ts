import { axiosClient } from '@/api/axiosClient';
import { ENDPOINTS } from '@/api/endpoints';
import { ENV } from '@/configs/env';
import { mockPostService } from '@/mocks/mockService';
import { ApiResponse } from '@/types/api';
import { MyPostDetailData, PostStatus } from '../types';

export const postApi = {
  getMyPostManageDetail: async (id: string | number): Promise<ApiResponse<MyPostDetailData>> => {
    if (ENV.USE_MOCK) {
      return mockPostService.getMyPostManageDetail(id);
    }
    return axiosClient.get(ENDPOINTS.POSTS.MY_POST_DETAIL(id));
  },

  updatePostStatus: async (
    id: string | number,
    status: PostStatus
  ): Promise<ApiResponse<{ id: string; status: PostStatus }>> => {
    if (ENV.USE_MOCK) {
      return mockPostService.updatePostStatus(id, status);
    }
    return axiosClient.patch(ENDPOINTS.POSTS.UPDATE_STATUS(id), { status });
  },

  deletePost: async (id: string | number): Promise<ApiResponse<null>> => {
    if (ENV.USE_MOCK) {
      return mockPostService.deletePost(id);
    }
    return axiosClient.delete(ENDPOINTS.POSTS.DELETE(id));
  },
};
