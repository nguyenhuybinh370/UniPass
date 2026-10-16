import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, Home } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 border border-orange-200/60 flex items-center justify-center text-brand-primary mb-6 shadow-warm-sm">
        <BookX className="w-10 h-10 stroke-[2]" />
      </div>
      <h1 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
        404 — Không Tìm Thấy Trang
      </h1>
      <p className="font-body text-text-muted mt-3 max-w-md text-sm sm:text-base leading-relaxed">
        Đường dẫn bạn yêu cầu không tồn tại hoặc món đồ đã được hoàn tất trao đổi và chuyển kho.
      </p>
      <Link
        to={ROUTES.HOME}
        className="mt-8 h-11 px-6 rounded-xl bg-brand-primary hover:bg-brand-600 text-white font-semibold text-sm flex items-center gap-2 shadow-warm-xs hover-lift transition-warm cursor-pointer active:scale-98"
      >
        <Home className="w-4 h-4" />
        <span>Về trang chủ UniPass</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
