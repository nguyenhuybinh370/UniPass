export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...postKeys.details(), id] as const,
  myPosts: () => [...postKeys.all, 'my-posts'] as const,
  myPostDetail: (id: string | number) => [...postKeys.myPosts(), 'detail', id] as const,
  featured: () => [...postKeys.all, 'featured'] as const,
};
