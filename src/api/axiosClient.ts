import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '@/configs/env';
import { tokenStorage } from '@/utils/tokenStorage';
import { ROUTES } from '@/constants/routes';
import { ApiErrorResponse } from '@/types/api';

export const axiosClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Gắn Access Token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Chuẩn hóa phản hồi & Xử lý lỗi toàn cục
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const errorData = error.response?.data;

    // Xử lý 401: Hết hạn token
    if (status === 401) {
      tokenStorage.clearTokens();
      if (!window.location.pathname.startsWith(ROUTES.AUTH.LOGIN)) {
        window.location.href = `${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(
          window.location.pathname + window.location.search
        )}`;
      }
    }

    const normalizedError: ApiErrorResponse = errorData || {
      success: false,
      statusCode: status || 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!',
      timestamp: new Date().toISOString(),
    };

    return Promise.reject(normalizedError);
  }
);
