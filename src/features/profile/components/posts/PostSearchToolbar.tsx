import React, { useState, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { POST_CATEGORIES } from '@/constants/post';

export interface PostSearchToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: readonly string[];
  className?: string;
}

export const PostSearchToolbar: React.FC<PostSearchToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = POST_CATEGORIES,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 w-full ${className}`}>
      {/* Ô tìm kiếm bài đăng */}
      <div className="flex-1 w-full h-[42px] px-3.5 bg-[#FAF6F0] border border-[#E6DACD] rounded-lg flex items-center gap-2.5 focus-within:border-[#D35400] focus-within:ring-1 focus-within:ring-[#D35400]/20 transition-colors">
        <Search className="w-4 h-4 text-[#756A63] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tên bài đăng, mã môn (IT003, MA006)..."
          className="w-full h-full bg-transparent text-xs sm:text-sm text-[#221A14] placeholder:text-[#9E928A] outline-none"
        />
      </div>

      {/* Dropdown chọn danh mục */}
      <div ref={dropdownRef} className="relative w-full sm:w-[200px]">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full h-[42px] px-3 bg-white border border-[#E6DACD] rounded-lg flex items-center justify-between cursor-pointer hover:border-[#D35400] transition-colors text-left"
        >
          <span className="text-xs sm:text-sm font-medium text-[#221A14] truncate">
            {selectedCategory}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#756A63] transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-[#D35400]' : ''
            }`}
          />
        </button>

        {/* Category Menu Popover */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-full bg-white rounded-xl border border-[#E6DACD] shadow-[0px_4px_16px_rgba(45,36,30,0.1)] z-30 p-1 overflow-hidden">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onCategoryChange(cat);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#FDF3E1] text-[#9E3D00] font-semibold'
                      : 'text-[#221A14] hover:bg-[#FAF6F0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSearchToolbar;
