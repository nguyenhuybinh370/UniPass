import React from 'react';

export interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PostPagination: React.FC<PostPaginationProps> = ({
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
  onPageChange,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#EFE6DC] text-xs text-[#756A63] ${className}`}
    >
      {/* Bên trái: Hiển thị 1 – 3 trong số 6 bài đăng */}
      <div>
        <span>
          Hiển thị {startItem} – {endItem} trong số {totalItems} bài đăng
        </span>
      </div>

      {/* Bên phải: Cụm nút chuyển trang */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="px-2.5 py-1.5 rounded-md border border-[#E6DACD] bg-[#FAF6F0] text-[#756A63] hover:text-[#221A14] hover:bg-[#F3E9DD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          &lt; Trước
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer text-xs ${
              currentPage === pageNum
                ? 'bg-[#FDF3E1] border border-[#D35400] text-[#9E3D00] font-bold shadow-xs'
                : 'bg-white border border-[#E6DACD] text-[#756A63] hover:bg-[#FAF6F0]'
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="px-2.5 py-1.5 rounded-md border border-[#E6DACD] bg-[#FAF6F0] text-[#756A63] hover:text-[#221A14] hover:bg-[#F3E9DD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Sau &gt;
        </button>
      </div>
    </div>
  );
};

export default PostPagination;
