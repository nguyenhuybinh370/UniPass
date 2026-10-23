import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/feedback/Toast';
import { ApiErrorResponse } from '@/types/api';
import { postApi } from '../api/postApi';
import { postKeys } from './postKeys';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: string | number) => postApi.deletePost(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.myPosts(),
      });
      showToast({
        type: 'info',
        message: response.message || 'Đã xóa bài đăng khỏi hệ thống!',
      });
    },
    onError: (error: ApiErrorResponse | Error) => {
      showToast({
        type: 'error',
        message: error.message || 'Không thể xóa bài đăng. Vui lòng thử lại!',
      });
    },
  });
};
