import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/feedback/Toast';
import { ApiErrorResponse } from '@/types/api';
import { postApi } from '../api/postApi';
import { postKeys } from './postKeys';
import { PostStatus } from '../types';

export interface UpdatePostStatusVariables {
  id: string | number;
  status: PostStatus;
}

export const useUpdatePostStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: UpdatePostStatusVariables) =>
      postApi.updatePostStatus(id, status),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.myPostDetail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.myPosts(),
      });
      showToast({
        type: 'success',
        message: response.message || 'Cập nhật trạng thái bài đăng thành công!',
      });
    },
    onError: (error: ApiErrorResponse | Error) => {
      showToast({
        type: 'error',
        message: error.message || 'Không thể cập nhật trạng thái bài đăng. Vui lòng thử lại!',
      });
    },
  });
};
