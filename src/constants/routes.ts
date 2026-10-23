export const ROUTES = {
  HOME: '/',
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: string | number = ':id') => `/posts/${id}`,
    CREATE: '/posts/create',
    EDIT: (id: string | number = ':id') => `/posts/${id}/edit`,
  },
  OFFERS: {
    MY_OFFERS: '/my-offers',
  },
  CHAT: '/chat',
  PROFILE: {
    ME: '/profile/me',
    USER: (userId: string | number = ':userId') => `/profile/${userId}`,
    MY_POSTS: '/profile/my-posts',
    MY_POST_DETAIL: (id: string | number = ':id') => `/profile/my-posts/${id}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    POSTS: '/admin/posts',
    REPORTS: '/admin/reports',
    USERS: '/admin/users',
  },
} as const;
