import { useQuery } from '@tanstack/react-query';
import { postApi } from '../api/postApi';
import { postKeys } from './postKeys';

export const usePostManageDetail = (id?: string | number) => {
  return useQuery({
    queryKey: postKeys.myPostDetail(id ?? ''),
    queryFn: () => postApi.getMyPostManageDetail(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};
