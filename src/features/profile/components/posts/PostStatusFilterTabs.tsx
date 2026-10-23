import React from 'react';
import { PostStatus } from '@/features/profile/types';
import { POST_STATUS_TABS } from '@/constants/post';

export interface PostStatusFilterTabsProps {
  activeStatus: PostStatus;
  counts: Record<PostStatus, number>;
  onStatusChange: (status: PostStatus) => void;
  className?: string;
}

export const PostStatusFilterTabs: React.FC<PostStatusFilterTabsProps> = ({
  activeStatus,
  counts,
  onStatusChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {POST_STATUS_TABS.map((tab) => {
        const isActive = activeStatus === tab.key;
        const count = counts[tab.key] ?? 0;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onStatusChange(tab.key)}
            className={`cursor-pointer transition-all ${
              isActive
                ? 'bg-[#FDF3E1] border-[1.5px] border-[#D35400] text-[#9E3D00] font-semibold text-xs py-1.5 px-3.5 rounded-full'
                : 'bg-[#FAF6F0] border border-[#E6DACD] text-[#756A63] font-medium text-xs py-1.5 px-3.5 rounded-full hover:bg-[#F3E9DD]'
            }`}
          >
            {tab.label} ({count})
          </button>
        );
      })}
    </div>
  );
};

export default PostStatusFilterTabs;
