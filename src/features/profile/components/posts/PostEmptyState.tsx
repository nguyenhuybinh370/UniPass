import React from 'react';
import { BookOpen } from 'lucide-react';

export interface PostEmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const PostEmptyState: React.FC<PostEmptyStateProps> = ({
  title = 'Không tìm thấy bài đăng nào',
  description = 'Không có bài đăng nào phù hợp với bộ lọc hiện tại. Thử đổi từ khóa tìm kiếm hoặc chọn tab khác nhé!',
  className = '',
}) => {
  return (
    <div
      className={`p-10 border border-dashed border-[#E6DACD] rounded-xl flex flex-col items-center justify-center text-center ${className}`}
    >
      <BookOpen className="w-10 h-10 text-[#9E928A] mb-2" />
      <h4 className="font-heading font-semibold text-base text-[#221A14]">
        {title}
      </h4>
      <p className="text-xs text-[#756A63] mt-1 max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default PostEmptyState;
